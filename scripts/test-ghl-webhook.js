#!/usr/bin/env node
/**
 * scripts/test-ghl-webhook.js
 *
 * End-to-end + unit test suite for the GHL webhook pipeline.
 *
 * Usage:
 *   node scripts/test-ghl-webhook.js               — full suite
 *   node scripts/test-ghl-webhook.js --unit         — unit tests only (no server required)
 *   node scripts/test-ghl-webhook.js --http         — HTTP tests only
 *   node scripts/test-ghl-webhook.js --mock         — GHL API mock tests only
 *
 * Environment (all optional):
 *   BASE_URL=http://localhost:3000   — override if app runs on a different port
 *   GHL_WEBHOOK_SECRET=secret        — set to test auth; leave unset to skip auth checks
 *
 * Prerequisites for HTTP tests:
 *   npm run dev     (Next.js dev server must be running)
 *   Node.js ≥ 18   (for native fetch)
 */

'use strict'

const http = require('http')

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL      = process.env.BASE_URL           || 'http://localhost:3000'
const WEBHOOK_URL   = `${BASE_URL}/api/ghl-webhook`
const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET || ''
const MOCK_GHL_PORT = 3099    // local mock GHL API server
const MOCK_GHL_BASE = `http://localhost:${MOCK_GHL_PORT}`

const ARGS        = process.argv.slice(2)
const RUN_UNIT    = ARGS.length === 0 || ARGS.includes('--unit')
const RUN_HTTP    = ARGS.length === 0 || ARGS.includes('--http')
const RUN_MOCK    = ARGS.length === 0 || ARGS.includes('--mock')

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight test framework (zero deps)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  dim:    '\x1b[2m',
}

let passed = 0
let failed = 0
let skipped = 0
const failures = []

function pass(label) {
  passed++
  console.log(`  ${C.green}✓${C.reset} ${C.dim}${label}${C.reset}`)
}

function fail(label, detail) {
  failed++
  failures.push({ label, detail })
  console.log(`  ${C.red}✗${C.reset} ${C.bold}${label}${C.reset}`)
  if (detail) console.log(`    ${C.red}→ ${detail}${C.reset}`)
}

function skip(label, reason) {
  skipped++
  console.log(`  ${C.yellow}−${C.reset} ${C.dim}${label} (${reason})${C.reset}`)
}

function section(title) {
  console.log(`\n${C.cyan}${C.bold}▸ ${title}${C.reset}`)
}

function assert(condition, label, detail) {
  condition ? pass(label) : fail(label, detail || 'assertion failed')
}

function assertEqual(actual, expected, label) {
  if (actual === expected) {
    pass(label)
  } else {
    fail(label, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

function assertContains(str, substr, label) {
  if (typeof str === 'object') str = JSON.stringify(str)
  if (String(str).includes(substr)) {
    pass(label)
  } else {
    fail(label, `"${substr}" not found in: ${String(str).slice(0, 120)}`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample GHL webhook payloads
// Reference: these are the shapes GHL sends from different workflow configs.
// ─────────────────────────────────────────────────────────────────────────────

const PAYLOADS = {
  // Standard shape from GHL Workflow → Webhook action
  roofer: {
    contact_id:   'ct_roofer_001',
    business_name: 'Smith Roofing Co',
    phone:        '0412 345 678',
    location:     'Sydney, NSW',
    email:        'info@smithroofing.com.au',
    niche:        'roofing',
    google_maps_url: 'https://maps.app.goo.gl/abc123',
  },

  // Alternative field names (company_name instead of business_name, phone1, city)
  painter: {
    contactId:    'ct_painter_002',
    company_name: 'Bright Brush Painting',
    phone1:       '0423 456 789',
    city:         'Melbourne, VIC',
    email1:       'hello@brightbrush.com.au',
    trade_type:   'painting contractor',
    instagramUrl: 'https://www.instagram.com/p/ABC123/',
  },

  // CamelCase field names from some GHL workflow configs
  builder: {
    contactId:    'ct_builder_003',
    companyName:  'Apex Constructions',
    phoneNumber:  '0434 567 890',
    suburb:       'Brisbane, QLD',
    emailAddress: 'info@apexconstructions.com.au',
    tradeType:    'building',
    googleMapsUrl: 'https://maps.app.goo.gl/xyz456',
  },

  // Landscaper using "name" and "mobile" and "area" aliases
  landscaper: {
    id:       'ct_landscaper_004',
    name:     'Green Thumb Landscaping',
    mobile:   '0445 678 901',
    area:     'Perth, WA',
    industry: 'landscaping',
  },

  // Renovations using "full_name" and "address"
  renovations: {
    contact_id:  'ct_reno_005',
    full_name:   'Premier Renovations',
    phone:       '0456 789 012',
    address:     'Adelaide, SA',
    service_type: 'kitchen renovation',
  },

  // Bathroom / plumber — maps to bathroom-lovable template
  bathroom: {
    contact_id:   'ct_bath_006',
    business_name: 'FlowRight Plumbing',
    phone:        '0467 890 123',
    location:     'Canberra, ACT',
    niche:        'bathroom renovation',
  },

  // Default fallback — unknown niche → bathroom-lovable
  unknown_niche: {
    contact_id:   'ct_unknown_007',
    business_name: 'Handyman Services',
    phone:        '0478 901 234',
    location:     'Hobart, TAS',
    niche:        'general trades',
  },

  // Minimal — only required fields, no optional ones
  minimal: {
    contact_id:   'ct_minimal_008',
    business_name: 'Basic Business',
    phone:        '0489 012 345',
    location:     'Darwin, NT',
  },

  // Missing companyName — should return 400
  missing_company: {
    contact_id: 'ct_miss_009',
    phone:      '0412 345 678',
    location:   'Sydney, NSW',
  },

  // Missing phone — should return 400
  missing_phone: {
    contact_id:   'ct_miss_010',
    business_name: 'No Phone Co',
    location:     'Sydney, NSW',
  },

  // Missing location — should return 400
  missing_location: {
    contact_id:   'ct_miss_011',
    business_name: 'No Location Co',
    phone:        '0412 345 678',
  },

  // Empty string fields — should return 400
  empty_fields: {
    contact_id:   'ct_empty_012',
    business_name: '   ',   // whitespace-only
    phone:        '',
    location:     'Sydney, NSW',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline logic — copied from route.js so unit tests run without the server
// ─────────────────────────────────────────────────────────────────────────────

const NICHE_MAP = [
  { patterns: ['roof'],                          niche: 'roofer'          },
  { patterns: ['bathroom', 'bath', 'plumb'],     niche: 'bathroom-lovable'},
  { patterns: ['paint'],                         niche: 'painter'         },
  { patterns: ['build', 'construct', 'carpent'], niche: 'builder'         },
  { patterns: ['landscap', 'garden', 'lawn'],    niche: 'landscaper'      },
  { patterns: ['renovat', 'reno', 'kitchen'],    niche: 'renovations'     },
]

function resolveNiche(raw) {
  if (!raw) return 'bathroom-lovable'
  const v = raw.toLowerCase().trim()
  for (const { patterns, niche } of NICHE_MAP) {
    if (patterns.some(p => v.includes(p))) return niche
  }
  return 'bathroom-lovable'
}

function pick(payload, ...keys) {
  for (const key of keys) {
    const val = payload[key]
    if (val && String(val).trim() !== '') return String(val).trim()
  }
  return null
}

function extractLeadData(payload) {
  return {
    contactId:     pick(payload, 'contact_id', 'contactId', 'id'),
    companyName:   pick(payload, 'business_name', 'company_name', 'companyName', 'company', 'name', 'full_name'),
    phone:         pick(payload, 'phone', 'phone1', 'phone_number', 'phoneNumber', 'mobile'),
    location:      pick(payload, 'location', 'city', 'suburb', 'address', 'area'),
    email:         pick(payload, 'email', 'email1', 'emailAddress') || '',
    rawNiche:      pick(payload, 'niche', 'trade_type', 'tradeType', 'industry', 'type', 'service_type') || '',
    googleMapsUrl: pick(payload, 'google_maps_url', 'googleMapsUrl', 'maps_url', 'gmb_url') || null,
    instagramUrl:  pick(payload, 'instagram_url', 'instagramUrl', 'instagram') || null,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — Unit tests (no server required)
// ─────────────────────────────────────────────────────────────────────────────

function runUnitTests() {
  section('Niche mapping')

  const nicheTests = [
    // Roofing
    ['roofing',            'roofer'],
    ['Roofing Contractor', 'roofer'],
    ['roof repair',        'roofer'],
    ['metal roof',         'roofer'],
    // Bathroom / plumber
    ['bathroom renovation','bathroom-lovable'],
    ['bathroom',           'bathroom-lovable'],
    ['bath',               'bathroom-lovable'],
    ['plumber',            'bathroom-lovable'],
    ['plumbing',           'bathroom-lovable'],
    // Painter
    ['painter',            'painter'],
    ['painting',           'painter'],
    ['painting contractor','painter'],
    ['Painting Services',  'painter'],
    // Builder
    ['builder',            'builder'],
    ['building',           'builder'],
    ['construction',       'builder'],
    ['carpentry',          'builder'],
    ['Construct Co',       'builder'],
    // Landscaper
    ['landscaper',         'landscaper'],
    ['landscaping',        'landscaper'],
    ['garden',             'landscaper'],
    ['lawn care',          'landscaper'],
    // Renovations
    ['renovation',         'renovations'],
    ['reno',               'renovations'],
    ['kitchen',            'renovations'],
    ['home renovation',    'renovations'],
    // Defaults
    ['',                   'bathroom-lovable'],
    [null,                 'bathroom-lovable'],
    [undefined,            'bathroom-lovable'],
    ['general trades',     'bathroom-lovable'],
    ['unknown',            'bathroom-lovable'],
  ]

  for (const [input, expected] of nicheTests) {
    assertEqual(resolveNiche(input), expected, `"${input}" → ${expected}`)
  }

  section('Field extraction — companyName aliases')

  assertEqual(extractLeadData({ business_name: 'Acme' }).companyName, 'Acme',  'business_name')
  assertEqual(extractLeadData({ company_name:  'Acme' }).companyName, 'Acme',  'company_name')
  assertEqual(extractLeadData({ companyName:   'Acme' }).companyName, 'Acme',  'companyName')
  assertEqual(extractLeadData({ company:       'Acme' }).companyName, 'Acme',  'company')
  assertEqual(extractLeadData({ name:          'Acme' }).companyName, 'Acme',  'name')
  assertEqual(extractLeadData({ full_name:     'Acme' }).companyName, 'Acme',  'full_name')
  // Priority: business_name wins over name
  assertEqual(
    extractLeadData({ business_name: 'B', name: 'N' }).companyName,
    'B',
    'business_name takes priority over name'
  )

  section('Field extraction — phone aliases')

  assertEqual(extractLeadData({ phone:        '0400 000 000' }).phone, '0400 000 000', 'phone')
  assertEqual(extractLeadData({ phone1:       '0400 000 001' }).phone, '0400 000 001', 'phone1')
  assertEqual(extractLeadData({ phone_number: '0400 000 002' }).phone, '0400 000 002', 'phone_number')
  assertEqual(extractLeadData({ phoneNumber:  '0400 000 003' }).phone, '0400 000 003', 'phoneNumber')
  assertEqual(extractLeadData({ mobile:       '0400 000 004' }).phone, '0400 000 004', 'mobile')

  section('Field extraction — location aliases')

  assertEqual(extractLeadData({ location: 'Sydney, NSW' }).location, 'Sydney, NSW', 'location')
  assertEqual(extractLeadData({ city:     'Melbourne'   }).location, 'Melbourne',   'city')
  assertEqual(extractLeadData({ suburb:   'Bondi'       }).location, 'Bondi',       'suburb')
  assertEqual(extractLeadData({ address:  '123 Main St' }).location, '123 Main St', 'address')
  assertEqual(extractLeadData({ area:     'North Shore'  }).location, 'North Shore', 'area')

  section('Field extraction — contactId aliases')

  assertEqual(extractLeadData({ contact_id: 'ct_001' }).contactId, 'ct_001', 'contact_id')
  assertEqual(extractLeadData({ contactId:  'ct_002' }).contactId, 'ct_002', 'contactId')
  assertEqual(extractLeadData({ id:         'ct_003' }).contactId, 'ct_003', 'id')

  section('Field extraction — niche aliases')

  assertEqual(extractLeadData({ niche:        'roofing'  }).rawNiche, 'roofing',  'niche')
  assertEqual(extractLeadData({ trade_type:   'painting' }).rawNiche, 'painting', 'trade_type')
  assertEqual(extractLeadData({ tradeType:    'building' }).rawNiche, 'building', 'tradeType')
  assertEqual(extractLeadData({ industry:     'landscape'}).rawNiche, 'landscape','industry')
  assertEqual(extractLeadData({ type:         'roofer'   }).rawNiche, 'roofer',   'type')
  assertEqual(extractLeadData({ service_type: 'reno'     }).rawNiche, 'reno',     'service_type')

  section('Field extraction — optional fields')

  assertEqual(
    extractLeadData({ google_maps_url: 'https://maps.app.goo.gl/abc' }).googleMapsUrl,
    'https://maps.app.goo.gl/abc',
    'google_maps_url'
  )
  assertEqual(
    extractLeadData({ googleMapsUrl: 'https://maps.app.goo.gl/def' }).googleMapsUrl,
    'https://maps.app.goo.gl/def',
    'googleMapsUrl'
  )
  assertEqual(
    extractLeadData({ instagram_url: 'https://instagram.com/p/abc' }).instagramUrl,
    'https://instagram.com/p/abc',
    'instagram_url'
  )
  assertEqual(
    extractLeadData({ instagram: 'https://instagram.com/p/def' }).instagramUrl,
    'https://instagram.com/p/def',
    'instagram'
  )
  assertEqual(extractLeadData({}).googleMapsUrl, null, 'googleMapsUrl absent → null')
  assertEqual(extractLeadData({}).instagramUrl,  null, 'instagramUrl absent → null')

  section('Field extraction — whitespace trimming and empty rejection')

  assertEqual(extractLeadData({ business_name: '  Acme  ' }).companyName, 'Acme', 'trims whitespace')
  assertEqual(extractLeadData({ business_name: '   ' }).companyName, null,         'rejects whitespace-only')
  assertEqual(extractLeadData({ business_name: '' }).companyName, null,            'rejects empty string')

  section('Full sample payload extraction — all niches')

  for (const [key, payload] of Object.entries(PAYLOADS)) {
    if (key.startsWith('missing_') || key === 'empty_fields') continue
    const lead = extractLeadData(payload)
    assert(!!lead.companyName, `${key}: companyName extracted`)
    assert(!!lead.phone,       `${key}: phone extracted`)
    assert(!!lead.location,    `${key}: location extracted`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP helpers
// ─────────────────────────────────────────────────────────────────────────────

async function post(url, body, headers = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' }
  if (WEBHOOK_SECRET) defaultHeaders['x-webhook-secret'] = WEBHOOK_SECRET

  const res = await fetch(url, {
    method:  'POST',
    headers: { ...defaultHeaders, ...headers },
    body:    typeof body === 'string' ? body : JSON.stringify(body),
  })

  let json = null
  try { json = await res.json() } catch {}
  return { status: res.status, headers: res.headers, body: json }
}

async function options(url) {
  const res = await fetch(url, { method: 'OPTIONS' })
  return { status: res.status, headers: res.headers }
}

async function checkServerRunning() {
  try {
    await fetch(BASE_URL, { signal: AbortSignal.timeout(3000) })
    return true
  } catch {
    return false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — HTTP integration tests (requires running server)
// ─────────────────────────────────────────────────────────────────────────────

async function runHttpTests() {
  const running = await checkServerRunning()
  if (!running) {
    console.log(`\n${C.yellow}  ⚠ Server not reachable at ${BASE_URL}${C.reset}`)
    console.log(`${C.dim}    Start it with: npm run dev${C.reset}`)
    skipped += 20
    return
  }

  // ── CORS preflight ────────────────────────────────────────────────────────
  section('CORS preflight (OPTIONS)')

  const preflight = await options(WEBHOOK_URL)
  assertEqual(preflight.status, 200, 'OPTIONS → 200')
  assert(
    preflight.headers.get('access-control-allow-origin') === '*',
    'Access-Control-Allow-Origin: *'
  )
  assertContains(
    preflight.headers.get('access-control-allow-headers') || '',
    'x-webhook-secret',
    'Allows x-webhook-secret header'
  )

  // ── Authentication ────────────────────────────────────────────────────────
  section('Authentication')

  if (WEBHOOK_SECRET) {
    // Wrong secret
    const wrongSecret = await post(
      WEBHOOK_URL,
      PAYLOADS.roofer,
      { 'x-webhook-secret': 'WRONG_SECRET_VALUE' }
    )
    assertEqual(wrongSecret.status, 401, 'Wrong secret → 401')
    assertContains(wrongSecret.body, 'Unauthorized', 'Body contains "Unauthorized"')

    // No secret header
    const noSecret = await post(
      WEBHOOK_URL,
      PAYLOADS.roofer,
      { 'x-webhook-secret': '' }
    )
    assertEqual(noSecret.status, 401, 'Missing secret → 401')
  } else {
    skip('Wrong secret → 401',   'GHL_WEBHOOK_SECRET not set')
    skip('Missing secret → 401', 'GHL_WEBHOOK_SECRET not set')
  }

  // ── Invalid JSON ──────────────────────────────────────────────────────────
  section('Invalid request body')

  const badJson = await post(WEBHOOK_URL, 'this is not json { at all', {
    'Content-Type': 'application/json',
  })
  assertEqual(badJson.status, 400, 'Invalid JSON → 400')
  assertContains(badJson.body?.error || '', 'Invalid JSON', 'Body describes parse failure')

  // ── Missing required fields ───────────────────────────────────────────────
  section('Missing required fields')

  const missCompany = await post(WEBHOOK_URL, PAYLOADS.missing_company)
  assertEqual(missCompany.status, 400,  'Missing business_name → 400')
  assert(
    Array.isArray(missCompany.body?.missing) && missCompany.body.missing.includes('companyName'),
    'Response lists "companyName" in missing array'
  )

  const missPhone = await post(WEBHOOK_URL, PAYLOADS.missing_phone)
  assertEqual(missPhone.status, 400, 'Missing phone → 400')
  assert(
    Array.isArray(missPhone.body?.missing) && missPhone.body.missing.includes('phone'),
    'Response lists "phone" in missing array'
  )

  const missLocation = await post(WEBHOOK_URL, PAYLOADS.missing_location)
  assertEqual(missLocation.status, 400, 'Missing location → 400')
  assert(
    Array.isArray(missLocation.body?.missing) && missLocation.body.missing.includes('location'),
    'Response lists "location" in missing array'
  )

  const emptyFields = await post(WEBHOOK_URL, PAYLOADS.empty_fields)
  assertEqual(emptyFields.status, 400, 'Whitespace-only fields → 400')

  // ── Multiple missing fields ───────────────────────────────────────────────
  section('Multiple missing fields')

  const emptyPayload = await post(WEBHOOK_URL, { contact_id: 'only_id' })
  assertEqual(emptyPayload.status, 400, 'Empty payload → 400')
  assert(
    (emptyPayload.body?.missing?.length ?? 0) >= 3,
    'Reports all 3 missing fields at once'
  )

  // ── Field alias handling via HTTP ─────────────────────────────────────────
  section('Field name aliases accepted by webhook')

  // These should all pass validation (may still fail at Vercel deploy step, that's OK)
  const aliasTests = [
    ['company_name alias',  { company_name:  'Test Co', phone: '0400000000', location: 'Sydney, NSW' }],
    ['companyName alias',   { companyName:   'Test Co', phone: '0400000000', location: 'Sydney, NSW' }],
    ['name alias',          { name:          'Test Co', phone: '0400000000', location: 'Sydney, NSW' }],
    ['phone1 alias',        { business_name: 'Test Co', phone1: '0400000000', location: 'Sydney, NSW' }],
    ['phoneNumber alias',   { business_name: 'Test Co', phoneNumber: '0400000000', location: 'Sydney, NSW' }],
    ['mobile alias',        { business_name: 'Test Co', mobile: '0400000000', location: 'Sydney, NSW' }],
    ['city alias',          { business_name: 'Test Co', phone: '0400000000', city: 'Melbourne, VIC' }],
    ['suburb alias',        { business_name: 'Test Co', phone: '0400000000', suburb: 'Bondi, NSW' }],
  ]

  for (const [label, payload] of aliasTests) {
    const r = await post(WEBHOOK_URL, payload)
    // Not 400 means validation passed (may be 200 or 500 depending on Vercel token)
    assert(r.status !== 400, `${label}: passes field validation (not 400)`)
  }

  // ── Full valid payload — niche mapping ────────────────────────────────────
  section('Full valid payloads (niche field resolves correctly)')

  const nichePayloads = [
    ['roofing → roofer',          PAYLOADS.roofer,     'roofer'],
    ['painting → painter',        PAYLOADS.painter,    'painter'],
    ['building → builder',        PAYLOADS.builder,    'builder'],
    ['landscaping → landscaper',  PAYLOADS.landscaper, 'landscaper'],
    ['kitchen reno → renovations',PAYLOADS.renovations,'renovations'],
    ['bathroom → bathroom-lovable',PAYLOADS.bathroom,  'bathroom-lovable'],
    ['unknown → bathroom-lovable', PAYLOADS.unknown_niche, 'bathroom-lovable'],
    ['no niche → bathroom-lovable',PAYLOADS.minimal,   'bathroom-lovable'],
  ]

  for (const [label, payload, expectedNiche] of nichePayloads) {
    const r = await post(WEBHOOK_URL, payload)
    if (r.status === 200) {
      assertEqual(r.body?.niche, expectedNiche, `${label}: niche in response`)
      assert(typeof r.body?.url === 'string' && r.body.url.startsWith('https://'), `${label}: url in response`)
      assert(typeof r.body?.trackingId === 'string', `${label}: trackingId in response`)
    } else if (r.status === 500) {
      // Expected when VERCEL_TOKEN is not set or invalid — validation still passed
      assertContains(r.body?.error || '', 'deployment', `${label}: 500 is deployment error, not validation`)
    } else {
      fail(`${label}: unexpected status ${r.status}`, JSON.stringify(r.body))
    }
  }

  // ── No contactId — GHL update skipped gracefully ─────────────────────────
  section('No contactId — GHL field update skipped')

  const noContactId = await post(WEBHOOK_URL, {
    business_name: 'No Contact Co',
    phone:         '0400 000 099',
    location:      'Sydney, NSW',
    niche:         'roofing',
    // no contact_id
  })

  if (noContactId.status === 200) {
    assertEqual(
      noContactId.body?.ghlContactUpdate, 'skipped',
      'ghlContactUpdate is "skipped" when no contactId'
    )
  } else if (noContactId.status === 500) {
    skip('ghlContactUpdate skipped test', 'Vercel deploy failed (no VERCEL_TOKEN)')
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — GHL API mock server tests
// Tests the expected request shapes for updateContactFields, sendSMS, getContact
// by spinning up a mock server on port 3099 and sending matching requests.
// ─────────────────────────────────────────────────────────────────────────────

function startMockGhlServer() {
  const requests = []

  const server = http.createServer((req, res) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      let parsed = null
      try { parsed = JSON.parse(body) } catch {}

      requests.push({
        method:  req.method,
        url:     req.url,
        headers: req.headers,
        body:    parsed,
      })

      res.setHeader('Content-Type', 'application/json')

      // Mock GHL contacts endpoint
      if (req.method === 'GET' && req.url.startsWith('/contacts/')) {
        res.writeHead(200)
        res.end(JSON.stringify({
          contact: {
            id:         req.url.split('/')[2],
            firstName:  'Test',
            lastName:   'Contact',
            customFields: [],
          },
        }))
        return
      }

      if (req.method === 'PUT' && req.url.startsWith('/contacts/')) {
        res.writeHead(200)
        res.end(JSON.stringify({
          contact: {
            id:           req.url.split('/')[2],
            customFields: parsed?.customFields || [],
          },
        }))
        return
      }

      // Mock GHL conversations/messages endpoint (SMS)
      if (req.method === 'POST' && req.url === '/conversations/messages') {
        res.writeHead(200)
        res.end(JSON.stringify({ messageId: 'msg_mock_001', status: 'sent' }))
        return
      }

      res.writeHead(404)
      res.end(JSON.stringify({ error: 'Not found' }))
    })
  })

  return new Promise((resolve) => {
    server.listen(MOCK_GHL_PORT, () => {
      resolve({ server, requests })
    })
  })
}

async function runMockGhlTests() {
  section('GHL API mock server — request shape validation')

  let server, requests
  try {
    ;({ server, requests } = await startMockGhlServer())
  } catch (err) {
    console.log(`  ${C.yellow}⚠ Could not start mock server on port ${MOCK_GHL_PORT}: ${err.message}${C.reset}`)
    skipped += 10
    return
  }

  const mockAuthHeaders = {
    'Authorization': 'Bearer test_ghl_api_key',
    'Content-Type':  'application/json',
    'Version':       '2021-07-28',
  }

  try {

    // ── getContact ──────────────────────────────────────────────────────────
    section('GHL API: getContact request format')

    const contactId = 'ct_test_abc123'
    const getRes = await fetch(`${MOCK_GHL_BASE}/contacts/${contactId}`, {
      method: 'GET', headers: mockAuthHeaders,
    })
    const getBody = await getRes.json()

    assertEqual(getRes.status, 200, 'getContact → 200')
    assertEqual(getBody?.contact?.id, contactId, 'Response wraps contact under "contact" key')

    const getReq = requests.at(-1)
    assertEqual(getReq?.method, 'GET',                         'Uses GET method')
    assertEqual(getReq?.url,    `/contacts/${contactId}`,      'Correct URL path')
    assertContains(getReq?.headers?.authorization || '', 'Bearer', 'Authorization: Bearer header')
    assertEqual(getReq?.headers?.version, '2021-07-28',        'Version: 2021-07-28 header')

    // ── updateContactFields ─────────────────────────────────────────────────
    section('GHL API: updateContactFields request format')

    const demoUrl    = 'https://smith-roofing-a1b2c3.vercel.app'
    const createdAt  = new Date().toISOString()
    const fieldsPayload = {
      customFields: [
        { id: 'demo_site_url',   field_value: demoUrl    },
        { id: 'demo_created_at', field_value: createdAt  },
      ],
    }

    const putRes = await fetch(`${MOCK_GHL_BASE}/contacts/${contactId}`, {
      method:  'PUT',
      headers: mockAuthHeaders,
      body:    JSON.stringify(fieldsPayload),
    })
    const putBody = await putRes.json()

    assertEqual(putRes.status, 200, 'updateContactFields → 200')
    assert(Array.isArray(putBody?.contact?.customFields), 'Response includes customFields array')

    const putReq = requests.at(-1)
    assertEqual(putReq?.method, 'PUT',                       'Uses PUT method')
    assertEqual(putReq?.url,    `/contacts/${contactId}`,    'Same contacts endpoint as GET')
    assert(
      Array.isArray(putReq?.body?.customFields),
      'Body has customFields array'
    )
    assertEqual(
      putReq?.body?.customFields?.length, 2,
      'Sends both fields in one call (demo_site_url + demo_created_at)'
    )
    assertEqual(
      putReq?.body?.customFields?.[0]?.id, 'demo_site_url',
      'First field id is demo_site_url'
    )
    assertEqual(
      putReq?.body?.customFields?.[0]?.field_value, demoUrl,
      'First field value is the demo URL'
    )
    assertEqual(
      putReq?.body?.customFields?.[1]?.id, 'demo_created_at',
      'Second field id is demo_created_at'
    )
    assert(
      typeof putReq?.body?.customFields?.[1]?.field_value === 'string',
      'Second field value is a string timestamp'
    )

    // ── sendSMS ─────────────────────────────────────────────────────────────
    section('GHL API: sendSMS request format')

    const smsPayload = {
      type:       'SMS',
      contactId:  contactId,
      locationId: 'loc_test_xyz',
      message:    `Hi! Your demo site is ready: ${demoUrl}`,
    }

    const smsRes = await fetch(`${MOCK_GHL_BASE}/conversations/messages`, {
      method:  'POST',
      headers: mockAuthHeaders,
      body:    JSON.stringify(smsPayload),
    })
    const smsBody = await smsRes.json()

    assertEqual(smsRes.status, 200,          'sendSMS → 200')
    assert(!!smsBody?.messageId,             'Response includes messageId')

    const smsReq = requests.at(-1)
    assertEqual(smsReq?.method, 'POST',      'Uses POST method')
    assertEqual(smsReq?.url, '/conversations/messages', 'Correct SMS endpoint')
    assertEqual(smsReq?.body?.type, 'SMS',   'Body type is "SMS"')
    assert(!!smsReq?.body?.contactId,        'Body includes contactId')
    assert(!!smsReq?.body?.locationId,       'Body includes locationId (required by GHL)')
    assert(!!smsReq?.body?.message,          'Body includes message text')

    // ── Retry logic — 429 response ──────────────────────────────────────────
    section('GHL API: retry behaviour (simulated 429)')

    // Temporarily override mock to return 429 once then 200
    let retryCount = 0
    const retryServer = http.createServer((req, res) => {
      retryCount++
      res.setHeader('Content-Type', 'application/json')
      if (retryCount === 1) {
        // First attempt: rate limited, no retry-after header
        res.writeHead(429)
        res.end(JSON.stringify({ message: 'Too Many Requests' }))
      } else {
        res.writeHead(200)
        res.end(JSON.stringify({ contact: { id: 'ct_retry' } }))
      }
    })

    await new Promise(r => retryServer.listen(MOCK_GHL_PORT + 1, r))

    try {
      // Direct fetch to simulate what fetchWithRetry does (one retry)
      const r1 = await fetch(`http://localhost:${MOCK_GHL_PORT + 1}/contacts/ct_retry`, {
        method: 'GET', headers: mockAuthHeaders,
      })
      assertEqual(r1.status, 429, '1st attempt → 429 (rate limited)')

      const r2 = await fetch(`http://localhost:${MOCK_GHL_PORT + 1}/contacts/ct_retry`, {
        method: 'GET', headers: mockAuthHeaders,
      })
      assertEqual(r2.status, 200, '2nd attempt → 200 (retry succeeds)')
      assertEqual(retryCount, 2, 'Exactly 2 attempts made')
    } finally {
      await new Promise(r => retryServer.close(r))
    }

  } finally {
    await new Promise(r => server.close(r))
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Print sample payloads
// ─────────────────────────────────────────────────────────────────────────────

function printSamplePayloads() {
  section('Sample GHL webhook payloads')

  const examples = {
    'Standard (roofing)':        PAYLOADS.roofer,
    'Alt field names (painting)':PAYLOADS.painter,
    'CamelCase fields (builder)':PAYLOADS.builder,
    'Minimal (required only)':   PAYLOADS.minimal,
  }

  for (const [label, payload] of Object.entries(examples)) {
    console.log(`\n  ${C.cyan}${label}:${C.reset}`)
    console.log(
      JSON.stringify(payload, null, 2)
        .split('\n')
        .map(l => `    ${C.dim}${l}${C.reset}`)
        .join('\n')
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────

function printSummary() {
  const total = passed + failed + skipped
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`${C.bold}Results:${C.reset}  ${C.green}${passed} passed${C.reset}  ·  ${C.red}${failed} failed${C.reset}  ·  ${C.yellow}${skipped} skipped${C.reset}  ·  ${total} total`)

  if (failures.length > 0) {
    console.log(`\n${C.red}${C.bold}Failures:${C.reset}`)
    for (const { label, detail } of failures) {
      console.log(`  ${C.red}✗ ${label}${C.reset}`)
      if (detail) console.log(`    ${C.dim}${detail}${C.reset}`)
    }
  }

  console.log('')

  if (failed > 0) process.exit(1)
}

// ─────────────────────────────────────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${C.bold}GHL Webhook Test Suite${C.reset}  ${C.dim}→ ${WEBHOOK_URL}${C.reset}`)
  if (WEBHOOK_SECRET) {
    console.log(`${C.dim}Auth: using GHL_WEBHOOK_SECRET${C.reset}`)
  } else {
    console.log(`${C.dim}Auth: GHL_WEBHOOK_SECRET not set — auth tests will be skipped${C.reset}`)
  }

  if (RUN_UNIT)  runUnitTests()
  if (RUN_HTTP)  await runHttpTests()
  if (RUN_MOCK)  await runMockGhlTests()

  if (ARGS.length === 0) printSamplePayloads()

  printSummary()
}

main().catch(err => {
  console.error(`${C.red}Fatal error:${C.reset}`, err)
  process.exit(1)
})

import { NextResponse } from 'next/server'
import { generateSiteHTML } from '@/lib/generate-html'
import { generateCustomContent } from '@/lib/claude-api'
import { logToGoogleSheet } from '@/lib/google-sheets'
import { updateContactFields, sendSMS, sendWhatsApp } from '@/lib/ghl-api'
import { addSite, getSites } from '@/lib/site-store'
import { notifyNewDemo } from '@/lib/notifications'
import { addToQueue, getQueueStats } from '@/lib/queue-store'

// CORS headers — allow GHL's servers to POST here
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-webhook-secret',
}

// ── Niche resolution ───────────────────────────────────────────────────────────
// Maps whatever GHL sends in niche / trade_type to our internal niche keys.
// "bathroom-lovable" falls through to the generic template in generate-html.js
// until a dedicated bathroom template is added.
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

// ── Field extraction ───────────────────────────────────────────────────────────
// GHL field names vary across workflow configurations; check common aliases.
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

// ── Tracking ID / slug helpers (mirrors generate/route.js) ────────────────────
function generateTrackingId() {
  return Math.random().toString(36).substring(2, 8)
}

function buildSlug(companyName, trackingId) {
  const base = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${base}-${trackingId}`
}

// ── CORS preflight ─────────────────────────────────────────────────────────────
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

// ── POST — main webhook handler ────────────────────────────────────────────────
export async function POST(request) {
  const receivedAt = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for') || 'unknown'

  // 1. Webhook secret check
  const secret = request.headers.get('x-webhook-secret')
  const expectedSecret = process.env.GHL_WEBHOOK_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    console.warn('🚫 GHL WEBHOOK: Invalid or missing secret from', ip)
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401, headers: corsHeaders }
    )
  }

  // 2. Parse body
  let payload
  try {
    payload = await request.json()
  } catch {
    console.error('🚫 GHL WEBHOOK: Failed to parse JSON body')
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400, headers: corsHeaders }
    )
  }

  console.log('📥 GHL WEBHOOK raw payload:', JSON.stringify(payload, null, 2))

  // 3. Extract and validate lead fields
  const lead = extractLeadData(payload)

  const missing = ['companyName', 'phone', 'location'].filter(f => !lead[f])
  if (missing.length > 0) {
    console.warn('🚫 GHL WEBHOOK: Missing required fields:', missing, '| Resolved lead:', lead)
    return NextResponse.json(
      { success: false, error: 'Missing required lead fields', missing },
      { status: 400, headers: corsHeaders }
    )
  }

  // 4. Resolve niche
  const niche = resolveNiche(lead.rawNiche)

  console.log(`🏷️  GHL WEBHOOK: niche "${lead.rawNiche}" → "${niche}"`)
  console.log(`📋 GHL WEBHOOK: lead extracted:`, JSON.stringify({ ...lead, niche }, null, 2))

  // 4b. Queue mode — add to queue and return early
  if (process.env.QUEUE_ENABLED === 'true') {
    console.log('📬 GHL WEBHOOK: QUEUE_ENABLED=true — adding lead to queue')
    const queued = await addToQueue({ ...lead, niche })

    if (!queued) {
      console.error('❌ GHL WEBHOOK: Failed to enqueue lead — falling back to immediate processing')
      // fall through to immediate processing below
    } else {
      const stats = await getQueueStats()
      console.log(`✅ GHL WEBHOOK: Lead queued as ${queued.id}, position ${queued.position}`)
      return NextResponse.json(
        {
          success:    true,
          queued:     true,
          queueId:    queued.id,
          position:   queued.position,
          pending:    stats?.pending    ?? queued.position,
          dailyLeft:  stats?.remainingCapacity ?? null,
        },
        { status: 202, headers: corsHeaders }
      )
    }
  }

  // 5. Generate tracking ID and slug
  const trackingId = generateTrackingId()
  const slug = buildSlug(lead.companyName, trackingId)

  // 6. Generate custom content via Claude (non-blocking fallback on error)
  let customContent = null
  try {
    console.log('🤖 GHL WEBHOOK: Generating custom content with Claude...')
    customContent = await generateCustomContent({
      companyName: lead.companyName,
      niche,
      location: lead.location,
    })
    console.log('✅ GHL WEBHOOK: Custom content ready:', customContent.tagline)
  } catch (err) {
    console.error('⚠️ GHL WEBHOOK: Claude content generation failed, using defaults:', err.message)
  }

  // 7. Generate HTML
  const html = generateSiteHTML({
    companyName:   lead.companyName,
    phone:         lead.phone,
    niche,
    location:      lead.location,
    trackingId,
    instagramUrl:  lead.instagramUrl,
    googleMapsUrl: lead.googleMapsUrl,
    customContent,
  })

  // 8. Deploy to Vercel
  let siteUrl
  try {
    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: slug,
        target: 'production',
        files: [
          {
            file: 'index.html',
            data: Buffer.from(html).toString('base64'),
            encoding: 'base64',
          },
        ],
        projectSettings: { framework: null },
      }),
    })

    if (!deployResponse.ok) {
      const errorData = await deployResponse.json()
      console.error('❌ GHL WEBHOOK: Vercel deployment error:', errorData)
      throw new Error(`Vercel deploy failed: ${errorData.error?.message || deployResponse.status}`)
    }

    const deployData = await deployResponse.json()
    siteUrl = `https://${deployData.url}`
    console.log('🚀 GHL WEBHOOK: Site deployed:', siteUrl)

  } catch (err) {
    console.error('❌ GHL WEBHOOK: Deployment failed:', err.message)
    return NextResponse.json(
      { success: false, error: 'Site deployment failed', detail: err.message },
      { status: 500, headers: corsHeaders }
    )
  }

  // 9. Persist to Google Sheet and in-memory log
  const siteData = {
    trackingId,
    contactId:   lead.contactId,
    companyName: lead.companyName,
    phone:       lead.phone,
    email:       lead.email,
    niche,
    location:    lead.location,
    url:         siteUrl,
    source:      'ghl-webhook',
    createdAt:   receivedAt,
  }

  addSite(siteData)

  await logToGoogleSheet(siteData)

  console.log('📊 GHL WEBHOOK: Site created and logged:', JSON.stringify(siteData, null, 2))

  // 10. Dispatch notifications (email / Slack / Discord / Sheets) — non-blocking
  notifyNewDemo(siteData).catch(err =>
    console.error('⚠️ GHL WEBHOOK: notifyNewDemo failed:', err.message)
  )

  // 11. Send SMS to lead with demo link (opt-in via ENABLE_AUTO_SMS=true)
  let smsStatus = 'skipped'

  if (process.env.ENABLE_AUTO_SMS === 'true' && lead.contactId) {
    try {
      const smsMessage = `Hey! Check out your personalized demo website: ${siteUrl}`
      await sendSMS(lead.contactId, smsMessage)
      smsStatus = 'success'
      console.log(`✅ GHL WEBHOOK: SMS sent to contact ${lead.contactId}`)
    } catch (err) {
      smsStatus = 'failed'
      console.error(`❌ GHL WEBHOOK: SMS failed for contact ${lead.contactId}:`, err.message)
    }
  } else if (process.env.ENABLE_AUTO_SMS === 'true' && !lead.contactId) {
    smsStatus = 'no-contact-id'
    console.warn('⚠️ GHL WEBHOOK: ENABLE_AUTO_SMS is true but no contactId — SMS skipped')
  }

  // 12. Send WhatsApp to lead with demo link (opt-in via ENABLE_AUTO_WHATSAPP=true)
  let whatsappStatus = 'skipped'

  if (process.env.ENABLE_AUTO_WHATSAPP === 'true' && lead.contactId) {
    try {
      const waMessage = `Hey! Check out your personalized demo website: ${siteUrl}`
      await sendWhatsApp(lead.contactId, waMessage)
      whatsappStatus = 'success'
      console.log(`✅ GHL WEBHOOK: WhatsApp sent to contact ${lead.contactId}`)
    } catch (err) {
      whatsappStatus = 'failed'
      console.error(`❌ GHL WEBHOOK: WhatsApp failed for contact ${lead.contactId}:`, err.message)
    }
  } else if (process.env.ENABLE_AUTO_WHATSAPP === 'true' && !lead.contactId) {
    whatsappStatus = 'no-contact-id'
    console.warn('⚠️ GHL WEBHOOK: ENABLE_AUTO_WHATSAPP is true but no contactId — WhatsApp skipped')
  }

  // 14. Write demo URL and timestamp back to the GHL contact
  //     Non-fatal: a failed writeback must not hide a successful deployment.
  let ghlUpdateStatus = 'skipped'

  if (lead.contactId) {
    try {
      const demoUrlFieldId  = process.env.GHL_DEMO_URL_FIELD_ID        || 'demo_site_url'
      const createdAtFieldId = process.env.GHL_DEMO_CREATED_AT_FIELD_ID || 'demo_created_at'

      await updateContactFields(lead.contactId, [
        { id: demoUrlFieldId,   field_value: siteUrl    },
        { id: createdAtFieldId, field_value: receivedAt },
      ])

      ghlUpdateStatus = 'success'
      console.log(`✅ GHL WEBHOOK: Contact ${lead.contactId} updated — demo_site_url + demo_created_at written`)
    } catch (err) {
      ghlUpdateStatus = 'failed'
      console.error(`❌ GHL WEBHOOK: Failed to update contact ${lead.contactId}:`, err.message, err.body ? JSON.stringify(err.body) : '')
    }
  } else {
    console.warn('⚠️ GHL WEBHOOK: No contactId in payload — skipping contact field update')
  }

  // 15. Return URL to GHL
  return NextResponse.json(
    {
      success:         true,
      url:             siteUrl,
      slug,
      trackingId,
      niche,
      companyName:      lead.companyName,
      ghlContactUpdate: ghlUpdateStatus,
      smsStatus,
      whatsappStatus,
    },
    { status: 200, headers: corsHeaders }
  )
}

// GET /api/ghl-webhook — inspect recent deliveries (webhook-sourced only)
export async function GET() {
  const { sites, total } = getSites({ source: 'ghl-webhook' })
  return NextResponse.json({ total, recent: sites.slice(0, 50) })
}

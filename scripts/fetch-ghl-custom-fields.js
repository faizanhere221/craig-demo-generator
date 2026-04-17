#!/usr/bin/env node
/**
 * scripts/fetch-ghl-custom-fields.js
 *
 * Fetches and displays all custom fields from your GHL location.
 * Use this to find the correct field IDs to set in your env vars.
 *
 * Usage:
 *   node --env-file=.env.local scripts/fetch-ghl-custom-fields.js
 *
 * Required env vars:
 *   GHL_API_KEY       — GHL private integration token
 *   GHL_LOCATION_ID   — GHL location / sub-account ID
 */

import { getCustomFields } from '../lib/ghl-api.js'

const FIELDS_OF_INTEREST = ['demo', 'site', 'url', 'created']

async function main() {
  console.log('━'.repeat(60))
  console.log('  GHL Custom Fields Inspector')
  console.log('━'.repeat(60))

  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    console.error('\n❌ Missing env vars. Run with:\n')
    console.error('   node --env-file=.env.local scripts/fetch-ghl-custom-fields.js\n')
    process.exit(1)
  }

  let fields
  try {
    fields = await getCustomFields()
  } catch (err) {
    console.error('\n❌ Failed to fetch custom fields:', err.message)
    if (err.status) console.error('   HTTP status:', err.status)
    if (err.body)   console.error('   Response body:', JSON.stringify(err.body, null, 2))
    process.exit(1)
  }

  if (!fields.length) {
    console.log('\n⚠️  No custom fields found in this location.\n')
    return
  }

  // ── Full list ────────────────────────────────────────────────────────────────
  console.log(`\n  All fields (${fields.length} total)\n`)

  const colW = [36, 28, 20, 12]
  const header = [
    'ID (UUID)'.padEnd(colW[0]),
    'Name'.padEnd(colW[1]),
    'Key'.padEnd(colW[2]),
    'Type'.padEnd(colW[3]),
  ].join('  ')

  console.log('  ' + header)
  console.log('  ' + '─'.repeat(header.length))

  for (const f of fields) {
    const row = [
      (f.id        || '').padEnd(colW[0]),
      (f.name      || '').padEnd(colW[1]),
      (f.fieldKey  || f.key || '').padEnd(colW[2]),
      (f.dataType  || f.type || '').padEnd(colW[3]),
    ].join('  ')
    console.log('  ' + row)
  }

  // ── Fields likely related to demo URLs ──────────────────────────────────────
  const relevant = fields.filter(f => {
    const haystack = [f.name, f.fieldKey, f.key].join(' ').toLowerCase()
    return FIELDS_OF_INTEREST.some(kw => haystack.includes(kw))
  })

  if (relevant.length) {
    console.log('\n' + '━'.repeat(60))
    console.log('  Fields matching: ' + FIELDS_OF_INTEREST.join(', '))
    console.log('━'.repeat(60))
    for (const f of relevant) {
      console.log(`\n  Name    : ${f.name}`)
      console.log(`  ID      : ${f.id}`)
      console.log(`  Key     : ${f.fieldKey || f.key || '—'}`)
      console.log(`  Type    : ${f.dataType || f.type || '—'}`)
    }
  }

  // ── Env var suggestions ──────────────────────────────────────────────────────
  console.log('\n' + '━'.repeat(60))
  console.log('  Suggested env vars')
  console.log('━'.repeat(60))

  const demoField = fields.find(f => {
    const h = [f.name, f.fieldKey, f.key].join(' ').toLowerCase()
    return h.includes('demo') && (h.includes('url') || h.includes('site'))
  })

  const createdField = fields.find(f => {
    const h = [f.name, f.fieldKey, f.key].join(' ').toLowerCase()
    return h.includes('demo') && h.includes('creat')
  })

  if (demoField) {
    console.log(`\n  GHL_DEMO_URL_FIELD_ID=${demoField.id}`)
    console.log(`  # "${demoField.name}" (${demoField.fieldKey || demoField.key || 'no key'})`)
  } else {
    console.log('\n  ⚠️  No demo URL field found — create one in GHL → Settings → Custom Fields')
    console.log('     then set: GHL_DEMO_URL_FIELD_ID=<uuid>')
  }

  if (createdField) {
    console.log(`\n  GHL_DEMO_CREATED_AT_FIELD_ID=${createdField.id}`)
    console.log(`  # "${createdField.name}" (${createdField.fieldKey || createdField.key || 'no key'})`)
  } else {
    console.log('\n  ℹ️  No demo created-at field found (optional)')
    console.log('     set: GHL_DEMO_CREATED_AT_FIELD_ID=<uuid> if you want timestamps written back')
  }

  console.log('\n' + '━'.repeat(60) + '\n')
}

main()

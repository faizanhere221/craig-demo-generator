import { NextResponse } from 'next/server'
import { generateSiteHTML } from '@/lib/generate-html'
import { generateCustomContent } from '@/lib/claude-api'
import { logToGoogleSheet } from '@/lib/google-sheets'
import { updateContactFields, sendWhatsApp, sendSMS } from '@/lib/ghl-api'
import { addSite } from '@/lib/site-store'
import { notifyNewDemo } from '@/lib/notifications'
import {
  getNextPending,
  updateStatus,
  getQueueStats,
  DAILY_LIMIT,
  PROCESSING_DELAY_MS,
} from '@/lib/queue-store'

// Optional: protect with the same webhook secret via Authorization header or ?secret= param
function isAuthorized(request) {
  const expectedSecret = process.env.GHL_WEBHOOK_SECRET
  if (!expectedSecret) return true // no secret configured → open

  const authHeader = request.headers.get('authorization') || ''
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  const querySecret = new URL(request.url).searchParams.get('secret')

  return bearer === expectedSecret || querySecret === expectedSecret
}

function generateTrackingId() {
  return Math.random().toString(36).substring(2, 8)
}

function buildSlug(businessName, trackingId) {
  const base = String(businessName || 'demo')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${base}-${trackingId}`
}

// GET /api/queue/process
// Processes ONE pending lead. Designed to be called by an external cron job.
export async function GET(request) {
  console.log('⚙️  QUEUE PROCESSOR: triggered')

  if (!isAuthorized(request)) {
    console.warn('🚫 QUEUE PROCESSOR: Unauthorized request')
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Get queue stats — check daily limit and delay
  const stats = await getQueueStats()
  if (!stats) {
    console.error('❌ QUEUE PROCESSOR: Could not fetch queue stats')
    return NextResponse.json({ success: false, error: 'Queue unavailable' }, { status: 503 })
  }

  if (!stats.available) {
    return NextResponse.json({
      success:  false,
      reason:   'queue-unavailable',
      message:  'GOOGLE_SHEET_WEBHOOK not configured',
    }, { status: 503 })
  }

  if (stats.remainingCapacity <= 0) {
    console.log(`🛑 QUEUE PROCESSOR: Daily limit reached (${stats.todayCount}/${DAILY_LIMIT})`)
    return NextResponse.json({
      success:         false,
      processed:       false,
      reason:          'daily-limit-reached',
      todayCount:      stats.todayCount,
      limit:           DAILY_LIMIT,
      stats,
    }, { status: 200 })
  }

  if (stats.lastProcessedAt) {
    const elapsed = Date.now() - new Date(stats.lastProcessedAt).getTime()
    if (elapsed < PROCESSING_DELAY_MS) {
      const waitMs = PROCESSING_DELAY_MS - elapsed
      const nextAt = new Date(Date.now() + waitMs).toISOString()
      console.log(`⏳ QUEUE PROCESSOR: Too soon — ${Math.ceil(waitMs / 1000)}s remaining before next lead`)
      return NextResponse.json({
        success:     false,
        processed:   false,
        reason:      'too-soon',
        waitSeconds: Math.ceil(waitMs / 1000),
        nextAt,
        stats,
      }, { status: 200 })
    }
  }

  // 2. Grab next pending lead (atomic: Apps Script marks it as 'processing' before returning)
  console.log('📥 QUEUE PROCESSOR: Fetching next pending lead...')
  const lead = await getNextPending()

  if (!lead) {
    console.log('💤 QUEUE PROCESSOR: No pending leads')
    return NextResponse.json({ success: true, processed: false, reason: 'no-pending-leads', stats }, { status: 200 })
  }

  console.log(`🚀 QUEUE PROCESSOR: Processing lead ${lead.id} — ${lead.businessName}`)

  const processedAt = new Date().toISOString()
  const trackingId  = generateTrackingId()
  const slug        = buildSlug(lead.businessName, trackingId)

  // 3. Generate custom content via Claude
  let customContent = null
  try {
    console.log(`🤖 QUEUE PROCESSOR [${lead.id}]: Generating custom content...`)
    customContent = await generateCustomContent({
      companyName: lead.businessName,
      niche:       lead.niche,
      location:    lead.location,
    })
    console.log(`✅ QUEUE PROCESSOR [${lead.id}]: Custom content ready: ${customContent.tagline}`)
  } catch (err) {
    console.error(`⚠️ QUEUE PROCESSOR [${lead.id}]: Claude failed, using defaults:`, err.message)
  }

  // 4. Generate HTML
  const html = generateSiteHTML({
    companyName:   String(lead.businessName  || ''),
    phone:         String(lead.phone         || ''),
    niche:         String(lead.niche         || ''),
    location:      String(lead.location      || ''),
    trackingId,
    instagramUrl:  lead.instagramUrl  ? String(lead.instagramUrl)  : null,
    googleMapsUrl: lead.googleMapsUrl ? String(lead.googleMapsUrl) : null,
    customContent,
  })

  // 5. Deploy to Vercel
  let siteUrl
  try {
    console.log(`🌐 QUEUE PROCESSOR [${lead.id}]: Deploying to Vercel (slug: ${slug})...`)
    const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        name:   slug,
        target: 'production',
        files: [{
          file:     'index.html',
          data:     Buffer.from(html).toString('base64'),
          encoding: 'base64',
        }],
        projectSettings: { framework: null },
      }),
    })

    if (!deployRes.ok) {
      const errData = await deployRes.json()
      throw new Error(`Vercel deploy failed: ${errData.error?.message || deployRes.status}`)
    }

    const deployData = await deployRes.json()
    siteUrl = `https://${deployData.url}`
    console.log(`🚀 QUEUE PROCESSOR [${lead.id}]: Site deployed → ${siteUrl}`)
  } catch (err) {
    console.error(`❌ QUEUE PROCESSOR [${lead.id}]: Deployment failed:`, err.message)
    await updateStatus(lead.id, 'failed', { processedAt, error: err.message })
    return NextResponse.json({
      success:   false,
      processed: false,
      reason:    'deployment-failed',
      leadId:    lead.id,
      error:     err.message,
    }, { status: 500 })
  }

  // 6. Persist to Google Sheet and in-memory log
  const siteData = {
    trackingId,
    contactId:   lead.contactId,
    companyName: lead.businessName,
    phone:       lead.phone,
    email:       lead.email || '',
    niche:       lead.niche,
    location:    lead.location,
    url:         siteUrl,
    source:      'ghl-webhook-queue',
    createdAt:   lead.createdAt || processedAt,
  }

  addSite(siteData)

  await logToGoogleSheet(siteData)
  console.log(`📊 QUEUE PROCESSOR [${lead.id}]: Logged to Google Sheet`)

  // 7. Notifications — non-blocking
  notifyNewDemo(siteData).catch(err =>
    console.error(`⚠️ QUEUE PROCESSOR [${lead.id}]: notifyNewDemo failed:`, err.message)
  )

  // 8. Send SMS (if enabled)
  let smsStatus = 'skipped'
  if (process.env.ENABLE_AUTO_SMS === 'true' && lead.contactId) {
    try {
      await sendSMS(lead.contactId, `Hey! Check out your personalized demo website: ${siteUrl}`)
      smsStatus = 'success'
      console.log(`✅ QUEUE PROCESSOR [${lead.id}]: SMS sent to ${lead.contactId}`)
    } catch (err) {
      smsStatus = 'failed'
      console.error(`❌ QUEUE PROCESSOR [${lead.id}]: SMS failed:`, err.message)
    }
  } else if (process.env.ENABLE_AUTO_SMS === 'true' && !lead.contactId) {
    smsStatus = 'no-contact-id'
  }

  // 9. Send WhatsApp (if enabled)
  let whatsappStatus = 'skipped'
  if (process.env.ENABLE_AUTO_WHATSAPP === 'true' && lead.contactId) {
    try {
      await sendWhatsApp(lead.contactId, `Hey! 👋 We just created a personalized demo website for your business: ${siteUrl} - Let us know what you think!`)
      whatsappStatus = 'success'
      console.log(`✅ QUEUE PROCESSOR [${lead.id}]: WhatsApp sent to ${lead.contactId}`)
    } catch (err) {
      whatsappStatus = 'failed'
      console.error(`❌ QUEUE PROCESSOR [${lead.id}]: WhatsApp failed:`, err.message)
    }
  } else if (process.env.ENABLE_AUTO_WHATSAPP === 'true' && !lead.contactId) {
    whatsappStatus = 'no-contact-id'
  }

  // 10. Update GHL contact fields
  let ghlUpdateStatus = 'skipped'
  if (lead.contactId) {
    try {
      const demoUrlFieldId   = process.env.GHL_DEMO_URL_FIELD_ID        || 'demo_site_url'
      const createdAtFieldId = process.env.GHL_DEMO_CREATED_AT_FIELD_ID || 'demo_created_at'
      await updateContactFields(lead.contactId, [
        { id: demoUrlFieldId,   field_value: siteUrl     },
        { id: createdAtFieldId, field_value: processedAt },
      ])
      ghlUpdateStatus = 'success'
      console.log(`✅ QUEUE PROCESSOR [${lead.id}]: GHL contact ${lead.contactId} updated`)
    } catch (err) {
      ghlUpdateStatus = 'failed'
      console.error(`❌ QUEUE PROCESSOR [${lead.id}]: GHL update failed:`, err.message)
    }
  }

  // 11. Mark queue entry as completed — CRITICAL: if this fails the lead will
  //     stay as 'processing' and be re-processed after the 10-min stuck-row reset.
  const marked = await updateStatus(lead.id, 'completed', { processedAt, demoUrl: siteUrl })
  if (!marked) {
    console.error(`🚨 QUEUE PROCESSOR: FAILED to mark ${lead.id} as completed in Google Sheets!`)
    console.error('   The lead will be reprocessed after the 10-minute stuck-row timeout.')
    console.error('   Check that your Apps Script has SpreadsheetApp.flush() and is redeployed.')
  } else {
    console.log(`✅ QUEUE PROCESSOR: Completed lead ${lead.id} → ${siteUrl}`)
  }

  return NextResponse.json({
    success:         true,
    processed:       true,
    leadId:          lead.id,
    businessName:    lead.businessName,
    demoUrl:         siteUrl,
    trackingId,
    niche:           lead.niche,
    smsStatus,
    whatsappStatus,
    ghlContactUpdate: ghlUpdateStatus,
    processedAt,
    dailyRemaining:  stats.remainingCapacity - 1,
  }, { status: 200 })
}

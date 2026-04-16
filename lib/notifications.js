/**
 * Notification dispatcher for new demo site events.
 *
 * Channels are opt-in via environment variables — any combination can be active
 * at once. A channel that is not configured is silently skipped. A channel that
 * fails does not block the others.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Channel         │ Env var(s) required                                   │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ Email           │ NOTIFY_EMAIL_WEBHOOK  (Resend / SendGrid webhook URL) │
 * │                 │ NOTIFY_EMAIL_TO       (recipient address)             │
 * │                 │ NOTIFY_EMAIL_FROM     (sender address, optional)      │
 * │ Slack           │ NOTIFY_SLACK_WEBHOOK  (Incoming Webhook URL)          │
 * │ Discord         │ NOTIFY_DISCORD_WEBHOOK (Webhook URL)                  │
 * │ Google Sheets   │ GOOGLE_SHEET_WEBHOOK  (already used by generate flow) │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * GHL contact deep-link format:
 *   https://app.gohighlevel.com/contacts/<contactId>
 *   Override base URL with GHL_APP_BASE_URL for white-label installs.
 */

import { logToGoogleSheet } from '@/lib/google-sheets'

// ── Helpers ────────────────────────────────────────────────────────────────────

const GHL_APP_BASE = process.env.GHL_APP_BASE_URL || 'https://app.gohighlevel.com'

/**
 * Build the canonical notification payload from raw demo data.
 * Normalises field names so callers don't have to worry about
 * whether they're coming from the webhook or the generate route.
 *
 * @param {object} demoData
 * @returns {object} Normalised notification payload
 */
function buildPayload(demoData) {
  const contactId = demoData.contactId || demoData.contact_id || null

  return {
    businessName:   demoData.companyName  || demoData.business_name || 'Unknown',
    location:       demoData.location     || '',
    templateUsed:   demoData.niche        || 'unknown',
    demoUrl:        demoData.url          || demoData.demoUrl        || '',
    trackingId:     demoData.trackingId   || '',
    phone:          demoData.phone        || '',
    email:          demoData.email        || '',
    timestamp:      demoData.createdAt    || new Date().toISOString(),
    source:         demoData.source       || 'manual',
    ghlContactLink: contactId
      ? `${GHL_APP_BASE}/contacts/${contactId}`
      : null,
  }
}

/**
 * Fire-and-forget wrapper: runs fn(), returns { ok, error }.
 * Never throws.
 */
async function attempt(label, fn) {
  try {
    await fn()
    return { ok: true }
  } catch (err) {
    console.error(`❌ NOTIFY [${label}]:`, err.message)
    return { ok: false, error: err.message }
  }
}

// ── Channel implementations ────────────────────────────────────────────────────

/**
 * Email channel via a generic webhook (Resend, SendGrid, Mailgun, etc.).
 *
 * The webhook receives a JSON POST with `to`, `from`, `subject`, and `html`.
 * Configure your email provider to accept this shape, or adapt the body below.
 */
async function sendEmailNotification(payload) {
  const webhookUrl = process.env.NOTIFY_EMAIL_WEBHOOK
  const to         = process.env.NOTIFY_EMAIL_TO
  if (!webhookUrl || !to) return

  const from    = process.env.NOTIFY_EMAIL_FROM || 'demos@optimo.agency'
  const subject = `New Demo Created — ${payload.businessName} (${payload.location})`

  const html = `
<h2 style="margin:0 0 16px">New Demo Site Generated</h2>
<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:8px;color:#666;width:160px">Business</td>
      <td style="padding:8px;font-weight:600">${payload.businessName}</td></tr>
  <tr style="background:#f9f9f9">
      <td style="padding:8px;color:#666">Location</td>
      <td style="padding:8px">${payload.location}</td></tr>
  <tr><td style="padding:8px;color:#666">Template</td>
      <td style="padding:8px">${payload.templateUsed}</td></tr>
  <tr style="background:#f9f9f9">
      <td style="padding:8px;color:#666">Phone</td>
      <td style="padding:8px">${payload.phone || '—'}</td></tr>
  <tr><td style="padding:8px;color:#666">Demo URL</td>
      <td style="padding:8px">
        <a href="${payload.demoUrl}" style="color:#3b82f6">${payload.demoUrl}</a>
      </td></tr>
  <tr style="background:#f9f9f9">
      <td style="padding:8px;color:#666">GHL Contact</td>
      <td style="padding:8px">
        ${payload.ghlContactLink
          ? `<a href="${payload.ghlContactLink}" style="color:#3b82f6">Open in GHL</a>`
          : '—'}
      </td></tr>
  <tr><td style="padding:8px;color:#666">Created At</td>
      <td style="padding:8px">${new Date(payload.timestamp).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</td></tr>
  <tr style="background:#f9f9f9">
      <td style="padding:8px;color:#666">Source</td>
      <td style="padding:8px">${payload.source}</td></tr>
</table>
<p style="margin:24px 0 0;font-size:12px;color:#999">
  Tracking ID: ${payload.trackingId} · Optimo Demo Generator
</p>`.trim()

  const response = await fetch(webhookUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ to, from, subject, html }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.status)
    throw new Error(`Email webhook returned ${response.status}: ${text}`)
  }

  console.log(`✅ NOTIFY [email]: sent to ${to}`)
}

/**
 * Slack channel via Incoming Webhooks.
 * https://api.slack.com/messaging/webhooks
 */
async function sendSlackNotification(payload) {
  const webhookUrl = process.env.NOTIFY_SLACK_WEBHOOK
  if (!webhookUrl) return

  const contactField = payload.ghlContactLink
    ? `<${payload.ghlContactLink}|Open in GHL>`
    : '—'

  const body = {
    text: `New demo created for *${payload.businessName}*`,
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: '🚀 New Demo Site Generated', emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Business*\n${payload.businessName}`       },
          { type: 'mrkdwn', text: `*Location*\n${payload.location || '—'}`    },
          { type: 'mrkdwn', text: `*Template*\n${payload.templateUsed}`       },
          { type: 'mrkdwn', text: `*Phone*\n${payload.phone || '—'}`          },
          { type: 'mrkdwn', text: `*GHL Contact*\n${contactField}`            },
          { type: 'mrkdwn', text: `*Source*\n${payload.source}`               },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Demo URL*\n<${payload.demoUrl}|${payload.demoUrl}>` },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Tracking ID: \`${payload.trackingId}\` · ${new Date(payload.timestamp).toISOString()}`,
          },
        ],
      },
    ],
  }

  const response = await fetch(webhookUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => response.status)
    throw new Error(`Slack webhook returned ${response.status}: ${text}`)
  }

  console.log('✅ NOTIFY [slack]: message sent')
}

/**
 * Discord channel via Webhook.
 * https://discord.com/developers/docs/resources/webhook
 */
async function sendDiscordNotification(payload) {
  const webhookUrl = process.env.NOTIFY_DISCORD_WEBHOOK
  if (!webhookUrl) return

  const body = {
    username:   'Optimo Demo Generator',
    avatar_url: 'https://optimo.agency/favicon.ico',
    embeds: [
      {
        title:       '🚀 New Demo Site Generated',
        color:       0x3b82f6, // blue
        url:         payload.demoUrl,
        fields: [
          { name: 'Business',    value: payload.businessName,        inline: true  },
          { name: 'Location',    value: payload.location || '—',     inline: true  },
          { name: 'Template',    value: payload.templateUsed,        inline: true  },
          { name: 'Phone',       value: payload.phone || '—',        inline: true  },
          { name: 'Source',      value: payload.source,              inline: true  },
          {
            name:   'GHL Contact',
            value:  payload.ghlContactLink
                      ? `[Open in GHL](${payload.ghlContactLink})`
                      : '—',
            inline: true,
          },
          { name: 'Demo URL',    value: payload.demoUrl,             inline: false },
        ],
        footer: { text: `Tracking ID: ${payload.trackingId} · Optimo` },
        timestamp: payload.timestamp,
      },
    ],
  }

  const response = await fetch(webhookUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  })

  // Discord returns 204 No Content on success
  if (response.status !== 204 && !response.ok) {
    const text = await response.text().catch(() => response.status)
    throw new Error(`Discord webhook returned ${response.status}: ${text}`)
  }

  console.log('✅ NOTIFY [discord]: message sent')
}

/**
 * Google Sheets channel — delegates to the existing logToGoogleSheet helper.
 * Runs unconditionally if GOOGLE_SHEET_WEBHOOK is set (that env var is already
 * checked inside logToGoogleSheet itself).
 */
async function sendSheetsNotification(payload) {
  await logToGoogleSheet({
    trackingId:  payload.trackingId,
    companyName: payload.businessName,
    phone:       payload.phone,
    niche:       payload.templateUsed,
    location:    payload.location,
    url:         payload.demoUrl,
    createdAt:   payload.timestamp,
  })
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Dispatch new-demo notifications across all configured channels.
 *
 * All channels run concurrently. A failure in one channel does not block
 * the others. Returns a results map so callers can log or inspect outcomes.
 *
 * @param {object} demoData  — Raw site data from the generate/webhook flow
 * @returns {Promise<object>} Channel results: { email, slack, discord, sheets }
 */
export async function notifyNewDemo(demoData) {
  const payload = buildPayload(demoData)

  console.log(`📣 NOTIFY: Dispatching new-demo notifications for "${payload.businessName}"`)

  const [email, slack, discord, sheets] = await Promise.all([
    attempt('email',   () => sendEmailNotification(payload)),
    attempt('slack',   () => sendSlackNotification(payload)),
    attempt('discord', () => sendDiscordNotification(payload)),
    attempt('sheets',  () => sendSheetsNotification(payload)),
  ])

  const results = { email, slack, discord, sheets }

  const active  = Object.entries(results).filter(([, r]) => r.ok              ).map(([k]) => k)
  const failed  = Object.entries(results).filter(([, r]) => r.ok === false    ).map(([k]) => k)
  const skipped = Object.entries(results).filter(([, r]) => r.ok === undefined).map(([k]) => k)

  if (active.length)  console.log(`✅ NOTIFY: Sent via [${active.join(', ')}]`)
  if (failed.length)  console.warn(`⚠️ NOTIFY: Failed  [${failed.join(', ')}]`)
  if (skipped.length) console.log(`⏭️  NOTIFY: Skipped [${skipped.join(', ')}] (not configured)`)

  return results
}

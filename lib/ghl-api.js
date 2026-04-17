/**
 * GoHighLevel API v2 Integration
 *
 * Handles contact lookups, custom field updates, and SMS sending.
 *
 * Required environment variables:
 *   GHL_API_KEY      — GHL private integration token (Settings → Integrations → API Keys)
 *   GHL_LOCATION_ID  — Location / sub-account ID (Settings → Business Profile)
 *
 * Optional environment variables:
 *   GHL_DEMO_URL_FIELD_ID — Custom field ID for storing the demo URL on a contact.
 *                           Find it in GHL → Settings → Custom Fields.
 *                           Falls back to key-based lookup if omitted.
 */

const GHL_BASE = 'https://services.leadconnectorhq.com'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 500 // doubled on each attempt

// ── Internal helpers ───────────────────────────────────────────────────────────

function getCredentials() {
  const apiKey     = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID

  if (!apiKey)     throw new Error('GHL_API_KEY environment variable is not set')
  if (!locationId) throw new Error('GHL_LOCATION_ID environment variable is not set')

  return { apiKey, locationId }
}

function authHeaders(apiKey) {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type':  'application/json',
    'Version':       '2021-07-28',  // GHL API v2 version header
  }
}

/**
 * Fetch wrapper with exponential-backoff retry.
 * Retries on network errors and 429 / 5xx responses.
 */
async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  let lastError
  let delay = RETRY_DELAY_MS

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options)

      // Retryable HTTP status codes
      if ((response.status === 429 || response.status >= 500) && attempt < retries) {
        const retryAfter = response.headers.get('retry-after')
        const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay
        console.warn(`⚠️ GHL API: ${response.status} on attempt ${attempt}/${retries} — retrying in ${waitMs}ms`)
        await sleep(waitMs)
        delay *= 2
        continue
      }

      return response
    } catch (err) {
      lastError = err
      if (attempt < retries) {
        console.warn(`⚠️ GHL API: Network error on attempt ${attempt}/${retries} — retrying in ${delay}ms:`, err.message)
        await sleep(delay)
        delay *= 2
      }
    }
  }

  throw lastError || new Error('GHL API request failed after all retries')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Parse a GHL API response, throwing a descriptive error on non-2xx status.
 */
async function parseResponse(response, context) {
  const rawText = await response.text()

  let body
  try {
    body = JSON.parse(rawText)
  } catch {
    body = null
  }

  if (!response.ok) {
    console.error(
      `❌ GHL API error in ${context}: HTTP ${response.status}\n` +
      `   Raw response body: ${rawText}`
    )
    const message = body?.message || body?.error || `HTTP ${response.status}`
    const err = new Error(`GHL API error in ${context}: ${message}`)
    err.status = response.status
    err.body   = body
    throw err
  }

  return body
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Fetch a contact by ID.
 *
 * @param {string} contactId
 * @returns {Promise<object>} GHL contact object
 */
export async function getContact(contactId) {
  if (!contactId) throw new Error('getContact: contactId is required')

  const { apiKey } = getCredentials()

  console.log(`📋 GHL API: Fetching contact ${contactId}`)

  const response = await fetchWithRetry(
    `${GHL_BASE}/contacts/${contactId}`,
    { method: 'GET', headers: authHeaders(apiKey) }
  )

  const data = await parseResponse(response, 'getContact')

  // GHL v2 wraps the contact under a "contact" key
  const contact = data.contact ?? data
  console.log(`✅ GHL API: Contact fetched — ${contact.firstName || ''} ${contact.lastName || ''}`.trim())
  return contact
}

/**
 * Update one or more custom fields on a contact in a single API call.
 *
 * @param {string} contactId
 * @param {Array<{id: string, field_value: string}>} fields
 *   Each entry's `id` may be the field's UUID or its key name.
 * @returns {Promise<object>} Updated contact object
 */
export async function updateContactFields(contactId, fields) {
  if (!contactId)         throw new Error('updateContactFields: contactId is required')
  if (!fields?.length)    throw new Error('updateContactFields: fields array must not be empty')

  const { apiKey } = getCredentials()

  console.log(`✏️  GHL API: Updating ${fields.length} custom field(s) on contact ${contactId}`)
  console.log(`   Request body: ${JSON.stringify({ customFields: fields })}`)

  const response = await fetchWithRetry(
    `${GHL_BASE}/contacts/${contactId}`,
    {
      method:  'PUT',
      headers: authHeaders(apiKey),
      body:    JSON.stringify({ customFields: fields }),
    }
  )
  console.log(`   Response status: ${response.status}`)

  const data = await parseResponse(response, 'updateContactFields')

  console.log(`✅ GHL API: Custom fields updated on contact ${contactId}:`, fields.map(f => f.id).join(', '))
  return data.contact ?? data
}

/**
 * List all custom fields for the configured GHL location.
 *
 * @returns {Promise<Array<{id: string, name: string, fieldKey: string, dataType: string}>>}
 */
export async function getCustomFields() {
  const { apiKey, locationId } = getCredentials()

  console.log(`📋 GHL API: Fetching custom fields for location ${locationId}`)

  const response = await fetchWithRetry(
    `${GHL_BASE}/locations/${locationId}/customFields`,
    { method: 'GET', headers: authHeaders(apiKey) }
  )

  const data = await parseResponse(response, 'getCustomFields')

  // GHL v2 returns { customFields: [...] }
  const fields = data.customFields ?? data
  console.log(`✅ GHL API: Found ${fields.length} custom field(s)`)
  return fields
}

/**
 * Convenience wrapper: update the demo site URL custom field on a contact.
 *
 * Set GHL_DEMO_URL_FIELD_ID to the field's UUID from GHL → Settings → Custom Fields.
 * Falls back to the key name "demo_site_url" if the env var is not set.
 *
 * @param {string} contactId
 * @param {string} demoUrl
 * @returns {Promise<object>} Updated contact object
 */
export async function updateContactDemoUrl(contactId, demoUrl) {
  if (!contactId) throw new Error('updateContactDemoUrl: contactId is required')
  if (!demoUrl)   throw new Error('updateContactDemoUrl: demoUrl is required')

  const fieldId = process.env.GHL_DEMO_URL_FIELD_ID || 'demo_site_url'
  return updateContactFields(contactId, [{ id: fieldId, field_value: demoUrl }])
}

/**
 * Send an SMS to a contact via GHL Conversations API.
 *
 * @param {string} contactId  — GHL contact ID (recipient)
 * @param {string} message    — Plain-text SMS body
 * @returns {Promise<object>} GHL message/conversation object
 */
export async function sendSMS(contactId, message) {
  if (!contactId) throw new Error('sendSMS: contactId is required')
  if (!message)   throw new Error('sendSMS: message is required')

  const { apiKey, locationId } = getCredentials()

  const body = {
    type:      'SMS',
    contactId,
    locationId,
    message,
  }

  console.log(`📱 GHL API: Sending SMS to contact ${contactId}`)

  const response = await fetchWithRetry(
    `${GHL_BASE}/conversations/messages`,
    {
      method:  'POST',
      headers: authHeaders(apiKey),
      body:    JSON.stringify(body),
    }
  )

  const data = await parseResponse(response, 'sendSMS')

  console.log(`✅ GHL API: SMS sent to contact ${contactId} — messageId:`, data.messageId ?? data.id ?? 'n/a')
  return data
}

/**
 * Send a WhatsApp message to a contact via GHL Conversations API.
 * Requires the GHL sub-account to have WhatsApp configured.
 *
 * @param {string} contactId  — GHL contact ID (recipient)
 * @param {string} message    — Plain-text message body
 * @returns {Promise<object>} GHL message/conversation object
 */
export async function sendWhatsApp(contactId, message) {
  if (!contactId) throw new Error('sendWhatsApp: contactId is required')
  if (!message)   throw new Error('sendWhatsApp: message is required')

  const { apiKey, locationId } = getCredentials()

  const body = {
    type:      'WhatsApp',
    contactId,
    locationId,
    message,
  }

  console.log(`💬 GHL API: Sending WhatsApp to contact ${contactId}`)

  const response = await fetchWithRetry(
    `${GHL_BASE}/conversations/messages`,
    {
      method:  'POST',
      headers: authHeaders(apiKey),
      body:    JSON.stringify(body),
    }
  )

  const data = await parseResponse(response, 'sendWhatsApp')

  console.log(`✅ GHL API: WhatsApp sent to contact ${contactId} — messageId:`, data.messageId ?? data.id ?? 'n/a')
  return data
}

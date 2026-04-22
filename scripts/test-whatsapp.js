import { sendWhatsApp } from '../lib/ghl-api.js'

const contactId = process.argv[2]

if (!contactId) {
  console.error('Usage: node --env-file=.env.local scripts/test-whatsapp.js <contactId>')
  process.exit(1)
}

console.log(`💬 Sending test WhatsApp to contact: ${contactId}`)

try {
  const result = await sendWhatsApp(
    contactId,
    "Hey! 👋 This is a test message from the Demo Site Generator. If you received this, WhatsApp integration is working!"
  )
  console.log('✅ WhatsApp sent successfully!')
  console.log('   Message ID:', result.messageId ?? result.id ?? 'n/a')
  console.log('   Full response:', JSON.stringify(result, null, 2))
} catch (err) {
  console.error('❌ WhatsApp send failed:', err.message)
  if (err.body) console.error('   GHL error body:', JSON.stringify(err.body, null, 2))
  process.exit(1)
}

/**
 * Claude API Integration for Custom Content Generation
 * 
 * Generates personalized content for each demo site:
 * - Custom tagline
 * - About Us text
 * - Service descriptions
 * 
 * Cost: ~$0.01 per site
 */

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

export async function generateCustomContent({ companyName, niche, location }) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  
  // If no API key, return default content
  if (!apiKey) {
    console.log('⚠️ No ANTHROPIC_API_KEY - using default content')
    return getDefaultContent(companyName, niche, location)
  }

  const nicheTitle = niche.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  const prompt = `Generate website content for a ${nicheTitle} business.

Business: ${companyName}
Location: ${location}
Industry: ${nicheTitle}

Generate the following in JSON format:
{
  "tagline": "A catchy 5-8 word tagline for the hero section",
  "aboutText": "2-3 sentences about the company (professional, local focus, trustworthy)",
  "uniqueValue": "One sentence about what makes them different"
}

Requirements:
- Sound professional and local
- Mention ${location} naturally
- Focus on trust, quality, experience
- Keep it concise

Return ONLY the JSON, no other text.`

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    })

    if (!response.ok) {
      console.error('Claude API error:', response.status)
      return getDefaultContent(companyName, niche, location)
    }

    const data = await response.json()
    const content = data.content[0].text

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        tagline: parsed.tagline || getDefaultContent(companyName, niche, location).tagline,
        aboutText: parsed.aboutText || getDefaultContent(companyName, niche, location).aboutText,
        uniqueValue: parsed.uniqueValue || ''
      }
    }

    return getDefaultContent(companyName, niche, location)

  } catch (error) {
    console.error('Claude API error:', error)
    return getDefaultContent(companyName, niche, location)
  }
}

function getDefaultContent(companyName, niche, location) {
  const nicheTitle = niche.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const taglines = {
    roofer: `Quality Roofing You Can Trust`,
    painter: `Transform Your Space With Color`,
    builder: `Building Dreams Into Reality`,
    renovation: `Renovations Done Right`,
    landscaper: `Creating Beautiful Outdoor Spaces`
  }

  const aboutTexts = {
    roofer: `${companyName} has been providing quality roofing services to ${location} and surrounding areas. Our experienced team delivers reliable repairs, installations, and restorations with workmanship you can trust.`,
    painter: `${companyName} brings color and life to homes across ${location}. From interior refreshes to complete exterior transformations, we deliver flawless finishes every time.`,
    builder: `${companyName} is ${location}'s trusted building partner. We bring your vision to life with quality construction, transparent communication, and attention to detail.`,
    renovation: `${companyName} specializes in transforming homes throughout ${location}. From kitchens to bathrooms, we deliver stunning renovations that add value and beauty to your property.`,
    landscaper: `${companyName} creates beautiful outdoor spaces for ${location} homeowners. From garden design to complete landscaping transformations, we bring your outdoor vision to life.`
  }

  return {
    tagline: taglines[niche] || `Quality ${nicheTitle} You Can Trust`,
    aboutText: aboutTexts[niche] || `${companyName} provides professional ${nicheTitle.toLowerCase()} services in ${location}. Our experienced team is committed to quality workmanship and customer satisfaction.`,
    uniqueValue: `Trusted by hundreds of ${location} homeowners.`
  }
}

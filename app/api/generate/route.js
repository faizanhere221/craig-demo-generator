import { NextResponse } from 'next/server'
import { generateSiteHTML } from '@/lib/generate-html'
import { generateCustomContent } from '@/lib/claude-api'
import { logToGoogleSheet } from '@/lib/google-sheets'
import { addSite, getSites } from '@/lib/site-store'

// Generate short unique ID
function generateTrackingId() {
  return Math.random().toString(36).substring(2, 8)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { companyName, phone, niche, location, instagramUrl, googleMapsUrl } = body

    // Validate inputs
    if (!companyName || !phone || !niche || !location) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Generate unique tracking ID
    const trackingId = generateTrackingId()

    // Create slug for URL
    const baseSlug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const slug = `${baseSlug}-${trackingId}`

    // Generate custom content with Claude API (optional)
    console.log('🤖 Generating custom content with Claude...')
    const customContent = await generateCustomContent({ 
      companyName, 
      niche, 
      location 
    })
    console.log('✅ Custom content generated:', customContent.tagline)

    // Generate HTML with tracking and custom content
    const html = generateSiteHTML({ 
      companyName, 
      phone, 
      niche, 
      location,
      trackingId,
      instagramUrl: instagramUrl || null,
      googleMapsUrl: googleMapsUrl || null,
      customContent
    })

    // Deploy to Vercel using their API
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
        projectSettings: {
          framework: null,
        },
      }),
    })

    if (!deployResponse.ok) {
      const errorData = await deployResponse.json()
      console.error('Vercel deployment error:', errorData)
      throw new Error('Failed to deploy site')
    }

    const deployData = await deployResponse.json()
    const siteUrl = `https://${deployData.url}`

    // Site data for storage
    const siteData = {
      trackingId,
      companyName,
      phone,
      niche,
      location,
      url: siteUrl,
      createdAt: new Date().toISOString()
    }

    // Store in shared in-memory site store
    addSite(siteData)

    // Log to Google Sheet (permanent storage)
    await logToGoogleSheet(siteData)

    // Log the creation
    console.log('📊 SITE CREATED:', siteData)

    // Return the URL
    return NextResponse.json({
      success: true,
      url: siteUrl,
      slug: slug,
      trackingId: trackingId,
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate site' },
      { status: 500 }
    )
  }
}

// GET endpoint to list all generated sites
export async function GET() {
  const { sites, total } = getSites()
  return NextResponse.json({ total, sites })
}
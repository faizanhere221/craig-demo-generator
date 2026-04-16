import { NextResponse } from 'next/server'

/**
 * Google Reviews API
 * 
 * Fetches reviews from Google Places API
 * Max 5 reviews returned by Google (API limitation)
 * 
 * Usage: GET /api/reviews?placeId=ChIJ...
 * Or: GET /api/reviews?mapsUrl=https://maps.app.goo.gl/...
 */

// Extract Place ID from various Google Maps URL formats
function extractPlaceId(url) {
  if (!url) return null
  
  // Already a place ID
  if (url.startsWith('ChIJ') || url.startsWith('0x')) {
    return url
  }
  
  try {
    // Handle shortened URLs - we can't resolve these server-side easily
    // User should provide the full URL or Place ID
    if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
      return null // Need to expand short URL first
    }
    
    // Extract from full Google Maps URL
    // Format: /place/.../@.../data=...!1s0x...:0x...!
    const placeIdMatch = url.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/i)
    if (placeIdMatch) {
      return placeIdMatch[1]
    }
    
    // Format: place_id=ChIJ...
    const paramMatch = url.match(/place_id[=:]([A-Za-z0-9_-]+)/i)
    if (paramMatch) {
      return paramMatch[1]
    }
    
    // Format: /place/...?...
    // Try to find ChIJ pattern
    const chijMatch = url.match(/(ChIJ[A-Za-z0-9_-]+)/i)
    if (chijMatch) {
      return chijMatch[1]
    }
    
    return null
  } catch (e) {
    return null
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    let placeId = searchParams.get('placeId')
    const mapsUrl = searchParams.get('mapsUrl')
    const businessName = searchParams.get('businessName')
    const location = searchParams.get('location')
    
    // If mapsUrl provided, try to extract placeId
    if (!placeId && mapsUrl) {
      placeId = extractPlaceId(mapsUrl)
    }
    
    // If still no placeId but have businessName, search for it
    if (!placeId && businessName) {
      const searchResult = await searchForPlace(businessName, location)
      if (searchResult) {
        placeId = searchResult.place_id
      }
    }
    
    if (!placeId) {
      return NextResponse.json({
        error: 'Place ID required. Provide placeId, mapsUrl, or businessName parameter.',
        hint: 'Find Place ID at: https://developers.google.com/maps/documentation/places/web-service/place-id'
      }, { status: 400 })
    }
    
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    
    if (!apiKey) {
      // Return mock data if no API key (for development)
      return NextResponse.json({
        success: true,
        placeId,
        source: 'mock',
        place: {
          name: 'Demo Business',
          rating: 4.8,
          totalReviews: 47,
        },
        reviews: getMockReviews()
      })
    }
    
    // Fetch from Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status !== 'OK') {
      return NextResponse.json({
        error: `Google API error: ${data.status}`,
        message: data.error_message || 'Failed to fetch place details'
      }, { status: 400 })
    }
    
    const place = data.result
    
    // Format reviews for frontend
    const reviews = (place.reviews || []).map(review => ({
      author: review.author_name,
      authorPhoto: review.profile_photo_url,
      rating: review.rating,
      text: review.text,
      relativeTime: review.relative_time_description,
      time: review.time,
    }))
    
    return NextResponse.json({
      success: true,
      placeId,
      source: 'google',
      place: {
        name: place.name,
        rating: place.rating,
        totalReviews: place.user_ratings_total,
      },
      reviews
    })
    
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 })
  }
}

// Search for a place by name
async function searchForPlace(businessName, location) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return null
  
  try {
    const query = location ? `${businessName} ${location}` : businessName
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name&key=${apiKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      return data.candidates[0]
    }
    
    return null
  } catch (e) {
    console.error('Place search error:', e)
    return null
  }
}

// Mock reviews for development/demo
function getMockReviews() {
  return [
    {
      author: 'Sarah Mitchell',
      authorPhoto: null,
      rating: 5,
      text: 'Absolutely fantastic service! The team was professional, punctual, and the quality of work exceeded our expectations. Highly recommend to anyone looking for quality craftsmanship.',
      relativeTime: '2 weeks ago',
    },
    {
      author: 'James Cooper',
      authorPhoto: null,
      rating: 5,
      text: 'Great experience from start to finish. Clear communication, fair pricing, and excellent results. Will definitely use again for future projects.',
      relativeTime: '1 month ago',
    },
    {
      author: 'Michelle Taylor',
      authorPhoto: null,
      rating: 5,
      text: 'Very impressed with the attention to detail. The team went above and beyond to ensure everything was perfect. Professional and friendly service.',
      relativeTime: '1 month ago',
    },
    {
      author: 'David Chen',
      authorPhoto: null,
      rating: 4,
      text: 'Good quality work and reasonable prices. The project was completed on time and the team was easy to work with. Would recommend.',
      relativeTime: '2 months ago',
    },
    {
      author: 'Emma Wilson',
      authorPhoto: null,
      rating: 5,
      text: 'Outstanding results! The transformation was incredible. Thank you to the whole team for their hard work and dedication.',
      relativeTime: '3 months ago',
    },
  ]
}
import { NextResponse } from 'next/server'

// In-memory stores (persists until next deploy)
const viewLogs = []
const generatedSites = []

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    const logEntry = {
      ...data,
      receivedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    }
    
    // Log to console (visible in Vercel logs)
    console.log('📊 TRACKING EVENT:', JSON.stringify(logEntry, null, 2))
    
    // Store in memory
    viewLogs.push(logEntry)
    
    // Keep only last 1000 entries
    if (viewLogs.length > 1000) {
      viewLogs.shift()
    }
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
    
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ success: false }, { status: 200, headers: corsHeaders })
  }
}

// GET endpoint to view logs and stats
export async function GET() {
  // Group views by site ID
  const siteStats = {}
  viewLogs.forEach(log => {
    if (!siteStats[log.id]) {
      siteStats[log.id] = {
        id: log.id,
        views: 0,
        clicks: 0,
        firstView: log.timestamp,
        lastView: log.timestamp,
        devices: []
      }
    }
    siteStats[log.id].lastView = log.timestamp
    if (log.event === 'view') {
      siteStats[log.id].views++
      if (!siteStats[log.id].devices.includes(log.device)) {
        siteStats[log.id].devices.push(log.device)
      }
    }
    if (log.event === 'book_call_click' || log.event === 'phone_click') {
      siteStats[log.id].clicks++
    }
  })

  return NextResponse.json({
    total: viewLogs.length,
    sites: Object.values(siteStats),
    recent: viewLogs.slice(-50).reverse()
  }, { headers: corsHeaders })
}

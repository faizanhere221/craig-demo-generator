import { NextResponse } from 'next/server'
import { getSites } from '@/lib/site-store'

const GHL_APP_BASE = process.env.GHL_APP_BASE_URL || 'https://app.gohighlevel.com'

/**
 * GET /api/sites
 *
 * Query parameters (all optional):
 *   dateFrom   — ISO date string, e.g. "2025-01-01"
 *   dateTo     — ISO date string, e.g. "2025-12-31"
 *   template   — niche key, e.g. "roofer"
 *   source     — "manual" | "ghl-webhook"
 *   search     — substring match on companyName or location
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const filters = {
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo:   searchParams.get('dateTo')   || undefined,
    template: searchParams.get('template') || undefined,
    source:   searchParams.get('source')   || undefined,
    search:   searchParams.get('search')   || undefined,
  }

  const { sites, total, stats } = getSites(filters)

  // Attach GHL contact deep-link to every site that has a contactId
  const enriched = sites.map(site => ({
    ...site,
    ghlContactLink: site.contactId
      ? `${GHL_APP_BASE}/contacts/${site.contactId}`
      : null,
  }))

  return NextResponse.json({ total, stats, sites: enriched })
}

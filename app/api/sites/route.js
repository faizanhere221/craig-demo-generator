import { NextResponse } from 'next/server'
import { getSites } from '@/lib/site-store'
import { readFromGoogleSheet } from '@/lib/google-sheets'

const GHL_APP_BASE = process.env.GHL_APP_BASE_URL || 'https://app.gohighlevel.com'

/**
 * GET /api/sites
 *
 * Reads from Google Sheets (persistent) when GOOGLE_SHEET_WEBHOOK is set,
 * falls back to the in-memory store otherwise.
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

  const dateFrom = searchParams.get('dateFrom') || undefined
  const dateTo   = searchParams.get('dateTo')   || undefined
  const template = searchParams.get('template') || undefined
  const source   = searchParams.get('source')   || undefined
  const search   = searchParams.get('search')   || undefined

  // Prefer Google Sheets; fall back to in-memory
  const sheetRows = await readFromGoogleSheet()

  let sites, total, stats

  if (sheetRows) {
    // Apply filters manually on the sheet rows
    let results = sheetRows

    if (dateFrom) {
      const from = new Date(dateFrom)
      results = results.filter(s => new Date(s.createdAt) >= from)
    }

    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      results = results.filter(s => new Date(s.createdAt) <= to)
    }

    if (template) {
      results = results.filter(s => s.niche === template)
    }

    if (source) {
      results = results.filter(s => s.source === source)
    }

    if (search) {
      const q = search.toLowerCase()
      results = results.filter(s =>
        s.companyName.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      )
    }

    // Stats over full unfiltered sheet rows
    stats = {
      total: sheetRows.length,
      byTemplate: sheetRows.reduce((acc, s) => {
        acc[s.niche] = (acc[s.niche] || 0) + 1
        return acc
      }, {}),
      bySource: sheetRows.reduce((acc, s) => {
        acc[s.source] = (acc[s.source] || 0) + 1
        return acc
      }, {}),
    }

    sites = results
    total = results.length
  } else {
    // No sheet configured — use in-memory store
    const result = getSites({ dateFrom, dateTo, template, source, search })
    sites = result.sites
    total = result.total
    stats = result.stats
  }

  // Attach GHL contact deep-link
  const enriched = sites.map(site => ({
    ...site,
    ghlContactLink: site.contactId
      ? `${GHL_APP_BASE}/contacts/${site.contactId}`
      : null,
  }))

  return NextResponse.json({ total, stats, sites: enriched })
}

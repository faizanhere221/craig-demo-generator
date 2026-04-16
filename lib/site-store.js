/**
 * Shared in-memory site store.
 *
 * Because Next.js runs all route handlers in the same Node.js process on a
 * single Vercel instance, a module-level singleton is the correct way to share
 * state between /api/generate and /api/ghl-webhook without a database.
 *
 * Caveats:
 * - Data resets on every redeploy (use Google Sheets for permanent storage).
 * - If Vercel ever cold-starts a second instance both will have separate stores;
 *   this is acceptable for a dashboard that shows "recent" activity.
 */

const MAX_SITES = 1000

const sites = []

/**
 * Add a generated site to the store.
 * Normalises the shape so the admin API always returns consistent fields.
 *
 * @param {object} data  — site data from generate or webhook route
 */
export function addSite(data) {
  const entry = {
    trackingId:      data.trackingId   || '',
    contactId:       data.contactId    || null,
    companyName:     data.companyName  || data.business_name || '',
    phone:           data.phone        || '',
    email:           data.email        || '',
    niche:           data.niche        || 'unknown',
    location:        data.location     || '',
    url:             data.url          || '',
    source:          data.source       || 'manual',   // 'manual' | 'ghl-webhook'
    status:          data.status       || 'active',
    createdAt:       data.createdAt    || new Date().toISOString(),
  }

  sites.push(entry)

  if (sites.length > MAX_SITES) sites.shift()
}

/**
 * Return a filtered, sorted slice of stored sites.
 *
 * @param {object} opts
 * @param {string} [opts.dateFrom]   ISO date string (inclusive)
 * @param {string} [opts.dateTo]     ISO date string (inclusive, end of day)
 * @param {string} [opts.template]   niche key to match exactly
 * @param {string} [opts.source]     'manual' | 'ghl-webhook'
 * @param {string} [opts.search]     case-insensitive substring on companyName / location
 * @returns {{ sites: object[], total: number, stats: object }}
 */
export function getSites({ dateFrom, dateTo, template, source, search } = {}) {
  let results = sites.slice()   // newest-push order; we reverse below

  if (dateFrom) {
    const from = new Date(dateFrom)
    results = results.filter(s => new Date(s.createdAt) >= from)
  }

  if (dateTo) {
    const to = new Date(dateTo)
    to.setHours(23, 59, 59, 999)   // include the full end day
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

  // Newest first
  results.reverse()

  // Stats over the FULL unfiltered store (useful for the dashboard header)
  const allStats = {
    total: sites.length,
    byTemplate: sites.reduce((acc, s) => {
      acc[s.niche] = (acc[s.niche] || 0) + 1
      return acc
    }, {}),
    bySource: sites.reduce((acc, s) => {
      acc[s.source] = (acc[s.source] || 0) + 1
      return acc
    }, {}),
  }

  return { sites: results, total: results.length, stats: allStats }
}

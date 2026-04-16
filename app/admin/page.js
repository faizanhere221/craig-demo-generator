'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Constants ──────────────────────────────────────────────────────────────────

const TEMPLATE_LABELS = {
  roofer:            'Roofer',
  painter:           'Painter',
  builder:           'Builder',
  landscaper:        'Landscaper',
  renovations:       'Renovations',
  'bathroom-lovable': 'Bathroom',
  unknown:           'Unknown',
}

const SOURCE_LABELS = {
  manual:        'Manual',
  'ghl-webhook': 'GHL Webhook',
}

const ALL_TEMPLATES = Object.keys(TEMPLATE_LABELS)

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-AU', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

function templateBadgeClass(niche) {
  const map = {
    roofer:            'bg-yellow-500/15 text-yellow-300 ring-yellow-500/30',
    painter:           'bg-blue-500/15   text-blue-300   ring-blue-500/30',
    builder:           'bg-orange-500/15 text-orange-300 ring-orange-500/30',
    landscaper:        'bg-green-500/15  text-green-300  ring-green-500/30',
    renovations:       'bg-red-500/15    text-red-300    ring-red-500/30',
    'bathroom-lovable': 'bg-purple-500/15 text-purple-300 ring-purple-500/30',
  }
  return map[niche] || 'bg-slate-500/15 text-slate-300 ring-slate-500/30'
}

// ── Stat card ──────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <p className="text-3xl font-black text-white mt-1">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [sites, setSites]       = useState([])
  const [stats, setStats]       = useState(null)
  const [total, setTotal]       = useState(0)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [lastRefresh, setLastRefresh] = useState(null)

  // Filters
  const [dateFrom,  setDateFrom]  = useState('')
  const [dateTo,    setDateTo]    = useState('')
  const [template,  setTemplate]  = useState('')
  const [source,    setSource]    = useState('')
  const [search,    setSearch]    = useState('')

  const fetchSites = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (dateFrom)  params.set('dateFrom',  dateFrom)
      if (dateTo)    params.set('dateTo',    dateTo)
      if (template)  params.set('template',  template)
      if (source)    params.set('source',    source)
      if (search)    params.set('search',    search)

      const res  = await fetch(`/api/sites?${params}`)
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()

      setSites(data.sites  || [])
      setStats(data.stats  || null)
      setTotal(data.total  ?? 0)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [dateFrom, dateTo, template, source, search])

  // Initial load
  useEffect(() => { fetchSites() }, [fetchSites])

  function clearFilters() {
    setDateFrom('')
    setDateTo('')
    setTemplate('')
    setSource('')
    setSearch('')
  }

  const hasFilters = dateFrom || dateTo || template || source || search

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ── Header ── */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Demo Site Admin</h1>
              <p className="text-slate-500 text-xs">Optimo Agency</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className="text-slate-600 text-xs hidden sm:block">
                Updated {lastRefresh.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <a
              href="/"
              className="text-slate-400 hover:text-white text-sm font-medium transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Generator
            </a>
            <button
              onClick={fetchSites}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              <svg
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── Stats row ── */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Sites"
              value={stats.total}
              sub="all time"
            />
            <StatCard
              label="Via Webhook"
              value={stats.bySource?.['ghl-webhook'] ?? 0}
              sub="GHL automation"
            />
            <StatCard
              label="Manual"
              value={stats.bySource?.manual ?? 0}
              sub="form generated"
            />
            <StatCard
              label="Showing"
              value={total}
              sub={hasFilters ? 'filtered results' : 'all results'}
            />
          </div>
        )}

        {/* ── Template breakdown ── */}
        {stats?.byTemplate && Object.keys(stats.byTemplate).length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">
              By Template
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byTemplate)
                .sort(([, a], [, b]) => b - a)
                .map(([niche, count]) => (
                  <button
                    key={niche}
                    onClick={() => setTemplate(template === niche ? '' : niche)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ring-1 transition
                      ${templateBadgeClass(niche)}
                      ${template === niche ? 'ring-2 scale-105' : 'opacity-80 hover:opacity-100'}`}
                  >
                    {TEMPLATE_LABELS[niche] || niche}
                    <span className="opacity-70">{count}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* ── Filters ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-300 font-semibold text-sm">Filters</h2>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-slate-500 hover:text-slate-300 text-xs transition"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Business name or location…"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Template */}
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">
                Template
              </label>
              <select
                value={template}
                onChange={e => setTemplate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All templates</option>
                {ALL_TEMPLATES.map(t => (
                  <option key={t} value={t}>{TEMPLATE_LABELS[t]}</option>
                ))}
              </select>
            </div>

            {/* Date from */}
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">
                From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
              />
            </div>

            {/* Date to */}
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wide">
                To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Source toggle */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide mr-1">Source:</span>
            {[['', 'All'], ['manual', 'Manual'], ['ghl-webhook', 'GHL Webhook']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSource(val)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition
                  ${source === val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            Error loading sites: {error}
          </div>
        )}

        {/* ── Table ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-sm text-slate-300">
              {loading ? 'Loading…' : `${total} site${total !== 1 ? 's' : ''}`}
            </h2>
            {hasFilters && !loading && (
              <span className="text-xs text-blue-400 font-medium">Filtered</span>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-800 rounded-lg animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && sites.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-slate-400 font-medium">
                {hasFilters ? 'No sites match your filters.' : 'No sites generated yet.'}
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-blue-400 hover:text-blue-300 text-sm transition"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Table */}
          {!loading && sites.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['Business', 'Location', 'Template', 'Created', 'Source', 'Demo URL', 'GHL'].map(col => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {sites.map((site, i) => (
                    <tr key={site.trackingId || i} className="hover:bg-slate-800/50 transition-colors group">

                      {/* Business */}
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap max-w-[180px] truncate">
                        {site.companyName || '—'}
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap max-w-[140px] truncate">
                        {site.location || '—'}
                      </td>

                      {/* Template */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${templateBadgeClass(site.niche)}`}>
                          {TEMPLATE_LABELS[site.niche] || site.niche}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">
                        {formatDate(site.createdAt)}
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          site.source === 'ghl-webhook'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {SOURCE_LABELS[site.source] || site.source}
                        </span>
                      </td>

                      {/* Demo URL */}
                      <td className="px-4 py-3 max-w-[220px]">
                        {site.url ? (
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-mono text-xs truncate block transition"
                            title={site.url}
                          >
                            {site.url.replace('https://', '')}
                          </a>
                        ) : '—'}
                      </td>

                      {/* GHL Contact */}
                      <td className="px-4 py-3">
                        {site.ghlContactLink ? (
                          <a
                            href={site.ghlContactLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition"
                            title="Open contact in GHL"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            GHL
                          </a>
                        ) : (
                          <span className="text-slate-700 text-xs">—</span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer className="text-center text-slate-700 text-xs pb-4">
          Optimo Agency · Demo Generator Admin · Data resets on redeploy
        </footer>

      </div>
    </main>
  )
}

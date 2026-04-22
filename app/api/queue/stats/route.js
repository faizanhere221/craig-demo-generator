import { NextResponse } from 'next/server'
import { getQueueStats, DAILY_LIMIT, PROCESSING_DELAY_MS } from '@/lib/queue-store'

// GET /api/queue/stats — public stats endpoint (no auth required)
export async function GET() {
  console.log('📊 QUEUE STATS: Fetching stats...')

  const stats = await getQueueStats()

  if (!stats) {
    return NextResponse.json({
      success: false,
      error:   'Failed to fetch queue stats — check GOOGLE_SHEET_WEBHOOK',
    }, { status: 503 })
  }

  if (!stats.available) {
    return NextResponse.json({
      success:   true,
      available: false,
      message:   'Queue not configured (GOOGLE_SHEET_WEBHOOK not set)',
      config: {
        dailyLimit:       DAILY_LIMIT,
        delayBetweenLeads: `${PROCESSING_DELAY_MS / 1000}s`,
      },
    })
  }

  let nextProcessAt = null
  let secondsUntilNext = 0

  if (stats.lastProcessedAt) {
    const elapsed = Date.now() - new Date(stats.lastProcessedAt).getTime()
    const remaining = PROCESSING_DELAY_MS - elapsed
    if (remaining > 0) {
      secondsUntilNext = Math.ceil(remaining / 1000)
      nextProcessAt = new Date(Date.now() + remaining).toISOString()
    }
  }

  return NextResponse.json({
    success:   true,
    available: true,
    queue: {
      pending:    stats.pending,
      processing: stats.processing,
      completed:  stats.completed,
      failed:     stats.failed,
      total:      stats.pending + stats.processing + stats.completed + stats.failed,
    },
    today: {
      processed:         stats.todayCount,
      remaining:         stats.remainingCapacity,
      limit:             DAILY_LIMIT,
      percentUsed:       Math.round((stats.todayCount / DAILY_LIMIT) * 100),
    },
    timing: {
      lastProcessedAt:      stats.lastProcessedAt,
      secondsUntilNext,
      nextProcessAt,
      delayBetweenLeads:    `${PROCESSING_DELAY_MS / 1000}s`,
    },
    ready: stats.pending > 0 && stats.remainingCapacity > 0 && secondsUntilNext === 0,
  })
}

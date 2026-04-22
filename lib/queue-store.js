/**
 * Queue Store — Google Sheets "Queue" tab as persistent job queue.
 *
 * All queue operations go to the same GOOGLE_SHEET_WEBHOOK Apps Script URL
 * but use `action` parameters to target the Queue sheet instead of the main sheet.
 *
 * ── IMPORTANT: You must update your Google Apps Script with the new code ──
 * The updated script is included at the bottom of this file as a comment block.
 * Replace your existing Apps Script code and redeploy as a NEW deployment.
 */

export const DAILY_LIMIT = 50
export const PROCESSING_DELAY_MS = 2 * 60 * 1000 // 2 minutes between leads

function getWebhookUrl() {
  return process.env.GOOGLE_SHEET_WEBHOOK || null
}

/**
 * Add a lead to the Queue sheet with status=pending.
 * Returns { id, position } on success, null on failure.
 */
export async function addToQueue(leadData) {
  const webhookUrl = getWebhookUrl()
  if (!webhookUrl) {
    console.log('⚠️ QUEUE: No GOOGLE_SHEET_WEBHOOK configured — cannot enqueue')
    return null
  }

  const id = `q_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:        'queue-add',
        id,
        contactId:     leadData.contactId     || '',
        businessName:  leadData.companyName   || leadData.businessName || '',
        phone:         leadData.phone         || '',
        location:      leadData.location      || '',
        niche:         leadData.niche         || '',
        googleMapsUrl: leadData.googleMapsUrl || '',
        email:         leadData.email         || '',
        instagramUrl:  leadData.instagramUrl  || '',
        createdAt:     new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      console.error('❌ QUEUE: addToQueue HTTP error:', res.status)
      return null
    }

    const json = await res.json()
    if (!json.success) {
      console.error('❌ QUEUE: addToQueue script error:', json.error)
      return null
    }

    console.log(`✅ QUEUE: Enqueued ${id} (${leadData.companyName || leadData.businessName}), position ${json.position}`)
    return { id, position: json.position }
  } catch (err) {
    console.error('❌ QUEUE: addToQueue exception:', err.message)
    return null
  }
}

/**
 * Get the oldest pending lead and atomically mark it as 'processing'.
 * Returns the lead object or null if no pending leads exist.
 * Stuck 'processing' rows older than 10 minutes are auto-reset to 'pending'.
 */
export async function getNextPending() {
  const webhookUrl = getWebhookUrl()
  if (!webhookUrl) return null

  try {
    // POST instead of GET: the operation modifies the sheet (marks as 'processing'),
    // so GET is wrong — it can be cached by Google's infrastructure, causing the
    // script to never execute and the same stale lead to be returned repeatedly.
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'queue-next-pending' }),
    })

    if (!res.ok) {
      console.error('❌ QUEUE: getNextPending HTTP error:', res.status)
      return null
    }

    const json = await res.json()
    if (!json.success) {
      console.error('❌ QUEUE: getNextPending script error:', json.error)
      return null
    }

    if (json.lead) {
      console.log(`📥 QUEUE: Next pending lead: ${json.lead.id} (${json.lead.businessName})`)
    } else {
      console.log('💤 QUEUE: No pending leads in queue')
    }

    return json.lead || null
  } catch (err) {
    console.error('❌ QUEUE: getNextPending exception:', err.message)
    return null
  }
}

/**
 * Update a queue entry's status (and optional demoUrl / error).
 * Call this after processing completes or fails.
 */
export async function updateStatus(id, status, data = {}) {
  const webhookUrl = getWebhookUrl()
  if (!webhookUrl) return false

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:      'queue-update',
        id,
        status,
        processedAt: data.processedAt || new Date().toISOString(),
        demoUrl:     data.demoUrl     || '',
        error:       data.error       || '',
      }),
    })

    const rawText = await res.text()

    if (!res.ok) {
      console.error(`❌ QUEUE: updateStatus HTTP ${res.status} for ${id} → ${status}. Body: ${rawText}`)
      return false
    }

    let json
    try {
      json = JSON.parse(rawText)
    } catch {
      console.error(`❌ QUEUE: updateStatus non-JSON response for ${id}: ${rawText}`)
      return false
    }

    if (!json.success) {
      console.error(`❌ QUEUE: updateStatus Apps Script error for ${id} → ${status}:`, json.error)
      return false
    }

    console.log(`✅ QUEUE: Updated ${id} → ${status}`)
    return true
  } catch (err) {
    console.error(`❌ QUEUE: updateStatus exception for ${id} → ${status}:`, err.message)
    return false
  }
}

/**
 * Get queue statistics: counts by status, today's completed count,
 * remaining daily capacity, and last processed timestamp.
 */
export async function getQueueStats() {
  const webhookUrl = getWebhookUrl()
  if (!webhookUrl) {
    return {
      pending: 0, processing: 0, completed: 0, failed: 0,
      todayCount: 0, remainingCapacity: DAILY_LIMIT,
      lastProcessedAt: null, available: false,
    }
  }

  try {
    const res = await fetch(`${webhookUrl}?action=queue-stats`, { method: 'GET' })
    if (!res.ok) {
      console.error('❌ QUEUE: getQueueStats HTTP error:', res.status)
      return null
    }

    const json = await res.json()
    if (!json.success || !json.stats) {
      console.error('❌ QUEUE: getQueueStats script error:', json.error)
      return null
    }

    const s = json.stats
    const todayCount = s.todayCompleted || 0
    return {
      pending:           s.pending        || 0,
      processing:        s.processing     || 0,
      completed:         s.completed      || 0,
      failed:            s.failed         || 0,
      todayCount,
      remainingCapacity: Math.max(0, DAILY_LIMIT - todayCount),
      lastProcessedAt:   s.lastProcessedAt || null,
      available:         true,
    }
  } catch (err) {
    console.error('❌ QUEUE: getQueueStats exception:', err.message)
    return null
  }
}

/*
========================================
UPDATED GOOGLE APPS SCRIPT CODE
Replace your ENTIRE existing script with this, then redeploy as a NEW deployment.
========================================

var QUEUE_HEADERS = [
  'ID', 'Contact ID', 'Business Name', 'Phone', 'Location', 'Niche',
  'Google Maps URL', 'Status', 'Created At', 'Processed At', 'Demo URL', 'Error',
  'Email', 'Instagram URL'
];

// Column index map (1-based)
var QC = {
  id:1, contactId:2, businessName:3, phone:4, location:5, niche:6,
  googleMapsUrl:7, status:8, createdAt:9, processedAt:10, demoUrl:11, error:12,
  email:13, instagramUrl:14
};

function getOrCreateQueueSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Queue');
  if (!sheet) {
    sheet = ss.insertSheet('Queue');
    sheet.appendRow(QUEUE_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'queue-add')          return handleQueueAdd(data);
    if (data.action === 'queue-update')       return handleQueueUpdate(data);
    if (data.action === 'queue-next-pending') return handleQueueNextPending();
    return handleMainSheetLog(data);
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'queue-stats') return handleQueueStats();
  if (action === 'read')        return handleMainSheetRead();
  return ContentService.createTextOutput('Google Sheet webhook is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── Queue: add ─────────────────────────────────────────────────────────────
function handleQueueAdd(data) {
  var sheet = getOrCreateQueueSheet();
  sheet.appendRow([
    data.id           || '',
    data.contactId    || '',
    data.businessName || '',
    data.phone        || '',
    data.location     || '',
    data.niche        || '',
    data.googleMapsUrl || '',
    'pending',
    data.createdAt    || new Date().toISOString(),
    '', '', '',
    data.email        || '',
    data.instagramUrl || '',
  ]);
  var lastRow = sheet.getLastRow();
  var pendingCount = 0;
  if (lastRow > 1) {
    var statuses = sheet.getRange(2, QC.status, lastRow - 1, 1).getValues();
    statuses.forEach(function(r) { if (r[0] === 'pending') pendingCount++; });
  }
  return jsonResponse({ success: true, position: pendingCount });
}

// ── Queue: update by ID ────────────────────────────────────────────────────
function handleQueueUpdate(data) {
  var sheet = getOrCreateQueueSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: false, error: 'Queue is empty' });
  var ids = sheet.getRange(2, QC.id, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(data.id)) {
      var row = i + 2;
      sheet.getRange(row, QC.status).setValue(data.status || '');
      sheet.getRange(row, QC.processedAt).setValue(data.processedAt || '');
      sheet.getRange(row, QC.demoUrl).setValue(data.demoUrl || '');
      sheet.getRange(row, QC.error).setValue(data.error || '');
      // CRITICAL: flush() ensures the status update is persisted before responding.
      // Without this the lead stays as 'processing' in the sheet and gets reprocessed.
      SpreadsheetApp.flush();
      return jsonResponse({ success: true });
    }
  }
  return jsonResponse({ success: false, error: 'ID not found: ' + data.id });
}

// ── Queue: get next pending (atomic — marks as processing before returning) ─
function handleQueueNextPending() {
  var sheet = getOrCreateQueueSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: true, lead: null });

  var numRows = lastRow - 1;
  var data = sheet.getRange(2, 1, numRows, 14).getValues();
  var now = new Date();
  var TEN_MIN_MS = 10 * 60 * 1000;

  // Reset stuck 'processing' rows (>10 min old) back to pending
  for (var i = 0; i < data.length; i++) {
    if (data[i][QC.status - 1] === 'processing') {
      var startedAt = data[i][QC.processedAt - 1];
      if (startedAt && (now - new Date(startedAt)) > TEN_MIN_MS) {
        sheet.getRange(i + 2, QC.status).setValue('pending');
        sheet.getRange(i + 2, QC.processedAt).setValue('');
        data[i][QC.status - 1] = 'pending';
        data[i][QC.processedAt - 1] = '';
      }
    }
  }

  // Find oldest pending row and atomically mark as processing
  for (var j = 0; j < data.length; j++) {
    if (data[j][QC.status - 1] === 'pending') {
      var row = j + 2;
      var startedTs = now.toISOString();
      sheet.getRange(row, QC.status).setValue('processing');
      sheet.getRange(row, QC.processedAt).setValue(startedTs);
      // CRITICAL: flush() forces the setValue calls to be committed to the sheet
      // BEFORE this function returns. Without it, Google batches the writes and
      // they may not persist — causing the same lead to be returned on every call.
      SpreadsheetApp.flush();
      var r = data[j];
      var createdAt = r[QC.createdAt - 1];
      return jsonResponse({
        success: true,
        lead: {
          id:            r[QC.id - 1],
          contactId:     r[QC.contactId - 1],
          businessName:  r[QC.businessName - 1],
          phone:         r[QC.phone - 1],
          location:      r[QC.location - 1],
          niche:         r[QC.niche - 1],
          googleMapsUrl: r[QC.googleMapsUrl - 1],
          status:        'processing',
          createdAt:     createdAt ? new Date(createdAt).toISOString() : '',
          email:         r[QC.email - 1],
          instagramUrl:  r[QC.instagramUrl - 1],
        }
      });
    }
  }

  return jsonResponse({ success: true, lead: null });
}

// ── Queue: stats ───────────────────────────────────────────────────────────
function handleQueueStats() {
  var sheet = getOrCreateQueueSheet();
  var lastRow = sheet.getLastRow();
  var stats = { pending:0, processing:0, completed:0, failed:0, todayCompleted:0, lastProcessedAt:null };
  if (lastRow < 2) return jsonResponse({ success: true, stats: stats });

  var data = sheet.getRange(2, 1, lastRow - 1, 14).getValues();
  var today = new Date().toISOString().split('T')[0];
  var lastProcessed = null;

  data.forEach(function(row) {
    var status = row[QC.status - 1];
    var processedAt = row[QC.processedAt - 1];
    if (status === 'pending')    stats.pending++;
    if (status === 'processing') stats.processing++;
    if (status === 'completed')  stats.completed++;
    if (status === 'failed')     stats.failed++;
    if ((status === 'completed' || status === 'failed') && processedAt) {
      var d = new Date(processedAt);
      if (d.toISOString().split('T')[0] === today) stats.todayCompleted++;
      if (!lastProcessed || d > new Date(lastProcessed)) lastProcessed = d.toISOString();
    }
  });

  stats.lastProcessedAt = lastProcessed;
  return jsonResponse({ success: true, stats: stats });
}

// ── Main sheet: log ────────────────────────────────────────────────────────
function handleMainSheetLog(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Tracking ID','Company Name','Phone','Niche','Location','URL','Source','Contact ID','Created At']);
  }
  sheet.appendRow([
    data.trackingId  || '',
    data.companyName || '',
    data.phone       || '',
    data.niche       || '',
    data.location    || '',
    data.url         || '',
    data.source      || 'manual',
    data.contactId   || '',
    data.createdAt   || new Date().toISOString(),
  ]);
  return jsonResponse({ success: true });
}

// ── Main sheet: read ───────────────────────────────────────────────────────
function handleMainSheetRead() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ success: true, rows: [] });
  var data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  var rows = data.map(function(row) {
    return {
      trackingId:  row[0] || '', companyName: row[1] || '',
      phone:       row[2] || '', niche:       row[3] || '',
      location:    row[4] || '', url:         row[5] || '',
      source:      row[6] || 'manual', contactId: row[7] || '',
      createdAt:   row[8] ? new Date(row[8]).toISOString() : '',
    };
  });
  rows.reverse();
  return jsonResponse({ success: true, rows: rows });
}

========================================
DEPLOYMENT STEPS (must do after pasting the new script):
========================================
1. Open Google Sheet → Extensions → Apps Script
2. Replace ALL existing code with the script above
3. Click Deploy → New deployment  ← must be NEW, not "Manage deployments"
4. Type: Web app | Execute as: Me | Who has access: Anyone
5. Click Deploy and copy the new Web app URL
6. Update GOOGLE_SHEET_WEBHOOK in your .env.local and Vercel env with the new URL
   A "Queue" tab will be auto-created on first use.
========================================
*/

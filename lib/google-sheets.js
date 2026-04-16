/**
 * Google Sheets Integration for Permanent Storage
 *
 * Logs every generated site to a Google Sheet so links are never lost.
 * Also reads back all rows so the admin dashboard survives redeploys.
 *
 * Setup:
 * 1. Create a Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste the web app code (see below)
 * 4. Deploy as web app (Anyone can access)
 * 5. Copy the web app URL to GOOGLE_SHEET_WEBHOOK env var
 */

export async function logToGoogleSheet(data) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK

  if (!webhookUrl) {
    console.log('⚠️ No GOOGLE_SHEET_WEBHOOK - skipping sheet logging')
    return false
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackingId:  data.trackingId,
        companyName: data.companyName,
        phone:       data.phone,
        niche:       data.niche,
        location:    data.location,
        url:         data.url,
        source:      data.source     || 'manual',
        contactId:   data.contactId  || '',
        createdAt:   data.createdAt,
      }),
    })

    if (response.ok) {
      console.log('✅ Logged to Google Sheet')
      return true
    } else {
      console.error('❌ Google Sheet error:', response.status)
      return false
    }
  } catch (error) {
    console.error('❌ Google Sheet error:', error)
    return false
  }
}

/**
 * Read all rows from Google Sheet and return them in the same shape
 * that site-store.js / getSites() produces.
 *
 * Returns null when GOOGLE_SHEET_WEBHOOK is not set (caller falls back
 * to in-memory store).
 *
 * @returns {Promise<object[]|null>}
 */
export async function readFromGoogleSheet() {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK

  if (!webhookUrl) return null

  try {
    const response = await fetch(`${webhookUrl}?action=read`, { method: 'GET' })

    if (!response.ok) {
      console.error('❌ Google Sheet read error:', response.status)
      return null
    }

    const json = await response.json()

    if (!json.success || !Array.isArray(json.rows)) {
      console.error('❌ Google Sheet read: unexpected response', json)
      return null
    }

    // Normalise rows into the same shape as addSite() produces
    return json.rows.map(r => ({
      trackingId:  r.trackingId  || '',
      contactId:   r.contactId   || null,
      companyName: r.companyName || '',
      phone:       r.phone       || '',
      email:       r.email       || '',
      niche:       r.niche       || 'unknown',
      location:    r.location    || '',
      url:         r.url         || '',
      source:      r.source      || 'manual',
      status:      r.status      || 'active',
      createdAt:   r.createdAt   || '',
    }))
  } catch (error) {
    console.error('❌ Google Sheet read error:', error)
    return null
  }
}

/*
========================================
GOOGLE APPS SCRIPT CODE (paste in Google Sheet)
Replace the ENTIRE script with this version, then redeploy as a NEW deployment.
========================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Tracking ID', 'Company Name', 'Phone', 'Niche',
        'Location', 'URL', 'Source', 'Contact ID', 'Created At'
      ]);
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

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // ?action=read  →  return all rows as JSON
  if (e && e.parameter && e.parameter.action === 'read') {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var lastRow = sheet.getLastRow();

      if (lastRow < 2) {
        // No data rows yet (row 1 is headers)
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, rows: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Read all data rows (skip header row 1)
      var data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();

      var rows = data.map(function(row) {
        return {
          trackingId:  row[0] || '',
          companyName: row[1] || '',
          phone:       row[2] || '',
          niche:       row[3] || '',
          location:    row[4] || '',
          url:         row[5] || '',
          source:      row[6] || 'manual',
          contactId:   row[7] || '',
          createdAt:   row[8] ? new Date(row[8]).toISOString() : '',
        };
      });

      // Newest first
      rows.reverse();

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, rows: rows }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // Default health-check
  return ContentService
    .createTextOutput('Google Sheet webhook is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

========================================
DEPLOYMENT STEPS (do this after updating the script):
========================================

1. Open Google Sheet → Extensions → Apps Script
2. Replace ALL existing code with the script above
3. Click Deploy → New deployment   ← must be NEW, not "Manage deployments"
4. Type: Web app
5. Execute as: Me
6. Who has access: Anyone
7. Click Deploy and copy the new Web app URL
8. Update GOOGLE_SHEET_WEBHOOK in Vercel with the new URL
   (vercel env rm GOOGLE_SHEET_WEBHOOK production && vercel env add GOOGLE_SHEET_WEBHOOK production)

NOTE: Old rows in the sheet had 7 columns. The new schema adds Source (col G)
and Contact ID (col H). Existing rows will return empty strings for those two
fields, which is fine — the admin dashboard handles missing values gracefully.

*/

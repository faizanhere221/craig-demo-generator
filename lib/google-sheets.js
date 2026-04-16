/**
 * Google Sheets Integration for Permanent Storage
 * 
 * Logs every generated site to a Google Sheet so links are never lost.
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
        trackingId: data.trackingId,
        companyName: data.companyName,
        phone: data.phone,
        niche: data.niche,
        location: data.location,
        url: data.url,
        createdAt: data.createdAt
      })
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

/*
========================================
GOOGLE APPS SCRIPT CODE (paste in Google Sheet)
========================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tracking ID', 'Company Name', 'Phone', 'Niche', 'Location', 'URL', 'Created At']);
    }
    
    // Append the data
    sheet.appendRow([
      data.trackingId,
      data.companyName,
      data.phone,
      data.niche,
      data.location,
      data.url,
      data.createdAt
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET requests for testing
function doGet(e) {
  return ContentService.createTextOutput('Google Sheet webhook is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

========================================
DEPLOYMENT STEPS:
========================================

1. Open Google Sheet
2. Extensions → Apps Script
3. Paste the code above
4. Click Deploy → New deployment
5. Type: Web app
6. Execute as: Me
7. Who has access: Anyone
8. Click Deploy
9. Copy the Web app URL
10. Add to Vercel: vercel env add GOOGLE_SHEET_WEBHOOK production

*/

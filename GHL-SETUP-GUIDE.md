# GHL Demo Site Generator — Setup Guide

Complete setup guide for integrating GoHighLevel with the Optimo Demo Site Generator.
When a new lead comes in, a personalised demo website is automatically generated and
the URL is written back to the contact record.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Custom Fields Setup](#2-custom-fields-setup)
3. [API Key Setup](#3-api-key-setup)
4. [Webhook Setup](#4-webhook-setup)
5. [Workflow Setup](#5-workflow-setup)
6. [Environment Variables](#6-environment-variables)
7. [Testing](#7-testing)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

Before starting, make sure you have:

- [ ] The demo generator app deployed to Vercel (or running locally on port 3000)
- [ ] Admin access to a GHL sub-account (Location)
- [ ] A Vercel account with an API token
- [ ] (Optional) An Anthropic API key for personalised site copy

Your webhook endpoint will be at:
```
https://your-app.vercel.app/api/ghl-webhook
```

For local development:
```
https://your-ngrok-id.ngrok.io/api/ghl-webhook
```

> **Note:** GHL cannot reach `localhost` directly. Use [ngrok](https://ngrok.com) or
> [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
> to expose your local server during development.

---

## 2. Custom Fields Setup

These fields store the generated demo data on the contact record. Create them all before
setting up the workflow — GHL needs to know they exist before you can map to them.

### How to reach Custom Fields

```
GHL Dashboard
  → Settings  (bottom-left gear icon)
  → Custom Fields
  → + Add Field  (top-right button)
```

---

### Field 1 — demo_site_url

| Setting       | Value                                  |
|---------------|----------------------------------------|
| Field Label   | `Demo Site URL`                        |
| Field Key     | `demo_site_url`  ← must match exactly  |
| Field Type    | **Text**                               |
| Group         | Contact (or any group you prefer)      |

**Screenshot description:**
In the Add Field dialog, type `Demo Site URL` in the Label box. The Key field
auto-populates as `demo_site_url` — do not change it. Select **Text** as the type.
Click **Save**.

After saving, click the field to open it and copy the **Field ID** (a UUID like
`6dvNaf7VguHt2K1234ab`). You will need this for the `GHL_DEMO_URL_FIELD_ID`
environment variable.

---

### Field 2 — demo_created_at

| Setting       | Value                                      |
|---------------|--------------------------------------------|
| Field Label   | `Demo Created At`                          |
| Field Key     | `demo_created_at`  ← must match exactly    |
| Field Type    | **Text** (not Date — we store ISO strings) |
| Group         | Contact                                    |

**Screenshot description:**
Same process as above. Set the Label to `Demo Created At`. Confirm the key is
`demo_created_at`. Use **Text** type (the app writes ISO 8601 timestamps like
`2025-04-15T10:30:00.000Z`, which GHL's Date field type does not accept).

After saving, copy the Field ID for `GHL_DEMO_CREATED_AT_FIELD_ID`.

---

### Field 3 — niche

| Setting       | Value                                        |
|---------------|----------------------------------------------|
| Field Label   | `Niche`                                      |
| Field Key     | `niche`  ← must match exactly                |
| Field Type    | **Dropdown** (Single Select)                 |
| Group         | Contact                                      |

**Dropdown options to add** (add each one as a separate option):

| Option Label    | Matches patterns in the app                            |
|-----------------|--------------------------------------------------------|
| `roofing`       | roof                                                   |
| `bathroom`      | bathroom, bath, plumb                                  |
| `painting`      | paint                                                  |
| `building`      | build, construct, carpent                              |
| `landscaping`   | landscap, garden, lawn                                 |
| `renovation`    | renovat, reno, kitchen                                 |

**Screenshot description:**
Select **Dropdown** as the type. A list area appears below — click **Add Option**
for each value above. The option labels can be anything human-readable; the niche
mapping in the app uses substring matching, so `roofing`, `Roofing Contractor`, and
`roof repair` all resolve to the roofer template.

> **Tip:** You can also leave the niche field as a plain **Text** field and type free
> text like "roofing contractor" — the app will still match it correctly. The Dropdown
> just enforces consistency across your team.

---

### Field 4 — google_maps_url

| Setting       | Value                                       |
|---------------|---------------------------------------------|
| Field Label   | `Google Maps URL`                           |
| Field Key     | `google_maps_url`  ← must match exactly     |
| Field Type    | **Text**                                    |
| Group         | Contact                                     |

This field is **optional**. When present, the generated demo site includes a Google
Maps embed or link pointing to the business's GMB listing.

Acceptable values:
- `https://maps.app.goo.gl/abc123`
- `https://www.google.com/maps/place/Business+Name/...`

---

### Field 5 — instagram_url

| Setting       | Value                                        |
|---------------|----------------------------------------------|
| Field Label   | `Instagram URL`                              |
| Field Key     | `instagram_url`  ← must match exactly        |
| Field Type    | **Text**                                     |
| Group         | Contact                                      |

This field is **optional**. When present, the generated demo site embeds the
Instagram post or reel.

Acceptable values:
- `https://www.instagram.com/p/ABC123/`
- `https://www.instagram.com/reel/XYZ456/`

---

### Verify your fields

After creating all five fields, go to:
```
Settings → Custom Fields
```
You should see all five fields listed. Confirm the **key names** match exactly
(keys are shown in grey beneath each label):

```
demo_site_url
demo_created_at
niche
google_maps_url
instagram_url
```

---

## 3. API Key Setup

The app uses a GHL private API key to write back the demo URL to the contact after
generation.

### Create a Private Integration Key

```
GHL Dashboard
  → Settings
  → Integrations  (or "API Keys" depending on your GHL version)
  → Private Integration Key
  → + Create Key
```

**Settings:**
- **Key Name:** `Demo Site Generator`
- **Scopes to enable:**
  - Contacts → Read, Write
  - Conversations / Messages → Write  (required for SMS sending)
  - Locations → Read

Copy the generated key — it will only be shown once. This becomes your
`GHL_API_KEY` environment variable.

### Find your Location ID

```
GHL Dashboard
  → Settings
  → Business Profile
  → scroll to "Location ID"  (also called "Sub-Account ID")
```

It looks like: `ve9EPM428h8vShlRW1KT`

This becomes your `GHL_LOCATION_ID` environment variable.

---

## 4. Webhook Setup

### Generate a webhook secret

Pick a strong random string to use as the shared secret between GHL and your app.
You can generate one with:

```bash
# Mac / Linux / Git Bash
openssl rand -hex 32

# Or just use a password manager to generate a 40+ character random string
```

Example output: `a3f8e1c2d9b4f7a0e2c5d8b1f4a7e0c3d6b9f2a5`

Save this — you will enter it in two places:
1. As the `GHL_WEBHOOK_SECRET` environment variable in Vercel
2. As a custom header in the GHL Webhook action (see Step 5)

### The webhook endpoint

Your webhook URL (replace with your actual Vercel deployment URL):
```
https://your-app.vercel.app/api/ghl-webhook
```

The endpoint accepts `POST` requests and responds with:

**Success (200):**
```json
{
  "success": true,
  "url": "https://smith-roofing-a1b2c3.vercel.app",
  "slug": "smith-roofing-a1b2c3",
  "trackingId": "a1b2c3",
  "niche": "roofer",
  "companyName": "Smith Roofing",
  "ghlContactUpdate": "success"
}
```

**`ghlContactUpdate` values:**
| Value | Meaning |
|---|---|
| `success` | `demo_site_url` and `demo_created_at` were written to the contact |
| `skipped` | No `contact_id` in payload — field update was skipped |
| `failed` | GHL API returned an error; demo was still generated |

---

## 5. Workflow Setup

### Create the Workflow

```
GHL Dashboard
  → Automation
  → Workflows
  → + New Workflow
  → Start from Scratch
```

**Workflow name:** `New Lead → Generate Demo Site`

---

### Step 1 — Trigger

Click **+ Add Trigger** and select the event that fires when a new lead arrives.
Common options:

| Your lead source          | Trigger to use                           |
|---------------------------|------------------------------------------|
| GHL form submission       | **Form Submitted**                       |
| Inbound call              | **Inbound Call** (with tag filter)       |
| Facebook/Instagram Lead Ad| **Facebook Lead Form Submitted**         |
| Manual contact created    | **Contact Created**                      |
| Specific tag added        | **Tag Added** → filter for your tag name |

**Recommended filters** (to avoid firing on every contact):
- Add a filter: `Custom Field → niche → is not empty`
- Or: `Tag → contains → "generate-demo"`

---

### Step 2 — (Optional) Wait / Delay

If the lead needs time for phone/business name to be collected (e.g. via a survey
or intake form), add a **Wait** action before the webhook:

```
+ Add Action → Wait
  → Wait for: 2 minutes
  → (or "Wait until field is filled": business_name)
```

---

### Step 3 — Webhook Action

```
+ Add Action
  → Webhook
  → (or "Custom Webhook" depending on GHL version)
```

**Configure the webhook:**

| Setting           | Value                                                     |
|-------------------|-----------------------------------------------------------|
| Method            | `POST`                                                    |
| URL               | `https://your-app.vercel.app/api/ghl-webhook`            |
| Content-Type      | `application/json`                                        |

**Add custom header (security):**

Click **+ Add Header**:
| Header Name       | Header Value                              |
|-------------------|-------------------------------------------|
| `x-webhook-secret`| `your_webhook_secret_here`  (from Step 4) |

---

### Step 4 — Map the payload fields

In the webhook body section, select **JSON Body** or **Custom Body** and map GHL
merge fields to the expected field names. Use one of these formats:

**Option A — Using GHL's field merge syntax:**
```json
{
  "contact_id": "{{contact.id}}",
  "business_name": "{{contact.company_name}}",
  "phone": "{{contact.phone}}",
  "location": "{{contact.city}}, {{contact.state}}",
  "email": "{{contact.email}}",
  "niche": "{{contact.niche}}",
  "google_maps_url": "{{contact.google_maps_url}}",
  "instagram_url": "{{contact.instagram_url}}"
}
```

**Option B — If your GHL uses camelCase merge fields:**
```json
{
  "contactId": "{{contact.id}}",
  "business_name": "{{contact.companyName}}",
  "phone": "{{contact.phone}}",
  "location": "{{contact.city}}",
  "niche": "{{contact.customFields.niche}}"
}
```

> **Field name flexibility:** The app accepts many field name aliases. If your GHL
> sends `company_name`, `companyName`, `name`, or `full_name`, it will all work.
> Full list in [`app/api/ghl-webhook/route.js`](app/api/ghl-webhook/route.js).

**Required fields** (webhook returns 400 if any are missing or blank):
- `business_name` (or any alias: `company_name`, `companyName`, `name`, `full_name`)
- `phone` (or: `phone1`, `phone_number`, `phoneNumber`, `mobile`)
- `location` (or: `city`, `suburb`, `address`, `area`)

**Optional fields** (silently skipped if absent):
- `contact_id` / `contactId` — needed for the demo URL writeback to the contact
- `email` / `email1` / `emailAddress`
- `niche` / `trade_type` / `tradeType` / `industry` / `type` / `service_type`
- `google_maps_url` / `googleMapsUrl` / `maps_url` / `gmb_url`
- `instagram_url` / `instagramUrl` / `instagram`

---

### Step 5 — (Optional) Notify team via SMS/Email

After the webhook action, add a **Send SMS** or **Send Email** action to notify
your team that a demo has been generated. Use the `{{contact.demo_site_url}}` merge
field to include the URL.

Example SMS:
```
New demo ready for {{contact.company_name}}!
View it here: {{contact.demo_site_url}}
```

---

### Publish the Workflow

Click **Save** → **Publish** (toggle in the top-right). The workflow is now live.

---

## 6. Environment Variables

Add these in Vercel:
```
Dashboard → your project → Settings → Environment Variables
```

Or via CLI:
```bash
vercel env add VARIABLE_NAME production
```

### Required

| Variable | Description | Where to find it |
|---|---|---|
| `VERCEL_TOKEN` | Deploys each demo site via Vercel API | vercel.com/account/tokens |
| `GHL_API_KEY` | Writes demo URL back to GHL contact | GHL → Settings → Integrations → API Keys |
| `GHL_LOCATION_ID` | Your GHL sub-account ID | GHL → Settings → Business Profile |
| `GHL_WEBHOOK_SECRET` | Authenticates incoming webhooks | You generated this in Step 4 |

### Recommended

| Variable | Description | Default if unset |
|---|---|---|
| `GHL_DEMO_URL_FIELD_ID` | UUID of `demo_site_url` custom field | Uses field key name |
| `GHL_DEMO_CREATED_AT_FIELD_ID` | UUID of `demo_created_at` custom field | Uses field key name |
| `ANTHROPIC_API_KEY` | Generates personalised site copy | Generic copy used |
| `GOOGLE_SHEET_WEBHOOK` | Logs all generated sites permanently | Logging skipped |

### Optional — Notifications

| Variable | Description |
|---|---|
| `NOTIFY_EMAIL_WEBHOOK` | Email provider webhook URL (Resend, SendGrid, etc.) |
| `NOTIFY_EMAIL_TO` | Recipient address for new-demo email alerts |
| `NOTIFY_EMAIL_FROM` | Sender address (default: `demos@optimo.agency`) |
| `NOTIFY_SLACK_WEBHOOK` | Slack Incoming Webhook URL |
| `NOTIFY_DISCORD_WEBHOOK` | Discord channel webhook URL |
| `ENABLE_AUTO_SMS` | Set `true` to auto-send SMS via GHL after generation |
| `GHL_APP_BASE_URL` | Override for white-label GHL (default: `https://app.gohighlevel.com`) |

---

## 7. Testing

### Step 1 — Unit and mock tests (no server needed)

```bash
# Run all unit tests and GHL API mock tests
node scripts/test-ghl-webhook.js --unit --mock
```

All 117 tests should pass without a running server.

### Step 2 — Integration tests (requires running server)

```bash
# Terminal 1 — start the dev server
npm run dev

# Terminal 2 — run the full test suite
node scripts/test-ghl-webhook.js

# With authentication testing
GHL_WEBHOOK_SECRET=your_secret node scripts/test-ghl-webhook.js
```

### Step 3 — Send a test payload manually

Use `curl` to send a sample GHL payload:

```bash
curl -X POST https://your-app.vercel.app/api/ghl-webhook \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your_webhook_secret_here" \
  -d '{
    "contact_id": "ct_test_001",
    "business_name": "Smith Roofing Co",
    "phone": "0412 345 678",
    "location": "Sydney, NSW",
    "email": "info@smithroofing.com.au",
    "niche": "roofing",
    "google_maps_url": "https://maps.app.goo.gl/abc123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "url": "https://smith-roofing-xxxxxx.vercel.app",
  "niche": "roofer",
  "companyName": "Smith Roofing Co",
  "ghlContactUpdate": "success"
}
```

### Step 4 — Test from GHL directly

1. Open your workflow
2. Click **Test Workflow** (or **Run for a Contact**)
3. Select a test contact that has `business_name`, `phone`, and `location` filled in
4. Click **Run**
5. Check the webhook action result — it should show the `200` response with the demo URL
6. Open the contact record and confirm `Demo Site URL` and `Demo Created At` are now filled

### Step 5 — View generated sites

Visit the admin dashboard:
```
https://your-app.vercel.app/admin
```

All generated sites appear here with filters for date, template, and source.

---

## 8. Troubleshooting

### Webhook returns 401 Unauthorized

**Cause:** The `x-webhook-secret` header is missing or does not match `GHL_WEBHOOK_SECRET`.

**Fix:**
1. In Vercel, confirm `GHL_WEBHOOK_SECRET` is set and re-deploy if you just added it
2. In GHL's webhook action, confirm the header name is exactly `x-webhook-secret`
   (lowercase, with hyphen) and the value matches character-for-character
3. If you don't need authentication (e.g. internal testing), remove `GHL_WEBHOOK_SECRET`
   from Vercel — the secret check is only active when the variable is set

---

### Webhook returns 400 Missing required lead fields

**Cause:** One or more of `business_name`, `phone`, or `location` is empty or missing
from the payload GHL sends.

**Fix:**
1. In your GHL workflow, open the webhook action and inspect the JSON body
2. Check that the merge fields resolve to actual values for your test contact:
   - `{{contact.company_name}}` — is the company name field filled?
   - `{{contact.phone}}` — does the contact have a phone number?
   - `{{contact.city}}` — is the city or location field set?
3. Add a **Wait** step before the webhook to allow time for intake fields to be filled
4. The response body includes a `missing` array showing exactly which fields failed:
   ```json
   { "success": false, "error": "Missing required lead fields", "missing": ["phone"] }
   ```

---

### Webhook returns 500 Site deployment failed

**Cause:** The Vercel deployment API call failed.

**Common causes and fixes:**

| Symptom in Vercel logs | Fix |
|---|---|
| `VERCEL_TOKEN` not set | Add the token in Vercel Environment Variables and redeploy |
| `401` from Vercel API | Token is expired or has insufficient scope — create a new one |
| `403` from Vercel API | Token does not have deployment write access — check token scope |
| `429` from Vercel API | Rate limited — add a delay between webhook triggers or upgrade Vercel plan |
| Network timeout | Vercel API is slow — the webhook has no retry; GHL will retry automatically |

Check Vercel Function Logs:
```
Vercel Dashboard → your project → Logs → filter by /api/ghl-webhook
```

---

### `ghlContactUpdate` is `"failed"` in the response

**Cause:** The demo was generated successfully but writing back to the GHL contact failed.

This is non-fatal — the demo URL is still live and returned in the response.

**Fix:**
1. Check `GHL_API_KEY` is set and has `Contacts → Write` scope
2. Check `GHL_LOCATION_ID` matches the sub-account where the contact lives
3. Check `GHL_DEMO_URL_FIELD_ID` and `GHL_DEMO_CREATED_AT_FIELD_ID` are the correct
   UUIDs — a wrong UUID causes a silent 400 from GHL's API
4. Look for `❌ GHL WEBHOOK: Failed to update contact` in your Vercel Function Logs
   to see the exact GHL API error message

---

### `ghlContactUpdate` is `"skipped"`

**Cause:** The payload did not include `contact_id` / `contactId` / `id`.

**Fix:** Add `"contact_id": "{{contact.id}}"` to your GHL webhook body JSON.

---

### Niche is resolving to the wrong template

The niche field uses substring matching. Check what value GHL is actually sending
by looking at the log line:
```
🏷️  GHL WEBHOOK: niche "your_value" → "resolved_niche"
```
visible in Vercel Function Logs.

**Niche mapping reference:**

| Webhook `niche` value contains | Resolved template |
|---|---|
| `roof` | `roofer` |
| `bathroom`, `bath`, `plumb` | `bathroom-lovable` (generic template) |
| `paint` | `painter` |
| `build`, `construct`, `carpent` | `builder` |
| `landscap`, `garden`, `lawn` | `landscaper` |
| `renovat`, `reno`, `kitchen` | `renovations` |
| anything else / empty | `bathroom-lovable` (default) |

---

### Demo site URL is not appearing on the contact in GHL

1. Confirm the field key name is exactly `demo_site_url` (check in Settings → Custom Fields)
2. If using `GHL_DEMO_URL_FIELD_ID`, confirm the UUID is correct — copy it fresh from
   the Custom Fields settings page
3. Confirm `GHL_API_KEY` has write access to Contacts
4. Check `ghlContactUpdate` value in the webhook response — if it's `"failed"`, see
   the section above

---

### Webhook fires but no site appears in the admin dashboard

The admin dashboard at `/admin` reads from an in-memory store that resets on each
Vercel deployment. If you just re-deployed, previously generated sites won't appear.

**Long-term fix:** Set up `GOOGLE_SHEET_WEBHOOK` — Google Sheets provides permanent
storage that survives redeployments. See `lib/google-sheets.js` for the setup script.

---

### Local development — GHL can't reach localhost

Use ngrok to expose your local server:

```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000
```

Copy the `https://xxxxx.ngrok.io` URL and use it as your webhook URL in GHL.
The URL changes each time you restart ngrok (unless you have a paid ngrok account
with a fixed subdomain).

Alternative — [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/):
```bash
cloudflared tunnel --url http://localhost:3000
```

---

## Quick Reference

### Webhook endpoint
```
POST /api/ghl-webhook
Headers:
  Content-Type: application/json
  x-webhook-secret: <GHL_WEBHOOK_SECRET>
```

### Minimum viable payload
```json
{
  "contact_id": "{{contact.id}}",
  "business_name": "{{contact.company_name}}",
  "phone": "{{contact.phone}}",
  "location": "{{contact.city}}, {{contact.state}}"
}
```

### Custom fields to create in GHL
| Field Label | Key | Type |
|---|---|---|
| Demo Site URL | `demo_site_url` | Text |
| Demo Created At | `demo_created_at` | Text |
| Niche | `niche` | Dropdown or Text |
| Google Maps URL | `google_maps_url` | Text |
| Instagram URL | `instagram_url` | Text |

### Required environment variables
```
VERCEL_TOKEN
GHL_API_KEY
GHL_LOCATION_ID
GHL_WEBHOOK_SECRET
```

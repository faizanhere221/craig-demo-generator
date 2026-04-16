/**
 * Aussie Metal Roofer Template - Craig's Approved Design v2
 * 
 * Features:
 * - Gold color scheme (#d2ac33)
 * - Aussie metal/Colorbond roof images (configurable)
 * - "Built By Optimo Agency" footer
 * - Fully mobile responsive with hamburger menu
 * - Dynamic variables for company, phone, location
 * - Optional Instagram embed
 * - View & click tracking
 */

// Default images - UPDATE THESE URLs when Craig provides hosted images
const DEFAULT_IMAGES = {
  // Hero image - main hero section (right side)
  hero: 'https://www.allmetalroofing.com.au/wp-content/uploads/2021/03/roofing.jpg?auto=compress&cs=tinysrgb&w=1200',
  // About section image
  about: 'https://images.pexels.com/photos/31763537/pexels-photo-31763537.jpeg?auto=compress&cs=tinysrgb&w=800',
  // Gallery images
  gallery1: 'https://images.pexels.com/photos/11557060/pexels-photo-11557060.jpeg?auto=compress&cs=tinysrgb&w=800',
  gallery2: 'https://images.pexels.com/photos/31771166/pexels-photo-31771166.jpeg?auto=compress&cs=tinysrgb&w=600',
  gallery3: 'https://images.pexels.com/photos/2513975/pexels-photo-2513975.jpeg?auto=compress&cs=tinysrgb&w=600',
  gallery4: 'https://images.pexels.com/photos/31763541/pexels-photo-31763541.jpeg?auto=compress&cs=tinysrgb&w=600',
  gallery5: 'https://images.pexels.com/photos/31763534/pexels-photo-31763534.jpeg?auto=compress&cs=tinysrgb&w=600',
}

export function generateRooferHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  // Use custom images if provided, otherwise defaults
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  // Extract state from location (e.g., "Sydney, NSW" -> "NSW")
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  // Custom content or defaults
  const tagline = customContent?.tagline || 'Built Tough For The Australian Climate'
  const aboutText = customContent?.aboutText || `${companyName} is a family-owned business — not a franchise. We've been roofing homes and businesses across ${city} for over 15 years, and we know ${state}'s climate like the back of our hands.`

  // Google Maps section (only if URL provided)
  const googleMapsSection = googleMapsUrl ? `
<!-- GOOGLE MAPS SECTION -->
<section id="location" style="background: #fff; padding: 60px 8%;">
  <div class="sec-head" style="text-align: center;">
    <div class="stag">Find Us</div>
    <h2 class="sh">Our <em>Location</em></h2>
    <p class="ssub" style="margin: 0 auto;">Visit us or check out our Google reviews.</p>
  </div>
  <div style="max-width: 700px; margin: 40px auto 0; text-align: center;">
    <iframe 
      src="https://maps.google.com/maps?q=${encodeURIComponent(companyName + ' ' + location)}&output=embed&z=15"
      width="100%" 
      height="350" 
      style="border:0; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: var(--gold); color: #1a1a1a; padding: 14px 32px; border-radius: var(--r); font-weight: 700; text-decoration: none; font-size: 14px;">
      📍 View on Google Maps & Reviews
    </a>
  </div>
</section>
` : ''

  // Instagram section (only if URL provided)
  const instagramSection = instagramUrl ? `
<!-- INSTAGRAM SECTION -->
<section id="instagram" style="background: var(--off-white); padding: 60px 8%;">
  <div class="sec-head" style="text-align: center;">
    <div class="stag">Follow Our Work</div>
    <h2 class="sh">See Us On <em>Instagram</em></h2>
    <p class="ssub" style="margin: 0 auto;">Check out our latest projects and behind-the-scenes content.</p>
  </div>
  <div style="max-width: 540px; margin: 40px auto 0; text-align: center;">
    <blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>
    <script async src="https://www.instagram.com/embed.js"></script>
    <a href="${instagramUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 12px 28px; border-radius: var(--r); font-weight: 700; text-decoration: none; font-size: 14px;">
      📸 Follow Us on Instagram
    </a>
  </div>
</section>
` : ''

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${companyName} | Colorbond & Metal Roofing ${city}, ${state}</title>
<meta name="description" content="${companyName} provides professional Colorbond and metal roofing services in ${city}, ${state}. Call ${phone} for a free quote.">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --steel: #1c2b3a;
  --steel-mid: #263d52;
  --steel-light: #344f65;
  --gold: #d2ac33;
  --gold-dark: #b8962b;
  --gold-light: #e6c54a;
  --sky: #4a8fa8;
  --colorbond: #e8e0d0;
  --off-white: #f7f5f1;
  --border: #ddd9d0;
  --muted: #6b6560;
  --text: #1e1c1a;
  --heading-font: 'Bebas Neue', sans-serif;
  --body-font: 'Nunito Sans', sans-serif;
  --r: 6px;
}
html { scroll-behavior: smooth; }
body { font-family: var(--body-font); color: var(--text); background: var(--off-white); line-height: 1.6; }

/* ── DEMO RIBBON ── */
.demo-ribbon {
  position: fixed; top: 22px; right: -30px;
  background: var(--gold); color: #1a1a1a; font-size: 11px; font-weight: 800;
  padding: 5px 44px; transform: rotate(45deg);
  letter-spacing: 1.5px; z-index: 9999; text-transform: uppercase;
  font-family: var(--body-font);
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* ── PROMO BANNER ── */
.banner {
  background: var(--steel); color: #fff;
  text-align: center; padding: 11px 16px;
  font-size: 14px; font-weight: 700; letter-spacing: 0.2px;
  font-family: var(--body-font);
}
.banner strong { color: var(--gold); }
.banner span { opacity: 0.85; font-weight: 600; }

/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--steel);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 6%;
  height: 68px;
  border-bottom: 4px solid var(--gold);
}
.nav-logo {
  font-family: var(--heading-font); font-size: 26px;
  color: #fff; text-decoration: none; letter-spacing: 1px;
  line-height: 1;
}
.nav-logo em { color: var(--gold); font-style: normal; }
.nav-tagline {
  font-size: 10px; color: rgba(255,255,255,0.45);
  font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  display: block; margin-top: 1px;
}
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  color: rgba(255,255,255,0.7); text-decoration: none;
  font-size: 14px; font-weight: 600; transition: color 0.2s;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.nav-links a:hover { color: #fff; }
.nav-cta {
  background: var(--gold); color: #1a1a1a;
  padding: 10px 22px; border-radius: var(--r);
  font-size: 14px; font-weight: 700; text-decoration: none;
  text-transform: uppercase; letter-spacing: 0.5px;
  transition: background 0.2s;
}
.nav-cta:hover { background: var(--gold-light); }

/* Mobile Menu */
.mobile-toggle {
  display: none;
  background: none; border: none; cursor: pointer;
  width: 32px; height: 24px; position: relative;
}
.mobile-toggle span {
  display: block; width: 100%; height: 3px;
  background: #fff; border-radius: 2px;
  position: absolute; left: 0;
  transition: all 0.3s;
}
.mobile-toggle span:nth-child(1) { top: 0; }
.mobile-toggle span:nth-child(2) { top: 10px; }
.mobile-toggle span:nth-child(3) { top: 20px; }
.mobile-toggle.active span:nth-child(1) { top: 10px; transform: rotate(45deg); }
.mobile-toggle.active span:nth-child(2) { opacity: 0; }
.mobile-toggle.active span:nth-child(3) { top: 10px; transform: rotate(-45deg); }

.mobile-menu {
  display: none;
  position: fixed; top: 72px; left: 0; right: 0;
  background: var(--steel); padding: 20px;
  flex-direction: column; gap: 16px;
  border-bottom: 4px solid var(--gold);
  z-index: 99;
}
.mobile-menu.active { display: flex; }
.mobile-menu a {
  color: #fff; text-decoration: none;
  font-size: 16px; font-weight: 600;
  padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* ── HERO ── */
.hero {
  position: relative; min-height: 620px;
  display: grid; grid-template-columns: 1fr 1fr;
  overflow: hidden; background: var(--steel);
}
.hero-content {
  padding: 80px 5% 72px 8%;
  display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 2;
}
.hero-kicker {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(210,172,51,0.15); border: 1px solid rgba(210,172,51,0.4);
  color: var(--gold-light); font-size: 11px; font-weight: 800;
  padding: 6px 14px; border-radius: 40px;
  width: fit-content; margin-bottom: 22px;
  letter-spacing: 1.5px; text-transform: uppercase;
}
.hero h1 {
  font-family: var(--heading-font); font-size: 66px;
  color: #fff; line-height: 0.95;
  margin-bottom: 22px; letter-spacing: 1px;
}
.hero h1 em { color: var(--gold); font-style: normal; display: block; }
.hero-sub {
  color: rgba(255,255,255,0.68); font-size: 16px;
  max-width: 440px; margin-bottom: 36px; line-height: 1.75;
}
.hero-sub strong { color: rgba(255,255,255,0.9); font-weight: 700; }
.hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
.btn-gold {
  background: var(--gold); color: #1a1a1a;
  padding: 15px 30px; border-radius: var(--r);
  font-size: 15px; font-weight: 700; text-decoration: none;
  transition: background 0.2s; display: inline-block;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.btn-gold:hover { background: var(--gold-light); }
.btn-ghost {
  border: 2px solid rgba(255,255,255,0.25); color: #fff;
  padding: 13px 28px; border-radius: var(--r);
  font-size: 15px; font-weight: 700; text-decoration: none;
  transition: border-color 0.2s; display: inline-block;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.6); }
.hero-stats {
  display: flex; gap: 36px; margin-top: 44px;
  padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.1);
}
.h-stat .num {
  font-family: var(--heading-font); font-size: 42px; color: #fff; line-height: 1;
}
.h-stat .lbl { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

/* Hero image panel */
.hero-img {
  position: relative; overflow: hidden;
}
.hero-img img {
  width: 100%; height: 100%; object-fit: cover;
}
.hero-img::before {
  content: ''; position: absolute; top: 0; left: -40px; bottom: 0;
  width: 80px; background: var(--steel);
  clip-path: polygon(40px 0, 100% 0, 60px 100%, 0 100%);
  z-index: 2;
}
.hero-badge {
  position: absolute; bottom: 32px; right: 28px; z-index: 3;
  background: var(--gold); color: #1a1a1a;
  padding: 16px 22px; border-radius: var(--r);
  text-align: center;
}
.hero-badge .big { font-family: var(--heading-font); font-size: 36px; line-height: 1; }
.hero-badge .sm { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }

/* ── BRAND BAR ── */
.brand-bar {
  background: #fff; border-bottom: 1px solid var(--border);
  padding: 18px 8%;
  display: flex; align-items: center; justify-content: center;
  gap: 48px; flex-wrap: wrap;
}
.brand-label {
  font-size: 11px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 1.5px; color: var(--muted);
}
.brand-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700; color: var(--steel);
}
.brand-dot {
  width: 10px; height: 10px; border-radius: 50%;
  flex-shrink: 0;
}

/* ── TRUST BAR ── */
.trust-bar {
  background: var(--off-white); border-bottom: 1px solid var(--border);
  padding: 22px 8%;
  display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;
}
.trust-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700; color: var(--steel);
}
.t-icon {
  width: 36px; height: 36px; background: var(--gold);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: #1a1a1a; font-size: 15px; flex-shrink: 0;
}

/* ── SECTIONS GENERAL ── */
section { padding: 84px 8%; }
.stag {
  font-size: 11px; font-weight: 800; color: var(--gold);
  text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;
}
.sh {
  font-family: var(--heading-font); font-size: 52px;
  color: var(--steel); line-height: 0.95; margin-bottom: 18px;
}
.sh em { color: var(--gold); font-style: normal; }
.ssub {
  font-size: 17px; color: var(--muted);
  max-width: 560px; line-height: 1.7;
}
.sec-head { margin-bottom: 56px; }

/* ── SERVICES ── */
#services { background: #fff; }
.services-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
}
.svc-card {
  background: var(--off-white); border-radius: var(--r);
  padding: 30px 26px; border: 1px solid var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.svc-card::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; background: var(--gold);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s;
}
.svc-card:hover::after { transform: scaleX(1); }
.svc-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
.svc-icon { font-size: 30px; margin-bottom: 16px; display: block; }
.svc-card h3 {
  font-family: var(--heading-font); font-size: 24px;
  color: var(--steel); margin-bottom: 10px; letter-spacing: 0.5px;
}
.svc-card p { font-size: 14px; color: var(--muted); line-height: 1.7; }
.svc-brand {
  display: inline-block; margin-top: 12px;
  background: var(--gold); color: #1a1a1a;
  font-size: 11px; font-weight: 800; padding: 4px 10px;
  border-radius: 3px; letter-spacing: 0.5px; text-transform: uppercase;
}

/* ── ABOUT ── */
#about { background: var(--steel); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.about-img { position: relative; }
.about-img img {
  width: 100%; border-radius: var(--r); display: block;
}
.about-exp {
  position: absolute; top: -20px; right: -20px;
  background: var(--gold); color: #1a1a1a;
  padding: 22px 26px; border-radius: var(--r); text-align: center;
}
.about-exp .big { font-family: var(--heading-font); font-size: 44px; line-height: 1; }
.about-exp .sm { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.about-content .sh { color: #fff; }
.about-content p { color: rgba(255,255,255,0.62); font-size: 16px; line-height: 1.8; margin-bottom: 24px; }
.about-checks { display: flex; flex-direction: column; gap: 13px; }
.acheck {
  display: flex; align-items: flex-start; gap: 12px;
  color: rgba(255,255,255,0.85); font-size: 15px; font-weight: 600;
}
.acheck-dot {
  width: 22px; height: 22px; background: var(--gold);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; flex-shrink: 0; color: #1a1a1a; font-size: 11px; margin-top: 2px;
}

/* ── GALLERY ── */
#gallery { background: var(--off-white); }
.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 240px 240px;
  gap: 12px;
}
.g-item { border-radius: var(--r); overflow: hidden; position: relative; }
.g-item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s; display: block;
}
.g-item:hover img { transform: scale(1.05); }
.g-item.tall { grid-row: span 2; }
.g-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.72));
  color: #fff; padding: 28px 16px 14px;
  font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
}

/* ── TESTIMONIALS ── */
#testimonials { background: #fff; }
.t-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.t-card {
  background: var(--off-white); border-radius: var(--r);
  padding: 28px 24px; border: 1px solid var(--border);
  position: relative;
}
.t-card::before {
  content: '"'; position: absolute; top: 16px; right: 22px;
  font-family: var(--heading-font); font-size: 72px;
  color: var(--border); line-height: 1;
}
.t-stars { color: var(--gold); font-size: 15px; margin-bottom: 14px; }
.t-text {
  font-size: 15px; color: var(--muted); line-height: 1.75;
  margin-bottom: 22px; font-style: italic; position: relative; z-index: 1;
}
.t-author { display: flex; align-items: center; gap: 12px; }
.t-av {
  width: 42px; height: 42px; background: var(--steel);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-family: var(--heading-font);
  font-size: 18px; font-weight: 700; color: #fff;
}
.t-name { font-size: 14px; font-weight: 700; color: var(--steel); }
.t-loc { font-size: 13px; color: var(--muted); }

/* ── CTA STRIP ── */
.cta-strip {
  background: var(--gold);
  padding: 64px 8%;
  display: flex; justify-content: space-between; align-items: center; gap: 32px;
  flex-wrap: wrap;
}
.cta-strip h2 {
  font-family: var(--heading-font); font-size: 48px;
  color: #1a1a1a; line-height: 1; letter-spacing: 0.5px;
}
.cta-strip p { color: rgba(0,0,0,0.7); font-size: 16px; margin-top: 8px; }
.btn-wt {
  background: var(--steel); color: #fff;
  padding: 16px 34px; border-radius: var(--r);
  font-size: 15px; font-weight: 800; text-decoration: none;
  white-space: nowrap; text-transform: uppercase;
  letter-spacing: 0.5px; transition: background 0.2s;
}
.btn-wt:hover { background: var(--steel-mid); }

/* ── CONTACT ── */
#contact { background: var(--off-white); }
.contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 64px; align-items: start; }
.contact-items { display: flex; flex-direction: column; gap: 26px; }
.c-item { display: flex; gap: 16px; align-items: flex-start; }
.c-ico {
  width: 48px; height: 48px; background: var(--steel);
  border-radius: var(--r); display: flex; align-items: center;
  justify-content: center; color: #fff; font-size: 20px; flex-shrink: 0;
}
.c-item h4 { font-size: 15px; font-weight: 700; color: var(--steel); margin-bottom: 3px; }
.c-item p, .c-item a { font-size: 14px; color: var(--muted); text-decoration: none; display: block; line-height: 1.6; }
.c-item a:hover { color: var(--gold); }

.c-form { background: #fff; border-radius: var(--r); border: 1px solid var(--border); padding: 40px; }
.c-form h3 {
  font-family: var(--heading-font); font-size: 32px;
  color: var(--steel); margin-bottom: 4px;
}
.c-form .sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; font-weight: 600; }
.fg { margin-bottom: 18px; }
.fg label { display: block; font-size: 12px; font-weight: 800; color: var(--muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
.fg input, .fg select, .fg textarea {
  width: 100%; border: 1.5px solid var(--border); border-radius: var(--r);
  padding: 12px 14px; font-size: 14px; font-family: var(--body-font);
  color: var(--text); background: var(--off-white);
  transition: border-color 0.2s; outline: none;
}
.fg input:focus, .fg select:focus, .fg textarea:focus { border-color: var(--gold); background: #fff; }
.fg textarea { resize: vertical; min-height: 100px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.f-submit {
  width: 100%; background: var(--gold); color: #1a1a1a;
  border: none; padding: 15px; border-radius: var(--r);
  font-size: 15px; font-weight: 800; cursor: pointer;
  font-family: var(--body-font); text-transform: uppercase; letter-spacing: 0.5px;
  transition: background 0.2s; margin-top: 6px;
}
.f-submit:hover { background: var(--gold-light); }
.f-note { font-size: 12px; color: var(--muted); margin-top: 10px; text-align: center; }

/* ── FOOTER ── */
footer {
  background: var(--steel); color: rgba(255,255,255,0.5);
  padding: 32px 8%;
  border-top: 4px solid var(--gold);
  text-align: center;
  font-size: 14px;
}
.f-logo { font-family: var(--heading-font); font-size: 22px; color: #fff; margin-bottom: 12px; }
.f-logo em { color: var(--gold); font-style: normal; }
.f-info { margin-bottom: 16px; }
.f-optimo { 
  margin-top: 16px; 
  padding-top: 16px; 
  border-top: 1px solid rgba(255,255,255,0.1);
}
.f-optimo a { 
  color: var(--gold); 
  text-decoration: none; 
  font-weight: 600;
  transition: color 0.2s;
}
.f-optimo a:hover { color: #fff; }

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; min-height: auto; }
  .hero-content { padding: 60px 6% 50px; }
  .hero h1 { font-size: 44px; }
  .hero-img { display: none; }
  .hero-stats { gap: 24px; flex-wrap: wrap; }
  .h-stat .num { font-size: 32px; }
  .services-grid { grid-template-columns: 1fr 1fr; }
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-img { order: 2; }
  .about-exp { top: auto; bottom: -15px; right: 15px; padding: 16px 20px; }
  .about-exp .big { font-size: 32px; }
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .g-item.tall { grid-row: span 1; }
  .t-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .cta-strip { text-align: center; justify-content: center; }
  .cta-strip h2 { font-size: 36px; }
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
  .brand-bar { gap: 20px; padding: 14px 6%; }
  .trust-bar { gap: 20px; padding: 16px 6%; }
  .sh { font-size: 38px; }
  section { padding: 60px 6%; }
}

@media (max-width: 600px) {
  .hero h1 { font-size: 36px; }
  .hero-btns { flex-direction: column; }
  .hero-btns a { width: 100%; text-align: center; }
  .hero-stats { flex-direction: column; gap: 16px; padding-top: 24px; margin-top: 24px; }
  .services-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .c-form { padding: 24px; }
  .cta-strip h2 { font-size: 28px; }
  .sh { font-size: 32px; }
  .brand-bar, .trust-bar { flex-direction: column; gap: 12px; text-align: center; }
  .trust-item, .brand-item { justify-content: center; }
}
</style>
</head>
<body>

<div class="demo-ribbon">Demo</div>

<!-- BANNER -->
<div class="banner">
  ⛈ Wet season approaching — <strong>book your free roof inspection now</strong> before the storm damage queue fills up. <span>Limited spots available.</span>
</div>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    ${companyName.split(' ')[0]} <em>${companyName.split(' ').slice(1).join(' ') || 'Roofing'}</em>
    <span class="nav-tagline">Metal & Colorbond Specialists</span>
  </a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="${calendarUrl}" target="_blank" class="nav-cta">Free Quote</a>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#gallery">Gallery</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-kicker">☀ Colorbond & Metal Roofing Specialists</div>
    <h1>${tagline.split(' ').slice(0, 2).join(' ')} <em>${tagline.split(' ').slice(2).join(' ')}</em></h1>
    <p class="hero-sub">
      <strong>Extreme heat. Howling winds. Torrential downpours.</strong> Your roof cops it all — and a cheap fix won't cut it. We install metal and Colorbond® roofing built to outlast ${state}'s harshest conditions.
    </p>
    <div class="hero-btns">
      <a href="${calendarUrl}" target="_blank" class="btn-gold" data-track="book_call">Get a Free Quote</a>
      <a href="tel:${phoneClean}" class="btn-ghost" data-track="phone_click">📞 ${phone}</a>
    </div>
    <div class="hero-stats">
      <div class="h-stat"><div class="num">15+</div><div class="lbl">Years Experience</div></div>
      <div class="h-stat"><div class="num">500+</div><div class="lbl">Roofs Completed</div></div>
      <div class="h-stat"><div class="num">4.9★</div><div class="lbl">Google Rating</div></div>
    </div>
  </div>
  <div class="hero-img">
    <img src="${images.hero}" alt="Metal roof with blue sky">
    <div class="hero-badge">
      <div class="big">100%</div>
      <div class="sm">Aussie Made</div>
    </div>
  </div>
</section>

<!-- BRAND BAR -->
<div class="brand-bar">
  <span class="brand-label">Authorised Installer</span>
  <div class="brand-item"><div class="brand-dot" style="background:#465d4c;"></div> COLORBOND® Steel</div>
  <div class="brand-item"><div class="brand-dot" style="background:#7a7a7a;"></div> ZINCALUME® Steel</div>
  <div class="brand-item"><div class="brand-dot" style="background:#1e3a5f;"></div> BlueScope Steel</div>
</div>

<!-- TRUST BAR -->
<div class="trust-bar">
  <div class="trust-item"><div class="t-icon">✓</div> Fully Licensed & Insured</div>
  <div class="trust-item"><div class="t-icon">⚡</div> Same-Day Emergency Service</div>
  <div class="trust-item"><div class="t-icon">💰</div> Free No-Obligation Quotes</div>
  <div class="trust-item"><div class="t-icon">🏆</div> 15+ Years Experience</div>
</div>

<!-- SERVICES -->
<section id="services">
  <div class="sec-head">
    <div class="stag">Our Services</div>
    <h2 class="sh">What We <em>Do Best</em></h2>
    <p class="ssub">From full re-roofs to emergency repairs, we handle every metal and Colorbond roofing job across ${city} and surrounds.</p>
  </div>
  <div class="services-grid">
    <div class="svc-card">
      <span class="svc-icon">🏠</span>
      <h3>Colorbond Re-Roofing</h3>
      <p>Strip your old roof and install brand new Colorbond® steel in any of 22 colours. We handle the full job from gutters to ridge caps.</p>
      <span class="svc-brand">Most Popular</span>
    </div>
    <div class="svc-card">
      <span class="svc-icon">🔧</span>
      <h3>Roof Repairs</h3>
      <p>Leaks, rust, storm damage — we fix it fast. Most repairs completed same-day with quality materials that last.</p>
    </div>
    <div class="svc-card">
      <span class="svc-icon">🏗️</span>
      <h3>New Roof Construction</h3>
      <p>Building a new home or extension? We work with builders and homeowners to install roofs that meet all Australian standards.</p>
    </div>
    <div class="svc-card">
      <span class="svc-icon">🌊</span>
      <h3>Coastal Roofing</h3>
      <p>Near the coast? We use Colorbond® Ultra with extra corrosion resistance for salt air environments.</p>
      <span class="svc-brand">Coastal Rated</span>
    </div>
    <div class="svc-card">
      <span class="svc-icon">💧</span>
      <h3>Gutters & Downpipes</h3>
      <p>Custom-made Colorbond® guttering to match your roof. We install, repair, and replace gutters that actually work.</p>
    </div>
    <div class="svc-card">
      <span class="svc-icon">⛈️</span>
      <h3>Storm Damage Repairs</h3>
      <p>Emergency call-outs 7 days a week. We tarp immediately and schedule permanent repairs ASAP.</p>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="about-grid">
    <div class="about-img">
      <img src="${images.about}" alt="Professional roofer at work">
      <div class="about-exp">
        <div class="big">15+</div>
        <div class="sm">Years in<br>${city}</div>
      </div>
    </div>
    <div class="about-content">
      <div class="stag">About Us</div>
      <h2 class="sh">Local Roofers Who <em>Know ${state}</em></h2>
      <p>${aboutText}</p>
      <p>We don't subcontract. Every job is done by our own licensed tradespeople, and we stand behind every single roof we put on. If something's not right, we come back and fix it — no arguments, no excuses.</p>
      <div class="about-checks">
        <div class="acheck"><div class="acheck-dot">✓</div> Fully licensed under the ${state} Building Act</div>
        <div class="acheck"><div class="acheck-dot">✓</div> $20M public liability + WorkCover insurance</div>
        <div class="acheck"><div class="acheck-dot">✓</div> Authorised COLORBOND® and BlueScope Steel installer</div>
        <div class="acheck"><div class="acheck-dot">✓</div> All work compliant with AS1562 and NCC requirements</div>
        <div class="acheck"><div class="acheck-dot">✓</div> Free written quotes — what we quote is what you pay</div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section id="gallery">
  <div class="sec-head">
    <div class="stag">Our Work</div>
    <h2 class="sh">Recent <em>Projects</em></h2>
    <p class="ssub">All completed by our own team across ${city} and surrounds.</p>
  </div>
  <div class="gallery-grid">
    <div class="g-item tall">
      <img src="${images.gallery1}" alt="Colorbond metal roof">
      <div class="g-label">Colorbond® Re-Roof — Ironstone</div>
    </div>
    <div class="g-item">
      <img src="${images.gallery2}" alt="Metal roof installation">
      <div class="g-label">New Build Install</div>
    </div>
    <div class="g-item">
      <img src="${images.gallery3}" alt="Corrugated metal roof">
      <div class="g-label">Metal Roof Restoration</div>
    </div>
    <div class="g-item">
      <img src="${images.gallery4}" alt="Storm damage repair">
      <div class="g-label">Storm Damage Repair</div>
    </div>
    <div class="g-item">
      <img src="${images.gallery5}" alt="Guttering installation">
      <div class="g-label">Colorbond® Guttering</div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials">
  <div class="sec-head">
    <div class="stag">Reviews</div>
    <h2 class="sh">What Our <em>Customers Say</em></h2>
    <p class="ssub">Real customers from across ${city}. We don't ask for reviews — they just happen when the job's done right.</p>
  </div>
  <div class="t-grid">
    <div class="t-card">
      <div class="t-stars">★★★★★</div>
      <p class="t-text">"Had a full Colorbond re-roof done in Woodland Grey. The crew were on site every day without fail, cleaned up after themselves, and the end result looks amazing. Already had neighbours asking who did it."</p>
      <div class="t-author">
        <div class="t-av">MB</div>
        <div><div class="t-name">Mark B.</div><div class="t-loc">${city}, ${state}</div></div>
      </div>
    </div>
    <div class="t-card">
      <div class="t-stars">★★★★★</div>
      <p class="t-text">"Called them on a Sunday after a storm ripped back a section of our iron roof. They were out within three hours with a tarp, and had the permanent repair done by Tuesday. No drama, fair price."</p>
      <div class="t-author">
        <div class="t-av">TC</div>
        <div><div class="t-name">Trace C.</div><div class="t-loc">${city}, ${state}</div></div>
      </div>
    </div>
    <div class="t-card">
      <div class="t-stars">★★★★★</div>
      <p class="t-text">"We're in a coastal area and our old Zincalume was shot. They specified Colorbond Ultra for us — three years on and it still looks brand new. Highly recommend."</p>
      <div class="t-author">
        <div class="t-av">SH</div>
        <div><div class="t-name">Sharon H.</div><div class="t-loc">${city}, ${state}</div></div>
      </div>
    </div>
  </div>
</section>

${instagramSection}

${googleMapsSection}

<!-- CTA STRIP -->
<div class="cta-strip">
  <div>
    <h2>Ready To Sort Your Roof Out?</h2>
    <p>Free quotes. No obligation. We call back within 2 hours on business days.</p>
  </div>
  <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:center; justify-content:center;">
    <a href="${calendarUrl}" target="_blank" class="btn-wt" data-track="book_call">Book a Free Quote</a>
    <a href="tel:${phoneClean}" class="btn-ghost" style="color:#1a1a1a; border-color:rgba(0,0,0,0.3);" data-track="phone_click">📞 ${phone}</a>
  </div>
</div>

<!-- CONTACT -->
<section id="contact">
  <div class="sec-head">
    <div class="stag">Get In Touch</div>
    <h2 class="sh">Contact <em>Us Today</em></h2>
    <p class="ssub">Got a question or need a quote? Fill in the form and we'll come back to you within 2 hours during business hours.</p>
  </div>
  <div class="contact-grid">
    <div class="contact-items">
      <div class="c-item">
        <div class="c-ico">📞</div>
        <div>
          <h4>Call us</h4>
          <a href="tel:${phoneClean}">${phone}</a>
          <p>Mon–Fri 7am–5pm · Sat 7am–1pm</p>
        </div>
      </div>
      <div class="c-item">
        <div class="c-ico">📍</div>
        <div>
          <h4>Service area</h4>
          <p>${city} and surrounding areas within 60km</p>
          <p>Emergency call-outs available statewide</p>
        </div>
      </div>
      <div class="c-item">
        <div class="c-ico">🕐</div>
        <div>
          <h4>Hours</h4>
          <p>Monday – Friday: 7:00am – 5:00pm</p>
          <p>Saturday: 7:00am – 1:00pm</p>
        </div>
      </div>
    </div>
    <div class="c-form">
      <h3>Request a Free Quote</h3>
      <p class="sub">No obligation — we'll get back to you within 2 hours.</p>
      <div class="form-row">
        <div class="fg"><label>First Name *</label><input type="text" placeholder="Your first name"></div>
        <div class="fg"><label>Last Name *</label><input type="text" placeholder="Your last name"></div>
      </div>
      <div class="form-row">
        <div class="fg"><label>Phone *</label><input type="tel" placeholder="0400 000 000"></div>
        <div class="fg"><label>Suburb *</label><input type="text" placeholder="Your suburb"></div>
      </div>
      <div class="fg">
        <label>Service Needed *</label>
        <select>
          <option value="">Select a service...</option>
          <option>Colorbond Re-Roofing</option>
          <option>Metal Roof Repairs</option>
          <option>New Roof Construction</option>
          <option>Coastal Roofing (Colorbond Ultra)</option>
          <option>Guttering & Downpipes</option>
          <option>Emergency Storm Repair</option>
          <option>Roof Inspection & Report</option>
          <option>Other</option>
        </select>
      </div>
      <div class="fg">
        <label>Tell us about the job</label>
        <textarea placeholder="Size of the roof, what's happening, how urgent — anything helps us quote faster."></textarea>
      </div>
      <button class="f-submit" onclick="window.open('${calendarUrl}', '_blank')">Get My Free Quote →</button>
      <p class="f-note">We respond within 2 hours on business days. Your details stay with us — no spam, ever.</p>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="f-logo">${companyName.split(' ')[0]} <em>${companyName.split(' ').slice(1).join(' ') || 'Roofing'}</em></div>
  <div class="f-info">© 2026 ${companyName} · ${city}, ${state} · Serving all of ${state}</div>
  <div class="f-optimo">
    <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
  </div>
</footer>

<!-- TRACKING SCRIPT -->
<script>
(function() {
  const trackingId = '${trackingId}';
  const trackingEndpoint = '${trackingEndpoint}';
  
  function trackEvent(eventType) {
    try {
      const data = {
        id: trackingId,
        event: eventType,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        screen: window.screen.width + 'x' + window.screen.height,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      };
      
      fetch(trackingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: 'cors'
      }).catch(() => {});
      
      console.log('📊 Tracked:', eventType);
    } catch (e) {}
  }
  
  if (document.readyState === 'complete') {
    trackEvent('view');
  } else {
    window.addEventListener('load', () => trackEvent('view'));
  }
  
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', function() {
      trackEvent(this.getAttribute('data-track'));
    });
  });
  
  document.querySelectorAll('a[href^="tel:"], a[href*="leadconnectorhq"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent(this.href.includes('tel:') ? 'phone_click' : 'book_call_click');
    });
  });
})();
</script>

</body>
</html>`
}
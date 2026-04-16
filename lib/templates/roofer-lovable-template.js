/**
 * Lovable Roofer Template - Craig's Premium Design
 * 
 * Converted from React/Tailwind to pure HTML/CSS
 * Features:
 * - Modern dark steel + warm orange color scheme
 * - Framer Motion-style animations (CSS)
 * - Clean typography (Bebas Neue + DM Sans)
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram & Google Maps embeds
 * - Sticky mobile CTA bar
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  hero: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/hero-roof.jpg',
  roofDetail: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/roof-detail.jpg',
}

export function generateRooferLovableHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const phoneWA = '61' + phoneClean.replace(/^0/, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'

  // Google Maps section
  const googleMapsSection = googleMapsUrl ? `
<!-- GOOGLE MAPS SECTION -->
<section id="location" class="section bg-background">
  <div class="container">
    <div class="section-header animate-fade-up">
      <p class="section-tag">Find Us</p>
      <h2 class="section-title">Our Location</h2>
    </div>
    <div style="max-width: 700px; margin: 0 auto; text-align: center;">
      <iframe 
        src="https://maps.google.com/maps?q=${encodeURIComponent(companyName + ', ' + location + ', Australia')}&output=embed&z=14"
        width="100%" 
        height="350" 
        style="border:0; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);" 
        allowfullscreen="" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
      <a href="${googleMapsUrl}" target="_blank" class="btn-primary" style="margin-top: 24px; display: inline-flex;">
        📍 View on Google Maps & Reviews
      </a>
      <p style="margin-top: 12px; font-size: 13px; color: var(--muted-foreground);">
        Click above to see our reviews and exact location
      </p>
    </div>
  </div>
</section>
` : ''

  // Instagram section
  const instagramSection = instagramUrl ? `
<!-- INSTAGRAM SECTION -->
<section id="instagram" class="section bg-muted">
  <div class="container">
    <div class="section-header animate-fade-up">
      <p class="section-tag">Follow Our Work</p>
      <h2 class="section-title">See Us On Instagram</h2>
    </div>
    <div style="max-width: 540px; margin: 0 auto; text-align: center;">
      <blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>
      <script async src="https://www.instagram.com/embed.js"></script>
      <a href="${instagramUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 15px;">
        📸 Follow Us on Instagram
      </a>
    </div>
  </div>
</section>
` : ''

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${companyName} | Metal Roofing Specialists ${city}, ${state}</title>
<meta name="description" content="${companyName} - Metal roofing specialists in ${city}, ${state}. New roofs, replacements, repairs & ventilation. Call ${phone} for a free quote.">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* CSS Variables - Lovable Theme */
:root {
  --background: hsl(210, 20%, 98%);
  --foreground: hsl(220, 25%, 10%);
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(220, 25%, 10%);
  --muted: hsl(210, 15%, 93%);
  --muted-foreground: hsl(220, 10%, 45%);
  --border: hsl(210, 15%, 88%);
  --steel: hsl(215, 20%, 22%);
  --steel-foreground: hsl(210, 15%, 93%);
  --warm: hsl(35, 90%, 55%);
  --warm-foreground: hsl(0, 0%, 100%);
  --radius: 0.5rem;
}

/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--background);
  color: var(--foreground);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; height: auto; display: block; }

/* Layout */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section { padding: 96px 0; }
.section-header { text-align: center; margin-bottom: 64px; }
.section-tag { 
  color: var(--warm); 
  font-weight: 600; 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
  font-size: 14px; 
  margin-bottom: 8px; 
}
.section-title { font-size: clamp(40px, 8vw, 64px); color: var(--foreground); line-height: 1; }
.bg-background { background: var(--background); }
.bg-muted { background: var(--muted); }
.bg-steel { background: var(--steel); color: var(--steel-foreground); }

/* Demo Ribbon */
.demo-ribbon {
  position: fixed;
  top: 20px;
  right: -35px;
  background: linear-gradient(135deg, var(--warm) 0%, hsl(25, 95%, 48%) 100%);
  color: white;
  padding: 6px 40px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: rotate(45deg);
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: transparent;
}
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}
.navbar-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.navbar-brand .name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: var(--steel-foreground);
  transition: color 0.3s;
}
.navbar.scrolled .navbar-brand .name { color: var(--foreground); }
.navbar-brand .sub {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  transition: color 0.3s;
}
.navbar.scrolled .navbar-brand .sub { color: var(--muted-foreground); }
.navbar-links {
  display: none;
  align-items: center;
  gap: 32px;
}
.navbar-links a {
  font-weight: 500;
  font-size: 14px;
  color: var(--steel-foreground);
  transition: color 0.2s;
}
.navbar.scrolled .navbar-links a { color: var(--foreground); }
.navbar-links a:hover { color: var(--warm); }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--warm);
  color: var(--warm-foreground);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}
.btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(255,255,255,0.3);
  color: var(--steel-foreground);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  background: transparent;
}
.btn-secondary:hover { background: rgba(255,255,255,0.1); }
.mobile-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.mobile-toggle span {
  width: 24px;
  height: 2px;
  background: var(--steel-foreground);
  transition: all 0.3s;
}
.navbar.scrolled .mobile-toggle span { background: var(--foreground); }
.mobile-menu {
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-top: 1px solid var(--border);
  flex-direction: column;
  gap: 16px;
}
.mobile-menu.active { display: flex; }
.mobile-menu a {
  font-weight: 500;
  color: var(--foreground);
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.mobile-menu a:hover { color: var(--warm); }

@media (min-width: 768px) {
  .navbar-links { display: flex; }
  .mobile-toggle { display: none; }
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
}
.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(38, 47, 58, 0.92), rgba(38, 47, 58, 0.7), rgba(38, 47, 58, 0.3));
}
.hero-content {
  position: relative;
  z-index: 10;
  max-width: 680px;
  padding: 120px 0 80px;
  text-align: left;
}
.hero-tag {
  color: var(--warm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: left;
}
.hero-title {
  font-size: clamp(48px, 10vw, 96px);
  line-height: 0.9;
  color: var(--steel-foreground);
  margin-bottom: 24px;
  text-align: left;
}
.hero-title .gradient {
  background: linear-gradient(135deg, var(--warm), hsl(25, 95%, 48%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 18px;
  color: rgba(255,255,255,0.8);
  max-width: 520px;
  margin-bottom: 32px;
  line-height: 1.7;
  text-align: left;
}
.hero-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}
.hero-btns .btn-primary { padding: 16px 32px; font-size: 18px; }
.hero-btns .btn-secondary { padding: 16px 32px; font-size: 18px; }
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.5);
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

/* Services Section */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}
.service-card {
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}
.service-card:hover {
  border-color: rgba(232, 152, 48, 0.4);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  transform: translateY(-4px);
}
.service-icon {
  width: 56px;
  height: 56px;
  background: rgba(232, 152, 48, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: background 0.3s;
}
.service-card:hover .service-icon { background: rgba(232, 152, 48, 0.2); }
.service-icon svg { width: 28px; height: 28px; color: var(--warm); }
.service-card h3 {
  font-size: 24px;
  color: var(--foreground);
  margin-bottom: 12px;
}
.service-card p {
  color: var(--muted-foreground);
  line-height: 1.7;
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  align-items: center;
}
@media (min-width: 1024px) {
  .about-grid { grid-template-columns: 1fr 1fr; }
}
.about-text h2 {
  font-size: clamp(40px, 6vw, 56px);
  color: var(--foreground);
  margin-bottom: 24px;
  line-height: 1;
}
.about-text p {
  color: var(--muted-foreground);
  margin-bottom: 16px;
  line-height: 1.8;
}
.about-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
}
.about-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  color: var(--foreground);
}
.about-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--warm);
}
.about-image {
  position: relative;
}
.about-image img {
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  aspect-ratio: 4/3;
  object-fit: cover;
  width: 100%;
}
.about-badge-floating {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: var(--warm);
  color: var(--warm-foreground);
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(232, 152, 48, 0.3);
}
.about-badge-floating .num { font-family: 'Bebas Neue', sans-serif; font-size: 36px; }
.about-badge-floating .label { font-size: 14px; }

/* Trust Section */
.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}
.trust-item {
  text-align: center;
}
.trust-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(232, 152, 48, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.trust-icon svg { width: 32px; height: 32px; color: var(--warm); }
.trust-item h3 { font-size: 24px; margin-bottom: 8px; }
.trust-item p { color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; }

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  max-width: 1000px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: 1fr 1fr; }
}
.contact-info { display: flex; flex-direction: column; gap: 32px; }
.contact-item {
  display: flex;
  gap: 16px;
}
.contact-icon {
  width: 48px;
  height: 48px;
  background: rgba(232, 152, 48, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-icon svg { width: 24px; height: 24px; color: var(--warm); }
.contact-item h3 { font-size: 20px; color: var(--foreground); margin-bottom: 4px; }
.contact-item p, .contact-item a { color: var(--muted-foreground); font-size: 15px; }
.contact-item a:hover { color: var(--warm); }
.contact-box {
  background: var(--muted);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.contact-box span { font-weight: 600; color: var(--foreground); }
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-group label {
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: var(--foreground);
  margin-bottom: 6px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  background: var(--card);
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 15px;
  color: var(--foreground);
  transition: all 0.2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--warm);
  box-shadow: 0 0 0 3px rgba(232, 152, 48, 0.15);
}
.form-group textarea { resize: none; min-height: 120px; }
.contact-form .btn-primary {
  width: 100%;
  justify-content: center;
  padding: 16px;
  font-size: 18px;
}

/* Footer */
.footer {
  background: var(--steel);
  color: var(--steel-foreground);
  padding: 48px 0;
}
.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}
@media (min-width: 768px) {
  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
.footer-brand { font-family: 'Bebas Neue', sans-serif; font-size: 24px; }
.footer-brand span { color: rgba(255,255,255,0.6); font-size: 14px; font-family: 'DM Sans', sans-serif; display: block; margin-top: 4px; }
.footer-info { color: rgba(255,255,255,0.6); font-size: 14px; }
.footer-optimo { margin-top: 8px; }
.footer-optimo a { color: var(--warm); font-weight: 600; transition: opacity 0.2s; }
.footer-optimo a:hover { opacity: 0.8; }

/* Reviews Carousel */
.reviews { padding: 96px 0; background: var(--steel); overflow: hidden; }
.reviews-header { text-align: center; margin-bottom: 48px; }
.reviews-rating { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 16px; flex-wrap: wrap; }
.reviews-rating .rating-badge { display: flex; align-items: center; gap: 0.5rem; background: rgba(255, 255, 255, 0.1); padding: 0.5rem 1rem; border-radius: 50px; }
.reviews-rating .rating-score { font-size: 1.5rem; color: #fff; font-weight: 700; font-family: 'Bebas Neue', sans-serif; }
.reviews-rating .rating-stars { display: flex; gap: 2px; }
.reviews-rating .rating-stars .star { width: 1.25rem; height: 1.25rem; color: #FBBC04; fill: #FBBC04; }
.reviews-rating .rating-count { color: rgba(255, 255, 255, 0.6); font-size: 0.875rem; }
.reviews-carousel-wrapper { position: relative; padding: 0 3rem; max-width: 1400px; margin: 0 auto; }
.reviews-carousel { display: flex; gap: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; padding: 1rem 0; }
.reviews-carousel::-webkit-scrollbar { display: none; }
.review-card { flex: 0 0 340px; scroll-snap-align: start; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; transition: all 0.3s; }
.review-card:hover { border-color: var(--warm); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
.review-card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.review-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--warm) 0%, hsl(25, 95%, 48%) 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 1rem; overflow: hidden; }
.review-avatar img { width: 100%; height: 100%; object-fit: cover; }
.review-author-info h4 { font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 0.125rem; font-family: 'DM Sans', sans-serif; }
.review-author-info .review-time { color: rgba(255, 255, 255, 0.5); font-size: 0.8rem; }
.review-card .review-stars { display: flex; gap: 2px; margin-bottom: 0.75rem; }
.review-card .review-stars .star { width: 1rem; height: 1rem; color: #FBBC04; fill: #FBBC04; }
.review-card .review-text { color: rgba(255, 255, 255, 0.85); font-size: 0.9rem; line-height: 1.65; flex: 1; }
.review-card .review-source { display: flex; align-items: center; gap: 0.5rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.5); font-size: 0.75rem; }
.review-card .review-source svg { width: 16px; height: 16px; }
.carousel-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: var(--warm); border: none; border-radius: 50%; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 10; }
.carousel-nav:hover { transform: translateY(-50%) scale(1.1); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
.carousel-nav.prev { left: 0; }
.carousel-nav.next { right: 0; }
.carousel-nav svg { width: 20px; height: 20px; }
.carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem; }
.carousel-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.3); border: none; cursor: pointer; transition: all 0.2s; }
.carousel-dot.active { background: var(--warm); width: 24px; border-radius: 4px; }
.reviews-cta { text-align: center; margin-top: 2rem; }
.reviews-cta a { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--warm); font-weight: 600; font-size: 0.9rem; transition: opacity 0.2s; }
.reviews-cta a:hover { opacity: 0.8; }
.reviews-cta svg { width: 18px; height: 18px; }
@media (max-width: 768px) {
  .reviews-carousel-wrapper { padding: 0 1rem; }
  .review-card { flex: 0 0 300px; padding: 1.5rem; }
  .carousel-nav { display: none; }
  .reviews { padding: 64px 0; }
}

/* Sticky Bottom Bar */
.sticky-cta {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--steel) 0%, hsl(215, 25%, 18%) 100%);
  padding: 12px 16px;
  z-index: 9999;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  border-top: 2px solid var(--warm);
  gap: 10px;
}
.sticky-cta span { color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.sticky-btns { display: flex; gap: 8px; }
.sticky-btn {
  background: var(--warm);
  color: var(--warm-foreground);
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  text-decoration: none;
  white-space: nowrap;
}
.sticky-btn:hover { filter: brightness(1.1); }
.sticky-btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn-outline:hover { background: rgba(255,255,255,0.1); }
/* Floating WhatsApp Button */
.whatsapp-float {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  z-index: 9998;
  transition: all 0.3s ease;
  text-decoration: none;
}
.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
}
.whatsapp-float svg { width: 32px; height: 32px; fill: #fff; }
@media (max-width: 768px) {
  .whatsapp-float { bottom: 85px; right: 16px; width: 55px; height: 55px; }
  .whatsapp-float svg { width: 28px; height: 28px; }
}
body { padding-bottom: 70px; }

/* Animations */
.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.8s ease forwards;
}
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
</style>
</head>
<body>

<div class="demo-ribbon">Demo</div>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <div class="container navbar-inner">
    <a href="#" class="navbar-brand">
      <span class="name">${companyName}</span>
      <span class="sub">Fully Licensed</span>
    </a>
    <div class="navbar-links">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#why-us">Why Us</a>
      <a href="#contact">Contact</a>
      <a href="tel:${phoneClean}" class="btn-primary" data-track="phone_click">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        Call Now
      </a>
    </div>
    <button class="mobile-toggle" onclick="document.querySelector('.mobile-menu').classList.toggle('active')">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#why-us">Why Us</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}" class="btn-primary" data-track="phone_click" style="margin-top: 8px;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    Call Now
  </a>
</div>

<!-- HERO SECTION -->
<section class="hero">
  <div class="hero-bg">
    <img src="${images.hero}" alt="Professional metal roofing installation">
  </div>
  <div class="container">
    <div class="hero-content animate-fade-up">
      <p class="hero-tag">${city}'s Trusted Roofers</p>
      <h1 class="hero-title">
        Built for Harsh<br>
        <span class="gradient">Australian</span><br>
        Conditions
      </h1>
      <p class="hero-desc">
        Metal roofing specialists delivering premium roofing systems, ventilation and complete roof replacements across ${city}.
      </p>
      <div class="hero-btns">
        <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Publish Your Website Now →
        </a>
        <a href="#services" class="btn-secondary">Our Services</a>
      </div>
    </div>
  </div>
  <div class="scroll-indicator">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
  </div>
</section>

<!-- SERVICES SECTION -->
<section id="services" class="section bg-background">
  <div class="container">
    <div class="section-header animate-fade-up">
      <p class="section-tag">What We Do</p>
      <h2 class="section-title">Roofing Experts</h2>
    </div>
    <div class="services-grid">
      <div class="service-card animate-fade-up delay-100">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        <h3>New Metal Roofing</h3>
        <p>Premium metal roofing for new builds. Wide colour range designed for Australian homes and harsh conditions.</p>
      </div>
      <div class="service-card animate-fade-up delay-200">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
        </div>
        <h3>Roof Replacements</h3>
        <p>Full roof replacements removing old tiles or worn-out sheeting. Upgrade to modern metal roofing built to last decades.</p>
      </div>
      <div class="service-card animate-fade-up delay-300">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
        </div>
        <h3>Whirlybirds & Ventilation</h3>
        <p>Beat the heat with roof ventilation systems. Whirlybirds and powered vents to keep your home cool year-round.</p>
      </div>
      <div class="service-card animate-fade-up delay-400">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        </div>
        <h3>Roof Repairs</h3>
        <p>Leak detection, storm damage repairs, re-screwing and re-sealing. Fast response across ${city}.</p>
      </div>
      <div class="service-card animate-fade-up delay-500">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <h3>Storm-Rated Systems</h3>
        <p>Engineered for harsh weather conditions. Storm-rated fastening systems to protect your home.</p>
      </div>
      <div class="service-card animate-fade-up delay-500">
        <div class="service-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </div>
        <h3>Insulation & Sarking</h3>
        <p>Reduce energy bills with reflective insulation and sarking. Keep the heat out in summer and warmth in during winter.</p>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="section bg-muted">
  <div class="container">
    <div class="about-grid">
      <div class="about-text animate-fade-up">
        <p class="section-tag">About Us</p>
        <h2>Metal Roofing<br>Specialists</h2>
        <p>We are a ${city}-based metal roofing company servicing the greater region. We specialise in premium roofing systems designed for Australian homes.</p>
        <p>As a fully licensed and insured builder, we deliver warranty-backed work with comprehensive coverage. Every job meets the highest industry standards.</p>
        <p>From scorching summer heat to intense storm seasons, our roofing solutions are engineered to handle everything nature throws at them. We use only premium materials from Australia's most trusted brands.</p>
        <div class="about-badges">
          <div class="about-badge"><span class="dot"></span> Fully Licensed</div>
          <div class="about-badge"><span class="dot"></span> Fully Insured</div>
          <div class="about-badge"><span class="dot"></span> Warranty-Backed</div>
        </div>
      </div>
      <div class="about-image animate-fade-up delay-200">
        <img src="${images.roofDetail}" alt="Metal roofing installation detail">
        <div class="about-badge-floating">
          <div class="num">10+</div>
          <div class="label">Years Experience</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TRUST SECTION -->
<section id="why-us" class="section bg-steel">
  <div class="container">
    <div class="section-header animate-fade-up">
      <p class="section-tag">Why Choose Us</p>
      <h2 class="section-title" style="color: var(--steel-foreground);">Trusted Across<br>${city}</h2>
    </div>
    <div class="trust-grid">
      <div class="trust-item animate-fade-up delay-100">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
        </div>
        <h3>Fully Licensed</h3>
        <p>Fully licensed and compliant with all local building regulations and standards</p>
      </div>
      <div class="trust-item animate-fade-up delay-200">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
        </div>
        <h3>Premium Materials</h3>
        <p>We use only top-quality roofing materials from Australia's most trusted brands</p>
      </div>
      <div class="trust-item animate-fade-up delay-300">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <h3>Fully Insured</h3>
        <p>Comprehensive public liability and workers compensation insurance</p>
      </div>
      <div class="trust-item animate-fade-up delay-400">
        <div class="trust-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
        </div>
        <h3>Climate Engineered</h3>
        <p>Designed for Australia's extreme heat, UV exposure and storm seasons</p>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS SECTION - Carousel -->
<section id="reviews" class="reviews">
  <div class="container">
    <div class="reviews-header animate-fade-up">
      <p class="section-tag">Testimonials</p>
      <h2 class="section-title" style="color: var(--steel-foreground);">What Our Clients Say</h2>
      <div class="reviews-rating">
        <div class="rating-badge">
          <span class="rating-score">5.0</span>
          <div class="rating-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
        </div>
        <span class="rating-count">Based on 50+ reviews</span>
      </div>
    </div>
    
    <div class="reviews-carousel-wrapper">
      <button class="carousel-nav prev" onclick="scrollCarousel(-1)" aria-label="Previous reviews">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      
      <div class="reviews-carousel" id="reviewsCarousel">
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">SM</div>
            <div class="review-author-info">
              <h4>Steve Morrison</h4>
              <span class="review-time">2 weeks ago</span>
            </div>
          </div>
          <div class="review-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <p class="review-text">Fantastic roof replacement! The team was professional, on time, and left our property spotless. The new Colorbond roof looks amazing. Highly recommend!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">JB</div>
            <div class="review-author-info">
              <h4>Jenny Brooks</h4>
              <span class="review-time">1 month ago</span>
            </div>
          </div>
          <div class="review-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <p class="review-text">Had a leak during the storms and they came out the same day. Fixed everything quickly and at a fair price. Great communication throughout. Will use again!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">MT</div>
            <div class="review-author-info">
              <h4>Mark Thompson</h4>
              <span class="review-time">1 month ago</span>
            </div>
          </div>
          <div class="review-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <p class="review-text">Best roofers in the area! They replaced our old tile roof with metal and the difference is incredible. Professional team, quality materials, excellent result.</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">LW</div>
            <div class="review-author-info">
              <h4>Lisa Williams</h4>
              <span class="review-time">2 months ago</span>
            </div>
          </div>
          <div class="review-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <p class="review-text">Very happy with our new gutters and roof repairs. The team was punctual, tidy, and completed everything as promised. Competitive pricing too!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">DP</div>
            <div class="review-author-info">
              <h4>David Peterson</h4>
              <span class="review-time">3 months ago</span>
            </div>
          </div>
          <div class="review-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <p class="review-text">Called for a roof inspection and got honest advice. Ended up doing a partial restoration which saved us thousands. Trustworthy and skilled team!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
      </div>
      
      <button class="carousel-nav next" onclick="scrollCarousel(1)" aria-label="Next reviews">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    
    <div class="carousel-dots" id="carouselDots">
      <button class="carousel-dot active" data-index="0"></button>
      <button class="carousel-dot" data-index="1"></button>
      <button class="carousel-dot" data-index="2"></button>
      <button class="carousel-dot" data-index="3"></button>
      <button class="carousel-dot" data-index="4"></button>
    </div>
    
    ${googleMapsUrl ? `
    <div class="reviews-cta">
      <a href="${googleMapsUrl}" target="_blank">
        See all reviews on Google
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    </div>
    ` : ''}
  </div>
</section>

${instagramSection}

${googleMapsSection}

<!-- CONTACT SECTION -->
<section id="contact" class="section bg-background">
  <div class="container">
    <div class="section-header animate-fade-up">
      <p class="section-tag">Get In Touch</p>
      <h2 class="section-title">Request a Free Quote</h2>
      <p style="color: var(--muted-foreground); margin-top: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
        Servicing ${city} and surrounding areas. Get in touch for an obligation-free roofing assessment.
      </p>
    </div>
    <div class="contact-grid">
      <div class="contact-info animate-fade-up">
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <h3>Service Area</h3>
            <p>${city} & surrounding areas</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div>
            <h3>Phone</h3>
            <a href="tel:${phoneClean}">${phone}</a>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div>
            <h3>Hours</h3>
            <p>Mon – Fri: 7am – 5pm<br>Sat: By appointment</p>
          </div>
        </div>
        <div class="contact-box">
          <p><span>${companyName}</span><br>Fully Licensed & Insured</p>
        </div>
      </div>
      <form class="contact-form animate-fade-up delay-200" onsubmit="event.preventDefault(); window.open('${calendarUrl}', '_blank');">
        <div class="form-row">
          <div class="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="Your phone number">
          </div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@email.com">
        </div>
        <div class="form-group">
          <label>Service Required</label>
          <select>
            <option>New Metal Roof</option>
            <option>Roof Replacement</option>
            <option>Roof Repairs</option>
            <option>Whirlybirds & Ventilation</option>
            <option>Insulation & Sarking</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea placeholder="Tell us about your roofing needs..."></textarea>
        </div>
        <button type="submit" class="btn-primary" data-track="book_call">Publish Your Website Now →</button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      ${companyName}
      <span>Metal Roofing Specialists — ${city}</span>
    </div>
    <div class="footer-info">
      <p>Fully Licensed & Insured</p>
      <p>© 2026 All rights reserved.</p>
      <div class="footer-optimo">
        <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
      </div>
    </div>
  </div>
</footer>

<!-- FLOATING WHATSAPP BUTTON -->
<a href="https://wa.me/${phoneWA}?text=Hi%20I%20saw%20your%20website%20and%20would%20like%20a%20quote" target="_blank" class="whatsapp-float" data-track="whatsapp_click" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- STICKY BOTTOM BAR -->
<div class="sticky-cta">
  <span>Want this live?</span>
  <div class="sticky-btns">
    <a href="${calendarUrl}" target="_blank" class="sticky-btn" data-track="book_call">📅 Book Call</a>
    <a href="tel:${phoneClean}" class="sticky-btn-outline" data-track="phone_click">📞 Call Now</a>
  </div>
</div>

<!-- NAVBAR SCROLL EFFECT -->
<script>
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
</script>

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
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        template: 'lovable'
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

// Reviews Carousel
function scrollCarousel(direction) {
  const carousel = document.getElementById('reviewsCarousel');
  if (!carousel) return;
  const card = carousel.querySelector('.review-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24;
  carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

(function() {
  const carousel = document.getElementById('reviewsCarousel');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (carousel && dots.length) {
    carousel.addEventListener('scroll', function() {
      const card = carousel.querySelector('.review-card');
      if (!card) return;
      const scrollPos = carousel.scrollLeft;
      const cardWidth = card.offsetWidth + 24;
      const activeIndex = Math.round(scrollPos / cardWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    });
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', function() {
        const card = carousel.querySelector('.review-card');
        if (!card) return;
        const cardWidth = card.offsetWidth + 24;
        carousel.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
    });
  }
})();

// Dynamic Google Reviews Fetching
(function() {
  const googleMapsUrl = '${googleMapsUrl || ''}';
  const companyName = '${companyName}';
  const location = '${location}';
  const reviewsApiBase = 'https://demo-site-generator-sepia.vercel.app/api/reviews';
  
  if (!googleMapsUrl && !companyName) return;
  
  async function fetchGoogleReviews() {
    try {
      let url = reviewsApiBase;
      if (googleMapsUrl) {
        url += '?mapsUrl=' + encodeURIComponent(googleMapsUrl);
      } else {
        url += '?businessName=' + encodeURIComponent(companyName) + '&location=' + encodeURIComponent(location);
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success && data.reviews && data.reviews.length > 0) {
        updateReviewsCarousel(data.reviews, data.place);
      }
    } catch (e) {
      console.log('Using default reviews');
    }
  }
  
  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  
  function createStarsSVG(count) {
    const starSVG = '<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    return starSVG.repeat(count);
  }
  
  function updateReviewsCarousel(reviews, place) {
    const carousel = document.getElementById('reviewsCarousel');
    const ratingScore = document.querySelector('.rating-score');
    const ratingCount = document.querySelector('.rating-count');
    
    if (!carousel) return;
    
    if (ratingScore && place && place.rating) {
      ratingScore.textContent = place.rating.toFixed(1);
    }
    if (ratingCount && place && place.totalReviews) {
      ratingCount.textContent = 'Based on ' + place.totalReviews + '+ reviews';
    }
    
    const googleLogo = '<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';
    
    let cardsHTML = '';
    reviews.forEach(review => {
      const initials = getInitials(review.author);
      const avatarContent = review.authorPhoto 
        ? '<img src="' + review.authorPhoto + '" alt="' + review.author + '">' 
        : initials;
      const stars = createStarsSVG(review.rating || 5);
      const text = review.text || 'Great service!';
      
      cardsHTML += '<div class="review-card">' +
        '<div class="review-card-header">' +
          '<div class="review-avatar">' + avatarContent + '</div>' +
          '<div class="review-author-info">' +
            '<h4>' + review.author + '</h4>' +
            '<span class="review-time">' + review.relativeTime + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="review-stars">' + stars + '</div>' +
        '<p class="review-text">' + text + '</p>' +
        '<div class="review-source">' + googleLogo + 'Posted on Google</div>' +
      '</div>';
    });
    
    carousel.innerHTML = cardsHTML;
    
    const dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
      let dotsHTML = '';
      reviews.forEach((_, i) => {
        dotsHTML += '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></button>';
      });
      dotsContainer.innerHTML = dotsHTML;
      
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.addEventListener('click', function() {
          const card = carousel.querySelector('.review-card');
          if (!card) return;
          const cardWidth = card.offsetWidth + 24;
          carousel.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
        });
      });
    }
  }
  
  if (document.readyState === 'complete') {
    fetchGoogleReviews();
  } else {
    window.addEventListener('load', fetchGoogleReviews);
  }
})();
</script>

</body>
</html>`
}
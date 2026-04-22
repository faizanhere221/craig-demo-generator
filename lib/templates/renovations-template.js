/**
 * Aussie Renovations Template - Craig's Design
 * 
 * Features:
 * - Bold rust color scheme (#C0522B)
 * - Premium, editorial styling
 * - "Built By Optimo Agency" footer
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram embed
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  heroAccent: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
  feature: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80',
  gallery1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  gallery2: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  gallery3: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  gallery4: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  gallery5: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
}

export function generateRenovationsHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  const tagline = customContent?.tagline || 'Your Home, Done Right.'
  const aboutText = customContent?.aboutText || `${companyName} brings quality craftsmanship to homes across ${city} and surrounds. From full-home renovations to extensions, kitchens and bathrooms — we deliver on time and on budget.`

  const googleMapsSection = googleMapsUrl ? `
<section id="location" style="background: #fff; padding: 80px 60px;">
  <div style="text-align: center; margin-bottom: 40px;">
    <span class="section-label">Find Us</span>
    <h2 class="section-title">Our Location</h2>
  </div>
  <div style="max-width: 700px; margin: 0 auto; text-align: center;">
    <iframe 
      src="https://maps.google.com/maps?q=${encodeURIComponent(companyName + ' ' + location)}&output=embed&z=15"
      width="100%" 
      height="350" 
      style="border:0; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: var(--rust); color: #fff; padding: 14px 32px; border-radius: 4px; font-weight: 700; text-decoration: none; font-size: 15px;">
      📍 View on Google Maps & Reviews
    </a>
  </div>
</section>
` : ''

  const instagramSection = instagramUrl ? `
<section id="instagram" style="background: var(--sand); padding: 80px 60px;">
  <div style="text-align: center; margin-bottom: 40px;">
    <span class="section-label">Follow Our Work</span>
    <h2 class="section-title">See Us On Instagram</h2>
  </div>
  <div style="max-width: 540px; margin: 0 auto; text-align: center;">
    <blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>
    <script async src="https://www.instagram.com/embed.js"></script>
    <a href="${instagramUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 14px 32px; border-radius: 4px; font-weight: 700; text-decoration: none; font-size: 15px;">
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
<title>${companyName} | Home Renovations ${city}, ${state}</title>
<meta name="description" content="${companyName} provides professional home renovation services in ${city}, ${state}. Call ${phone} for a free consultation.">
<meta name="robots" content="noindex, nofollow">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --rust: #C0522B;
  --rust-dark: #9B3D1A;
  --rust-light: #E8784A;
  --clay: #D4845A;
  --sand: #F2E8DC;
  --sand-dark: #E8D5C0;
  --charcoal: #1E1E1E;
  --dark: #111111;
  --mid: #4A4A4A;
  --light: #F9F5F0;
  --white: #FFFFFF;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--light);
  color: var(--charcoal);
  overflow-x: hidden;
}

.demo-badge{position:fixed;top:20px;right:-28px;background:var(--rust);color:#fff;font-size:10px;font-weight:700;padding:5px 42px;transform:rotate(45deg);z-index:9999;letter-spacing:1.5px;text-transform:uppercase}

nav {
  position: fixed; top: 0; width: 100%; z-index: 100;
  background: rgba(17,17,17,0.95);
  backdrop-filter: blur(12px);
  padding: 18px 60px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid rgba(192,82,43,0.3);
}
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--white);
  letter-spacing: -0.5px;
}
.nav-logo span { color: var(--rust-light); }
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a {
  color: rgba(255,255,255,0.75); text-decoration: none;
  font-size: 14px; font-weight: 500; letter-spacing: 0.5px;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--rust-light); }
.nav-cta {
  background: var(--rust); color: var(--white);
  padding: 10px 22px; border-radius: 4px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: background 0.2s;
}
.nav-cta:hover { background: var(--rust-dark); }

.mobile-toggle{display:none;background:none;border:none;cursor:pointer;width:28px;height:20px;position:relative}
.mobile-toggle span{display:block;width:100%;height:2px;background:#fff;border-radius:2px;position:absolute;left:0;transition:all .3s}
.mobile-toggle span:nth-child(1){top:0}
.mobile-toggle span:nth-child(2){top:9px}
.mobile-toggle span:nth-child(3){top:18px}
.mobile-toggle.active span:nth-child(1){top:9px;transform:rotate(45deg)}
.mobile-toggle.active span:nth-child(2){opacity:0}
.mobile-toggle.active span:nth-child(3){top:9px;transform:rotate(-45deg)}
.mobile-menu{display:none;position:fixed;top:60px;left:0;right:0;background:rgba(17,17,17,0.98);padding:20px;flex-direction:column;gap:0;z-index:99}
.mobile-menu.active{display:flex}
.mobile-menu a{color:#fff;text-decoration:none;font-size:16px;font-weight:500;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.1)}

.hero {
  min-height: 100vh;
  background: var(--dark);
  position: relative;
  display: flex; align-items: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(105deg, rgba(17,17,17,0.92) 45%, rgba(17,17,17,0.4) 100%),
    url('${images.heroBg}') center/cover no-repeat;
}
.hero-accent {
  position: absolute; right: 0; top: 0; bottom: 0;
  width: 42%;
  background: url('${images.heroAccent}') center/cover no-repeat;
  clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
  opacity: 0.45;
}
.hero-content {
  position: relative; z-index: 2;
  padding: 120px 60px;
  max-width: 680px;
  animation: fadeUp 0.9s ease forwards;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(192,82,43,0.2);
  border: 1px solid rgba(192,82,43,0.5);
  padding: 6px 14px; border-radius: 20px;
  color: var(--rust-light); font-size: 12px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase;
  margin-bottom: 28px;
}
.hero-badge::before {
  content: ''; width: 6px; height: 6px;
  background: var(--rust-light); border-radius: 50%;
}
.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(44px, 6vw, 76px);
  color: var(--white); line-height: 1.05;
  margin-bottom: 24px;
  font-weight: 900;
}
.hero h1 em {
  color: var(--rust-light); font-style: normal;
  display: block;
}
.hero p {
  color: rgba(255,255,255,0.7);
  font-size: 18px; line-height: 1.7;
  margin-bottom: 40px; font-weight: 300;
}
.hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-primary {
  background: var(--rust); color: var(--white);
  padding: 16px 32px; border-radius: 4px;
  font-weight: 600; font-size: 15px; text-decoration: none;
  transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-primary:hover { background: var(--rust-dark); transform: translateY(-2px); }
.btn-secondary {
  border: 1.5px solid rgba(255,255,255,0.35);
  color: var(--white); padding: 16px 32px;
  border-radius: 4px; font-weight: 500; font-size: 15px;
  text-decoration: none; transition: all 0.2s;
}
.btn-secondary:hover { border-color: var(--rust-light); color: var(--rust-light); }
.hero-stats {
  position: absolute; bottom: 50px; left: 60px; right: 60px;
  display: flex; gap: 60px; z-index: 2;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 30px;
  animation: fadeUp 1.1s ease 0.3s both;
}
.stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 36px; color: var(--rust-light); font-weight: 700;
  line-height: 1;
}
.stat-label {
  color: rgba(255,255,255,0.5); font-size: 13px;
  margin-top: 4px; font-weight: 400;
}

.trust-bar {
  background: var(--charcoal);
  padding: 22px 60px;
  display: flex; align-items: center; gap: 40px;
  overflow-x: auto;
}
.trust-label {
  color: rgba(255,255,255,0.35); font-size: 12px;
  text-transform: uppercase; letter-spacing: 2px;
  white-space: nowrap; font-weight: 600;
}
.trust-items {
  display: flex; gap: 40px; align-items: center;
  flex: 1; flex-wrap: wrap;
}
.trust-item {
  color: rgba(255,255,255,0.55); font-size: 13px;
  font-weight: 500; white-space: nowrap;
  display: flex; align-items: center; gap: 8px;
}
.trust-item::before {
  content: '✓';
  color: var(--rust-light); font-weight: 700;
}

.section { padding: 100px 60px; }
.section-label {
  display: inline-block;
  color: var(--rust); font-size: 12px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  margin-bottom: 16px;
}
.section-label::before { content: '— '; }
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.1; color: var(--charcoal);
  margin-bottom: 16px; font-weight: 900;
}
.section-sub {
  color: var(--mid); font-size: 17px;
  line-height: 1.7; max-width: 540px;
  font-weight: 300;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px; margin-top: 60px;
  background: var(--sand-dark);
}
.service-card {
  background: var(--white);
  padding: 44px 36px;
  transition: all 0.3s;
  position: relative; overflow: hidden;
}
.service-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  height: 3px; width: 0;
  background: var(--rust);
  transition: width 0.4s ease;
}
.service-card:hover { background: var(--sand); }
.service-card:hover::after { width: 100%; }
.service-icon {
  width: 52px; height: 52px;
  background: var(--sand);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; margin-bottom: 24px;
  transition: background 0.3s;
}
.service-card:hover .service-icon { background: rgba(192,82,43,0.15); }
.service-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 22px; margin-bottom: 12px; color: var(--charcoal);
}
.service-card p {
  color: var(--mid); font-size: 15px; line-height: 1.65;
  font-weight: 300;
}

.feature-split {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 600px; background: var(--charcoal);
}
.feature-img {
  position: relative; overflow: hidden;
}
.feature-img img {
  width: 100%; height: 100%; object-fit: cover;
  filter: brightness(0.85);
  transition: transform 0.6s;
}
.feature-img:hover img { transform: scale(1.04); }
.feature-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(17,17,17,0.3), transparent);
}
.feature-content {
  padding: 80px 70px;
  display: flex; flex-direction: column; justify-content: center;
}
.feature-content .section-title { color: var(--white); }
.feature-content .section-sub { color: rgba(255,255,255,0.65); }
.feature-list {
  list-style: none; margin-top: 36px;
  display: flex; flex-direction: column; gap: 16px;
}
.feature-list li {
  display: flex; align-items: flex-start; gap: 14px;
  color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.5;
}
.feature-list li::before {
  content: '';
  width: 8px; height: 8px; min-width: 8px;
  background: var(--rust-light); border-radius: 50%;
  margin-top: 6px;
}

.gallery-section {
  padding: 100px 0;
  background: var(--sand);
}
.gallery-header {
  padding: 0 60px 60px;
}
.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 280px 280px;
  gap: 4px;
}
.gallery-item {
  overflow: hidden; position: relative;
  cursor: pointer;
}
.gallery-item img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
  filter: brightness(0.88);
}
.gallery-item:hover img { transform: scale(1.06); filter: brightness(1); }
.gallery-item:first-child {
  grid-row: 1 / 3;
}
.gallery-tag {
  position: absolute; bottom: 16px; left: 16px;
  background: rgba(17,17,17,0.8);
  color: var(--white); font-size: 12px; font-weight: 600;
  padding: 5px 12px; border-radius: 3px;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
}

.process-section {
  padding: 100px 60px;
  background: var(--white);
}
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  margin-top: 60px;
  background: var(--sand-dark);
}
.process-card {
  background: var(--white);
  padding: 40px 32px;
  position: relative;
}
.process-num {
  font-family: 'Playfair Display', serif;
  font-size: 64px; font-weight: 900;
  color: var(--sand-dark);
  line-height: 1; margin-bottom: 20px;
  user-select: none;
}
.process-card h3 {
  font-size: 18px; font-weight: 600;
  color: var(--charcoal); margin-bottom: 10px;
}
.process-card p {
  color: var(--mid); font-size: 14px; line-height: 1.6;
  font-weight: 300;
}

/* Reviews Carousel */
.reviews-section {
  padding: 100px 60px;
  background: var(--charcoal);
  overflow: hidden;
}
.reviews-section .section-title { color: var(--white); }
.reviews-header{text-align:center;margin-bottom:48px}
.reviews-rating{display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:16px;flex-wrap:wrap}
.reviews-rating .rating-badge{display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.1);padding:0.5rem 1rem;border-radius:50px}
.reviews-rating .rating-score{font-size:1.5rem;color:#fff;font-weight:700}
.reviews-rating .rating-stars{display:flex;gap:2px}
.reviews-rating .star{width:1.25rem;height:1.25rem;color:#FBBC04;fill:#FBBC04}
.reviews-rating .rating-count{color:rgba(255,255,255,0.6);font-size:0.875rem}
.reviews-carousel-wrapper{position:relative;padding:0 3rem;max-width:1400px;margin:0 auto}
.reviews-carousel{display:flex;gap:1.5rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:1rem 0}
.reviews-carousel::-webkit-scrollbar{display:none}
.review-card{flex:0 0 340px;scroll-snap-align:start;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:1.75rem;display:flex;flex-direction:column;transition:all .3s}
.review-card:hover{border-color:var(--rust);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.3)}
.review-card-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
.review-avatar{width:48px;height:48px;border-radius:50%;background:var(--rust);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1rem;overflow:hidden}
.review-avatar img{width:100%;height:100%;object-fit:cover}
.review-author-info h4{font-size:1rem;font-weight:600;color:#fff;margin-bottom:0.125rem}
.review-author-info .review-time{color:rgba(255,255,255,0.5);font-size:0.8rem}
.review-card .review-stars{display:flex;gap:2px;margin-bottom:0.75rem}
.review-card .review-stars .star{width:1rem;height:1rem;color:#FBBC04;fill:#FBBC04}
.review-card .review-text{color:rgba(255,255,255,0.85);font-size:0.9rem;line-height:1.65;flex:1;font-style:italic}
.review-card .review-source{display:flex;align-items:center;gap:0.5rem;margin-top:1.25rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:0.75rem}
.review-card .review-source svg{width:16px;height:16px}
.carousel-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;background:var(--rust);border:none;border-radius:50%;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
.carousel-nav:hover{transform:translateY(-50%) scale(1.1);box-shadow:0 4px 20px rgba(0,0,0,0.3)}
.carousel-nav.prev{left:0}
.carousel-nav.next{right:0}
.carousel-nav svg{width:20px;height:20px}
.carousel-dots{display:flex;justify-content:center;gap:0.5rem;margin-top:2rem}
.carousel-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.3);border:none;cursor:pointer;transition:all .2s}
.carousel-dot.active{background:var(--rust);width:24px;border-radius:4px}
.reviews-cta{text-align:center;margin-top:2rem}
.reviews-cta a{display:inline-flex;align-items:center;gap:0.5rem;color:var(--rust-light);font-weight:600;font-size:0.9rem;transition:opacity .2s;text-decoration:none}
.reviews-cta a:hover{opacity:0.8}
@media(max-width:768px){.reviews-carousel-wrapper{padding:0 1rem}.review-card{flex:0 0 300px;padding:1.5rem}.carousel-nav{display:none}.reviews-section{padding:60px 20px}}

.cta-banner {
  background: var(--rust);
  padding: 100px 60px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 40px; flex-wrap: wrap;
  position: relative; overflow: hidden;
}
.cta-banner::before {
  content: '';
  position: absolute; right: -100px; top: -100px;
  width: 500px; height: 500px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
}
.cta-banner-text h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 48px);
  color: var(--white); font-weight: 900;
  line-height: 1.1; margin-bottom: 12px;
}
.cta-banner-text p {
  color: rgba(255,255,255,0.75);
  font-size: 17px; font-weight: 300;
}
.btn-white {
  background: var(--white); color: var(--rust);
  padding: 18px 40px; border-radius: 4px;
  font-weight: 700; font-size: 15px; text-decoration: none;
  white-space: nowrap; transition: all 0.2s;
  display: inline-block;
}
.btn-white:hover { background: var(--sand); transform: translateY(-2px); }

footer {
  background: var(--dark);
  padding: 70px 60px 30px;
  color: rgba(255,255,255,0.5);
}
.footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr;
  gap: 60px; margin-bottom: 60px;
}
.footer-brand h3 {
  font-family: 'Playfair Display', serif;
  font-size: 22px; color: var(--white); margin-bottom: 16px;
}
.footer-brand h3 span { color: var(--rust-light); }
.footer-brand p {
  font-size: 14px; line-height: 1.7; font-weight: 300;
  color: rgba(255,255,255,0.45);
}
.footer-col h4 {
  color: var(--white); font-size: 13px;
  font-weight: 600; letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 20px;
}
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-col ul a {
  color: rgba(255,255,255,0.45); text-decoration: none;
  font-size: 14px; transition: color 0.2s;
}
.footer-col ul a:hover { color: var(--rust-light); }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 28px;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px;
  text-align: center;
}
.footer-bottom p { font-size: 13px; }
.footer-optimo {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
  text-align: center;
}
.footer-optimo a {
  color: var(--rust-light); text-decoration: none;
  font-weight: 600; font-size: 14px;
  transition: color 0.2s;
}
.footer-optimo a:hover { color: #fff; }

@media (max-width: 1024px) {
  nav { padding: 18px 30px; }
  .hero-content { padding: 120px 30px; }
  .hero-stats { left: 30px; right: 30px; gap: 30px; flex-wrap: wrap; }
  .section { padding: 70px 30px; }
  .services-grid { grid-template-columns: 1fr 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer-top { grid-template-columns: 1fr; }
  .trust-bar { padding: 22px 30px; }
  .gallery-header { padding: 0 30px 40px; }
  .process-grid { grid-template-columns: 1fr 1fr; }
  .feature-split { grid-template-columns: 1fr; }
  .feature-img { height: 350px; }
  .feature-content { padding: 60px 30px; }
  .cta-banner { padding: 70px 30px; text-align: center; justify-content: center; }
  footer { padding: 60px 30px 30px; }
}

@media (max-width: 680px) {
  nav { padding: 16px 20px; }
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
  .hero-content { padding: 120px 24px 220px; }
  .hero-stats { left: 24px; right: 24px; flex-wrap: wrap; gap: 20px; bottom: 30px; }
  .services-grid, .process-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .gallery-item:first-child { grid-row: auto; grid-column: 1 / 3; }
  .hero-ctas { flex-direction: column; }
  .hero-ctas a { width: 100%; text-align: center; }
  .trust-bar { flex-direction: column; gap: 16px; text-align: center; }
  .trust-items { justify-content: center; }
}
/* Sticky Bottom Bar */
.sticky-cta {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 12px 16px;
  z-index: 9999;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  border-top: 2px solid #b45309;
  gap: 10px;
}
.sticky-cta span { color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.sticky-btns { display: flex; gap: 8px; }
.sticky-btn {
  background: #b45309;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn:hover { background: #92400e; }
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
</style>
</head>
<body>

<div class="demo-badge">Demo</div>

<nav>
  <div class="nav-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Renovations'}</span></div>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#gallery">Our Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="tel:${phoneClean}" class="nav-cta" data-track="phone_click">📞 ${phone}</a>
</nav>

<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#gallery">Our Work</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-accent"></div>
  <div class="hero-content">
    <div class="hero-badge">${city}'s Trusted Builders</div>
    <h1>${tagline.split(',')[0]}, <em>${tagline.split(',')[1] || 'Done Right.'}</em></h1>
    <p>${aboutText}</p>
    <div class="hero-ctas">
      <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">Get a Free Quote →</a>
      <a href="#gallery" class="btn-secondary">View Our Work</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="stat-item">
      <div class="stat-num">600+</div>
      <div class="stat-label">Projects Completed</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">20yr</div>
      <div class="stat-label">Established in ${city}</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">4.9★</div>
      <div class="stat-label">Google Reviews</div>
    </div>
    <div class="stat-item">
      <div class="stat-num">100%</div>
      <div class="stat-label">Licensed & Insured</div>
    </div>
  </div>
</section>

<div class="trust-bar">
  <span class="trust-label">Why locals choose us</span>
  <div class="trust-items">
    <div class="trust-item">${state} Registered Builder</div>
    <div class="trust-item">Fixed-Price Quotes</div>
    <div class="trust-item">10-Year Workmanship Warranty</div>
    <div class="trust-item">Owner-Operated</div>
    <div class="trust-item">Free Consultation</div>
  </div>
</div>

<section id="services" class="section">
  <span class="section-label">What We Do</span>
  <h2 class="section-title">Full-Service Home<br>Renovation Specialists</h2>
  <p class="section-sub">Whether you're looking to update a single room or transform your entire home, our team delivers quality work on time and on budget.</p>

  <div class="services-grid">
    <div class="service-card">
      <div class="service-icon">🛁</div>
      <h3>Bathroom Renovations</h3>
      <p>Complete bathroom makeovers from design through to tiling, fixtures, waterproofing and final fit-out.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🍳</div>
      <h3>Kitchen Renovations</h3>
      <p>New cabinetry, benchtops, splashbacks, and appliance fit-outs. Kitchens that are as functional as they are beautiful.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🏠</div>
      <h3>Home Extensions</h3>
      <p>Single and double-storey extensions to give your family the space you need. Full project management included.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🪟</div>
      <h3>Decks & Outdoor Living</h3>
      <p>Timber and composite decking, pergolas, alfresco areas and carports. Designed for the Australian climate.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🏗️</div>
      <h3>Structural Renovations</h3>
      <p>Open-plan conversions, wall removals, new rooflines, and full internal strip-outs. Engineered and certified.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🎨</div>
      <h3>Painting & Finishing</h3>
      <p>Interior and exterior painting, plastering, cornice, skirting and all finishing trades.</p>
    </div>
  </div>
</section>

<div id="about" class="feature-split">
  <div class="feature-img">
    <img src="${images.feature}" alt="Modern Australian renovation">
    <div class="feature-img-overlay"></div>
  </div>
  <div class="feature-content">
    <span class="section-label">Our Approach</span>
    <h2 class="section-title">No Surprises.<br>No Shortcuts.</h2>
    <p class="section-sub">We know how stressful renovations can be. That's why we run tight projects with clear communication from day one.</p>
    <ul class="feature-list">
      <li>Fixed-price contracts — what we quote is what you pay</li>
      <li>Dedicated project manager on every job</li>
      <li>Weekly progress updates and site walkthroughs</li>
      <li>All tradies are our own crew — not random subbies</li>
      <li>Worksite cleaned up every day before we leave</li>
    </ul>
    <div style="margin-top: 44px;">
      <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">Book a Consultation →</a>
    </div>
  </div>
</div>

<section id="gallery" class="gallery-section">
  <div class="gallery-header">
    <span class="section-label">Recent Projects</span>
    <h2 class="section-title">Built Across ${city}</h2>
  </div>
  <div class="gallery-grid">
    <div class="gallery-item">
      <img src="${images.gallery1}" alt="Full home renovation">
      <div class="gallery-tag">Full Renovation</div>
    </div>
    <div class="gallery-item">
      <img src="${images.gallery2}" alt="Bathroom renovation">
      <div class="gallery-tag">Bathroom</div>
    </div>
    <div class="gallery-item">
      <img src="${images.gallery3}" alt="Kitchen renovation">
      <div class="gallery-tag">Kitchen</div>
    </div>
    <div class="gallery-item">
      <img src="${images.gallery4}" alt="Home extension">
      <div class="gallery-tag">Extension</div>
    </div>
    <div class="gallery-item">
      <img src="${images.gallery5}" alt="Deck and outdoor area">
      <div class="gallery-tag">Alfresco</div>
    </div>
  </div>
</section>

<section class="process-section">
  <span class="section-label">How It Works</span>
  <h2 class="section-title">From First Chat to<br>Final Handover</h2>

  <div class="process-grid">
    <div class="process-card">
      <div class="process-num">01</div>
      <h3>Free In-Home Consult</h3>
      <p>We come to you, take a look at the space, listen to what you want, and give you honest advice.</p>
    </div>
    <div class="process-card">
      <div class="process-num">02</div>
      <h3>Detailed Fixed Quote</h3>
      <p>You'll get a line-by-line quote. Everything's itemised so you know exactly where your money is going.</p>
    </div>
    <div class="process-card">
      <div class="process-num">03</div>
      <h3>We Get to Work</h3>
      <p>Our crew shows up on the agreed start date and works through the project efficiently.</p>
    </div>
    <div class="process-card">
      <div class="process-num">04</div>
      <h3>Handover & Warranty</h3>
      <p>We walk you through the finished job, sort any final touch-ups, and hand over your 10-year warranty.</p>
    </div>
  </div>
</section>

<section id="reviews" class="reviews-section">
  <div class="reviews-header">
    <span class="section-label" style="color: var(--rust-light);">What Our Clients Say</span>
    <h2 class="section-title">Renovations People<br>Actually Rave About</h2>
    <div class="reviews-rating">
      <div class="rating-badge">
        <span class="rating-score">5.0</span>
        <div class="rating-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
      </div>
      <span class="rating-count">Based on 60+ reviews</span>
    </div>
  </div>
  <div class="reviews-carousel-wrapper">
    <button class="carousel-nav prev" onclick="scrollCarousel(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
    <div class="reviews-carousel" id="reviewsCarousel">
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">SL</div><div class="review-author-info"><h4>Sandra L.</h4><span class="review-time">2 weeks ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">We used them for a full bathroom reno. Absolutely stoked with the result. The boys were tidy, on time, and the quality of work is exceptional!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">TM</div><div class="review-author-info"><h4>Tom M.</h4><span class="review-time">1 month ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">I've dealt with enough dodgy builders to know a good one when I see it. They quoted us fairly, stuck to it, and finished bang on schedule. Our extension came up better than we ever imagined.</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">KR</div><div class="review-author-info"><h4>Karen R.</h4><span class="review-time">1 month ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">The attention to detail these blokes put in is second to none. Our kitchen was a disaster before — now it looks like something out of a magazine. Highly recommend!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">MJ</div><div class="review-author-info"><h4>Mark J.</h4><span class="review-time">2 months ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Excellent home extension work. The team handled all the council approvals, kept us informed throughout, and delivered a quality result. Worth every cent!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">LW</div><div class="review-author-info"><h4>Lisa W.</h4><span class="review-time">3 months ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Complete laundry and bathroom renovation. Professional from start to finish. They protected our floors, cleaned up daily, and the finish is flawless. Couldn't be happier!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
    </div>
    <button class="carousel-nav next" onclick="scrollCarousel(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
  </div>
  <div class="carousel-dots"><button class="carousel-dot active"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button></div>
  ${googleMapsUrl ? `<div class="reviews-cta"><a href="${googleMapsUrl}" target="_blank">See all reviews on Google <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>` : ''}
</section>

${instagramSection}

${googleMapsSection}

<div id="contact" class="cta-banner">
  <div class="cta-banner-text">
    <h2>Ready to Get Started?</h2>
    <p>Book a free in-home consultation — we'll come to you, no charge, no obligation.</p>
  </div>
  <a href="${calendarUrl}" target="_blank" class="btn-white" data-track="book_call">Get Your Free Quote</a>
</div>

<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <h3>${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Renovations'}</span></h3>
      <p>${city}-based building and renovation company serving homeowners across the region. Quality craftsmanship, honest pricing, and a team you can actually trust.</p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="#services">Bathroom Renovations</a></li>
        <li><a href="#services">Kitchen Renovations</a></li>
        <li><a href="#services">Home Extensions</a></li>
        <li><a href="#services">Decks & Alfresco</a></li>
        <li><a href="#services">Structural Work</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:${phoneClean}">${phone}</a></li>
        <li><a href="${calendarUrl}" target="_blank">Free Quote</a></li>
        <li><a href="#gallery">Our Work</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 ${companyName} · ${city}, ${state}</p>
  </div>
  <div class="footer-optimo">
    <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
  </div>
</footer>

<!-- FLOATING WHATSAPP BUTTON -->
<a href="https://wa.me/61435046421?text=Hi%20I%20saw%20your%20website%20and%20would%20like%20a%20quote" target="_blank" class="whatsapp-float" data-track="whatsapp_click" aria-label="Chat on WhatsApp">
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

function scrollCarousel(direction){const c=document.getElementById('reviewsCarousel');if(!c)return;const card=c.querySelector('.review-card');if(!card)return;c.scrollBy({left:direction*(card.offsetWidth+24),behavior:'smooth'})}
(function(){const c=document.getElementById('reviewsCarousel'),dots=document.querySelectorAll('.carousel-dot');if(c&&dots.length){c.addEventListener('scroll',function(){const card=c.querySelector('.review-card');if(!card)return;const idx=Math.round(c.scrollLeft/(card.offsetWidth+24));dots.forEach((d,i)=>d.classList.toggle('active',i===idx))});dots.forEach((d,i)=>d.addEventListener('click',function(){const card=c.querySelector('.review-card');if(card)c.scrollTo({left:i*(card.offsetWidth+24),behavior:'smooth'})}))}})();

(function(){const g='${googleMapsUrl||''}',n='${companyName}',l='${location}',api='https://demo-site-generator-sepia.vercel.app/api/reviews';if(!g&&!n)return;async function f(){try{let u=api+(g?'?mapsUrl='+encodeURIComponent(g):'?businessName='+encodeURIComponent(n)+'&location='+encodeURIComponent(l));const r=await fetch(u),d=await r.json();if(d.success&&d.reviews&&d.reviews.length>0)update(d.reviews,d.place)}catch(e){}}function getI(name){return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}function stars(c){return '<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(c)}function update(reviews,place){const c=document.getElementById('reviewsCarousel'),rs=document.querySelector('.rating-score'),rc=document.querySelector('.rating-count');if(!c)return;if(rs&&place&&place.rating)rs.textContent=place.rating.toFixed(1);if(rc&&place&&place.totalReviews)rc.textContent='Based on '+place.totalReviews+'+ reviews';const gl='<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';let h='';reviews.forEach(r=>{const i=getI(r.author),av=r.authorPhoto?'<img src="'+r.authorPhoto+'" alt="'+r.author+'">':i;h+='<div class="review-card"><div class="review-card-header"><div class="review-avatar">'+av+'</div><div class="review-author-info"><h4>'+r.author+'</h4><span class="review-time">'+r.relativeTime+'</span></div></div><div class="review-stars">'+stars(r.rating||5)+'</div><p class="review-text">'+(r.text||'Great service!')+'</p><div class="review-source">'+gl+'Posted on Google</div></div>'});c.innerHTML=h;const dc=document.querySelector('.carousel-dots');if(dc){let dh='';reviews.forEach((_,i)=>dh+='<button class="carousel-dot'+(i===0?' active':'')+'"></button>');dc.innerHTML=dh;dc.querySelectorAll('.carousel-dot').forEach((d,i)=>d.addEventListener('click',function(){const card=c.querySelector('.review-card');if(card)c.scrollTo({left:i*(card.offsetWidth+24),behavior:'smooth'})}))}}if(document.readyState==='complete')f();else window.addEventListener('load',f)})();
</script>

</body>
</html>`
}
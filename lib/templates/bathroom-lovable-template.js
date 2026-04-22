/**
 * Bathroom Renovations Lovable Template - Craig's Premium Design
 * 
 * Converted from React/Tailwind to pure HTML/CSS
 * Original: Sharp Line Projects (Lovable project 2598cf40)
 * 
 * Features:
 * - Navy + Gold color scheme
 * - DM Serif Display + Plus Jakarta Sans fonts
 * - Clean professional design for bathroom renovators
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram & Google Maps embeds
 * - Floating WhatsApp button
 * - Sticky mobile CTA bar
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  hero: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T033007.313.jpg',
  shower: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T033000.156.jpg',
  vanity: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T032951.997.jpg',
}

export function generateBathroomLovableHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  // Use Craig's mobile for all demo site CTAs
  const optimoPhone = '0483 944 301'
  const optimoPhoneClean = '0483944301'
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  // Extract city and state from location
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'NSW'
  
  // Get first name from company for personalization
  const ownerName = customContent?.ownerName || 'Us'
  const tagline = customContent?.tagline || 'Bathroom Renovations, Done Right'
  const aboutText = customContent?.aboutText || `${companyName} delivers premium bathroom renovations across ${city} and surrounding areas. We're fully equipped to handle every aspect of your renovation, from demolition to the finishing touches.`

  // Instagram section
  const instagramSection = instagramUrl ? `
<section class="py-16 bg-cream">
  <div class="container">
    <div class="text-center mb-10">
      <p class="section-tag">Follow Our Work</p>
      <h2 class="section-title">See Our Latest Projects</h2>
    </div>
    <div class="instagram-embed">
      <iframe src="${instagramUrl}/embed" frameborder="0" scrolling="no" allowtransparency="true" style="width:100%;min-height:450px;border:none;overflow:hidden;"></iframe>
    </div>
    <div class="text-center mt-8">
      <a href="${instagramUrl}" target="_blank" class="btn-outline">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        Follow @${instagramUrl.split('/').pop()}
      </a>
    </div>
  </div>
</section>` : ''

  // Google Maps section
  const googleMapsSection = googleMapsUrl ? `
<section class="py-16 bg-background">
  <div class="container">
    <div class="text-center mb-10">
      <p class="section-tag">Find Us</p>
      <h2 class="section-title">Our Location</h2>
    </div>
    <div class="map-container">
      <iframe 
        src="https://maps.google.com/maps?q=${encodeURIComponent(companyName + ', ' + location + ', Australia')}&output=embed&z=14"
        width="100%" 
        height="400" 
        style="border:0;border-radius:4px;" 
        allowfullscreen="" 
        loading="lazy">
      </iframe>
    </div>
    <div class="text-center mt-6">
      <a href="${googleMapsUrl}" target="_blank" class="btn-outline" data-track="maps_click">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        View on Google Maps
      </a>
    </div>
  </div>
</section>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${companyName} | Bathroom Renovations ${city}</title>
<meta name="description" content="${companyName} - Premium bathroom renovations in ${city}, ${state}. Licensed builder with warranty insurance. Call ${optimoPhone} for a free quote.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --gold: #C9A227;
  --gold-light: #D4B85A;
  --navy: #1E2A3B;
  --navy-light: #2D3E52;
  --cream: #FAF8F5;
  --background: #F8F9FA;
  --foreground: #1A2332;
  --card: #FFFFFF;
  --card-foreground: #1A2332;
  --muted: #F1F3F5;
  --muted-foreground: #6B7280;
  --border: #E5E7EB;
  --primary-foreground: #F5E6C8;
  --font-display: 'DM Serif Display', serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--background);
  color: var(--foreground);
  line-height: 1.6;
  padding-bottom: 70px;
}
h1, h2, h3, h4, h5 { font-family: var(--font-display); font-weight: 400; }
a { text-decoration: none; color: inherit; }
img { max-width: 100%; height: auto; }

/* Container */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

/* Demo Badge */
.demo-badge {
  position: fixed;
  top: 80px;
  right: -35px;
  background: var(--gold);
  color: var(--navy);
  padding: 6px 40px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: rotate(45deg);
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

/* Navigation */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(30, 42, 59, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(201, 162, 39, 0.1);
  padding: 1rem 0;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.nav-logo-main {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--primary-foreground);
  letter-spacing: 0.05em;
}
.nav-logo-sub {
  color: var(--gold);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
.nav-links {
  display: none;
  gap: 2rem;
  list-style: none;
}
.nav-links a {
  color: rgba(245, 230, 200, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--gold); }
.nav-cta {
  display: none;
  align-items: center;
  gap: 1rem;
}
.nav-cta .social-link {
  color: rgba(245, 230, 200, 0.7);
  transition: color 0.2s;
}
.nav-cta .social-link:hover { color: var(--gold); }
.nav-cta .btn-gold {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gold);
  color: var(--navy);
  padding: 0.625rem 1.25rem;
  border-radius: 2px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: background 0.2s;
}
.nav-cta .btn-gold:hover { background: var(--gold-light); }
.mobile-toggle {
  display: block;
  background: none;
  border: none;
  color: var(--primary-foreground);
  cursor: pointer;
}
.mobile-menu {
  display: none;
  background: var(--navy);
  border-top: 1px solid rgba(201, 162, 39, 0.1);
  padding: 0 1rem 1.5rem;
}
.mobile-menu.open { display: block; }
.mobile-menu a {
  display: block;
  padding: 0.75rem 0;
  color: rgba(245, 230, 200, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(245, 230, 200, 0.05);
  transition: color 0.2s;
}
.mobile-menu a:hover { color: var(--gold); }
.mobile-menu .btn-gold {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  background: var(--gold);
  color: var(--navy);
  padding: 0.75rem 1.25rem;
  border-radius: 2px;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(30, 42, 59, 0.9), rgba(30, 42, 59, 0.7), rgba(30, 42, 59, 0.4));
}
.hero-content {
  position: relative;
  z-index: 10;
  max-width: 650px;
  padding: 6rem 1rem 4rem;
  text-align: left;
}
.hero-tag {
  color: var(--gold);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
}
.hero h1 {
  font-size: 2.75rem;
  color: var(--primary-foreground);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: 0.15s;
  opacity: 0;
}
.hero h1 .gradient-text {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;
}
.hero-desc {
  color: rgba(245, 230, 200, 0.75);
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
}
.hero-btns {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: 0.45s;
  opacity: 0;
}
.btn-gold-lg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gold);
  color: var(--navy);
  padding: 1rem 2rem;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-gold-lg:hover { background: var(--gold-light); }
.btn-outline-hero {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgba(245, 230, 200, 0.3);
  color: var(--primary-foreground);
  padding: 1rem 2rem;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-outline-hero:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(245, 230, 200, 0.5);
  transition: color 0.2s;
  animation: bounce 2s infinite;
}
.scroll-indicator:hover { color: var(--gold); }

/* Sections Common */
.section-tag {
  color: var(--gold);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.section-title {
  font-size: 2.25rem;
  color: var(--foreground);
  margin-bottom: 1rem;
}
.section-title-light {
  font-size: 2.25rem;
  color: var(--primary-foreground);
  margin-bottom: 1rem;
}

/* Services Section */
.services { padding: 6rem 0; background: var(--background); }
.services-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.service-card {
  background: var(--card);
  padding: 2rem;
  border-radius: 2px;
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.service-card:hover {
  border-color: rgba(201, 162, 39, 0.3);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}
.service-card .icon {
  width: 2rem;
  height: 2rem;
  color: var(--gold);
  margin-bottom: 1.25rem;
}
.service-card h3 {
  font-size: 1.25rem;
  color: var(--card-foreground);
  margin-bottom: 0.75rem;
}
.service-card p {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.7;
}
.gallery-grid {
  display: grid;
  gap: 1.5rem;
}
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  aspect-ratio: 4/3;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.gallery-item:hover img { transform: scale(1.05); }
.gallery-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(30, 42, 59, 0.6), transparent);
}
.gallery-item p {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 10;
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--primary-foreground);
}

/* About Section */
.about { padding: 6rem 0; background: var(--navy); }
.about-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}
.about-content p {
  color: rgba(245, 230, 200, 0.7);
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.about-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gold);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.2s;
}
.about-link:hover { color: var(--gold-light); }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
.stat-card {
  background: rgba(45, 62, 82, 0.5);
  border: 1px solid rgba(201, 162, 39, 0.1);
  border-radius: 2px;
  padding: 2rem;
  text-align: center;
}
.stat-card .icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--gold);
  margin: 0 auto 1rem;
}
.stat-card p {
  font-family: var(--font-display);
  font-size: 1.125rem;
  color: var(--primary-foreground);
}

/* Meet Team Section */
.team { padding: 6rem 0; background: var(--background); }
.team-card {
  max-width: 600px;
  margin: 0 auto;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.team-card-header {
  background: rgba(30, 42, 59, 0.6);
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.team-avatar {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: rgba(201, 162, 39, 0.2);
  border: 2px solid rgba(201, 162, 39, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.team-avatar .icon {
  width: 3.5rem;
  height: 3.5rem;
  color: var(--gold);
}
.team-card-body {
  padding: 2rem;
  text-align: center;
}
.team-card-body h3 {
  font-size: 1.75rem;
  color: var(--card-foreground);
  margin-bottom: 0.25rem;
}
.team-card-body .role {
  color: var(--gold);
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.team-card-body .desc {
  color: var(--muted-foreground);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 450px;
  margin: 0 auto 1.5rem;
}
.team-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.team-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
.team-badge .icon {
  width: 1rem;
  height: 1rem;
  color: var(--gold);
}

/* Reviews Section - Carousel Style */
.reviews { padding: 6rem 0; background: var(--navy); overflow: hidden; }
.reviews-header {
  text-align: center;
  margin-bottom: 3rem;
}
.reviews-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.reviews-rating .google-logo {
  height: 28px;
  width: auto;
}
.reviews-rating .rating-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}
.reviews-rating .rating-score {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--primary-foreground);
  font-weight: 600;
}
.reviews-rating .rating-stars {
  display: flex;
  gap: 2px;
}
.reviews-rating .rating-stars .star {
  width: 1.25rem;
  height: 1.25rem;
  color: #FBBC04;
  fill: #FBBC04;
}
.reviews-rating .rating-count {
  color: rgba(245, 230, 200, 0.6);
  font-size: 0.875rem;
}
.reviews-carousel-wrapper {
  position: relative;
  padding: 0 3rem;
}
.reviews-carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1rem 0;
}
.reviews-carousel::-webkit-scrollbar { display: none; }
.review-card {
  flex: 0 0 350px;
  scroll-snap-align: start;
  background: rgba(45, 62, 82, 0.5);
  border: 1px solid rgba(201, 162, 39, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
.review-card:hover {
  border-color: rgba(201, 162, 39, 0.3);
  transform: translateY(-4px);
}
.review-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.review-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--navy);
  font-weight: 700;
  font-size: 1.125rem;
  overflow: hidden;
}
.review-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.review-author-info h4 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  color: var(--primary-foreground);
  margin-bottom: 0.125rem;
}
.review-author-info .review-time {
  color: rgba(245, 230, 200, 0.5);
  font-size: 0.8rem;
}
.review-card .review-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 1rem;
}
.review-card .review-stars .star {
  width: 1rem;
  height: 1rem;
  color: #FBBC04;
  fill: #FBBC04;
}
.review-card .review-stars .star-empty {
  color: rgba(255, 255, 255, 0.2);
  fill: rgba(255, 255, 255, 0.2);
}
.review-card .review-text {
  color: rgba(245, 230, 200, 0.85);
  font-size: 0.95rem;
  line-height: 1.7;
  flex: 1;
}
.review-card .review-source {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(245, 230, 200, 0.5);
  font-size: 0.75rem;
}
.review-card .review-source svg {
  width: 16px;
  height: 16px;
}
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: var(--gold);
  border: none;
  border-radius: 50%;
  color: var(--navy);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}
.carousel-nav:hover {
  background: var(--gold-light);
  transform: translateY(-50%) scale(1.1);
}
.carousel-nav.prev { left: 0; }
.carousel-nav.next { right: 0; }
.carousel-nav svg { width: 20px; height: 20px; }
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.carousel-dot.active {
  background: var(--gold);
  width: 24px;
  border-radius: 4px;
}
.reviews-cta {
  text-align: center;
  margin-top: 2.5rem;
}
.reviews-cta a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gold);
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.reviews-cta a:hover { color: var(--gold-light); }
.reviews-cta svg { width: 18px; height: 18px; }
@media (max-width: 768px) {
  .reviews-carousel-wrapper { padding: 0 1rem; }
  .review-card { flex: 0 0 300px; padding: 1.5rem; }
  .carousel-nav { display: none; }
}

/* Areas Section */
.areas { padding: 6rem 0; background: var(--cream); }
.areas-grid {
  display: grid;
  gap: 1.5rem;
}
.area-card {
  background: var(--card);
  padding: 2rem;
  border-radius: 2px;
  border: 1px solid var(--border);
  text-align: center;
  transition: all 0.3s;
}
.area-card:hover { border-color: rgba(201, 162, 39, 0.4); }
.area-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(201, 162, 39, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  transition: background 0.3s;
}
.area-card:hover .area-icon { background: rgba(201, 162, 39, 0.2); }
.area-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--gold);
}
.area-card h3 {
  font-size: 1.5rem;
  color: var(--foreground);
  margin-bottom: 0.5rem;
}
.area-card p {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Contact Section */
.contact { padding: 6rem 0; background: var(--background); }
.contact-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
}
.contact-intro p {
  color: var(--muted-foreground);
  font-size: 1.125rem;
}
.contact-grid {
  display: grid;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto 3rem;
}
.contact-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}
.contact-card:hover { border-color: rgba(201, 162, 39, 0.4); }
.contact-card .icon {
  width: 2rem;
  height: 2rem;
  color: var(--gold);
  margin: 0 auto 1rem;
}
.contact-card h4 {
  font-size: 1.125rem;
  color: var(--foreground);
  margin-bottom: 0.25rem;
}
.contact-card p {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  word-break: break-all;
}
.contact-location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.875rem;
}
.contact-location .icon {
  width: 1rem;
  height: 1rem;
  color: var(--gold);
}

/* Footer */
footer { padding: 4rem 0; background: var(--navy); }
.footer-grid {
  display: grid;
  gap: 3rem;
  margin-bottom: 3rem;
}
.footer-brand p {
  color: rgba(245, 230, 200, 0.6);
  font-size: 0.875rem;
  line-height: 1.7;
  margin-top: 1rem;
}
.footer-links h4, .footer-contact h4 {
  font-size: 1.125rem;
  color: var(--primary-foreground);
  margin-bottom: 1rem;
}
.footer-links a {
  display: block;
  color: rgba(245, 230, 200, 0.6);
  font-size: 0.875rem;
  padding: 0.5rem 0;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--gold); }
.footer-contact a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(245, 230, 200, 0.6);
  font-size: 0.875rem;
  padding: 0.375rem 0;
  transition: color 0.2s;
}
.footer-contact a:hover { color: var(--gold); }
.footer-contact .icon {
  width: 1rem;
  height: 1rem;
}
.footer-bottom {
  border-top: 1px solid rgba(245, 230, 200, 0.1);
  padding-top: 2rem;
  text-align: center;
}
.footer-bottom p {
  color: rgba(245, 230, 200, 0.4);
  font-size: 0.75rem;
}
.footer-optimo {
  margin-top: 1rem;
}
.footer-optimo a {
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Floating WhatsApp */
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
}
.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
}
.whatsapp-float svg { width: 32px; height: 32px; fill: #fff; }

/* Sticky Bottom Bar */
.sticky-cta {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
  padding: 12px 16px;
  z-index: 9999;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  border-top: 2px solid var(--gold);
  gap: 10px;
}
.sticky-cta span { color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.sticky-btns { display: flex; gap: 8px; }
.sticky-btn {
  background: var(--gold);
  color: var(--navy);
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn:hover { background: var(--gold-light); }
.sticky-btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 8px 14px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn-outline:hover { background: rgba(255,255,255,0.1); }

/* Utilities */
.icon { width: 1.25rem; height: 1.25rem; }
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  color: var(--foreground);
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-outline:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.text-center { text-align: center; }
.instagram-embed { max-width: 600px; margin: 0 auto; }
.map-container { border-radius: 4px; overflow: hidden; }

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* Responsive */
@media (min-width: 640px) {
  .hero-btns { flex-direction: row; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .areas-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-grid { grid-template-columns: repeat(3, 1fr); }
  .footer-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 768px) {
  .nav-links { display: flex; }
  .nav-cta { display: flex; }
  .mobile-toggle { display: none; }
  .hero h1 { font-size: 4rem; }
  .hero-content { padding: 8rem 2rem 6rem; }
  .section-title, .section-title-light { font-size: 3rem; }
  .about-grid { grid-template-columns: 1fr 1fr; }
  .whatsapp-float { bottom: 90px; right: 20px; }
}
@media (min-width: 1024px) {
  .services-grid { grid-template-columns: repeat(3, 1fr); }
  .areas-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 768px) {
  .whatsapp-float { bottom: 85px; right: 16px; width: 55px; height: 55px; }
  .whatsapp-float svg { width: 28px; height: 28px; }
}
</style>
</head>
<body>

<div class="demo-badge">Demo</div>

<!-- Navigation -->
<nav>
  <div class="container">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <span class="nav-logo-main">${companyName.split(' ')[0]}</span>
        <span class="nav-logo-sub">${companyName.split(' ').slice(1).join(' ') || 'Projects'}</span>
      </a>
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#areas">Areas</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div class="nav-cta">
        ${instagramUrl ? `<a href="${instagramUrl}" target="_blank" class="social-link"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>` : ''}
        <a href="tel:${optimoPhoneClean}" class="btn-gold" data-track="phone_click">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          ${optimoPhone}
        </a>
      </div>
      <button class="mobile-toggle" onclick="document.getElementById('mobileMenu').classList.toggle('open')">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
    <div id="mobileMenu" class="mobile-menu">
      <a href="#services" onclick="document.getElementById('mobileMenu').classList.remove('open')">Services</a>
      <a href="#about" onclick="document.getElementById('mobileMenu').classList.remove('open')">About</a>
      <a href="#areas" onclick="document.getElementById('mobileMenu').classList.remove('open')">Areas</a>
      <a href="#contact" onclick="document.getElementById('mobileMenu').classList.remove('open')">Contact</a>
      <a href="tel:${optimoPhoneClean}" class="btn-gold" data-track="phone_click">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        ${optimoPhone}
      </a>
    </div>
  </div>
</nav>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-bg">
    <img src="${images.hero}" alt="${companyName} - Premium bathroom renovations">
    <div class="hero-overlay"></div>
  </div>
  <div class="container">
    <div class="hero-content">
      <p class="hero-tag">Licensed Builder • ${city} & ${state}</p>
      <h1>${tagline.split(',')[0]}, <span class="gradient-text">${tagline.split(',')[1] || 'Done Right'}</span></h1>
      <p class="hero-desc">From design to completion — quality craftsmanship backed by a licensed builder with full warranty insurance.</p>
      <div class="hero-btns">
        <a href="tel:${optimoPhoneClean}" class="btn-gold-lg" data-track="phone_click">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Call ${ownerName}
        </a>
        <a href="#services" class="btn-outline-hero">View Our Work</a>
      </div>
    </div>
  </div>
  <a href="#services" class="scroll-indicator">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
  </a>
</section>

<!-- Services Section -->
<section id="services" class="services">
  <div class="container">
    <div class="text-center" style="margin-bottom: 4rem;">
      <p class="section-tag">What We Do</p>
      <h2 class="section-title">Our Services</h2>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" y1="5" x2="8" y2="19"></line><line x1="2" y1="12" x2="22" y2="12"></line><path d="M18 7V3"></path><path d="M14 7V3"></path><path d="M19 7v4a2 2 0 0 1-2 2h-3"></path></svg>
        <h3>Full Bathroom Renovations</h3>
        <p>Complete gut-and-rebuild renovations tailored to your vision and budget.</p>
      </div>
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        <h3>Tiling & Waterproofing</h3>
        <p>Expert tiling in all formats with certified waterproofing for lasting results.</p>
      </div>
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 6 10.5-3 9.5 3"></path><path d="M22 10v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8"></path><path d="M6 18v-8"></path><path d="M18 18v-8"></path><path d="M12 18v-8"></path></svg>
        <h3>Design & Planning</h3>
        <p>We help you choose materials, layouts, and fixtures that work beautifully together.</p>
      </div>
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 6 4-4 4 4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg>
        <h3>Plumbing & Fixtures</h3>
        <p>Licensed plumbing rough-in and fit-off with quality tapware and drainage.</p>
      </div>
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        <h3>Structural & Carpentry</h3>
        <p>Framing, wall removals, and custom cabinetry built to last.</p>
      </div>
      <div class="service-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
        <h3>Warranty & Insurance</h3>
        <p>Full home warranty insurance on every job. Peace of mind guaranteed.</p>
      </div>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="${images.shower}" alt="Custom shower renovation">
        <p>Custom Showers</p>
      </div>
      <div class="gallery-item">
        <img src="${images.vanity}" alt="Vanity installation">
        <p>Vanity Installations</p>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-content">
        <p class="section-tag">About Us</p>
        <h2 class="section-title-light">Built on Quality, <span class="gradient-text" style="font-style:italic;">Backed by Trust</span></h2>
        <p>${aboutText}</p>
        <p>Every project comes with home warranty insurance, so you can have complete peace of mind.</p>
        <a href="#contact" class="about-link">Get in Touch →</a>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          <p>Licensed Builder</p>
        </div>
        <div class="stat-card">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
          <p>Warranty Insurance</p>
        </div>
        <div class="stat-card">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          <p>Fully Equipped</p>
        </div>
        <div class="stat-card">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <p>On-Time Delivery</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Meet the Team -->
<section id="team" class="team">
  <div class="container">
    <div class="text-center" style="margin-bottom: 4rem;">
      <p class="section-tag">Our Team</p>
      <h2 class="section-title">Meet the <span class="gradient-text" style="font-style:italic;">Team</span></h2>
    </div>
    <div class="team-card">
      <div class="team-card-header">
        <div class="team-avatar">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
      </div>
      <div class="team-card-body">
        <h3>${ownerName}</h3>
        <p class="role">Founder & Licensed Builder</p>
        <p class="desc">With years of hands-on experience, ${ownerName} leads every project with precision and a commitment to quality. Licensed, insured, and passionate about transforming bathrooms.</p>
        <div class="team-badges">
          <span class="team-badge">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            Fully Equipped
          </span>
          <span class="team-badge">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            Licensed Builder
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Reviews Section - Carousel -->
<section id="reviews" class="reviews">
  <div class="container">
    <div class="reviews-header">
      <p class="section-tag">Testimonials</p>
      <h2 class="section-title-light">What Our Clients Say</h2>
      <div class="reviews-rating">
        <div class="rating-badge">
          <span class="rating-score" id="avgRating">5.0</span>
          <div class="rating-stars">
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
        </div>
        <span class="rating-count">Based on <span id="totalReviews">47</span>+ reviews</span>
      </div>
    </div>
    
    <div class="reviews-carousel-wrapper">
      <button class="carousel-nav prev" onclick="scrollCarousel(-1)" aria-label="Previous reviews">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      
      <div class="reviews-carousel" id="reviewsCarousel">
        <!-- Review 1 -->
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">SM</div>
            <div class="review-author-info">
              <h4>Sarah Mitchell</h4>
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
          <p class="review-text">Absolutely fantastic service! The team was professional, punctual, and the quality of work exceeded our expectations. Highly recommend to anyone looking for quality craftsmanship.</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <!-- Review 2 -->
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">JC</div>
            <div class="review-author-info">
              <h4>James Cooper</h4>
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
          <p class="review-text">Great experience from start to finish. Clear communication, fair pricing, and excellent results. Will definitely use again for future projects. The team really knows their stuff!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <!-- Review 3 -->
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">MT</div>
            <div class="review-author-info">
              <h4>Michelle Taylor</h4>
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
          <p class="review-text">Very impressed with the attention to detail. The team went above and beyond to ensure everything was perfect. Professional and friendly service throughout the entire project.</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <!-- Review 4 -->
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">DC</div>
            <div class="review-author-info">
              <h4>David Chen</h4>
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
          <p class="review-text">Transformed our dated bathroom into a modern sanctuary. The quality of workmanship is outstanding and the team was a pleasure to work with. Highly recommended!</p>
          <div class="review-source">
            <svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Posted on Google
          </div>
        </div>
        
        <!-- Review 5 -->
        <div class="review-card">
          <div class="review-card-header">
            <div class="review-avatar">EW</div>
            <div class="review-author-info">
              <h4>Emma Wilson</h4>
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
          <p class="review-text">Outstanding results! From the initial consultation to the final touches, everything was handled with care and expertise. Our bathroom looks amazing. Thank you!</p>
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

<!-- Areas Section -->
<section id="areas" class="areas">
  <div class="container">
    <div class="text-center" style="margin-bottom: 4rem;">
      <p class="section-tag">Service Areas</p>
      <h2 class="section-title">Where We Work</h2>
    </div>
    <div class="areas-grid">
      <div class="area-card">
        <div class="area-icon">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h3>${city}</h3>
        <p>Our home base — servicing all suburbs across the region.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h3>Sydney</h3>
        <p>Full coverage across Sydney metro for bathroom renovations.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h3>Greater ${state}</h3>
        <p>Servicing the greater ${state} area.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <h3>Surrounding Areas</h3>
        <p>We cover surrounding suburbs within 60km.</p>
      </div>
    </div>
  </div>
</section>

${instagramSection}

${googleMapsSection}

<!-- Contact Section -->
<section id="contact" class="contact">
  <div class="container">
    <div class="contact-intro">
      <p class="section-tag">Get in Touch</p>
      <h2 class="section-title">Ready to Start Your Renovation?</h2>
      <p>Give us a call or send an email to discuss your bathroom renovation project. Free quotes available.</p>
    </div>
    <div class="contact-grid">
      <a href="tel:${optimoPhoneClean}" class="contact-card" data-track="phone_click">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <h4>Call Us</h4>
        <p>${optimoPhone}</p>
      </a>
      <a href="${calendarUrl}" target="_blank" class="contact-card" data-track="book_call">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <h4>Book a Call</h4>
        <p>Schedule a free consultation</p>
      </a>
      ${instagramUrl ? `
      <a href="${instagramUrl}" target="_blank" class="contact-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        <h4>Follow Us</h4>
        <p>@${instagramUrl.split('/').pop()}</p>
      </a>
      ` : `
      <a href="mailto:info@${companyName.toLowerCase().replace(/\s+/g, '')}.com.au" class="contact-card">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <h4>Email Us</h4>
        <p>Get a free quote</p>
      </a>
      `}
    </div>
    <div class="contact-location">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      Based in ${city} • Servicing ${state} & Surrounding Areas
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="nav-logo">
          <span class="nav-logo-main">${companyName.split(' ')[0]}</span>
          <span class="nav-logo-sub">${companyName.split(' ').slice(1).join(' ') || 'Projects'}</span>
        </a>
        <p>Licensed builder specialising in premium bathroom renovations across ${city}, Sydney, and surrounding areas.</p>
      </div>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#areas">Areas</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <a href="tel:${optimoPhoneClean}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          ${optimoPhone}
        </a>
        ${instagramUrl ? `
        <a href="${instagramUrl}" target="_blank">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          @${instagramUrl.split('/').pop()}
        </a>
        ` : ''}
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved. Licensed Builder.</p>
      <div class="footer-optimo">
        <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
      </div>
    </div>
  </div>
</footer>

<!-- Floating WhatsApp Button -->
<a href="https://wa.me/61435046421?text=Hi%20I%20saw%20your%20website%20and%20would%20like%20a%20quote" target="_blank" class="whatsapp-float" data-track="whatsapp_click" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<!-- Sticky Bottom Bar -->
<div class="sticky-cta">
  <span>Want this live?</span>
  <div class="sticky-btns">
    <a href="${calendarUrl}" target="_blank" class="sticky-btn" data-track="book_call">📅 Book Call</a>
    <a href="tel:${optimoPhoneClean}" class="sticky-btn-outline" data-track="phone_click">📞 Call Now</a>
  </div>
</div>

<!-- Tracking Script -->
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
  
  // Track page view
  if (document.readyState === 'complete') {
    trackEvent('view');
  } else {
    window.addEventListener('load', () => trackEvent('view'));
  }
  
  // Track clicks on elements with data-track attribute
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', function() {
      trackEvent(this.getAttribute('data-track'));
    });
  });
  
  // Track phone and booking clicks
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
  const cardWidth = card.offsetWidth + 24; // card + gap
  carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// Update dots on scroll
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
    
    // Click on dots to scroll
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
  
  // Only fetch if we have a way to identify the business
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
    
    // Update rating header
    if (ratingScore && place && place.rating) {
      ratingScore.textContent = place.rating.toFixed(1);
    }
    if (ratingCount && place && place.totalReviews) {
      ratingCount.textContent = 'Based on ' + place.totalReviews + '+ reviews';
    }
    
    // Build new review cards
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
    
    // Update dots
    const dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
      let dotsHTML = '';
      reviews.forEach((_, i) => {
        dotsHTML += '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '"></button>';
      });
      dotsContainer.innerHTML = dotsHTML;
      
      // Re-attach dot click handlers
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
  
  // Fetch reviews on page load
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
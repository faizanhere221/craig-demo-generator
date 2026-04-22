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
 * - Google Reviews carousel
 * - WhatsApp floating button
 */

const DEFAULT_IMAGES = {
  hero: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/hero-roof.jpg',
  roofDetail: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/roof-detail.jpg',
}

export function generateRooferLovableHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  // Dynamic phone handling
  const phoneClean = phone.replace(/\s+/g, '')
  const phoneWA = phone.startsWith('0') ? '61' + phone.substring(1).replace(/\s+/g, '') : phone.replace(/\s+/g, '')
  
  // URLs
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  const reviewsEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/reviews'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  // Parse location
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'

  // Custom content with defaults
  const content = {
    tagline: customContent?.tagline || `${city}'s Trusted Roofers`,
    headline: customContent?.headline || 'Built for Harsh',
    headlineHighlight: customContent?.headlineHighlight || 'Australian',
    headlineSuffix: customContent?.headlineSuffix || 'Conditions',
    description: customContent?.description || `Metal roofing specialists delivering premium roofing systems, ventilation and complete roof replacements across ${city}.`,
    services: customContent?.services || [
      { icon: 'home', title: 'New Metal Roofing', desc: 'Premium metal roofing for new builds. Wide colour range designed for Australian homes and harsh conditions.' },
      { icon: 'refresh', title: 'Roof Replacements', desc: 'Full roof replacements removing old tiles or worn-out sheeting. Upgrade to modern metal roofing built to last decades.' },
      { icon: 'wind', title: 'Whirlybirds & Ventilation', desc: 'Beat the heat with roof ventilation systems. Whirlybirds and powered vents to keep your home cool year-round.' },
      { icon: 'tool', title: 'Roof Repairs', desc: `Leak detection, storm damage repairs, re-screwing and re-sealing. Fast response across ${city}.` },
      { icon: 'shield', title: 'Storm-Rated Systems', desc: 'Engineered for harsh weather conditions. Storm-rated fastening systems to protect your home.' },
      { icon: 'sun', title: 'Insulation & Sarking', desc: 'Reduce energy bills with reflective insulation and sarking. Keep the heat out in summer and warmth in during winter.' },
    ],
    aboutText: customContent?.aboutText || [
      `We are a ${city}-based metal roofing company servicing the greater region. We specialise in premium roofing systems designed for Australian homes.`,
      'As a fully licensed and insured builder, we deliver warranty-backed work with comprehensive coverage. Every job meets the highest industry standards.',
      'From scorching summer heat to intense storm seasons, our roofing solutions are engineered to handle everything nature throws at them. We use only premium materials from Australia\'s most trusted brands.'
    ],
    ...customContent
  }

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
            loading="lazy">
          </iframe>
          <a href="${googleMapsUrl}" target="_blank" rel="noopener" 
             class="btn btn-outline" style="margin-top: 1.5rem; display: inline-flex;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  ` : ''

  // Instagram section
  const instagramSection = instagramUrl ? `
    <!-- INSTAGRAM SECTION -->
    <section class="section bg-muted">
      <div class="container">
        <div class="section-header animate-fade-up">
          <p class="section-tag">Follow Our Work</p>
          <h2 class="section-title">Latest Projects</h2>
        </div>
        <div style="max-width: 540px; margin: 0 auto;">
          <blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" 
                      style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.1); margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;">
          </blockquote>
          <script async src="https://www.instagram.com/embed.js"></script>
        </div>
      </div>
    </section>
  ` : ''

  // Icon SVGs
  const icons = {
    home: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    refresh: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>',
    wind: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>',
    tool: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    shield: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    sun: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    mapPin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    mail: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    chevronDown: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>',
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>',
    x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    shieldCheck: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    award: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
    fileCheck: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></svg>',
    thermometer: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path><path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>',
  }

  const iconMap = { home: icons.home, refresh: icons.refresh, wind: icons.wind, tool: icons.tool, shield: icons.shield, sun: icons.sun }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} | Metal Roofing Specialists ${city}</title>
  <meta name="description" content="${companyName} - Professional metal roofing services in ${city}. New roofs, replacements, repairs & ventilation. Fully licensed & insured.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* CSS Variables */
    :root {
      --background: hsl(210 20% 98%);
      --foreground: hsl(220 25% 10%);
      --card: hsl(0 0% 100%);
      --card-foreground: hsl(220 25% 10%);
      --muted: hsl(210 15% 93%);
      --muted-foreground: hsl(220 10% 45%);
      --border: hsl(210 15% 88%);
      --steel: hsl(215 20% 22%);
      --steel-foreground: hsl(210 15% 93%);
      --warm: hsl(35 90% 55%);
      --warm-foreground: hsl(0 0% 100%);
      --radius: 0.5rem;
    }

    /* Reset */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    /* Base */
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--background);
      color: var(--foreground);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* Typography */
    .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
    .font-body { font-family: 'DM Sans', sans-serif; }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0) translateX(-50%); }
      50% { transform: translateY(10px) translateX(-50%); }
    }
    .animate-fade-up {
      animation: fadeUp 0.6s ease-out forwards;
    }
    .animate-delay-1 { animation-delay: 0.1s; opacity: 0; }
    .animate-delay-2 { animation-delay: 0.2s; opacity: 0; }
    .animate-delay-3 { animation-delay: 0.3s; opacity: 0; }

    /* ==================== NAVBAR ==================== */
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
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
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
      text-decoration: none;
    }
    .navbar-brand-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      color: var(--steel-foreground);
      letter-spacing: 0.02em;
      transition: color 0.3s;
    }
    .navbar.scrolled .navbar-brand-name { color: var(--foreground); }
    .navbar-brand-sub {
      font-size: 0.75rem;
      color: rgba(237, 233, 225, 0.6);
      transition: color 0.3s;
    }
    .navbar.scrolled .navbar-brand-sub { color: var(--muted-foreground); }
    .navbar-links {
      display: none;
      align-items: center;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .navbar-links { display: flex; }
    }
    .navbar-link {
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--steel-foreground);
      text-decoration: none;
      transition: color 0.3s;
    }
    .navbar.scrolled .navbar-link { color: var(--foreground); }
    .navbar-link:hover { color: var(--warm); }
    .navbar-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--warm);
      color: var(--warm-foreground);
      font-weight: 600;
      padding: 0.625rem 1.25rem;
      border-radius: var(--radius);
      text-decoration: none;
      font-size: 0.875rem;
      transition: filter 0.3s;
    }
    .navbar-cta:hover { filter: brightness(1.1); }
    .navbar-toggle {
      display: block;
      background: none;
      border: none;
      color: var(--steel-foreground);
      cursor: pointer;
      padding: 0.5rem;
    }
    .navbar.scrolled .navbar-toggle { color: var(--foreground); }
    @media (min-width: 768px) {
      .navbar-toggle { display: none; }
    }
    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-top: 1px solid var(--border);
      padding: 1rem 1.5rem 1.5rem;
    }
    .mobile-menu.open { display: block; }
    .mobile-menu a {
      display: block;
      padding: 0.75rem 0;
      font-weight: 500;
      color: var(--foreground);
      text-decoration: none;
      border-bottom: 1px solid var(--border);
    }
    .mobile-menu a:hover { color: var(--warm); }
    .mobile-menu .navbar-cta {
      margin-top: 1rem;
      justify-content: center;
      width: 100%;
    }

    /* ==================== HERO ==================== */
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
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, 
        hsla(215, 20%, 22%, 0.92) 0%,
        hsla(215, 20%, 22%, 0.75) 50%,
        hsla(215, 20%, 22%, 0.35) 100%);
    }
    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 650px;
      padding: 8rem 0 4rem;
    }
    .hero-tag {
      font-family: 'DM Sans', sans-serif;
      color: var(--warm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(3.5rem, 10vw, 7rem);
      line-height: 0.9;
      color: var(--steel-foreground);
      margin-bottom: 1.5rem;
    }
    .text-gradient-warm {
      background: linear-gradient(135deg, hsl(35 90% 55%), hsl(25 95% 48%));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-desc {
      font-size: 1.125rem;
      color: rgba(237, 233, 225, 0.8);
      max-width: 500px;
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    .hero-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      padding: 1rem 2rem;
      border-radius: var(--radius);
      text-decoration: none;
      font-size: 1.125rem;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }
    .btn-warm {
      background: var(--warm);
      color: var(--warm-foreground);
    }
    .btn-warm:hover { filter: brightness(1.1); }
    .btn-outline {
      background: transparent;
      border: 2px solid rgba(237, 233, 225, 0.3);
      color: var(--steel-foreground);
    }
    .btn-outline:hover {
      background: rgba(237, 233, 225, 0.1);
    }
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(237, 233, 225, 0.5);
      animation: bounce 2s infinite;
    }

    /* ==================== SECTIONS ==================== */
    .section {
      padding: 6rem 0;
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .section-tag {
      color: var(--warm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    .section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.5rem, 6vw, 3.75rem);
      color: var(--foreground);
      line-height: 1;
    }
    .section-desc {
      color: var(--muted-foreground);
      max-width: 500px;
      margin: 1rem auto 0;
    }
    .bg-background { background: var(--background); }
    .bg-muted { background: var(--muted); }
    .bg-steel { background: var(--steel); color: var(--steel-foreground); }
    .bg-steel .section-title { color: var(--steel-foreground); }

    /* ==================== SERVICES ==================== */
    .services-grid {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .services-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .services-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .service-card {
      background: var(--card);
      border-radius: 12px;
      padding: 2rem;
      border: 1px solid var(--border);
      transition: all 0.3s;
    }
    .service-card:hover {
      border-color: hsla(35, 90%, 55%, 0.4);
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      transform: translateY(-4px);
    }
    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: hsla(35, 90%, 55%, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      color: var(--warm);
      transition: background 0.3s;
    }
    .service-card:hover .service-icon {
      background: hsla(35, 90%, 55%, 0.2);
    }
    .service-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: 0.75rem;
    }
    .service-desc {
      color: var(--muted-foreground);
      line-height: 1.7;
    }

    /* ==================== ABOUT ==================== */
    .about-grid {
      display: grid;
      gap: 4rem;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .about-grid { grid-template-columns: 1fr 1fr; }
    }
    .about-content p {
      color: var(--muted-foreground);
      margin-bottom: 1rem;
      line-height: 1.8;
    }
    .about-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .about-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--foreground);
    }
    .about-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--warm);
    }
    .about-image-wrap {
      position: relative;
    }
    .about-image {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      aspect-ratio: 4/3;
      object-fit: cover;
    }
    .about-experience {
      position: absolute;
      bottom: -1.5rem;
      left: -1.5rem;
      background: var(--warm);
      color: var(--warm-foreground);
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .about-experience-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      line-height: 1;
    }
    .about-experience-text {
      font-size: 0.875rem;
    }

    /* ==================== TRUST / WHY US ==================== */
    .trust-grid {
      display: grid;
      gap: 2rem;
    }
    @media (min-width: 640px) {
      .trust-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .trust-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .trust-item {
      text-align: center;
    }
    .trust-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      border-radius: 50%;
      background: hsla(35, 90%, 55%, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--warm);
    }
    .trust-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .trust-desc {
      color: rgba(237, 233, 225, 0.7);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    /* ==================== GOOGLE REVIEWS CAROUSEL ==================== */
    .reviews-section {
      padding: 5rem 0;
      background: var(--muted);
    }
    .reviews-carousel-container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 3rem;
    }
    .reviews-carousel {
      display: flex;
      gap: 1.5rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 1rem 0;
    }
    .reviews-carousel::-webkit-scrollbar { display: none; }
    .review-card {
      flex: 0 0 340px;
      scroll-snap-align: start;
      background: var(--card);
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid var(--border);
    }
    .review-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .review-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--warm), hsl(25 95% 48%));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.125rem;
    }
    .review-author-name {
      font-weight: 600;
      color: var(--foreground);
    }
    .review-stars {
      display: flex;
      gap: 2px;
      color: #FBBC04;
      margin-top: 2px;
    }
    .review-text {
      color: var(--muted-foreground);
      font-size: 0.9375rem;
      line-height: 1.7;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .review-date {
      margin-top: 1rem;
      font-size: 0.8125rem;
      color: var(--muted-foreground);
      opacity: 0.7;
    }
    .carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--card);
      border: 1px solid var(--border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      color: var(--foreground);
    }
    .carousel-nav:hover {
      background: var(--warm);
      color: white;
      border-color: var(--warm);
    }
    .carousel-nav.prev { left: 0; }
    .carousel-nav.next { right: 0; }
    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }
    .carousel-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--border);
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .carousel-dot.active {
      background: var(--warm);
      width: 24px;
      border-radius: 4px;
    }
    .google-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    .google-brand img {
      height: 24px;
    }

    /* ==================== CONTACT ==================== */
    .contact-grid {
      display: grid;
      gap: 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    @media (min-width: 1024px) {
      .contact-grid { grid-template-columns: 1fr 1fr; }
    }
    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .contact-info-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: hsla(35, 90%, 55%, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--warm);
      flex-shrink: 0;
    }
    .contact-info-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.25rem;
      color: var(--foreground);
      margin-bottom: 0.25rem;
    }
    .contact-info-text {
      color: var(--muted-foreground);
    }
    .contact-info-text a {
      color: var(--muted-foreground);
      text-decoration: none;
      transition: color 0.3s;
    }
    .contact-info-text a:hover { color: var(--warm); }
    .contact-license {
      background: var(--muted);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .contact-license-name {
      font-weight: 600;
      color: var(--foreground);
    }
    .contact-license-text {
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .form-row {
      display: grid;
      gap: 1.25rem;
    }
    @media (min-width: 640px) {
      .form-row { grid-template-columns: 1fr 1fr; }
    }
    .form-group label {
      display: block;
      font-weight: 500;
      font-size: 0.875rem;
      margin-bottom: 0.375rem;
      color: var(--foreground);
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--foreground);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.2s;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--warm);
      box-shadow: 0 0 0 3px hsla(35, 90%, 55%, 0.15);
    }
    .form-group textarea { resize: none; }
    .form-submit {
      width: 100%;
      padding: 1rem;
      background: var(--warm);
      color: var(--warm-foreground);
      font-weight: 600;
      font-size: 1.125rem;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      transition: filter 0.3s;
    }
    .form-submit:hover { filter: brightness(1.1); }

    /* ==================== FOOTER ==================== */
    .footer {
      background: var(--steel);
      color: var(--steel-foreground);
      padding: 3rem 0;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      text-align: center;
    }
    @media (min-width: 768px) {
      .footer-inner {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
    .footer-brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
      letter-spacing: 0.02em;
    }
    .footer-tagline {
      font-size: 0.875rem;
      color: rgba(237, 233, 225, 0.6);
      margin-top: 0.25rem;
    }
    .footer-right {
      font-size: 0.875rem;
      color: rgba(237, 233, 225, 0.6);
    }

    /* ==================== CTA FOOTER BAR ==================== */
    .cta-footer {
      position: sticky;
      bottom: 0;
      z-index: 990;
      background: var(--steel);
      color: var(--steel-foreground);
      padding: 1.5rem 0;
      border-top: 1px solid rgba(237, 233, 225, 0.1);
      box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
    }
    @media (max-width: 767px) {
      .cta-footer { display: none; }
    }
    .cta-footer-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      text-align: center;
    }
    @media (min-width: 768px) {
      .cta-footer-inner {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .cta-footer-text {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.5rem;
    }
    .cta-footer-buttons {
      display: flex;
      gap: 1rem;
    }
    .cta-footer-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 0.9375rem;
      text-decoration: none;
      transition: all 0.3s;
    }
    .cta-footer-btn.book {
      background: var(--warm);
      color: var(--warm-foreground);
    }
    .cta-footer-btn.book:hover { filter: brightness(1.1); }
    .cta-footer-btn.call {
      background: transparent;
      border: 2px solid var(--warm);
      color: var(--warm);
    }
    .cta-footer-btn.call:hover {
      background: var(--warm);
      color: var(--warm-foreground);
    }

    /* ==================== STICKY MOBILE CTA ==================== */
    .sticky-cta {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--steel);
      padding: 0.75rem 1rem;
      z-index: 999;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
    }
    @media (max-width: 767px) {
      .sticky-cta { display: block; }
      body { padding-bottom: 70px; }
    }
    .sticky-cta-inner {
      display: flex;
      gap: 0.75rem;
    }
    .sticky-cta-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem;
      border-radius: var(--radius);
      font-weight: 600;
      font-size: 0.9375rem;
      text-decoration: none;
      transition: all 0.3s;
    }
    .sticky-cta-btn.book {
      background: var(--warm);
      color: var(--warm-foreground);
    }
    .sticky-cta-btn.call {
      background: transparent;
      border: 2px solid var(--warm);
      color: var(--warm);
    }

    /* ==================== WHATSAPP BUTTON ==================== */
    .whatsapp-float {
      position: fixed;
      bottom: 100px;
      right: 1.5rem;
      z-index: 998;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #25D366;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .whatsapp-float:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(37, 211, 102, 0.5);
    }
    .whatsapp-float svg {
      width: 32px;
      height: 32px;
      fill: white;
    }
    @media (max-width: 767px) {
      .whatsapp-float { bottom: 90px; }
    }
  </style>
</head>
<body>
  <!-- NAVBAR -->
  <nav class="navbar" id="navbar">
    <div class="container">
      <div class="navbar-inner">
        <a href="#" class="navbar-brand">
          <span class="navbar-brand-name">${companyName}</span>
          <span class="navbar-brand-sub">Fully Licensed</span>
        </a>
        <div class="navbar-links">
          <a href="#services" class="navbar-link">Services</a>
          <a href="#about" class="navbar-link">About</a>
          <a href="#why-us" class="navbar-link">Why Us</a>
          <a href="#contact" class="navbar-link">Contact</a>
          <a href="tel:${phoneClean}" class="navbar-cta" onclick="trackClick('phone_navbar')">
            ${icons.phone}
            Call Now
          </a>
        </div>
        <button class="navbar-toggle" onclick="toggleMenu()" aria-label="Toggle menu">
          <span id="menuIcon">${icons.menu}</span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <a href="#services" onclick="closeMenu()">Services</a>
        <a href="#about" onclick="closeMenu()">About</a>
        <a href="#why-us" onclick="closeMenu()">Why Us</a>
        <a href="#contact" onclick="closeMenu()">Contact</a>
        <a href="tel:${phoneClean}" class="navbar-cta" onclick="trackClick('phone_mobile')">
          ${icons.phone}
          Call Now
        </a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg">
      <img src="${images.hero}" alt="Professional metal roofing installation">
      <div class="hero-overlay"></div>
    </div>
    <div class="container">
      <div class="hero-content animate-fade-up">
        <p class="hero-tag">${content.tagline}</p>
        <h1 class="hero-title">
          ${content.headline}<br>
          <span class="text-gradient-warm">${content.headlineHighlight}</span><br>
          ${content.headlineSuffix}
        </h1>
        <p class="hero-desc">${content.description}</p>
        <div class="hero-buttons">
          <a href="${calendarUrl}" target="_blank" class="btn btn-warm" onclick="trackClick('book_hero')">
            ${icons.phone}
            Publish Your Website Now!
          </a>
          <a href="#services" class="btn btn-outline">
            Our Services
          </a>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      ${icons.chevronDown}
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="section bg-background">
    <div class="container">
      <div class="section-header animate-fade-up">
        <p class="section-tag">What We Do</p>
        <h2 class="section-title">Roofing Experts</h2>
      </div>
      <div class="services-grid">
        ${Array.isArray(content.services) ? content.services.map((s, i) => `
          <div class="service-card animate-fade-up animate-delay-${(i % 3) + 1}">
            <div class="service-icon">${iconMap[s.icon] || icons.home}</div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.desc}</p>
          </div>
        `).join('') : ''}
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="section bg-muted">
    <div class="container">
      <div class="about-grid">
        <div class="about-content animate-fade-up">
          <p class="section-tag">About Us</p>
          <h2 class="section-title" style="margin-bottom: 1.5rem;">Metal Roofing<br>Specialists</h2>
          ${Array.isArray(content.aboutText) ? content.aboutText.map(p => `<p>${p}</p>`).join('') : `<p>${content.aboutText}</p>`}
          <div class="about-badges">
            <div class="about-badge"><span class="about-badge-dot"></span> Fully Licensed</div>
            <div class="about-badge"><span class="about-badge-dot"></span> Fully Insured</div>
            <div class="about-badge"><span class="about-badge-dot"></span> Warranty-Backed</div>
          </div>
        </div>
        <div class="about-image-wrap animate-fade-up animate-delay-2">
          <img src="${images.roofDetail}" alt="Metal roofing installation detail" class="about-image">
          <div class="about-experience">
            <p class="about-experience-number">10+</p>
            <p class="about-experience-text">Years Experience</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY US / TRUST -->
  <section id="why-us" class="section bg-steel">
    <div class="container">
      <div class="section-header animate-fade-up">
        <p class="section-tag">Why Choose Us</p>
        <h2 class="section-title">Trusted Across<br>${city}</h2>
      </div>
      <div class="trust-grid">
        <div class="trust-item animate-fade-up animate-delay-1">
          <div class="trust-icon">${icons.shieldCheck}</div>
          <h3 class="trust-title">Fully Licensed</h3>
          <p class="trust-desc">Fully licensed and compliant with all local building regulations and standards</p>
        </div>
        <div class="trust-item animate-fade-up animate-delay-2">
          <div class="trust-icon">${icons.award}</div>
          <h3 class="trust-title">Premium Materials</h3>
          <p class="trust-desc">We use only top-quality roofing materials from Australia's most trusted brands</p>
        </div>
        <div class="trust-item animate-fade-up animate-delay-3">
          <div class="trust-icon">${icons.fileCheck}</div>
          <h3 class="trust-title">Fully Insured</h3>
          <p class="trust-desc">Comprehensive public liability and workers compensation insurance</p>
        </div>
        <div class="trust-item animate-fade-up">
          <div class="trust-icon">${icons.thermometer}</div>
          <h3 class="trust-title">Climate Engineered</h3>
          <p class="trust-desc">Designed for Australia's extreme heat, UV exposure and storm seasons</p>
        </div>
      </div>
    </div>
  </section>

  <!-- GOOGLE REVIEWS CAROUSEL -->
  <section class="reviews-section" id="reviews">
    <div class="container">
      <div class="section-header animate-fade-up">
        <p class="section-tag">Customer Reviews</p>
        <h2 class="section-title">What Our Clients Say</h2>
      </div>
      <div class="reviews-carousel-container">
        <button class="carousel-nav prev" onclick="scrollCarousel(-1)" aria-label="Previous review">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="reviews-carousel" id="reviewsCarousel">
          <!-- Reviews loaded dynamically -->
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">J</div>
              <div>
                <div class="review-author-name">John M.</div>
                <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              </div>
            </div>
            <p class="review-text">Excellent service from start to finish. The team was professional, punctual and did an outstanding job on our new metal roof. Highly recommend!</p>
            <p class="review-date">2 weeks ago</p>
          </div>
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">S</div>
              <div>
                <div class="review-author-name">Sarah T.</div>
                <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              </div>
            </div>
            <p class="review-text">Very happy with our roof replacement. Fair pricing, quality workmanship and they cleaned up perfectly afterwards. Will definitely use again.</p>
            <p class="review-date">1 month ago</p>
          </div>
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">M</div>
              <div>
                <div class="review-author-name">Michael R.</div>
                <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              </div>
            </div>
            <p class="review-text">Great communication throughout the project. They identified issues with our old roof and fixed everything properly. Top quality work!</p>
            <p class="review-date">3 weeks ago</p>
          </div>
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">L</div>
              <div>
                <div class="review-author-name">Lisa K.</div>
                <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              </div>
            </div>
            <p class="review-text">Fantastic job installing whirlybirds on our roof. House is noticeably cooler now. Professional team and reasonable prices. Thank you!</p>
            <p class="review-date">1 month ago</p>
          </div>
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">D</div>
              <div>
                <div class="review-author-name">David P.</div>
                <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              </div>
            </div>
            <p class="review-text">Called for an emergency roof repair after storm damage. They came out same day and fixed everything quickly. Couldn't ask for better service!</p>
            <p class="review-date">2 months ago</p>
          </div>
        </div>
        <button class="carousel-nav next" onclick="scrollCarousel(1)" aria-label="Next review">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div class="carousel-dots" id="carouselDots"></div>
      <div class="google-brand">
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" style="height: 20px;">
        <span>Reviews</span>
      </div>
    </div>
  </section>

  ${googleMapsSection}
  ${instagramSection}

  <!-- CONTACT -->
  <section id="contact" class="section bg-background">
    <div class="container">
      <div class="section-header animate-fade-up">
        <p class="section-tag">Get In Touch</p>
        <h2 class="section-title">Request a Free Quote</h2>
        <p class="section-desc">Servicing ${city} and surrounding areas. Get in touch for an obligation-free roofing assessment.</p>
      </div>
      <div class="contact-grid">
        <div class="animate-fade-up">
          <div class="contact-info-item">
            <div class="contact-info-icon">${icons.mapPin}</div>
            <div>
              <h3 class="contact-info-title">Service Area</h3>
              <p class="contact-info-text">${city} & surrounding areas</p>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-icon">${icons.phone}</div>
            <div>
              <h3 class="contact-info-title">Phone</h3>
              <p class="contact-info-text"><a href="tel:${phoneClean}" onclick="trackClick('phone_contact')">${phone}</a></p>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-icon">${icons.clock}</div>
            <div>
              <h3 class="contact-info-title">Hours</h3>
              <p class="contact-info-text">Mon – Fri: 7am – 5pm<br>Sat: By appointment</p>
            </div>
          </div>
          <div class="contact-license">
            <p class="contact-license-name">${companyName}</p>
            <p class="contact-license-text">Fully Licensed & Insured</p>
          </div>
        </div>
        <form class="contact-form animate-fade-up animate-delay-2" onsubmit="handleSubmit(event)">
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="Your phone number" required>
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@email.com">
          </div>
          <div class="form-group">
            <label>Service Required</label>
            <select name="service">
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
            <textarea name="message" rows="4" placeholder="Tell us about your roofing needs..."></textarea>
          </div>
          <button type="submit" class="form-submit" onclick="trackClick('form_submit')">Send Enquiry</button>
        </form>
      </div>
    </div>
  </section>

  <!-- CTA FOOTER BAR - STICKY ON DESKTOP -->
  <div class="cta-footer">
    <div class="container">
      <div class="cta-footer-inner">
        <p class="cta-footer-text">Want this live?</p>
        <div class="cta-footer-buttons">
          <a href="${calendarUrl}" target="_blank" class="cta-footer-btn book" onclick="trackClick('book_footer')">
            📅 Book Call
          </a>
          <a href="tel:${phoneClean}" class="cta-footer-btn call" onclick="trackClick('phone_footer')">
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div>
          <p class="footer-brand">${companyName}</p>
          <p class="footer-tagline">Metal Roofing Specialists — ${city}</p>
        </div>
        <div class="footer-right">
          <p>Fully Licensed & Insured</p>
          <p style="margin-top: 0.5rem;">© ${new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>

  <!-- STICKY MOBILE CTA -->
  <div class="sticky-cta">
    <div class="container">
      <div class="sticky-cta-inner">
        <a href="${calendarUrl}" target="_blank" class="sticky-cta-btn book" onclick="trackClick('book_sticky')">
          ${icons.calendar}
          Book Call
        </a>
        <a href="tel:${phoneClean}" class="sticky-cta-btn call" onclick="trackClick('phone_sticky')">
          ${icons.phone}
          Call Now
        </a>
      </div>
    </div>
  </div>

  <!-- WHATSAPP BUTTON -->
  <a href="https://wa.me/${phoneWA}" target="_blank" class="whatsapp-float" onclick="trackClick('whatsapp')" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>

  <script>
    // Tracking
    const trackingId = '${trackingId}';
    const trackingEndpoint = '${trackingEndpoint}';
    
    function trackClick(action) {
      fetch(trackingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingId, action, timestamp: new Date().toISOString() })
      }).catch(() => {});
    }
    
    // Track page view
    trackClick('page_view');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('menuIcon');
      const isOpen = menu.classList.toggle('open');
      icon.innerHTML = isOpen ? '${icons.x}' : '${icons.menu}';
    }
    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('menuIcon').innerHTML = '${icons.menu}';
    }

    // Reviews carousel
    const carousel = document.getElementById('reviewsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    
    function initCarousel() {
      const cards = carousel.querySelectorAll('.review-card');
      const numDots = Math.min(5, cards.length);
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
      }
    }
    
    function scrollCarousel(dir) {
      const cardWidth = 340 + 24; // card width + gap
      carousel.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    }
    
    function goToSlide(index) {
      const cardWidth = 340 + 24;
      carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
    
    carousel.addEventListener('scroll', () => {
      const cardWidth = 340 + 24;
      currentSlide = Math.round(carousel.scrollLeft / cardWidth);
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    });
    
    initCarousel();

    // Load real reviews if available
    fetch('${reviewsEndpoint}?trackingId=${trackingId}')
      .then(r => r.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          const stars = '${icons.star}'.repeat(5);
          carousel.innerHTML = data.reviews.map(r => \`
            <div class="review-card">
              <div class="review-header">
                <div class="review-avatar">\${r.author_name.charAt(0)}</div>
                <div>
                  <div class="review-author-name">\${r.author_name}</div>
                  <div class="review-stars">\${stars}</div>
                </div>
              </div>
              <p class="review-text">\${r.text}</p>
              <p class="review-date">\${r.relative_time_description || ''}</p>
            </div>
          \`).join('');
        }
      })
      .catch(() => {});

    // Form handling
    function handleSubmit(e) {
      e.preventDefault();
      trackClick('form_submit');
      alert('Thanks for your enquiry! We will be in touch soon.');
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-fade-up').forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  </script>
</body>
</html>`
}
/**
 * Bathroom Lovable Template - Craig's Premium Design
 * 
 * Converted from React/Tailwind to pure HTML/CSS
 * Based on Sharp Line Projects design
 * Features:
 * - Navy + Gold color scheme
 * - DM Serif Display + Plus Jakarta Sans fonts
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Google Reviews carousel
 * - WhatsApp floating button
 * - Sticky footer CTA
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  hero: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T033007.313.jpg',
  shower: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T032951.997.jpg',
  vanity: 'https://raw.githubusercontent.com/faizanhere221/optimo-assets/main/download%20-%202026-04-10T033000.156.jpg',
}

export function generateBathroomLovableHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  // Dynamic phone handling
  const phoneClean = phone.replace(/\s+/g, '')
  const phoneFormatted = phone
  const phoneWA = phone.startsWith('0') ? '61' + phone.substring(1).replace(/\s+/g, '') : phone.replace(/\s+/g, '')
  
  // URLs
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  const reviewsEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/reviews'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  // Parse location
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'NSW'

  // Custom content with defaults
  const content = {
    tagline: customContent?.tagline || `Licensed Builder • ${city} & Surrounds`,
    headline: customContent?.headline || 'Bathroom Renovations,',
    headlineHighlight: customContent?.headlineHighlight || 'Done Right',
    description: customContent?.description || `From design to completion — quality craftsmanship backed by a licensed builder with full warranty insurance.`,
    ownerName: customContent?.ownerName || 'the team',
    services: customContent?.services || [
      { icon: 'bath', title: 'Full Bathroom Renovations', desc: 'Complete gut-and-rebuild renovations tailored to your vision and budget.' },
      { icon: 'layers', title: 'Tiling & Waterproofing', desc: 'Expert tiling in all formats with certified waterproofing for lasting results.' },
      { icon: 'paint', title: 'Design & Planning', desc: 'We help you choose materials, layouts, and fixtures that work beautifully together.' },
      { icon: 'pipette', title: 'Plumbing & Fixtures', desc: 'Licensed plumbing rough-in and fit-off with quality tapware and drainage.' },
      { icon: 'wrench', title: 'Structural & Carpentry', desc: 'Framing, wall removals, and custom cabinetry built to last.' },
      { icon: 'shield', title: 'Warranty & Insurance', desc: 'Full home warranty insurance on every job. Peace of mind guaranteed.' },
    ],
    aboutTitle: customContent?.aboutTitle || 'Built on Quality,',
    aboutHighlight: customContent?.aboutHighlight || 'Backed by Trust',
    aboutText: customContent?.aboutText || [
      `${companyName} is led by experienced professionals delivering premium bathroom renovations across ${city} and surrounding areas.`,
      `We're fully set up and fully equipped to handle every aspect of your renovation, from demolition to the finishing touches. Every project comes with home warranty insurance, so you can have complete peace of mind.`
    ],
    areas: customContent?.areas || [
      { name: 'Wollongong', desc: 'Our home base — servicing all suburbs across the Illawarra region.' },
      { name: 'Sydney', desc: 'Full coverage across Sydney metro for bathroom renovations.' },
      { name: 'Penrith', desc: 'Servicing Penrith and the greater Western Sydney area.' },
      { name: 'Northern Beaches', desc: 'From Manly to Palm Beach — we\'ve got the Northern Beaches covered.' },
    ],
    ...customContent
  }

  // Safe array handler
  const safeArray = (arr, defaultArr) => Array.isArray(arr) ? arr : (typeof arr === 'string' ? [arr] : defaultArr)
  const servicesArray = safeArray(content.services, [])
  const aboutTextArray = safeArray(content.aboutText, [])
  const areasArray = safeArray(content.areas, [])

  // Icon SVGs
  const icons = {
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>',
    x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>',
    arrowDown: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>',
    bath: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" x2="8" y1="5" y2="7"></line><line x1="2" x2="22" y1="12" y2="12"></line><line x1="7" x2="7" y1="19" y2="21"></line><line x1="17" x2="17" y1="19" y2="21"></line></svg>',
    layers: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 12.5-8.58 3.9a2 2 0 0 1-1.66 0L2.6 12.5"></path><path d="m22 17.5-8.58 3.9a2 2 0 0 1-1.66 0L2.6 17.5"></path></svg>',
    paint: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"></path><path d="m5 2 5 5"></path><path d="M2 13h6"></path><path d="m14 17 3.5 3.5a2.12 2.12 0 0 0 3 0L22 19"></path></svg>',
    pipette: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 22 1-1h3l9-9"></path><path d="M3 21v-3l9-9"></path><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"></path></svg>',
    wrench: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    shield: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    award: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>',
    hammer: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path></svg>',
    clock: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    mapPin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    mail: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    quote: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>',
    calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>',
    user: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  }

  const iconMap = {
    bath: icons.bath,
    layers: icons.layers,
    paint: icons.paint,
    pipette: icons.pipette,
    wrench: icons.wrench,
    shield: icons.shield,
  }

  // Google Maps section
  const googleMapsSection = googleMapsUrl ? `
    <!-- GOOGLE MAPS SECTION -->
    <section class="section bg-cream">
      <div class="container">
        <div class="section-header">
          <p class="section-tag">Find Us</p>
          <h2 class="section-title">Our Location</h2>
        </div>
        <div style="max-width: 700px; margin: 0 auto; text-align: center;">
          <iframe 
            src="https://maps.google.com/maps?q=${encodeURIComponent(companyName + ', ' + location + ', Australia')}&output=embed&z=14"
            width="100%" 
            height="350" 
            style="border:0; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>
  ` : ''

  // Instagram section
  const instagramSection = instagramUrl ? `
    <!-- INSTAGRAM SECTION -->
    <section class="section bg-background">
      <div class="container">
        <div class="section-header">
          <p class="section-tag">Follow Our Work</p>
          <h2 class="section-title">Latest Projects</h2>
        </div>
        <div style="text-align: center;">
          <a href="${instagramUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="display: inline-flex;">
            ${icons.instagram}
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  ` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} | Bathroom Renovations ${city}</title>
  <meta name="description" content="${companyName} - Premium bathroom renovations in ${city}. Licensed builder with full warranty insurance. Free quotes available.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* CSS Variables */
    :root {
      --background: hsl(210 20% 98%);
      --foreground: hsl(220 30% 12%);
      --card: hsl(0 0% 100%);
      --card-foreground: hsl(220 30% 12%);
      --muted: hsl(210 15% 94%);
      --muted-foreground: hsl(220 10% 46%);
      --border: hsl(220 15% 88%);
      --primary: hsl(220 25% 14%);
      --primary-foreground: hsl(42 60% 90%);
      --gold: hsl(38 75% 55%);
      --gold-light: hsl(40 60% 75%);
      --navy: hsl(220 25% 14%);
      --navy-light: hsl(220 20% 22%);
      --cream: hsl(42 45% 95%);
      --radius: 4px;
    }

    /* Reset */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    /* Base */
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--background);
      color: var(--foreground);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* Typography */
    .font-display { font-family: 'DM Serif Display', serif; }
    .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, h4, h5 { font-family: 'DM Serif Display', serif; }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Animations */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    /* Gradient text */
    .text-gradient-gold {
      background: linear-gradient(135deg, hsl(38 75% 55%), hsl(40 60% 75%));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ==================== NAVBAR ==================== */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(26, 32, 44, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }
    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }
    .navbar-brand {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      line-height: 1.2;
    }
    .navbar-brand-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.25rem;
      color: var(--primary-foreground);
      letter-spacing: 0.02em;
    }
    .navbar-brand-sub {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: 0.25em;
    }
    .navbar-links {
      display: none;
      align-items: center;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .navbar-links { display: flex; }
    }
    .navbar-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(237, 233, 225, 0.8);
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: color 0.3s;
    }
    .navbar-link:hover { color: var(--gold); }
    .navbar-actions {
      display: none;
      align-items: center;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .navbar-actions { display: flex; }
    }
    .navbar-social {
      color: rgba(237, 233, 225, 0.7);
      transition: color 0.3s;
    }
    .navbar-social:hover { color: var(--gold); }
    .navbar-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--gold);
      color: var(--navy);
      font-weight: 600;
      padding: 0.625rem 1.25rem;
      border-radius: var(--radius);
      text-decoration: none;
      font-size: 0.875rem;
      transition: background 0.3s;
    }
    .navbar-cta:hover { background: var(--gold-light); }
    .navbar-toggle {
      display: block;
      background: none;
      border: none;
      color: var(--primary-foreground);
      cursor: pointer;
      padding: 0.5rem;
    }
    @media (min-width: 768px) {
      .navbar-toggle { display: none; }
    }
    .mobile-menu {
      display: none;
      background: var(--primary);
      border-top: 1px solid rgba(212, 175, 55, 0.1);
      padding: 0 1rem 1.5rem;
    }
    .mobile-menu.open { display: block; }
    .mobile-menu a {
      display: block;
      padding: 0.75rem 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(237, 233, 225, 0.8);
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid rgba(237, 233, 225, 0.05);
    }
    .mobile-menu a:hover { color: var(--gold); }
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
      background: linear-gradient(to right, 
        hsla(220, 25%, 14%, 0.92) 0%,
        hsla(220, 25%, 14%, 0.75) 50%,
        hsla(220, 25%, 14%, 0.45) 100%);
    }
    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 650px;
      padding: 6rem 0 4rem;
    }
    .hero-tag {
      color: var(--gold);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
    .hero-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      line-height: 1.1;
      color: var(--primary-foreground);
      margin-bottom: 1.5rem;
    }
    .hero-title em {
      font-style: italic;
    }
    .hero-desc {
      font-size: 1.125rem;
      font-weight: 300;
      color: rgba(237, 233, 225, 0.75);
      max-width: 500px;
      margin-bottom: 2.5rem;
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
      font-size: 1rem;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }
    .btn-gold {
      background: var(--gold);
      color: var(--navy);
    }
    .btn-gold:hover { background: var(--gold-light); }
    .btn-outline {
      background: transparent;
      border: 1px solid rgba(237, 233, 225, 0.3);
      color: var(--primary-foreground);
    }
    .btn-outline:hover {
      border-color: var(--gold);
      color: var(--gold);
    }
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(237, 233, 225, 0.5);
      animation: bounce 2s infinite;
    }
    .scroll-indicator:hover { color: var(--gold); }

    /* ==================== SECTIONS ==================== */
    .section {
      padding: 6rem 0;
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .section-tag {
      color: var(--gold);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    .section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 5vw, 3rem);
      color: var(--foreground);
      line-height: 1.2;
    }
    .section-title em { font-style: italic; }
    .bg-background { background: var(--background); }
    .bg-cream { background: var(--cream); }
    .bg-primary { background: var(--primary); }
    .bg-primary .section-title { color: var(--primary-foreground); }

    /* ==================== SERVICES ==================== */
    .services-grid {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 4rem;
    }
    @media (min-width: 768px) {
      .services-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .services-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .service-card {
      background: var(--card);
      border-radius: var(--radius);
      padding: 2rem;
      border: 1px solid var(--border);
      transition: all 0.3s;
    }
    .service-card:hover {
      border-color: rgba(212, 175, 55, 0.3);
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }
    .service-icon {
      color: var(--gold);
      margin-bottom: 1.25rem;
    }
    .service-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.25rem;
      color: var(--foreground);
      margin-bottom: 0.75rem;
    }
    .service-desc {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      line-height: 1.7;
    }
    .services-gallery {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .services-gallery { grid-template-columns: repeat(2, 1fr); }
    }
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      aspect-ratio: 4/3;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s;
    }
    .gallery-item:hover img { transform: scale(1.05); }
    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(26, 32, 44, 0.7), transparent);
    }
    .gallery-title {
      position: absolute;
      bottom: 1.5rem;
      left: 1.5rem;
      font-family: 'DM Serif Display', serif;
      font-size: 1.5rem;
      color: var(--primary-foreground);
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
    .about-content .section-tag { text-align: left; }
    .about-content .section-title { 
      text-align: left; 
      margin-bottom: 1.5rem;
      color: var(--primary-foreground);
    }
    .about-content p {
      color: rgba(237, 233, 225, 0.7);
      font-size: 1.125rem;
      margin-bottom: 1rem;
      line-height: 1.8;
    }
    .about-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--gold);
      font-weight: 600;
      text-decoration: none;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 1rem;
      transition: color 0.3s;
    }
    .about-link:hover { color: var(--gold-light); }
    .about-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
    .stat-card {
      background: rgba(220, 220, 235, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.1);
      border-radius: var(--radius);
      padding: 2rem;
      text-align: center;
    }
    .stat-icon {
      color: var(--gold);
      margin: 0 auto 1rem;
    }
    .stat-label {
      font-family: 'DM Serif Display', serif;
      font-size: 1.125rem;
      color: var(--primary-foreground);
    }

    /* ==================== REVIEWS ==================== */
    .reviews-grid {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .reviews-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .review-card {
      background: rgba(220, 220, 235, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.1);
      border-radius: var(--radius);
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }
    .review-quote {
      color: var(--gold);
      opacity: 0.3;
      margin-bottom: 1rem;
    }
    .review-text {
      color: rgba(237, 233, 225, 0.8);
      font-size: 1rem;
      line-height: 1.7;
      flex: 1;
      margin-bottom: 1.5rem;
    }
    .review-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .review-author {
      font-family: 'DM Serif Display', serif;
      font-size: 1.125rem;
      color: var(--primary-foreground);
    }
    .review-location {
      font-size: 0.875rem;
      color: rgba(237, 233, 225, 0.5);
    }
    .review-stars {
      display: flex;
      gap: 2px;
      color: var(--gold);
    }
    .review-source {
      font-size: 0.75rem;
      color: rgba(237, 233, 225, 0.4);
      margin-top: 0.25rem;
      text-align: right;
    }

    /* ==================== MEET THE TEAM ==================== */
    .team-card {
      max-width: 600px;
      margin: 0 auto;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
    }
    .team-header {
      background: rgba(26, 32, 44, 0.6);
      padding: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .team-avatar {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.2);
      border: 2px solid rgba(212, 175, 55, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
    }
    .team-body {
      padding: 2rem;
      text-align: center;
    }
    .team-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.875rem;
      color: var(--foreground);
      margin-bottom: 0.25rem;
    }
    .team-role {
      color: var(--gold);
      font-weight: 600;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    .team-desc {
      color: var(--muted-foreground);
      line-height: 1.7;
      max-width: 400px;
      margin: 0 auto 1.5rem;
    }
    .team-badges {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }
    .team-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    .team-badge svg { color: var(--gold); }

    /* ==================== AREAS ==================== */
    .areas-grid {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 640px) {
      .areas-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .areas-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .area-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      text-align: center;
      transition: all 0.3s;
    }
    .area-card:hover {
      border-color: rgba(212, 175, 55, 0.4);
    }
    .area-icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.25rem;
      color: var(--gold);
      transition: background 0.3s;
    }
    .area-card:hover .area-icon {
      background: rgba(212, 175, 55, 0.2);
    }
    .area-name {
      font-family: 'DM Serif Display', serif;
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: 0.5rem;
    }
    .area-desc {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    /* ==================== CONTACT ==================== */
    .contact-wrapper {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .contact-desc {
      color: var(--muted-foreground);
      font-size: 1.125rem;
      margin-bottom: 3rem;
    }
    .contact-cards {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    @media (min-width: 640px) {
      .contact-cards { grid-template-columns: repeat(3, 1fr); }
    }
    .contact-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      text-decoration: none;
      transition: all 0.3s;
    }
    .contact-card:hover {
      border-color: rgba(212, 175, 55, 0.4);
    }
    .contact-card-icon {
      color: var(--gold);
      margin: 0 auto 1rem;
    }
    .contact-card-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.125rem;
      color: var(--foreground);
      margin-bottom: 0.25rem;
    }
    .contact-card-text {
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
    .contact-location svg { color: var(--gold); }

    /* ==================== FOOTER ==================== */
    .footer {
      background: var(--primary);
      padding: 4rem 0;
    }
    .footer-grid {
      display: grid;
      gap: 3rem;
      margin-bottom: 3rem;
    }
    @media (min-width: 768px) {
      .footer-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .footer-brand .navbar-brand-name { margin-bottom: 0.25rem; }
    .footer-desc {
      color: rgba(237, 233, 225, 0.6);
      font-size: 0.875rem;
      line-height: 1.7;
      margin-top: 1rem;
    }
    .footer-title {
      font-family: 'DM Serif Display', serif;
      font-size: 1.125rem;
      color: var(--primary-foreground);
      margin-bottom: 1rem;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .footer-link {
      color: rgba(237, 233, 225, 0.6);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.3s;
    }
    .footer-link:hover { color: var(--gold); }
    .footer-contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(237, 233, 225, 0.6);
      text-decoration: none;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      transition: color 0.3s;
    }
    .footer-contact-item:hover { color: var(--gold); }
    .footer-contact-item svg { width: 16px; height: 16px; }
    .footer-bottom {
      border-top: 1px solid rgba(237, 233, 225, 0.1);
      padding-top: 2rem;
      text-align: center;
    }
    .footer-copyright {
      color: rgba(237, 233, 225, 0.4);
      font-size: 0.75rem;
    }

    /* ==================== STICKY FOOTER CTA ==================== */
    .sticky-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--primary);
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      padding: 1rem 0;
      z-index: 999;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
    }
    .sticky-footer-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    @media (min-width: 640px) {
      .sticky-footer-inner {
        justify-content: space-between;
      }
    }
    .sticky-footer-text {
      font-family: 'DM Serif Display', serif;
      font-size: 1.25rem;
      color: var(--primary-foreground);
      display: none;
    }
    @media (min-width: 640px) {
      .sticky-footer-text { display: block; }
    }
    .sticky-footer-buttons {
      display: flex;
      gap: 0.75rem;
    }
    .sticky-footer-btn {
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
    .sticky-footer-btn.book {
      background: var(--gold);
      color: var(--navy);
    }
    .sticky-footer-btn.book:hover { background: var(--gold-light); }
    .sticky-footer-btn.call {
      background: transparent;
      border: 2px solid var(--gold);
      color: var(--gold);
    }
    .sticky-footer-btn.call:hover {
      background: var(--gold);
      color: var(--navy);
    }

    /* Add padding to body for sticky footer */
    body { padding-bottom: 80px; }

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
  </style>
</head>
<body>
  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="container">
      <div class="navbar-inner">
        <a href="#" class="navbar-brand">
          <span class="navbar-brand-name">${companyName.split(' ')[0]}</span>
          <span class="navbar-brand-sub">${companyName.split(' ').slice(1).join(' ') || 'Projects'}</span>
        </a>
        <div class="navbar-links">
          <a href="#services" class="navbar-link">Services</a>
          <a href="#about" class="navbar-link">About</a>
          <a href="#areas" class="navbar-link">Areas</a>
          <a href="#contact" class="navbar-link">Contact</a>
        </div>
        <div class="navbar-actions">
          ${instagramUrl ? `<a href="${instagramUrl}" target="_blank" rel="noopener" class="navbar-social">${icons.instagram}</a>` : ''}
          <a href="tel:${phoneClean}" class="navbar-cta" onclick="trackClick('phone_navbar')">
            ${icons.phone}
            ${phoneFormatted}
          </a>
        </div>
        <button class="navbar-toggle" onclick="toggleMenu()" aria-label="Toggle menu">
          <span id="menuIcon">${icons.menu}</span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <a href="#services" onclick="closeMenu()">Services</a>
        <a href="#about" onclick="closeMenu()">About</a>
        <a href="#areas" onclick="closeMenu()">Areas</a>
        <a href="#contact" onclick="closeMenu()">Contact</a>
        <a href="tel:${phoneClean}" class="navbar-cta" onclick="trackClick('phone_mobile')">
          ${icons.phone}
          ${phoneFormatted}
        </a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg">
      <img src="${images.hero}" alt="Luxury bathroom renovation">
      <div class="hero-overlay"></div>
    </div>
    <div class="container">
      <div class="hero-content animate-fade-in-up">
        <p class="hero-tag">${content.tagline}</p>
        <h1 class="hero-title">
          ${content.headline}<br>
          <em class="text-gradient-gold">${content.headlineHighlight}</em>
        </h1>
        <p class="hero-desc">${content.description}</p>
        <div class="hero-buttons">
          <a href="${calendarUrl}" target="_blank" class="btn btn-gold" onclick="trackClick('book_hero')">
            Publish Your Website Now!
          </a>
          <a href="#services" class="btn btn-outline">
            View Our Work
          </a>
        </div>
      </div>
    </div>
    <a href="#services" class="scroll-indicator">
      ${icons.arrowDown}
    </a>
  </section>

  <!-- SERVICES -->
  <section id="services" class="section bg-background">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">What We Do</p>
        <h2 class="section-title">Our Services</h2>
      </div>
      <div class="services-grid">
        ${servicesArray.map(s => `
          <div class="service-card">
            <div class="service-icon">${iconMap[s.icon] || icons.bath}</div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.desc}</p>
          </div>
        `).join('')}
      </div>
      <div class="services-gallery">
        <div class="gallery-item">
          <img src="${images.shower}" alt="Custom shower renovation">
          <div class="gallery-overlay"></div>
          <p class="gallery-title">Custom Showers</p>
        </div>
        <div class="gallery-item">
          <img src="${images.vanity}" alt="Vanity and basin installation">
          <div class="gallery-overlay"></div>
          <p class="gallery-title">Vanity Installations</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="section bg-primary">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <p class="section-tag">About Us</p>
          <h2 class="section-title">
            ${content.aboutTitle}<br>
            <em class="text-gradient-gold">${content.aboutHighlight}</em>
          </h2>
          ${aboutTextArray.map(p => `<p>${p}</p>`).join('')}
          <a href="#contact" class="about-link">Get in Touch →</a>
        </div>
        <div class="about-stats">
          <div class="stat-card">
            <div class="stat-icon">${icons.award}</div>
            <p class="stat-label">Licensed Builder</p>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${icons.shield}</div>
            <p class="stat-label">Warranty Insurance</p>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${icons.hammer}</div>
            <p class="stat-label">Fully Equipped</p>
          </div>
          <div class="stat-card">
            <div class="stat-icon">${icons.clock}</div>
            <p class="stat-label">On-Time Delivery</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- MEET THE TEAM -->
  <section id="team" class="section bg-background">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Our Team</p>
        <h2 class="section-title">Meet the <em class="text-gradient-gold">Team</em></h2>
      </div>
      <div class="team-card">
        <div class="team-header">
          <div class="team-avatar">${icons.user}</div>
        </div>
        <div class="team-body">
          <h3 class="team-name">${content.ownerName}</h3>
          <p class="team-role">Founder & Licensed Builder</p>
          <p class="team-desc">With years of hands-on experience, leading every project with precision and a commitment to quality. Licensed, insured, and passionate about transforming bathrooms.</p>
          <div class="team-badges">
            <div class="team-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Fully Equipped
            </div>
            <div class="team-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
              Licensed Builder
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section id="reviews" class="section bg-primary">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Testimonials</p>
        <h2 class="section-title" style="color: var(--primary-foreground);">What Our Clients Say</h2>
      </div>
      <div class="reviews-grid" id="reviewsGrid">
        <div class="review-card">
          <div class="review-quote">${icons.quote}</div>
          <p class="review-text">"Excellent work! They were very thorough and friendly. Explained everything clearly. We will definitely hire them again!"</p>
          <div class="review-footer">
            <div>
              <p class="review-author">Happy Customer</p>
              <p class="review-location">${city}, ${state}</p>
            </div>
            <div>
              <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              <p class="review-source">Google Review</p>
            </div>
          </div>
        </div>
        <div class="review-card">
          <div class="review-quote">${icons.quote}</div>
          <p class="review-text">"Great communication and reliable service. The finished result exceeded our expectations. Highly recommend!"</p>
          <div class="review-footer">
            <div>
              <p class="review-author">Satisfied Client</p>
              <p class="review-location">${city}, ${state}</p>
            </div>
            <div>
              <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              <p class="review-source">Google Review</p>
            </div>
          </div>
        </div>
        <div class="review-card">
          <div class="review-quote">${icons.quote}</div>
          <p class="review-text">"Professional, quick, affordable and premium finish. Excellent work ethics — would and will use again."</p>
          <div class="review-footer">
            <div>
              <p class="review-author">Returning Customer</p>
              <p class="review-location">${city}, ${state}</p>
            </div>
            <div>
              <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              <p class="review-source">Google Review</p>
            </div>
          </div>
        </div>
        <div class="review-card">
          <div class="review-quote">${icons.quote}</div>
          <p class="review-text">"Top quality workmanship from start to finish. They transformed our bathroom completely. Couldn't be happier!"</p>
          <div class="review-footer">
            <div>
              <p class="review-author">Delighted Homeowner</p>
              <p class="review-location">${city}, ${state}</p>
            </div>
            <div>
              <div class="review-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
              <p class="review-source">Google Review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- AREAS -->
  <section id="areas" class="section bg-cream">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Service Areas</p>
        <h2 class="section-title">Where We Work</h2>
      </div>
      <div class="areas-grid">
        ${areasArray.map(a => `
          <div class="area-card">
            <div class="area-icon">${icons.mapPin}</div>
            <h3 class="area-name">${a.name}</h3>
            <p class="area-desc">${a.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  ${googleMapsSection}
  ${instagramSection}

  <!-- CONTACT -->
  <section id="contact" class="section bg-background">
    <div class="container">
      <div class="contact-wrapper">
        <p class="section-tag">Get in Touch</p>
        <h2 class="section-title">Ready to Start Your Renovation?</h2>
        <p class="contact-desc">Give us a call or send an email to discuss your bathroom renovation project. Free quotes available.</p>
        <div class="contact-cards">
          <a href="tel:${phoneClean}" class="contact-card" onclick="trackClick('phone_contact')">
            <div class="contact-card-icon">${icons.phone}</div>
            <p class="contact-card-title">Call Us</p>
            <p class="contact-card-text">${phoneFormatted}</p>
          </a>
          <a href="mailto:info@${companyName.toLowerCase().replace(/\s+/g, '')}.com.au" class="contact-card">
            <div class="contact-card-icon">${icons.mail}</div>
            <p class="contact-card-title">Email Us</p>
            <p class="contact-card-text">Get in touch</p>
          </a>
          ${instagramUrl ? `
          <a href="${instagramUrl}" target="_blank" rel="noopener" class="contact-card">
            <div class="contact-card-icon">${icons.instagram}</div>
            <p class="contact-card-title">Follow Us</p>
            <p class="contact-card-text">@${companyName.toLowerCase().replace(/\s+/g, '')}</p>
          </a>
          ` : `
          <a href="#" class="contact-card">
            <div class="contact-card-icon">${icons.mapPin}</div>
            <p class="contact-card-title">Location</p>
            <p class="contact-card-text">${city}, ${state}</p>
          </a>
          `}
        </div>
        <div class="contact-location">
          ${icons.mapPin}
          Based in ${city} • Servicing ${state} & Surrounding Areas
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer" style="padding-bottom: 6rem;">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="navbar-brand-name">${companyName.split(' ')[0]}</span>
          <span class="navbar-brand-sub">${companyName.split(' ').slice(1).join(' ') || 'Projects'}</span>
          <p class="footer-desc">Licensed builder specialising in premium bathroom renovations across ${city} and surrounding areas.</p>
        </div>
        <div>
          <h4 class="footer-title">Quick Links</h4>
          <div class="footer-links">
            <a href="#services" class="footer-link">Services</a>
            <a href="#about" class="footer-link">About</a>
            <a href="#areas" class="footer-link">Areas</a>
            <a href="#contact" class="footer-link">Contact</a>
          </div>
        </div>
        <div>
          <h4 class="footer-title">Contact</h4>
          <a href="tel:${phoneClean}" class="footer-contact-item" onclick="trackClick('phone_footer')">
            ${icons.phone} ${phoneFormatted}
          </a>
          ${instagramUrl ? `
          <a href="${instagramUrl}" target="_blank" rel="noopener" class="footer-contact-item">
            ${icons.instagram} @${companyName.toLowerCase().replace(/\s+/g, '')}
          </a>
          ` : ''}
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">© ${new Date().getFullYear()} ${companyName}. All rights reserved. Licensed Builder.</p>
      </div>
    </div>
  </footer>

  <!-- STICKY FOOTER CTA -->
  <div class="sticky-footer">
    <div class="container">
      <div class="sticky-footer-inner">
        <p class="sticky-footer-text">Want this live?</p>
        <div class="sticky-footer-buttons">
          <a href="${calendarUrl}" target="_blank" class="sticky-footer-btn book" onclick="trackClick('book_sticky')">
            ${icons.calendar}
            Book Call
          </a>
          <a href="tel:${phoneClean}" class="sticky-footer-btn call" onclick="trackClick('phone_sticky')">
            ${icons.phone}
            Call Now
          </a>
        </div>
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

    // Load real reviews if available
    fetch('${reviewsEndpoint}?trackingId=${trackingId}')
      .then(r => r.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) {
          const grid = document.getElementById('reviewsGrid');
          const stars = '${icons.star}'.repeat(5);
          grid.innerHTML = data.reviews.slice(0, 4).map(r => \`
            <div class="review-card">
              <div class="review-quote">${icons.quote}</div>
              <p class="review-text">"\${r.text}"</p>
              <div class="review-footer">
                <div>
                  <p class="review-author">\${r.author_name}</p>
                  <p class="review-location">${city}, ${state}</p>
                </div>
                <div>
                  <div class="review-stars">\${stars}</div>
                  <p class="review-source">Google · \${r.relative_time_description || ''}</p>
                </div>
              </div>
            </div>
          \`).join('');
        }
      })
      .catch(() => {});
  </script>
</body>
</html>`
}
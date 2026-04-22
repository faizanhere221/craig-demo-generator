import { getNicheConfig } from './niche-config'
import { generateRooferHTML } from './templates/roofer-template'
import { generateRooferLovableHTML } from './templates/roofer-lovable-template'
import { generatePainterHTML } from './templates/painter-template'
import { generateBuilderHTML } from './templates/builder-template'
import { generateLandscaperHTML } from './templates/landscaper-template'
import { generateRenovationsHTML } from './templates/renovations-template'
import { generateBathroomLovableHTML } from './templates/bathroom-lovable-template'

export function generateSiteHTML({ companyName, phone, niche, location, trackingId = null, instagramUrl = null, googleMapsUrl = null, customContent = null }) {
  
  // Route to the correct template based on niche
  switch (niche) {
    case 'roofer':
      return generateRooferHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'roofer-lovable':
      return generateRooferLovableHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'painter':
      return generatePainterHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'builder':
      return generateBuilderHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'landscaper':
      return generateLandscaperHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'renovations':
    case 'renovation':
      return generateRenovationsHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    case 'bathroom-lovable':
      return generateBathroomLovableHTML({ companyName, phone, location, trackingId, instagramUrl, googleMapsUrl, customContent })
    default:
      // Fallback to generic template for unknown niches
      break
  }
  
  // Generic fallback template for unsupported niches
  const config = getNicheConfig(niche)
  const baseSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const slug = trackingId ? `${baseSlug}-${trackingId}` : baseSlug
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  // Extract city and state
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  // Use custom content if provided, otherwise use defaults
  const tagline = customContent?.tagline || `Quality ${config.title} You Can Trust`
  const aboutText = customContent?.aboutText || `At ${companyName}, we've built our reputation on quality work, honest pricing, and exceptional customer service. Every project gets our full attention and expertise.`
  
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${companyName} | ${config.titlePlural} in ${location}</title>
<meta name="description" content="${companyName} provides professional ${config.title.toLowerCase()} services in ${location}. Call ${phone} for a free quote.">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --primary: ${config.primaryColor || '#1e40af'};
  --primary-dark: ${config.primaryDark || '#1e3a8a'};
  --accent: ${config.accentColor || '#f97316'};
  --dark: #0f172a;
  --text: #334155;
  --muted: #64748b;
  --light: #f8fafc;
  --border: #e2e8f0;
  --white: #ffffff;
  --font: 'Inter', sans-serif;
  --r: 8px;
}
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--text); background: var(--light); line-height: 1.6; }

/* Demo Ribbon */
.demo-ribbon {
  position: fixed; top: 22px; right: -30px;
  background: #f39c12; color: #111; font-size: 11px; font-weight: 800;
  padding: 5px 44px; transform: rotate(45deg);
  letter-spacing: 1.5px; z-index: 9999; text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Nav */
nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--white);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 6%; height: 72px;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.nav-logo {
  font-size: 22px; font-weight: 800; color: var(--dark);
  text-decoration: none;
}
.nav-logo span { color: var(--primary); }
.nav-links { display: flex; gap: 32px; list-style: none; }
.nav-links a {
  color: var(--muted); text-decoration: none;
  font-size: 14px; font-weight: 600; transition: color 0.2s;
}
.nav-links a:hover { color: var(--primary); }
.nav-cta {
  background: var(--primary); color: var(--white);
  padding: 10px 24px; border-radius: var(--r);
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: background 0.2s;
}
.nav-cta:hover { background: var(--primary-dark); }

/* Mobile Toggle */
.mobile-toggle {
  display: none; background: none; border: none; cursor: pointer;
  width: 28px; height: 20px; position: relative;
}
.mobile-toggle span {
  display: block; width: 100%; height: 2px;
  background: var(--dark); border-radius: 2px;
  position: absolute; left: 0; transition: all 0.3s;
}
.mobile-toggle span:nth-child(1) { top: 0; }
.mobile-toggle span:nth-child(2) { top: 9px; }
.mobile-toggle span:nth-child(3) { top: 18px; }
.mobile-toggle.active span:nth-child(1) { top: 9px; transform: rotate(45deg); }
.mobile-toggle.active span:nth-child(2) { opacity: 0; }
.mobile-toggle.active span:nth-child(3) { top: 9px; transform: rotate(-45deg); }

.mobile-menu {
  display: none; position: fixed; top: 72px; left: 0; right: 0;
  background: var(--white); padding: 20px 6%;
  flex-direction: column; gap: 0;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05); z-index: 99;
}
.mobile-menu.active { display: flex; }
.mobile-menu a {
  color: var(--dark); text-decoration: none;
  font-size: 16px; font-weight: 600;
  padding: 14px 0; border-bottom: 1px solid var(--border);
}

/* Hero */
.hero {
  min-height: 600px; display: grid; grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, var(--dark) 0%, #1e293b 100%);
  overflow: hidden;
}
.hero-content {
  padding: 80px 8%; display: flex; flex-direction: column;
  justify-content: center;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 700;
  padding: 8px 16px; border-radius: 50px;
  width: fit-content; margin-bottom: 24px;
}
.hero h1 {
  font-size: 52px; color: var(--white); line-height: 1.1;
  margin-bottom: 20px; font-weight: 800;
}
.hero h1 em { color: var(--accent); font-style: normal; }
.hero-sub {
  color: rgba(255,255,255,0.7); font-size: 18px;
  max-width: 480px; margin-bottom: 32px; line-height: 1.7;
}
.hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
.btn-primary {
  background: var(--accent); color: var(--white);
  padding: 16px 32px; border-radius: var(--r);
  font-size: 16px; font-weight: 700; text-decoration: none;
  transition: all 0.2s; display: inline-block;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.btn-outline {
  border: 2px solid rgba(255,255,255,0.3); color: var(--white);
  padding: 14px 30px; border-radius: var(--r);
  font-size: 16px; font-weight: 600; text-decoration: none;
  transition: all 0.2s; display: inline-block;
}
.btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }
.hero-stats {
  display: flex; gap: 40px; margin-top: 48px;
  padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);
}
.stat .num { font-size: 36px; font-weight: 800; color: var(--white); }
.stat .lbl { font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 4px; }
.hero-img { position: relative; }
.hero-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); }

/* Sections */
section { padding: 80px 8%; }
.section-header { margin-bottom: 48px; }
.section-tag {
  font-size: 12px; font-weight: 700; color: var(--primary);
  text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;
}
.section-title {
  font-size: 40px; font-weight: 800; color: var(--dark);
  line-height: 1.2; margin-bottom: 16px;
}
.section-title em { color: var(--primary); font-style: normal; }
.section-sub { font-size: 18px; color: var(--muted); max-width: 600px; }

/* Services */
#services { background: var(--white); }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.service-card {
  background: var(--light); border-radius: var(--r);
  padding: 32px; border: 1px solid var(--border);
  transition: all 0.3s;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  border-color: var(--primary);
}
.service-icon { font-size: 36px; margin-bottom: 20px; }
.service-card h3 { font-size: 20px; font-weight: 700; color: var(--dark); margin-bottom: 12px; }
.service-card p { font-size: 15px; color: var(--muted); line-height: 1.7; }

/* Trust Bar */
.trust-bar {
  background: var(--white); border-bottom: 1px solid var(--border);
  padding: 20px 8%; display: flex; justify-content: center;
  gap: 48px; flex-wrap: wrap;
}
.trust-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 600; color: var(--text);
}
.trust-icon {
  width: 32px; height: 32px; background: var(--primary);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: var(--white); font-size: 14px;
}

/* Testimonials */
#testimonials { background: var(--light); }
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.testimonial-card {
  background: var(--white); border-radius: var(--r);
  padding: 32px; border: 1px solid var(--border);
}
.testimonial-stars { color: #f59e0b; font-size: 18px; margin-bottom: 16px; }
.testimonial-text {
  font-size: 16px; color: var(--text); line-height: 1.7;
  margin-bottom: 20px; font-style: italic;
}
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar {
  width: 44px; height: 44px; background: var(--primary);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: var(--white); font-weight: 700;
}
.testimonial-name { font-weight: 700; color: var(--dark); }
.testimonial-loc { font-size: 14px; color: var(--muted); }

/* CTA */
.cta-section {
  background: var(--primary); padding: 64px 8%;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 32px;
}
.cta-section h2 { font-size: 36px; color: var(--white); font-weight: 800; }
.cta-section p { color: rgba(255,255,255,0.8); font-size: 18px; margin-top: 8px; }
.cta-btn {
  background: var(--white); color: var(--primary);
  padding: 16px 36px; border-radius: var(--r);
  font-size: 16px; font-weight: 700; text-decoration: none;
  transition: all 0.2s;
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

/* Contact */
#contact { background: var(--white); }
.contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 64px; }
.contact-info { display: flex; flex-direction: column; gap: 24px; }
.contact-item { display: flex; gap: 16px; align-items: flex-start; }
.contact-icon {
  width: 48px; height: 48px; background: var(--light);
  border-radius: var(--r); display: flex; align-items: center;
  justify-content: center; font-size: 20px; flex-shrink: 0;
}
.contact-item h4 { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.contact-item p, .contact-item a {
  font-size: 15px; color: var(--muted); text-decoration: none;
}
.contact-item a:hover { color: var(--primary); }
.contact-form {
  background: var(--light); border-radius: var(--r);
  padding: 40px; border: 1px solid var(--border);
}
.contact-form h3 { font-size: 24px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
.contact-form .sub { font-size: 15px; color: var(--muted); margin-bottom: 24px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block; font-size: 13px; font-weight: 600;
  color: var(--muted); margin-bottom: 6px; text-transform: uppercase;
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%; border: 1px solid var(--border); border-radius: var(--r);
  padding: 14px 16px; font-size: 15px; font-family: var(--font);
  background: var(--white); transition: border-color 0.2s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; border-color: var(--primary);
}
.form-group textarea { min-height: 120px; resize: vertical; }
.form-submit {
  width: 100%; background: var(--primary); color: var(--white);
  border: none; padding: 16px; border-radius: var(--r);
  font-size: 16px; font-weight: 700; cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover { background: var(--primary-dark); }

/* Footer */
footer {
  background: var(--dark); color: rgba(255,255,255,0.6);
  padding: 40px 8%; text-align: center;
}
.footer-logo {
  font-size: 22px; font-weight: 800; color: var(--white);
  margin-bottom: 16px;
}
.footer-logo span { color: var(--primary); }
.footer-info { margin-bottom: 20px; font-size: 14px; }
.footer-optimo {
  padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);
}
.footer-optimo a {
  color: var(--accent); text-decoration: none; font-weight: 600;
}
.footer-optimo a:hover { color: var(--white); }

/* Responsive */
@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; }
  .hero-content { padding: 60px 6%; }
  .hero h1 { font-size: 38px; }
  .hero-img { display: none; }
  .hero-stats { gap: 24px; flex-wrap: wrap; }
  .services-grid { grid-template-columns: 1fr 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
  .cta-section { text-align: center; justify-content: center; }
}

@media (max-width: 600px) {
  .hero h1 { font-size: 32px; }
  .hero-btns { flex-direction: column; }
  .hero-btns a { width: 100%; text-align: center; }
  .hero-stats { flex-direction: column; gap: 16px; }
  .services-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .section-title { font-size: 32px; }
  .trust-bar { flex-direction: column; gap: 16px; }
  .cta-section h2 { font-size: 28px; }
}
</style>
</head>
<body>

<div class="demo-ribbon">Demo</div>

<!-- Nav -->
<nav>
  <a href="#" class="nav-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || config.title}</span></a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#testimonials">Reviews</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="${calendarUrl}" target="_blank" class="nav-cta">Free Quote</a>
</nav>

<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#testimonials">Reviews</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-content">
    <div class="hero-badge">✓ ${city}'s Trusted ${config.title} Experts</div>
    <h1>${tagline.split(' ').slice(0, 3).join(' ')} <em>${tagline.split(' ').slice(3).join(' ') || 'You Can Trust'}</em></h1>
    <p class="hero-sub">${aboutText}</p>
    <div class="hero-btns">
      <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">Book Free Consultation</a>
      <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 ${phone}</a>
    </div>
    <div class="hero-stats">
      <div class="stat"><div class="num">15+</div><div class="lbl">Years Experience</div></div>
      <div class="stat"><div class="num">500+</div><div class="lbl">Projects Completed</div></div>
      <div class="stat"><div class="num">4.9★</div><div class="lbl">Google Rating</div></div>
    </div>
  </div>
  <div class="hero-img">
    <img src="${config.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=700&fit=crop'}" alt="${config.title}">
  </div>
</section>

<!-- Trust Bar -->
<div class="trust-bar">
  <div class="trust-item"><div class="trust-icon">✓</div> Licensed & Insured</div>
  <div class="trust-item"><div class="trust-icon">⚡</div> Fast Response</div>
  <div class="trust-item"><div class="trust-icon">💰</div> Free Quotes</div>
  <div class="trust-item"><div class="trust-icon">🏆</div> Quality Guaranteed</div>
</div>

<!-- Services -->
<section id="services">
  <div class="section-header">
    <div class="section-tag">Our Services</div>
    <h2 class="section-title">What We <em>Offer</em></h2>
    <p class="section-sub">Professional ${config.title.toLowerCase()} services for homes and businesses across ${city}.</p>
  </div>
  <div class="services-grid">
    ${config.services.slice(0, 6).map(service => `
    <div class="service-card">
      <span class="service-icon">${service.icon}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
    `).join('')}
  </div>
</section>

<!-- Testimonials -->
<section id="testimonials">
  <div class="section-header">
    <div class="section-tag">Reviews</div>
    <h2 class="section-title">What Customers <em>Say</em></h2>
    <p class="section-sub">Real reviews from happy customers across ${city}.</p>
  </div>
  <div class="testimonials-grid">
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Excellent service from start to finish. The team was professional, punctual, and delivered exactly what they promised. Highly recommend!"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">JM</div>
        <div><div class="testimonial-name">James M.</div><div class="testimonial-loc">${city}, ${state}</div></div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Very impressed with the quality of work. They were responsive, reasonably priced, and the results exceeded our expectations."</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">SL</div>
        <div><div class="testimonial-name">Sarah L.</div><div class="testimonial-loc">${city}, ${state}</div></div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Outstanding work! The team was friendly, efficient, and left everything spotless. Would definitely use them again."</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">DK</div>
        <div><div class="testimonial-name">David K.</div><div class="testimonial-loc">${city}, ${state}</div></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<div class="cta-section">
  <div>
    <h2>Ready to Get Started?</h2>
    <p>Free quotes. No obligation. Fast response.</p>
  </div>
  <a href="${calendarUrl}" target="_blank" class="cta-btn" data-track="book_call">Book Free Consultation</a>
</div>

<!-- Contact -->
<section id="contact">
  <div class="section-header">
    <div class="section-tag">Contact</div>
    <h2 class="section-title">Get In <em>Touch</em></h2>
    <p class="section-sub">Ready to discuss your project? Contact us today for a free quote.</p>
  </div>
  <div class="contact-grid">
    <div class="contact-info">
      <div class="contact-item">
        <div class="contact-icon">📞</div>
        <div>
          <h4>Call Us</h4>
          <a href="tel:${phoneClean}">${phone}</a>
          <p>Mon-Fri 7am-5pm, Sat 8am-12pm</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">📍</div>
        <div>
          <h4>Service Area</h4>
          <p>${city} and surrounding areas</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">🕐</div>
        <div>
          <h4>Hours</h4>
          <p>Monday - Friday: 7am - 5pm</p>
          <p>Saturday: 8am - 12pm</p>
        </div>
      </div>
    </div>
    <div class="contact-form">
      <h3>Request a Free Quote</h3>
      <p class="sub">We'll get back to you within 2 hours.</p>
      <div class="form-row">
        <div class="form-group"><label>First Name</label><input type="text" placeholder="Your name"></div>
        <div class="form-group"><label>Phone</label><input type="tel" placeholder="Your phone"></div>
      </div>
      <div class="form-group"><label>Service Needed</label>
        <select>
          <option value="">Select a service...</option>
          ${config.services.map(s => `<option>${s.title}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Message</label><textarea placeholder="Tell us about your project..."></textarea></div>
      <button class="form-submit" onclick="window.open('${calendarUrl}', '_blank')">Get Free Quote →</button>
    </div>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || config.title}</span></div>
  <div class="footer-info">© 2026 ${companyName} · ${city}, ${state}</div>
  <div class="footer-optimo">
    <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
  </div>
</footer>

<!-- Tracking -->
<script>
(function() {
  const trackingId = '${trackingId}';
  const trackingEndpoint = '${trackingEndpoint}';
  
  function trackEvent(eventType) {
    try {
      fetch(trackingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: trackingId,
          event: eventType,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        }),
        mode: 'cors'
      }).catch(() => {});
    } catch (e) {}
  }
  
  window.addEventListener('load', () => trackEvent('view'));
  
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
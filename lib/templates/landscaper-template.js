/**
 * Aussie Landscaper Template - Craig's Design
 * 
 * Features:
 * - Green color scheme (#2d5a27)
 * - Nature/organic styling
 * - "Built By Optimo Agency" footer
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram embed
 * - View & click tracking
 */

// Default images - configurable
const DEFAULT_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=720&fit=crop',
  about: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=560&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=400&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=400&h=250&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=250&fit=crop',
}

export function generateLandscaperHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  // Use custom images if provided, otherwise defaults
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  // Extract state from location
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  // Custom content or defaults
  const tagline = customContent?.tagline || 'Your Backyard, Done Properly'
  const aboutText = customContent?.aboutText || `${companyName} is a locally owned landscaping business — not a franchise. We've been transforming backyards across ${city} for over 12 years, and we know ${state}'s soil, climate, and water restrictions better than anyone.`

  // Google Maps section (only if URL provided)
  const googleMapsSection = googleMapsUrl ? `
<!-- GOOGLE MAPS SECTION -->
<section id="location" style="background: #fff; padding: 60px 8%;">
  <div class="sec-hd" style="text-align: center;">
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
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: var(--forest); color: #fff; padding: 14px 32px; border-radius: var(--r); font-weight: 700; text-decoration: none; font-size: 14px;">
      📍 View on Google Maps & Reviews
    </a>
  </div>
</section>
` : ''

  // Instagram section (only if URL provided)
  const instagramSection = instagramUrl ? `
<!-- INSTAGRAM SECTION -->
<section id="instagram" style="background: var(--cream); padding: 60px 8%;">
  <div class="sec-hd" style="text-align: center;">
    <div class="stag">Follow Our Work</div>
    <h2 class="sh">See Us On <em>Instagram</em></h2>
    <p class="ssub" style="margin: 0 auto;">Check out our latest projects and transformations.</p>
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
<title>${companyName} | Landscaping ${city}, ${state}</title>
<meta name="description" content="${companyName} provides professional landscaping services in ${city}, ${state}. Call ${phone} for a free design consultation.">
<meta name="robots" content="noindex, nofollow">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --green:#2d5a27;--green-mid:#3d7a34;--green-light:#4e9e43;--green-pale:#eef5ec;
  --stone:#8b7d6b;--cream:#faf8f4;--dark:#1a1a1a;--mid:#555;--muted:#888;
  --border:#e5e0d8;--white:#fff;
  --hf:'Playfair Display',serif;--bf:'Inter',sans-serif;--r:8px;
}
html{scroll-behavior:smooth}
body{font-family:var(--bf);color:var(--dark);background:var(--cream);line-height:1.6}

.demo-badge{position:fixed;top:20px;right:-28px;background:var(--green);color:#fff;font-size:10px;font-weight:700;padding:5px 42px;transform:rotate(45deg);z-index:9999;letter-spacing:1.5px;text-transform:uppercase}

.banner{background:var(--green);color:#fff;text-align:center;padding:10px 16px;font-size:14px;font-weight:600}
.banner strong{color:#b8e6b0}

nav{position:sticky;top:0;z-index:100;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 6%;height:70px;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
.nav-logo{font-family:var(--hf);font-size:22px;color:var(--green);text-decoration:none;display:flex;align-items:center;gap:10px}
.nav-logo-icon{width:36px;height:36px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px}
.nav-logo em{color:var(--stone);font-style:normal;margin-left:4px}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:var(--mid);text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
.nav-links a:hover{color:var(--green)}
.nav-cta{background:var(--green);color:#fff;padding:10px 22px;border-radius:var(--r);font-size:14px;font-weight:600;text-decoration:none;transition:background .2s}
.nav-cta:hover{background:var(--green-mid)}

.mobile-toggle{display:none;background:none;border:none;cursor:pointer;width:28px;height:20px;position:relative}
.mobile-toggle span{display:block;width:100%;height:2px;background:var(--dark);border-radius:2px;position:absolute;left:0;transition:all .3s}
.mobile-toggle span:nth-child(1){top:0}
.mobile-toggle span:nth-child(2){top:9px}
.mobile-toggle span:nth-child(3){top:18px}
.mobile-toggle.active span:nth-child(1){top:9px;transform:rotate(45deg)}
.mobile-toggle.active span:nth-child(2){opacity:0}
.mobile-toggle.active span:nth-child(3){top:9px;transform:rotate(-45deg)}
.mobile-menu{display:none;position:fixed;top:70px;left:0;right:0;background:var(--white);padding:20px 6%;flex-direction:column;gap:0;border-bottom:1px solid var(--border);box-shadow:0 4px 6px rgba(0,0,0,0.05);z-index:99}
.mobile-menu.active{display:flex}
.mobile-menu a{color:var(--dark);text-decoration:none;font-size:16px;font-weight:600;padding:14px 0;border-bottom:1px solid var(--border)}

.hero{position:relative;min-height:640px;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;background:var(--dark)}
.hero-left{padding:88px 5% 72px 8%;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;background:linear-gradient(135deg,#1a2e18 0%,#2d5a27 100%)}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.85);font-size:11px;font-weight:700;padding:6px 14px;border-radius:40px;width:fit-content;margin-bottom:24px;letter-spacing:1.5px;text-transform:uppercase}
.hero h1{font-family:var(--hf);font-size:56px;color:#fff;line-height:1.05;margin-bottom:20px}
.hero h1 em{color:#a8d5a2;font-style:normal}
.hero-sub{color:rgba(255,255,255,0.7);font-size:16px;max-width:420px;margin-bottom:36px;line-height:1.8}
.hero-sub strong{color:#fff}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap}
.btn-white{background:#fff;color:var(--green);padding:14px 28px;border-radius:var(--r);font-size:15px;font-weight:700;text-decoration:none;transition:all .2s;display:inline-block}
.btn-white:hover{background:#f0f0f0}
.btn-outline{border:2px solid rgba(255,255,255,0.35);color:#fff;padding:12px 26px;border-radius:var(--r);font-size:15px;font-weight:600;text-decoration:none;transition:border-color .2s;display:inline-block}
.btn-outline:hover{border-color:rgba(255,255,255,0.7)}
.hero-stats{display:flex;gap:36px;margin-top:44px;padding-top:36px;border-top:1px solid rgba(255,255,255,0.15)}
.hstat .num{font-family:var(--hf);font-size:38px;color:#fff;line-height:1}
.hstat .lbl{font-size:12px;color:rgba(255,255,255,0.5);margin-top:4px;font-weight:500}
.hero-right{position:relative;overflow:hidden}
.hero-right img{width:100%;height:100%;object-fit:cover;filter:brightness(0.75)}
.hero-overlay{position:absolute;bottom:28px;left:28px;background:#fff;border-radius:var(--r);padding:16px 20px;max-width:200px}
.hero-overlay .stars{color:#f39c12;font-size:15px;margin-bottom:4px}
.hero-overlay p{font-size:13px;font-weight:600;color:var(--dark)}
.hero-overlay span{font-size:12px;color:var(--muted)}

.trust{background:#fff;border-bottom:1px solid var(--border);padding:20px 8%;display:flex;justify-content:center;gap:44px;flex-wrap:wrap}
.ti{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--mid)}
.ti-dot{width:8px;height:8px;background:var(--green);border-radius:50%;flex-shrink:0}

section{padding:84px 8%}
.stag{font-size:11px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:2px;margin-bottom:12px}
.sh{font-family:var(--hf);font-size:46px;color:var(--dark);line-height:1.05;margin-bottom:16px}
.sh em{color:var(--green);font-style:normal}
.ssub{font-size:17px;color:var(--muted);max-width:540px;line-height:1.75}
.sec-hd{margin-bottom:52px}

#services{background:var(--white)}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.svc{background:var(--cream);border-radius:var(--r);padding:32px 26px;border:1px solid var(--border);transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden}
.svc::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--green)}
.svc:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.08)}
.svc-ico{font-size:32px;margin-bottom:16px;display:block}
.svc h3{font-family:var(--hf);font-size:22px;color:var(--dark);margin-bottom:10px}
.svc p{font-size:14px;color:var(--muted);line-height:1.75}

.process{background:var(--green-pale)}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.proc{text-align:center;padding:32px 20px;background:#fff;border-radius:var(--r);border:1px solid var(--border);position:relative}
.proc-num{font-family:var(--hf);font-size:52px;color:var(--green-pale);position:absolute;top:12px;right:16px;line-height:1}
.proc-ico{font-size:36px;margin-bottom:16px;display:block}
.proc h3{font-size:16px;font-weight:700;color:var(--dark);margin-bottom:8px}
.proc p{font-size:13px;color:var(--muted);line-height:1.7}

#about{background:var(--white)}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.about-img-wrap{position:relative}
.about-img-wrap img{width:100%;border-radius:var(--r);display:block}
.about-badge{position:absolute;bottom:-18px;right:-18px;background:var(--green);color:#fff;padding:20px 24px;border-radius:var(--r);text-align:center}
.about-badge .big{font-family:var(--hf);font-size:36px;line-height:1}
.about-badge .sm{font-size:12px;opacity:.85;font-weight:600}
.about-content p{font-size:16px;color:var(--muted);line-height:1.8;margin-bottom:20px}
.checks{display:flex;flex-direction:column;gap:12px}
.check{display:flex;align-items:flex-start;gap:12px;font-size:15px;color:var(--dark);font-weight:500}
.check-dot{width:22px;height:22px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:11px;margin-top:2px}

#gallery{background:var(--cream)}
.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:220px 220px;gap:12px}
.gi{border-radius:var(--r);overflow:hidden;position:relative}
.gi img{width:100%;height:100%;object-fit:cover;transition:transform .4s;display:block}
.gi:hover img{transform:scale(1.06)}
.gi.span2{grid-column:span 2}
.gi-lbl{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.65));color:#fff;padding:28px 14px 14px;font-size:13px;font-weight:600}

#testimonials{background:#fff}
.t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.tc{background:var(--cream);border-radius:var(--r);padding:28px 24px;border:1px solid var(--border);position:relative}
.tc::after{content:'"';position:absolute;top:14px;right:20px;font-family:var(--hf);font-size:64px;color:var(--border);line-height:1}
.tc-stars{color:#f39c12;font-size:14px;margin-bottom:12px}
.tc-text{font-size:15px;color:var(--mid);line-height:1.75;margin-bottom:20px;font-style:italic;position:relative;z-index:1}
.tc-auth{display:flex;align-items:center;gap:12px}
.tc-av{width:40px;height:40px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--hf);font-size:16px;font-weight:700;color:#fff}
.tc-name{font-size:14px;font-weight:700;color:var(--dark)}
.tc-loc{font-size:13px;color:var(--muted)}

.cta{background:var(--green);padding:72px 8%;display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap}
.cta h2{font-family:var(--hf);font-size:44px;color:#fff;line-height:1.1}
.cta p{color:rgba(255,255,255,0.75);font-size:16px;margin-top:8px}
.btn-wt{background:#fff;color:var(--green);padding:15px 32px;border-radius:var(--r);font-size:15px;font-weight:700;text-decoration:none;white-space:nowrap;transition:background .2s;display:inline-block}
.btn-wt:hover{background:#f0f7ee}

#contact{background:var(--cream)}
.contact-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:64px;align-items:start}
.ci{display:flex;gap:16px;align-items:flex-start;margin-bottom:26px}
.ci-ico{width:46px;height:46px;background:var(--green);border-radius:var(--r);display:flex;align-items:center;justify-content:center;color:#fff;font-size:19px;flex-shrink:0}
.ci h4{font-size:15px;font-weight:700;color:var(--dark);margin-bottom:3px}
.ci p,.ci a{font-size:14px;color:var(--muted);text-decoration:none;display:block;line-height:1.6}
.ci a:hover{color:var(--green)}
.cf{background:#fff;border-radius:var(--r);border:1px solid var(--border);padding:38px}
.cf h3{font-family:var(--hf);font-size:28px;color:var(--dark);margin-bottom:4px}
.cf .sub{font-size:14px;color:var(--muted);margin-bottom:26px;font-weight:500}
.fg{margin-bottom:16px}
.fg label{display:block;font-size:12px;font-weight:700;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.fg input,.fg select,.fg textarea{width:100%;border:1.5px solid var(--border);border-radius:var(--r);padding:11px 14px;font-size:14px;font-family:var(--bf);color:var(--dark);background:var(--cream);outline:none;transition:border-color .2s}
.fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--green);background:#fff}
.fg textarea{resize:vertical;min-height:100px}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fsub{width:100%;background:var(--green);color:#fff;border:none;padding:14px;border-radius:var(--r);font-size:15px;font-weight:700;cursor:pointer;font-family:var(--bf);transition:background .2s;margin-top:6px}
.fsub:hover{background:var(--green-mid)}
.fnote{font-size:12px;color:var(--muted);margin-top:10px;text-align:center}

footer{background:var(--dark);color:rgba(255,255,255,0.5);padding:28px 8%;text-align:center;font-size:14px;border-top:4px solid var(--green)}
.fl{font-family:var(--hf);font-size:20px;color:#fff;margin-bottom:12px}
.fl em{color:#a8d5a2;font-style:normal}
.f-info{margin-bottom:12px}
.f-optimo{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1)}
.f-optimo a{color:var(--green-light);text-decoration:none;font-weight:600;transition:color .2s}
.f-optimo a:hover{color:#fff}

@media(max-width:900px){
  .hero{grid-template-columns:1fr}.hero-right{display:none}.hero h1{font-size:40px}
  .svc-grid{grid-template-columns:1fr 1fr}.process-grid{grid-template-columns:1fr 1fr}
  .about-grid{grid-template-columns:1fr}.gal-grid{grid-template-columns:1fr 1fr;grid-template-rows:auto}
  .gi.span2{grid-column:span 1}.t-grid{grid-template-columns:1fr}.contact-grid{grid-template-columns:1fr}
  .nav-links{display:none}.mobile-toggle{display:block}
  .cta{text-align:center;justify-content:center}.cta h2{font-size:32px}
  .trust{gap:20px}.sh{font-size:36px}
}
@media(max-width:600px){
  .hero h1{font-size:32px}.hero-btns{flex-direction:column}.hero-btns a{width:100%;text-align:center}
  .hero-stats{flex-direction:column;gap:16px}.svc-grid{grid-template-columns:1fr}
  .process-grid{grid-template-columns:1fr}.gal-grid{grid-template-columns:1fr}
  .fr{grid-template-columns:1fr}.cf{padding:24px}.sh{font-size:30px}
  .trust{flex-direction:column;gap:12px;text-align:center}.ti{justify-content:center}
}
</style>
</head>
<body>

<div class="demo-badge">Demo</div>

<div class="banner">🌿 Spring bookings are filling fast — <strong>lock in your free design consult today</strong></div>

<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-icon">🌿</div>
    ${companyName.split(' ')[0]} <em>${companyName.split(' ').slice(1).join(' ') || 'Landscaping'}</em>
  </a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#gallery">Our Work</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="${calendarUrl}" target="_blank" class="nav-cta" data-track="book_call">Free Consult</a>
</nav>

<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#gallery">Our Work</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<section class="hero">
  <div class="hero-left">
    <div class="hero-tag">🏅 ${city}'s Most Trusted Landscapers</div>
    <h1>${tagline.split(' ').slice(0, 2).join(' ')}, <em>${tagline.split(' ').slice(2).join(' ') || 'Done Properly'}</em></h1>
    <p class="hero-sub"><strong>Tired of a backyard that's either dead dirt or a jungle?</strong> We design and build outdoor spaces ${city} families actually use — built tough for the Aussie climate and your block.</p>
    <div class="hero-btns">
      <a href="${calendarUrl}" target="_blank" class="btn-white" data-track="book_call">Book a Free Consult</a>
      <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 ${phone}</a>
    </div>
    <div class="hero-stats">
      <div class="hstat"><div class="num">12+</div><div class="lbl">Years Experience</div></div>
      <div class="hstat"><div class="num">600+</div><div class="lbl">Projects Done</div></div>
      <div class="hstat"><div class="num">5.0 ★</div><div class="lbl">Google Rating</div></div>
    </div>
  </div>
  <div class="hero-right">
    <img src="${images.hero}" alt="Landscaped Australian backyard">
    <div class="hero-overlay">
      <div class="stars">★★★★★</div>
      <p>110+ Google Reviews</p>
      <span>${city}, ${state}</span>
    </div>
  </div>
</section>

<div class="trust">
  <div class="ti"><div class="ti-dot"></div>Licensed & insured</div>
  <div class="ti"><div class="ti-dot"></div>Water-wise design specialists</div>
  <div class="ti"><div class="ti-dot"></div>${state} horticulture qualified</div>
  <div class="ti"><div class="ti-dot"></div>Free quotes — no hard sell</div>
  <div class="ti"><div class="ti-dot"></div>We call back within 2 hours</div>
</div>

<section id="services">
  <div class="sec-hd">
    <div class="stag">What We Do</div>
    <h2 class="sh">Landscaping Services <em>For Every Block</em></h2>
    <p class="ssub">From a quick front yard tidy-up to a full backyard transformation — all work done by our own qualified team.</p>
  </div>
  <div class="svc-grid">
    <div class="svc"><span class="svc-ico">🏡</span><h3>Backyard Design & Build</h3><p>Full end-to-end backyard transformations. We design it, we build it, we clean up after ourselves. You come home to a finished yard.</p></div>
    <div class="svc"><span class="svc-ico">🪨</span><h3>Retaining Walls</h3><p>Structural retaining walls in treated pine, sleepers, concrete blocks and natural stone. Engineered properly so they don't fall over in 12 months.</p></div>
    <div class="svc"><span class="svc-ico">🌱</span><h3>Turf & Lawn</h3><p>Supply and lay of Sir Walter DNA Certified, Kikuyu, Couch and Buffalo. Soil preparation, levelling and fertilising all included.</p></div>
    <div class="svc"><span class="svc-ico">🏗</span><h3>Paving & Pathways</h3><p>Concrete, natural stone, porcelain and brick paving. Driveways, entertaining areas, pool surrounds and garden paths done right.</p></div>
    <div class="svc"><span class="svc-ico">💧</span><h3>Irrigation Systems</h3><p>Automated drip and spray irrigation systems. Save water, save time, and keep your lawn and garden green through the ${state} summer.</p></div>
    <div class="svc"><span class="svc-ico">🌳</span><h3>Planting & Garden Beds</h3><p>Native and exotic planting plans suited to your soil, aspect and lifestyle. Low-maintenance options available for the time-poor.</p></div>
  </div>
</section>

<section class="process">
  <div class="sec-hd">
    <div class="stag">How It Works</div>
    <h2 class="sh">Simple Process, <em>No Surprises</em></h2>
    <p class="ssub">We keep it straightforward from your first call to the day we hand over.</p>
  </div>
  <div class="process-grid">
    <div class="proc"><span class="proc-num">1</span><span class="proc-ico">📞</span><h3>Free Consult</h3><p>We visit your property, listen to what you want, and get a feel for the block and budget.</p></div>
    <div class="proc"><span class="proc-num">2</span><span class="proc-ico">📐</span><h3>Design & Quote</h3><p>You get a detailed design plan and a fixed-price quote. No surprises on the invoice.</p></div>
    <div class="proc"><span class="proc-num">3</span><span class="proc-ico">🔨</span><h3>We Get to Work</h3><p>Our crew turns up on time, works clean, and keeps you updated every step of the way.</p></div>
    <div class="proc"><span class="proc-num">4</span><span class="proc-ico">🏡</span><h3>You Enjoy It</h3><p>Handover, walkthrough, and we're always a call away if you need anything after the job.</p></div>
  </div>
</section>

<section id="about">
  <div class="about-grid">
    <div class="about-img-wrap">
      <img src="${images.about}" alt="Landscaping team">
      <div class="about-badge"><div class="big">12+</div><div class="sm">Years in ${city}</div></div>
    </div>
    <div class="about-content">
      <div class="stag">About Us</div>
      <h2 class="sh">Local Landscapers Who <em>Know ${state}</em></h2>
      <p>${aboutText}</p>
      <p>Every job is done by our own qualified team. We don't subcontract, we don't cut corners, and we don't disappear after the deposit is paid.</p>
      <div class="checks">
        <div class="check"><div class="check-dot">✓</div>Fully licensed and $20M public liability insured</div>
        <div class="check"><div class="check-dot">✓</div>Certificate III in Horticulture — our team are qualified, not just labourers</div>
        <div class="check"><div class="check-dot">✓</div>Water-wise design — we work within ${state} water restrictions</div>
        <div class="check"><div class="check-dot">✓</div>Fixed-price quotes — what we quote is what you pay</div>
        <div class="check"><div class="check-dot">✓</div>Proudly servicing ${city} and suburbs within 40km</div>
      </div>
    </div>
  </div>
</section>

<section id="gallery">
  <div class="sec-hd">
    <div class="stag">Our Work</div>
    <h2 class="sh">Recent <em>Transformations</em></h2>
    <p class="ssub">Every one of these was done by our own crew. Real yards, real results.</p>
  </div>
  <div class="gal-grid">
    <div class="gi span2"><img src="${images.gallery1}" alt="Backyard transformation"><div class="gi-lbl">Full backyard build — paving, turf & planting</div></div>
    <div class="gi"><img src="${images.gallery2}" alt="Garden bed planting"><div class="gi-lbl">Native garden beds</div></div>
    <div class="gi"><img src="${images.gallery3}" alt="Retaining wall"><div class="gi-lbl">Sleeper retaining wall</div></div>
    <div class="gi"><img src="${images.gallery4}" alt="Turf and paving"><div class="gi-lbl">Sir Walter turf & paving</div></div>
    <div class="gi"><img src="${images.gallery5}" alt="Pool surrounds"><div class="gi-lbl">Pool surrounds & lighting</div></div>
  </div>
</section>

<section id="testimonials">
  <div class="sec-hd">
    <div class="stag">What Customers Say</div>
    <h2 class="sh">Real Reviews From <em>${city} Locals</em></h2>
    <p class="ssub">110+ five-star Google reviews. We don't ask for them — they happen when the job's done right.</p>
  </div>
  <div class="t-grid">
    <div class="tc"><div class="tc-stars">★★★★★</div><p class="tc-text">"We had a dead, dirt backyard for three years and finally bit the bullet. They came out, quoted fairly, and the finished result is unreal. Kids are out there every arvo now. Would recommend to anyone in ${city}."</p><div class="tc-auth"><div class="tc-av">JM</div><div><div class="tc-name">Jason M.</div><div class="tc-loc">${city}, ${state}</div></div></div></div>
    <div class="tc"><div class="tc-stars">★★★★★</div><p class="tc-text">"Had three landscapers quote and these guys were the only ones who actually listened to what we wanted. They suggested a native garden to save water — brilliant idea. The irrigation system has been running perfectly for 18 months."</p><div class="tc-auth"><div class="tc-av">SL</div><div><div class="tc-name">Sandra L.</div><div class="tc-loc">${city}, ${state}</div></div></div></div>
    <div class="tc"><div class="tc-stars">★★★★★</div><p class="tc-text">"Retaining wall, paving and new turf all done in under two weeks. The crew were legends — on time every day, cleaned up each afternoon, and the quality of the work is excellent. Our neighbours have already asked for their number."</p><div class="tc-auth"><div class="tc-av">RB</div><div><div class="tc-name">Rob B.</div><div class="tc-loc">${city}, ${state}</div></div></div></div>
  </div>
</section>

${instagramSection}

${googleMapsSection}

<div class="cta">
  <div><h2>Ready for a Yard You're Actually Proud Of?</h2><p>Free consultation, fixed-price quotes, and no pressure. Book a time that suits.</p></div>
  <div style="display:flex;gap:14px;flex-wrap:wrap">
    <a href="${calendarUrl}" target="_blank" class="btn-wt" data-track="book_call">Book Free Consult</a>
    <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 ${phone}</a>
  </div>
</div>

<section id="contact">
  <div class="sec-hd">
    <div class="stag">Get in Touch</div>
    <h2 class="sh">Let's Talk <em>About Your Yard</em></h2>
    <p class="ssub">Fill in the form and we'll be in touch within 2 hours on business days. No obligation, no hard sell.</p>
  </div>
  <div class="contact-grid">
    <div>
      <div class="ci"><div class="ci-ico">📞</div><div><h4>Call us</h4><a href="tel:${phoneClean}">${phone}</a><p>Mon–Fri 7am–5pm · Sat 7am–12pm</p></div></div>
      <div class="ci"><div class="ci-ico">📍</div><div><h4>Service area</h4><p>${city} and suburbs within 40km</p></div></div>
      <div class="ci"><div class="ci-ico">🕐</div><div><h4>Hours</h4><p>Mon–Fri 7:00am – 5:00pm</p><p>Saturday 7:00am – 12:00pm</p></div></div>
    </div>
    <div class="cf">
      <h3>Request a Free Quote</h3>
      <p class="sub">Tell us about your project and we'll get back to you within 2 hours.</p>
      <div class="fr">
        <div class="fg"><label>First Name *</label><input type="text" placeholder="Your first name"></div>
        <div class="fg"><label>Last Name *</label><input type="text" placeholder="Your last name"></div>
      </div>
      <div class="fr">
        <div class="fg"><label>Phone *</label><input type="tel" placeholder="0400 000 000"></div>
        <div class="fg"><label>Suburb *</label><input type="text" placeholder="Your suburb"></div>
      </div>
      <div class="fg"><label>Service Needed *</label>
        <select>
          <option value="">Select a service...</option>
          <option>Backyard Design & Build</option>
          <option>Retaining Walls</option>
          <option>Turf & Lawn</option>
          <option>Paving & Pathways</option>
          <option>Irrigation Systems</option>
          <option>Planting & Garden Beds</option>
          <option>Pool Surrounds</option>
          <option>Ongoing Maintenance</option>
          <option>Other</option>
        </select>
      </div>
      <div class="fg"><label>Tell us about the job</label><textarea placeholder="Size of the yard, what you're after, any ideas you have..."></textarea></div>
      <button class="fsub" onclick="window.open('${calendarUrl}', '_blank')">Get My Free Quote →</button>
      <p class="fnote">We respond within 2 hours on business days. No spam, ever.</p>
    </div>
  </div>
</section>

<footer>
  <div class="fl">${companyName.split(' ')[0]} <em>${companyName.split(' ').slice(1).join(' ') || 'Landscaping'}</em></div>
  <div class="f-info">© 2026 ${companyName} · ${city}, ${state}</div>
  <div class="f-optimo">
    <a href="${optimoLink}" target="_blank">Built by Optimo Agency</a>
  </div>
</footer>

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
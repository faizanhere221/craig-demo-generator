/**
 * Aussie Painter Template
 * 
 * Features:
 * - Professional blue/white color scheme (#1e3a5f, #3b82f6)
 * - Clean, crisp design for painting services
 * - "Built By Optimo Agency" footer
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram embed
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&h=600&fit=crop',
  about1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
  about2: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
  gallery6: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
}

export function generatePainterHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  const tagline = customContent?.tagline || 'Quality Painting That Lasts'
  const aboutText = customContent?.aboutText || `${companyName} has been transforming homes and businesses across ${city} with quality paintwork that stands the test of time. We're not your average painters — we're craftsmen who take pride in every brushstroke.`

  const googleMapsSection = googleMapsUrl ? `
<section id="location" style="background: #fff; padding: 80px 6%;">
  <div style="text-align: center; margin-bottom: 40px;">
    <span class="section-tag">Find Us</span>
    <h2 class="section-title">Our <span>Location</span></h2>
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
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: var(--blue); color: #fff; padding: 14px 32px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 15px;">
      📍 View on Google Maps & Reviews
    </a>
  </div>
</section>
` : ''

  const instagramSection = instagramUrl ? `
<section id="instagram" style="background: var(--light); padding: 80px 6%;">
  <div style="text-align: center; margin-bottom: 40px;">
    <span class="section-tag">Follow Our Work</span>
    <h2 class="section-title">See Us On <span>Instagram</span></h2>
  </div>
  <div style="max-width: 540px; margin: 0 auto; text-align: center;">
    <blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.08); margin: 0 auto; max-width:540px; min-width:326px; padding:0; width:100%;"></blockquote>
    <script async src="https://www.instagram.com/embed.js"></script>
    <a href="${instagramUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 14px 32px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 15px;">
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
<title>${companyName} | Professional Painters ${city}, ${state}</title>
<meta name="description" content="${companyName} provides professional painting services in ${city}, ${state}. Interior, exterior & commercial painting. Call ${phone} for a free quote.">
<meta name="robots" content="noindex, nofollow">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#1e3a5f;--navy-light:#2d4a6f;--blue:#3b82f6;--blue-light:#60a5fa;
  --sky:#e0f2fe;--light:#f8fafc;--white:#ffffff;
  --dark:#0f172a;--mid:#475569;--muted:#64748b;--border:#e2e8f0;
  --accent:#f59e0b;
  --font:'Poppins',sans-serif;--radius:8px;
}
html{scroll-behavior:smooth}
body{font-family:var(--font);color:var(--dark);background:var(--white);line-height:1.6}

.demo-badge{position:fixed;top:20px;right:-32px;background:var(--blue);color:#fff;font-size:10px;font-weight:700;padding:6px 45px;transform:rotate(45deg);z-index:9999;letter-spacing:1.5px;text-transform:uppercase;box-shadow:0 2px 10px rgba(59,130,246,0.3)}

nav{position:fixed;top:0;width:100%;z-index:100;background:rgba(255,255,255,0.97);backdrop-filter:blur(10px);padding:0 6%;height:75px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.nav-logo{font-size:24px;font-weight:800;color:var(--navy);text-decoration:none;display:flex;align-items:center;gap:10px}
.nav-logo span{color:var(--blue)}
.nav-logo::before{content:'🎨';font-size:28px}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:var(--mid);text-decoration:none;font-size:15px;font-weight:500;transition:color .2s}
.nav-links a:hover{color:var(--blue)}
.nav-cta{background:var(--blue);color:#fff;padding:12px 26px;border-radius:var(--radius);font-size:14px;font-weight:600;text-decoration:none;transition:all .2s;box-shadow:0 4px 14px rgba(59,130,246,0.3)}
.nav-cta:hover{background:var(--navy);transform:translateY(-2px)}

.mobile-toggle{display:none;background:none;border:none;cursor:pointer;width:28px;height:20px;position:relative}
.mobile-toggle span{display:block;width:100%;height:2.5px;background:var(--navy);border-radius:2px;position:absolute;left:0;transition:all .3s}
.mobile-toggle span:nth-child(1){top:0}
.mobile-toggle span:nth-child(2){top:9px}
.mobile-toggle span:nth-child(3){top:18px}
.mobile-toggle.active span:nth-child(1){top:9px;transform:rotate(45deg)}
.mobile-toggle.active span:nth-child(2){opacity:0}
.mobile-toggle.active span:nth-child(3){top:9px;transform:rotate(-45deg)}
.mobile-menu{display:none;position:fixed;top:75px;left:0;right:0;background:var(--white);padding:20px 6%;flex-direction:column;gap:0;border-bottom:1px solid var(--border);box-shadow:0 4px 6px rgba(0,0,0,0.05);z-index:99}
.mobile-menu.active{display:flex}
.mobile-menu a{color:var(--navy);text-decoration:none;font-size:16px;font-weight:600;padding:14px 0;border-bottom:1px solid var(--border)}

.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:linear-gradient(135deg,var(--navy) 0%,var(--navy-light) 100%)}
.hero-content{padding:140px 8% 80px;display:flex;flex-direction:column;justify-content:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:var(--blue-light);font-size:12px;font-weight:600;padding:8px 18px;border-radius:50px;width:fit-content;margin-bottom:28px;letter-spacing:1px;text-transform:uppercase}
.hero h1{font-size:clamp(40px,5vw,62px);color:var(--white);line-height:1.1;margin-bottom:24px;font-weight:800}
.hero h1 span{color:var(--blue-light);display:block}
.hero-sub{color:rgba(255,255,255,0.7);font-size:18px;line-height:1.75;margin-bottom:40px;max-width:480px}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap}
.btn-primary{background:var(--blue);color:#fff;padding:16px 36px;border-radius:var(--radius);font-size:15px;font-weight:700;text-decoration:none;transition:all .2s;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(59,130,246,0.4)}
.btn-primary:hover{background:#2563eb;transform:translateY(-2px)}
.btn-outline{border:2px solid rgba(255,255,255,0.3);color:#fff;padding:14px 34px;border-radius:var(--radius);font-size:15px;font-weight:600;text-decoration:none;transition:all .2s}
.btn-outline:hover{border-color:var(--blue-light);background:rgba(59,130,246,0.1)}

.hero-stats{display:flex;gap:40px;margin-top:50px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.1)}
.stat .num{font-size:42px;font-weight:800;color:var(--white);line-height:1}
.stat .label{font-size:13px;color:rgba(255,255,255,0.5);margin-top:4px;font-weight:500}

.hero-image{position:relative;overflow:hidden}
.hero-image img{width:100%;height:100%;object-fit:cover}
.hero-image::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--navy) 0%,transparent 30%);z-index:1}
.hero-card{position:absolute;bottom:40px;right:40px;background:var(--white);padding:24px 28px;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,0.2);z-index:2}
.hero-card .stars{color:var(--accent);font-size:18px;margin-bottom:8px}
.hero-card p{font-weight:700;color:var(--navy);font-size:16px}
.hero-card span{color:var(--muted);font-size:14px}

.trust-bar{background:var(--sky);padding:24px 6%;display:flex;justify-content:center;gap:50px;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--navy)}
.trust-item::before{content:'✓';color:var(--blue);font-weight:800}

section{padding:100px 6%}
.section-tag{display:inline-block;color:var(--blue);font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.section-title{font-size:clamp(32px,4vw,48px);color:var(--navy);line-height:1.15;margin-bottom:20px;font-weight:800}
.section-title span{color:var(--blue)}
.section-sub{color:var(--muted);font-size:17px;line-height:1.75;max-width:600px}

.services{background:var(--light)}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}
.service-card{background:var(--white);border-radius:16px;padding:40px 32px;border:1px solid var(--border);transition:all .3s;position:relative;overflow:hidden}
.service-card:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(0,0,0,0.08);border-color:var(--blue)}
.service-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--blue);transform:scaleX(0);transition:transform .3s}
.service-card:hover::before{transform:scaleX(1)}
.service-icon{width:65px;height:65px;background:var(--sky);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:30px;margin-bottom:24px}
.service-card h3{font-size:22px;color:var(--navy);margin-bottom:12px;font-weight:700}
.service-card p{color:var(--muted);font-size:15px;line-height:1.7}

.about{background:var(--white)}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-images{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.about-images img{width:100%;height:280px;object-fit:cover;border-radius:16px}
.about-images img:first-child{grid-row:span 2;height:100%}
.about-content .section-title{margin-bottom:24px}
.about-content p{margin-bottom:20px}
.check-list{display:flex;flex-direction:column;gap:14px;margin-top:30px}
.check-item{display:flex;align-items:center;gap:14px;font-size:16px;color:var(--navy);font-weight:500}
.check-item::before{content:'✓';width:28px;height:28px;background:var(--blue);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0}

.gallery{background:var(--light)}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:50px}
.gallery-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.gallery-item:hover img{transform:scale(1.08)}
.gallery-item::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(30,58,95,0.8) 0%,transparent 50%);opacity:0;transition:opacity .3s}
.gallery-item:hover::after{opacity:1}
.gallery-label{position:absolute;bottom:20px;left:20px;color:#fff;font-weight:600;font-size:15px;z-index:1;opacity:0;transform:translateY(10px);transition:all .3s}
.gallery-item:hover .gallery-label{opacity:1;transform:translateY(0)}

/* Reviews Carousel */
.reviews{background:var(--navy);padding:80px 6%;overflow:hidden}
.reviews .section-tag{color:var(--blue-light)}
.reviews .section-title{color:var(--white)}
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
.review-card{flex:0 0 340px;scroll-snap-align:start;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:1.75rem;display:flex;flex-direction:column;transition:all .3s}
.review-card:hover{border-color:var(--blue);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.3)}
.review-card-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
.review-avatar{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--blue) 0%,var(--navy) 100%);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1rem;overflow:hidden}
.review-avatar img{width:100%;height:100%;object-fit:cover}
.review-author-info h4{font-size:1rem;font-weight:600;color:#fff;margin-bottom:0.125rem}
.review-author-info .review-time{color:rgba(255,255,255,0.5);font-size:0.8rem}
.review-card .review-stars{display:flex;gap:2px;margin-bottom:0.75rem}
.review-card .review-stars .star{width:1rem;height:1rem;color:#FBBC04;fill:#FBBC04}
.review-card .review-text{color:rgba(255,255,255,0.85);font-size:0.9rem;line-height:1.65;flex:1}
.review-card .review-source{display:flex;align-items:center;gap:0.5rem;margin-top:1.25rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:0.75rem}
.review-card .review-source svg{width:16px;height:16px}
.carousel-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;background:var(--blue);border:none;border-radius:50%;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
.carousel-nav:hover{transform:translateY(-50%) scale(1.1);box-shadow:0 4px 20px rgba(0,0,0,0.3)}
.carousel-nav.prev{left:0}
.carousel-nav.next{right:0}
.carousel-nav svg{width:20px;height:20px}
.carousel-dots{display:flex;justify-content:center;gap:0.5rem;margin-top:2rem}
.carousel-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.3);border:none;cursor:pointer;transition:all .2s}
.carousel-dot.active{background:var(--blue);width:24px;border-radius:4px}
.reviews-cta{text-align:center;margin-top:2rem}
.reviews-cta a{display:inline-flex;align-items:center;gap:0.5rem;color:var(--blue-light);font-weight:600;font-size:0.9rem;transition:opacity .2s;text-decoration:none}
.reviews-cta a:hover{opacity:0.8}
@media(max-width:768px){.reviews-carousel-wrapper{padding:0 1rem}.review-card{flex:0 0 300px;padding:1.5rem}.carousel-nav{display:none}.reviews{padding:60px 4%}}

.cta-section{background:linear-gradient(135deg,var(--blue) 0%,var(--navy) 100%);padding:100px 6%;text-align:center}
.cta-section h2{font-size:clamp(32px,4vw,52px);color:var(--white);margin-bottom:16px;font-weight:800}
.cta-section p{color:rgba(255,255,255,0.8);font-size:18px;margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto}
.cta-btns{display:flex;justify-content:center;gap:20px;flex-wrap:wrap}
.btn-white{background:var(--white);color:var(--navy);padding:18px 40px;border-radius:var(--radius);font-size:16px;font-weight:700;text-decoration:none;transition:all .2s;box-shadow:0 4px 14px rgba(0,0,0,0.15)}
.btn-white:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,0.2)}

.contact{background:var(--light)}
.contact-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:60px;margin-top:50px}
.contact-info h3{font-size:28px;color:var(--navy);margin-bottom:24px;font-weight:700}
.contact-item{display:flex;gap:18px;margin-bottom:28px}
.contact-icon{width:54px;height:54px;background:var(--blue);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.contact-item h4{color:var(--navy);font-size:16px;font-weight:700;margin-bottom:4px}
.contact-item p,.contact-item a{color:var(--muted);font-size:15px;text-decoration:none;display:block}
.contact-item a:hover{color:var(--blue)}

.contact-form{background:var(--white);border-radius:20px;padding:45px;border:1px solid var(--border);box-shadow:0 10px 40px rgba(0,0,0,0.05)}
.contact-form h3{font-size:26px;color:var(--navy);margin-bottom:8px;font-weight:700}
.contact-form .sub{color:var(--muted);margin-bottom:30px;font-size:15px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-group{margin-bottom:18px}
.form-group label{display:block;font-size:13px;font-weight:600;color:var(--navy);margin-bottom:8px}
.form-group input,.form-group select,.form-group textarea{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:14px 18px;font-size:15px;font-family:var(--font);color:var(--dark);background:var(--light);transition:all .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--blue);background:var(--white)}
.form-group textarea{resize:vertical;min-height:120px}
.form-submit{width:100%;background:var(--blue);color:#fff;border:none;padding:16px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--font);transition:all .2s;margin-top:8px}
.form-submit:hover{background:var(--navy)}

footer{background:var(--navy);color:rgba(255,255,255,0.6);padding:50px 6% 30px;text-align:center}
.footer-logo{font-size:26px;font-weight:800;color:var(--white);margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:10px}
.footer-logo span{color:var(--blue-light)}
.footer-logo::before{content:'🎨';font-size:30px}
.footer-info{margin-bottom:20px;font-size:14px}
.footer-optimo{padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);margin-top:20px}
.footer-optimo a{color:var(--blue-light);text-decoration:none;font-weight:600;transition:color .2s}
.footer-optimo a:hover{color:var(--white)}

@media(max-width:1024px){
  .hero{grid-template-columns:1fr}
  .hero-image{display:none}
  .hero-content{padding:140px 6% 80px}
  .services-grid{grid-template-columns:1fr 1fr}
  .about-grid{grid-template-columns:1fr;gap:50px}
  .gallery-grid{grid-template-columns:1fr 1fr}
  .testimonial-grid{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .nav-links{display:none}
  .mobile-toggle{display:block}
}
@media(max-width:600px){
  .hero h1{font-size:36px}
  .hero-btns{flex-direction:column}
  .hero-btns a{width:100%;text-align:center}
  .hero-stats{flex-direction:column;gap:20px}
  .services-grid{grid-template-columns:1fr}
  .gallery-grid{grid-template-columns:1fr}
  .about-images{grid-template-columns:1fr}
  .about-images img,.about-images img:first-child{height:200px;grid-row:auto}
  .form-row{grid-template-columns:1fr}
  .trust-bar{flex-direction:column;gap:12px;text-align:center}
  .cta-btns{flex-direction:column}
  .cta-btns a{width:100%}
}
/* Sticky Bottom Bar */
.sticky-cta {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
  padding: 12px 16px;
  z-index: 9999;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  border-top: 2px solid #3b82f6;
  gap: 10px;
}
.sticky-cta span { color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.sticky-btns { display: flex; gap: 8px; }
.sticky-btn {
  background: #3b82f6;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn:hover { background: #2563eb; }
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
  <a href="#" class="nav-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Painting'}</span></a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="${calendarUrl}" target="_blank" class="nav-cta" data-track="book_call">Get Free Quote</a>
</nav>

<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#gallery">Gallery</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<section class="hero">
  <div class="hero-content">
    <div class="hero-badge">🎨 ${city}'s Trusted Painters</div>
    <h1>${tagline.split(',')[0]}<span>${tagline.split(',')[1] || ', That Lasts'}</span></h1>
    <p class="hero-sub">Transform your home or business with professional painting that's done right the first time. From interior makeovers to exterior transformations — we deliver flawless finishes, every time.</p>
    <div class="hero-btns">
      <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">Get Free Quote →</a>
      <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 ${phone}</a>
    </div>
    <div class="hero-stats">
      <div class="stat"><div class="num">15+</div><div class="label">Years Experience</div></div>
      <div class="stat"><div class="num">800+</div><div class="label">Homes Painted</div></div>
      <div class="stat"><div class="num">5.0★</div><div class="label">Google Rating</div></div>
    </div>
  </div>
  <div class="hero-image">
    <img src="${images.hero}" alt="Professional painting services">
    <div class="hero-card">
      <div class="stars">★★★★★</div>
      <p>200+ 5-Star Reviews</p>
      <span>${city}, ${state}</span>
    </div>
  </div>
</section>

<div class="trust-bar">
  <div class="trust-item">Fully Licensed & Insured</div>
  <div class="trust-item">Free Written Quotes</div>
  <div class="trust-item">Premium Dulux Paints</div>
  <div class="trust-item">5-Year Warranty</div>
  <div class="trust-item">Clean & Tidy Work</div>
</div>

<section id="services" class="services">
  <div style="text-align:center;max-width:700px;margin:0 auto 20px">
    <span class="section-tag">Our Services</span>
    <h2 class="section-title">Professional Painting <span>Services</span></h2>
    <p class="section-sub" style="margin:0 auto">From single rooms to entire properties, we deliver beautiful results with minimal disruption to your daily life.</p>
  </div>
  <div class="services-grid">
    <div class="service-card">
      <div class="service-icon">🏠</div>
      <h3>Interior Painting</h3>
      <p>Transform your living spaces with flawless walls, ceilings, doors and trim. We prep properly, use premium paints, and leave your home spotless.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🏡</div>
      <h3>Exterior Painting</h3>
      <p>Protect and beautify your home's exterior with weather-resistant finishes that last for years. Full prep, repairs, and premium coatings included.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🏢</div>
      <h3>Commercial Painting</h3>
      <p>Offices, retail, warehouses — we work around your schedule to minimise downtime. Fast, professional results that impress clients and staff.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🪵</div>
      <h3>Timber & Deck Staining</h3>
      <p>Restore the natural beauty of your timber decks, fences and pergolas with quality stains and sealers that protect against the harsh Aussie climate.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🎨</div>
      <h3>Colour Consultation</h3>
      <p>Not sure what colours to choose? Our experienced team can help you select the perfect palette to complement your space and style.</p>
    </div>
    <div class="service-card">
      <div class="service-icon">🔧</div>
      <h3>Repairs & Prep Work</h3>
      <p>Crack filling, plaster repairs, sanding, priming — proper preparation is the foundation of a great paint job, and we never skip steps.</p>
    </div>
  </div>
</section>

<section id="about" class="about">
  <div class="about-grid">
    <div class="about-images">
      <img src="${images.about1}" alt="Professional painter at work">
      <img src="${images.about2}" alt="Quality finish">
    </div>
    <div class="about-content">
      <span class="section-tag">About Us</span>
      <h2 class="section-title">Painting Done <span>Properly</span></h2>
      <p>${aboutText}</p>
      <p>We use premium Dulux paints, proper preparation techniques, and take the time to do things right. No shortcuts, no cutting corners — just quality workmanship you can trust.</p>
      <div class="check-list">
        <div class="check-item">Fully licensed and insured painters</div>
        <div class="check-item">Premium Dulux paints as standard</div>
        <div class="check-item">Thorough prep work on every job</div>
        <div class="check-item">Clean and tidy — we respect your home</div>
        <div class="check-item">5-year workmanship warranty</div>
        <div class="check-item">Free colour consultation available</div>
      </div>
    </div>
  </div>
</section>

<section id="gallery" class="gallery">
  <div style="text-align:center;max-width:700px;margin:0 auto 20px">
    <span class="section-tag">Our Work</span>
    <h2 class="section-title">Recent <span>Projects</span></h2>
    <p class="section-sub" style="margin:0 auto">Take a look at some of our recent painting projects across ${city} and surrounding areas.</p>
  </div>
  <div class="gallery-grid">
    <div class="gallery-item"><img src="${images.gallery1}" alt="Interior painting"><span class="gallery-label">Interior Repaint</span></div>
    <div class="gallery-item"><img src="${images.gallery2}" alt="Exterior painting"><span class="gallery-label">Exterior Transformation</span></div>
    <div class="gallery-item"><img src="${images.gallery3}" alt="Commercial painting"><span class="gallery-label">Commercial Office</span></div>
    <div class="gallery-item"><img src="${images.gallery4}" alt="Feature wall"><span class="gallery-label">Feature Walls</span></div>
    <div class="gallery-item"><img src="${images.gallery5}" alt="Kitchen cabinets"><span class="gallery-label">Cabinet Painting</span></div>
    <div class="gallery-item"><img src="${images.gallery6}" alt="Full home"><span class="gallery-label">Full Home Repaint</span></div>
  </div>
</section>

<section id="reviews" class="reviews">
  <div class="reviews-header">
    <span class="section-tag">Testimonials</span>
    <h2 class="section-title">What Our <span>Customers</span> Say</h2>
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
      <span class="rating-count">Based on 40+ reviews</span>
    </div>
  </div>
  
  <div class="reviews-carousel-wrapper">
    <button class="carousel-nav prev" onclick="scrollCarousel(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
    <div class="reviews-carousel" id="reviewsCarousel">
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">JS</div>
          <div class="review-author-info"><h4>Jenny S.</h4><span class="review-time">2 weeks ago</span></div>
        </div>
        <div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <p class="review-text">Absolutely brilliant job on our entire house. The team was professional, clean and the finish is perfect. Couldn't be happier with the result!</p>
        <div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div>
      </div>
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">MP</div>
          <div class="review-author-info"><h4>Mark P.</h4><span class="review-time">1 month ago</span></div>
        </div>
        <div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <p class="review-text">Used them for our office repaint and they worked around our business hours perfectly. Fast, clean, and the quality is outstanding. Will definitely use again.</p>
        <div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div>
      </div>
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">LT</div>
          <div class="review-author-info"><h4>Lisa T.</h4><span class="review-time">1 month ago</span></div>
        </div>
        <div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <p class="review-text">Third time using these guys and they never disappoint. Fair pricing, great communication, and the attention to detail is second to none. True professionals.</p>
        <div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div>
      </div>
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">DK</div>
          <div class="review-author-info"><h4>David K.</h4><span class="review-time">2 months ago</span></div>
        </div>
        <div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <p class="review-text">Transformed our home completely! From colour advice to the final coat, they were fantastic throughout. The exterior looks brand new. Highly recommend!</p>
        <div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div>
      </div>
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-avatar">SW</div>
          <div class="review-author-info"><h4>Sarah W.</h4><span class="review-time">3 months ago</span></div>
        </div>
        <div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        <p class="review-text">Cabinet painting specialists! They refinished our kitchen cabinets and they look better than new. Great value compared to replacing them. Very happy!</p>
        <div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div>
      </div>
    </div>
    <button class="carousel-nav next" onclick="scrollCarousel(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
  </div>
  <div class="carousel-dots"><button class="carousel-dot active"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button></div>
  ${googleMapsUrl ? `<div class="reviews-cta"><a href="${googleMapsUrl}" target="_blank">See all reviews on Google <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>` : ''}
</section>

${instagramSection}

${googleMapsSection}

<section class="cta-section">
  <h2>Ready to Transform Your Space?</h2>
  <p>Get a free, no-obligation quote for your painting project. We'll come to you, assess the job, and give you an honest price.</p>
  <div class="cta-btns">
    <a href="${calendarUrl}" target="_blank" class="btn-white" data-track="book_call">Get Your Free Quote</a>
    <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 Call ${phone}</a>
  </div>
</section>

<section id="contact" class="contact">
  <div style="text-align:center;max-width:700px;margin:0 auto 20px">
    <span class="section-tag">Contact Us</span>
    <h2 class="section-title">Get In <span>Touch</span></h2>
  </div>
  <div class="contact-grid">
    <div class="contact-info">
      <h3>Let's Discuss Your Project</h3>
      <div class="contact-item">
        <div class="contact-icon">📞</div>
        <div><h4>Phone</h4><a href="tel:${phoneClean}">${phone}</a><p>Mon-Fri 7am-5pm, Sat 8am-12pm</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">📍</div>
        <div><h4>Service Area</h4><p>${city} and surrounds (within 50km)</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon">⏰</div>
        <div><h4>Response Time</h4><p>We respond to all enquiries within 24 hours</p></div>
      </div>
    </div>
    <div class="contact-form">
      <h3>Request a Free Quote</h3>
      <p class="sub">Fill out the form and we'll get back to you within 24 hours.</p>
      <div class="form-row">
        <div class="form-group"><label>First Name</label><input type="text" placeholder="Your first name"></div>
        <div class="form-group"><label>Last Name</label><input type="text" placeholder="Your last name"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input type="tel" placeholder="0400 000 000"></div>
        <div class="form-group"><label>Suburb</label><input type="text" placeholder="Your suburb"></div>
      </div>
      <div class="form-group">
        <label>Type of Work</label>
        <select>
          <option value="">Select...</option>
          <option>Interior Painting</option>
          <option>Exterior Painting</option>
          <option>Interior & Exterior</option>
          <option>Commercial</option>
          <option>Deck/Timber Staining</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group"><label>Tell us about your project</label><textarea placeholder="Briefly describe what you need painted..."></textarea></div>
      <button class="form-submit" onclick="window.open('${calendarUrl}', '_blank')">Get My Free Quote →</button>
    </div>
  </div>
</section>

<footer>
  <div class="footer-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Painting'}</span></div>
  <div class="footer-info">© 2026 ${companyName} · ${city}, ${state} · Professional Painting Services</div>
  <div class="footer-optimo"><a href="${optimoLink}" target="_blank">Built by Optimo Agency</a></div>
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
(function(){const t='${trackingId}',e='${trackingEndpoint}';function r(n){try{fetch(e,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:t,event:n,timestamp:new Date().toISOString(),userAgent:navigator.userAgent,referrer:document.referrer||'direct',screen:window.screen.width+'x'+window.screen.height,device:/Mobile|Android|iPhone/i.test(navigator.userAgent)?'mobile':'desktop'}),mode:'cors'}).catch(()=>{})}catch(e){}}document.readyState==='complete'?r('view'):window.addEventListener('load',()=>r('view'));document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',function(){r(this.getAttribute('data-track'))}));document.querySelectorAll('a[href^="tel:"],a[href*="leadconnectorhq"]').forEach(l=>l.addEventListener('click',function(){r(this.href.includes('tel:')?'phone_click':'book_call_click')}))})();

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
      dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
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

// Dynamic Google Reviews
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
    } catch (e) { console.log('Using default reviews'); }
  }
  
  function getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); }
  
  function createStarsSVG(count) {
    return '<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(count);
  }
  
  function updateReviewsCarousel(reviews, place) {
    const carousel = document.getElementById('reviewsCarousel');
    const ratingScore = document.querySelector('.rating-score');
    const ratingCount = document.querySelector('.rating-count');
    
    if (!carousel) return;
    
    if (ratingScore && place && place.rating) ratingScore.textContent = place.rating.toFixed(1);
    if (ratingCount && place && place.totalReviews) ratingCount.textContent = 'Based on ' + place.totalReviews + '+ reviews';
    
    const googleLogo = '<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';
    
    let cardsHTML = '';
    reviews.forEach(review => {
      const initials = getInitials(review.author);
      const avatarContent = review.authorPhoto ? '<img src="' + review.authorPhoto + '" alt="' + review.author + '">' : initials;
      cardsHTML += '<div class="review-card"><div class="review-card-header"><div class="review-avatar">' + avatarContent + '</div><div class="review-author-info"><h4>' + review.author + '</h4><span class="review-time">' + review.relativeTime + '</span></div></div><div class="review-stars">' + createStarsSVG(review.rating || 5) + '</div><p class="review-text">' + (review.text || 'Great service!') + '</p><div class="review-source">' + googleLogo + 'Posted on Google</div></div>';
    });
    
    carousel.innerHTML = cardsHTML;
    
    const dotsContainer = document.querySelector('.carousel-dots');
    if (dotsContainer) {
      let dotsHTML = '';
      reviews.forEach((_, i) => dotsHTML += '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '"></button>');
      dotsContainer.innerHTML = dotsHTML;
      
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.addEventListener('click', function() {
          const card = carousel.querySelector('.review-card');
          if (!card) return;
          carousel.scrollTo({ left: i * (card.offsetWidth + 24), behavior: 'smooth' });
        });
      });
    }
  }
  
  if (document.readyState === 'complete') fetchGoogleReviews();
  else window.addEventListener('load', fetchGoogleReviews);
})();
</script>
</body>
</html>`
}
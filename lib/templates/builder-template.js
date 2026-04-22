/**
 * Aussie Builder/Construction Template
 * 
 * Features:
 * - Bold orange/charcoal color scheme (#f97316, #1c1c1c)
 * - Strong, construction-focused design
 * - "Built By Optimo Agency" footer
 * - Fully mobile responsive
 * - Dynamic variables for company, phone, location
 * - Optional Instagram embed
 * - View & click tracking
 */

const DEFAULT_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=700&fit=crop',
  about1: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=500&fit=crop',
  about2: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=450&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=450&fit=crop',
  gallery6: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=450&fit=crop',
}

export function generateBuilderHTML({ companyName, phone, location, trackingId, instagramUrl = null, googleMapsUrl = null, customContent = null, customImages = null }) {
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  const optimoLink = 'https://maps.app.goo.gl/RKbxUkQ7yyt27RGg6'
  const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track'
  
  const images = { ...DEFAULT_IMAGES, ...customImages }
  
  const locationParts = location.split(',').map(s => s.trim())
  const city = locationParts[0] || location
  const state = locationParts[1] || 'Australia'
  
  const tagline = customContent?.tagline || 'Building Excellence, Delivering Results'
  const aboutText = customContent?.aboutText || `${companyName} has been building quality homes and commercial projects across ${city} for over two decades. We're a family-owned business that treats every project like it's our own.`

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
    <a href="${googleMapsUrl}" target="_blank" style="display: inline-block; margin-top: 24px; background: var(--orange); color: #fff; padding: 14px 32px; border-radius: 6px; font-weight: 700; text-decoration: none; font-size: 15px;">
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
<title>${companyName} | Builders & Construction ${city}, ${state}</title>
<meta name="description" content="${companyName} - Licensed builders in ${city}, ${state}. New homes, renovations, extensions & commercial construction. Call ${phone} for a free consultation.">
<meta name="robots" content="noindex, nofollow">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --orange:#f97316;--orange-dark:#ea580c;--orange-light:#fdba74;
  --charcoal:#1c1c1c;--charcoal-light:#2d2d2d;--dark:#0a0a0a;
  --gray:#525252;--gray-light:#a3a3a3;--light:#fafafa;--white:#fff;
  --border:#e5e5e5;
  --font:'Inter',sans-serif;--radius:6px;
}
html{scroll-behavior:smooth}
body{font-family:var(--font);color:var(--charcoal);background:var(--white);line-height:1.6}

.demo-badge{position:fixed;top:22px;right:-30px;background:var(--orange);color:#fff;font-size:10px;font-weight:700;padding:6px 45px;transform:rotate(45deg);z-index:9999;letter-spacing:1.5px;text-transform:uppercase;box-shadow:0 2px 10px rgba(249,115,22,0.4)}

nav{position:fixed;top:0;width:100%;z-index:100;background:var(--charcoal);padding:0 6%;height:80px;display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid var(--orange)}
.nav-logo{font-size:26px;font-weight:900;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:12px;letter-spacing:-0.5px}
.nav-logo span{color:var(--orange)}
.nav-logo::before{content:'🏗️';font-size:28px}
.nav-links{display:flex;gap:36px;list-style:none}
.nav-links a{color:rgba(255,255,255,0.8);text-decoration:none;font-size:14px;font-weight:600;transition:color .2s;text-transform:uppercase;letter-spacing:0.5px}
.nav-links a:hover{color:var(--orange)}
.nav-cta{background:var(--orange);color:#fff;padding:14px 28px;border-radius:var(--radius);font-size:14px;font-weight:700;text-decoration:none;transition:all .2s;text-transform:uppercase;letter-spacing:0.5px}
.nav-cta:hover{background:var(--orange-dark)}

.mobile-toggle{display:none;background:none;border:none;cursor:pointer;width:28px;height:22px;position:relative}
.mobile-toggle span{display:block;width:100%;height:3px;background:var(--white);border-radius:2px;position:absolute;left:0;transition:all .3s}
.mobile-toggle span:nth-child(1){top:0}
.mobile-toggle span:nth-child(2){top:9px}
.mobile-toggle span:nth-child(3){top:18px}
.mobile-toggle.active span:nth-child(1){top:9px;transform:rotate(45deg)}
.mobile-toggle.active span:nth-child(2){opacity:0}
.mobile-toggle.active span:nth-child(3){top:9px;transform:rotate(-45deg)}
.mobile-menu{display:none;position:fixed;top:80px;left:0;right:0;background:var(--charcoal);padding:20px 6%;flex-direction:column;gap:0;z-index:99}
.mobile-menu.active{display:flex}
.mobile-menu a{color:var(--white);text-decoration:none;font-size:16px;font-weight:600;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.1);text-transform:uppercase}

.hero{min-height:100vh;position:relative;display:flex;align-items:center;background:var(--dark)}
.hero-bg{position:absolute;inset:0;background:url('${images.hero}') center/cover;opacity:0.4}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(28,28,28,0.95) 0%,rgba(28,28,28,0.7) 50%,rgba(28,28,28,0.5) 100%)}
.hero-content{position:relative;z-index:2;padding:140px 6%;max-width:800px}
.hero-tag{display:inline-flex;align-items:center;gap:10px;background:var(--orange);color:#fff;font-size:12px;font-weight:700;padding:10px 20px;margin-bottom:30px;text-transform:uppercase;letter-spacing:1.5px}
.hero-tag::before{content:'';width:8px;height:8px;background:#fff;border-radius:50%}
.hero h1{font-size:clamp(42px,6vw,72px);color:var(--white);line-height:1.05;margin-bottom:28px;font-weight:900;letter-spacing:-1px}
.hero h1 span{color:var(--orange);display:block}
.hero-sub{color:rgba(255,255,255,0.75);font-size:20px;line-height:1.7;margin-bottom:45px;max-width:600px}
.hero-btns{display:flex;gap:18px;flex-wrap:wrap}
.btn-primary{background:var(--orange);color:#fff;padding:18px 40px;border-radius:var(--radius);font-size:15px;font-weight:700;text-decoration:none;transition:all .2s;display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:0.5px}
.btn-primary:hover{background:var(--orange-dark);transform:translateY(-3px)}
.btn-outline{border:2px solid rgba(255,255,255,0.4);color:#fff;padding:16px 38px;border-radius:var(--radius);font-size:15px;font-weight:600;text-decoration:none;transition:all .2s;text-transform:uppercase;letter-spacing:0.5px}
.btn-outline:hover{border-color:var(--orange);color:var(--orange)}

.hero-stats{position:absolute;bottom:0;left:0;right:0;background:var(--charcoal);display:flex;z-index:2}
.hero-stat{flex:1;padding:35px 40px;text-align:center;border-right:1px solid rgba(255,255,255,0.1)}
.hero-stat:last-child{border-right:none}
.hero-stat .num{font-size:48px;font-weight:900;color:var(--orange);line-height:1;margin-bottom:5px}
.hero-stat .label{font-size:13px;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:1px;font-weight:600}

.trust-strip{background:var(--light);padding:28px 6%;display:flex;justify-content:center;gap:60px;flex-wrap:wrap;border-bottom:1px solid var(--border)}
.trust-item{display:flex;align-items:center;gap:12px;font-size:14px;font-weight:700;color:var(--charcoal);text-transform:uppercase;letter-spacing:0.5px}
.trust-item::before{content:'✓';width:24px;height:24px;background:var(--orange);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}

section{padding:100px 6%}
.section-tag{display:inline-block;background:rgba(249,115,22,0.1);color:var(--orange);font-size:12px;font-weight:700;padding:8px 16px;margin-bottom:18px;text-transform:uppercase;letter-spacing:2px}
.section-title{font-size:clamp(36px,5vw,52px);color:var(--charcoal);line-height:1.1;margin-bottom:20px;font-weight:900;letter-spacing:-1px}
.section-title span{color:var(--orange)}
.section-sub{color:var(--gray);font-size:18px;line-height:1.75;max-width:650px}

.services{background:var(--white)}
.services-header{text-align:center;max-width:700px;margin:0 auto 60px}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.service-card{background:var(--light);padding:50px 40px;border:1px solid var(--border);transition:all .3s;position:relative}
.service-card:hover{background:var(--charcoal);transform:translateY(-5px);z-index:1}
.service-card:hover *{color:var(--white)}
.service-card:hover .service-icon{background:var(--orange)}
.service-num{position:absolute;top:20px;right:25px;font-size:60px;font-weight:900;color:rgba(0,0,0,0.05);line-height:1}
.service-card:hover .service-num{color:rgba(255,255,255,0.08)}
.service-icon{width:70px;height:70px;background:var(--charcoal);display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:28px;transition:background .3s}
.service-card h3{font-size:24px;color:var(--charcoal);margin-bottom:14px;font-weight:800}
.service-card p{color:var(--gray);font-size:15px;line-height:1.7}

.about{background:var(--charcoal)}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-images{position:relative}
.about-img-main{width:100%;height:500px;object-fit:cover}
.about-img-float{position:absolute;bottom:-40px;right:-40px;width:280px;height:220px;object-fit:cover;border:8px solid var(--charcoal);box-shadow:0 20px 50px rgba(0,0,0,0.3)}
.about-badge{position:absolute;top:30px;left:30px;background:var(--orange);color:#fff;padding:20px 25px;text-align:center}
.about-badge .num{font-size:42px;font-weight:900;line-height:1}
.about-badge .text{font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600}
.about-content{color:var(--white)}
.about-content .section-tag{background:rgba(249,115,22,0.2)}
.about-content .section-title{color:var(--white)}
.about-content p{color:rgba(255,255,255,0.75);margin-bottom:24px}
.about-list{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:35px}
.about-list-item{display:flex;align-items:center;gap:12px;color:rgba(255,255,255,0.9);font-weight:600;font-size:15px}
.about-list-item::before{content:'→';color:var(--orange);font-weight:800;font-size:18px}

.gallery{background:var(--light)}
.gallery-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:50px;flex-wrap:wrap;gap:30px}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.gallery-item{position:relative;overflow:hidden;aspect-ratio:4/3}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.gallery-item:hover img{transform:scale(1.1)}
.gallery-item::before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(28,28,28,0.9) 0%,transparent 60%);opacity:0;transition:opacity .3s;z-index:1}
.gallery-item:hover::before{opacity:1}
.gallery-label{position:absolute;bottom:20px;left:25px;z-index:2;opacity:0;transform:translateY(15px);transition:all .4s}
.gallery-item:hover .gallery-label{opacity:1;transform:translateY(0)}
.gallery-label h4{color:var(--white);font-size:18px;font-weight:700;margin-bottom:4px}
.gallery-label p{color:var(--orange);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px}

.process{background:var(--white)}
.process-header{text-align:center;max-width:700px;margin:0 auto 70px}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.process-grid::before{content:'';position:absolute;top:50px;left:12%;right:12%;height:3px;background:var(--border);z-index:0}
.process-step{text-align:center;position:relative;z-index:1}
.process-num{width:100px;height:100px;background:var(--charcoal);color:var(--white);font-size:36px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 28px;transition:all .3s}
.process-step:hover .process-num{background:var(--orange)}
.process-step h4{font-size:18px;color:var(--charcoal);margin-bottom:10px;font-weight:700}
.process-step p{color:var(--gray);font-size:14px;line-height:1.6;padding:0 20px}

/* Reviews Carousel */
.reviews{background:var(--charcoal);padding:80px 6%;overflow:hidden}
.reviews .section-tag{background:rgba(249,115,22,0.2)}
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
.review-card{flex:0 0 340px;scroll-snap-align:start;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0;padding:1.75rem;display:flex;flex-direction:column;transition:all .3s}
.review-card:hover{border-color:var(--orange);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.3)}
.review-card-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}
.review-avatar{width:48px;height:48px;background:var(--orange);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1rem;overflow:hidden}
.review-avatar img{width:100%;height:100%;object-fit:cover}
.review-author-info h4{font-size:1rem;font-weight:600;color:#fff;margin-bottom:0.125rem}
.review-author-info .review-time{color:rgba(255,255,255,0.5);font-size:0.8rem}
.review-card .review-stars{display:flex;gap:2px;margin-bottom:0.75rem}
.review-card .review-stars .star{width:1rem;height:1rem;color:#FBBC04;fill:#FBBC04}
.review-card .review-text{color:rgba(255,255,255,0.85);font-size:0.9rem;line-height:1.65;flex:1}
.review-card .review-source{display:flex;align-items:center;gap:0.5rem;margin-top:1.25rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:0.75rem}
.review-card .review-source svg{width:16px;height:16px}
.carousel-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;background:var(--orange);border:none;border-radius:0;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10}
.carousel-nav:hover{transform:translateY(-50%) scale(1.1);box-shadow:0 4px 20px rgba(0,0,0,0.3)}
.carousel-nav.prev{left:0}
.carousel-nav.next{right:0}
.carousel-nav svg{width:20px;height:20px}
.carousel-dots{display:flex;justify-content:center;gap:0.5rem;margin-top:2rem}
.carousel-dot{width:8px;height:8px;border-radius:0;background:rgba(255,255,255,0.3);border:none;cursor:pointer;transition:all .2s}
.carousel-dot.active{background:var(--orange);width:24px}
.reviews-cta{text-align:center;margin-top:2rem}
.reviews-cta a{display:inline-flex;align-items:center;gap:0.5rem;color:var(--orange);font-weight:600;font-size:0.9rem;transition:opacity .2s;text-decoration:none}
.reviews-cta a:hover{opacity:0.8}
@media(max-width:768px){.reviews-carousel-wrapper{padding:0 1rem}.review-card{flex:0 0 300px;padding:1.5rem}.carousel-nav{display:none}.reviews{padding:60px 4%}}

.cta-section{background:var(--orange);padding:100px 6%;position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;right:-150px;top:-150px;width:500px;height:500px;background:rgba(255,255,255,0.08);border-radius:50%}
.cta-section::after{content:'';position:absolute;left:-100px;bottom:-100px;width:350px;height:350px;background:rgba(0,0,0,0.08);border-radius:50%}
.cta-content{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:40px}
.cta-text h2{font-size:clamp(32px,4vw,48px);color:var(--white);margin-bottom:12px;font-weight:900}
.cta-text p{color:rgba(255,255,255,0.85);font-size:18px}
.btn-dark{background:var(--charcoal);color:var(--white);padding:20px 45px;font-size:16px;font-weight:700;text-decoration:none;transition:all .2s;text-transform:uppercase;letter-spacing:1px;display:inline-block}
.btn-dark:hover{background:var(--dark);transform:translateY(-3px)}

.contact{background:var(--light)}
.contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:60px;margin-top:60px}
.contact-info h3{font-size:32px;color:var(--charcoal);margin-bottom:30px;font-weight:800}
.contact-item{display:flex;gap:20px;margin-bottom:30px}
.contact-icon{width:60px;height:60px;background:var(--charcoal);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}
.contact-item h4{color:var(--charcoal);font-size:16px;font-weight:700;margin-bottom:5px}
.contact-item p,.contact-item a{color:var(--gray);font-size:15px;text-decoration:none}
.contact-item a:hover{color:var(--orange)}

.contact-form{background:var(--white);padding:50px;border:1px solid var(--border)}
.contact-form h3{font-size:28px;color:var(--charcoal);margin-bottom:8px;font-weight:800}
.contact-form .sub{color:var(--gray);margin-bottom:35px;font-size:15px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.form-group{margin-bottom:20px}
.form-group label{display:block;font-size:12px;font-weight:700;color:var(--charcoal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px}
.form-group input,.form-group select,.form-group textarea{width:100%;border:2px solid var(--border);padding:16px 18px;font-size:15px;font-family:var(--font);color:var(--charcoal);background:var(--light);transition:all .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--orange);background:var(--white)}
.form-group textarea{resize:vertical;min-height:130px}
.form-submit{width:100%;background:var(--orange);color:#fff;border:none;padding:18px;font-size:15px;font-weight:700;cursor:pointer;font-family:var(--font);transition:all .2s;text-transform:uppercase;letter-spacing:1px;margin-top:10px}
.form-submit:hover{background:var(--orange-dark)}

footer{background:var(--dark);color:rgba(255,255,255,0.5);padding:50px 6% 30px;text-align:center}
.footer-logo{font-size:28px;font-weight:900;color:var(--white);margin-bottom:12px;display:flex;align-items:center;justify-content:center;gap:12px}
.footer-logo span{color:var(--orange)}
.footer-logo::before{content:'🏗️';font-size:32px}
.footer-info{margin-bottom:20px;font-size:14px}
.footer-optimo{padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);margin-top:20px}
.footer-optimo a{color:var(--orange);text-decoration:none;font-weight:700;transition:color .2s}
.footer-optimo a:hover{color:var(--white)}

@media(max-width:1024px){
  .services-grid{grid-template-columns:1fr 1fr}
  .about-grid{grid-template-columns:1fr;gap:60px}
  .about-img-float{position:static;width:100%;height:250px;border:none;margin-top:20px}
  .gallery-grid{grid-template-columns:1fr 1fr}
  .process-grid{grid-template-columns:1fr 1fr;gap:40px}
  .process-grid::before{display:none}
  .testimonial-grid{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .cta-content{text-align:center;flex-direction:column}
  .nav-links{display:none}
  .mobile-toggle{display:block}
  .hero-stats{flex-wrap:wrap}
  .hero-stat{flex:1 1 50%;border-bottom:1px solid rgba(255,255,255,0.1)}
}
@media(max-width:600px){
  .hero h1{font-size:38px}
  .hero-btns{flex-direction:column}
  .hero-btns a{width:100%;text-align:center}
  .hero-stat{flex:1 1 100%}
  .services-grid{grid-template-columns:1fr}
  .gallery-grid{grid-template-columns:1fr}
  .process-grid{grid-template-columns:1fr}
  .about-list{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .trust-strip{flex-direction:column;gap:16px;text-align:center}
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
  border-top: 2px solid #f97316;
  gap: 10px;
}
.sticky-cta span { color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; }
.sticky-btns { display: flex; gap: 8px; }
.sticky-btn {
  background: #f97316;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
}
.sticky-btn:hover { background: #ea580c; }
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
  <a href="#" class="nav-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Construction'}</span></a>
  <ul class="nav-links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#gallery">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="mobile-toggle" onclick="this.classList.toggle('active'); document.querySelector('.mobile-menu').classList.toggle('active');">
    <span></span><span></span><span></span>
  </button>
  <a href="${calendarUrl}" target="_blank" class="nav-cta" data-track="book_call">Get Quote</a>
</nav>

<div class="mobile-menu">
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#gallery">Projects</a>
  <a href="#contact">Contact</a>
  <a href="tel:${phoneClean}">📞 ${phone}</a>
</div>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-tag">${city}'s Trusted Builders</div>
    <h1>${tagline.split(',')[0]}<span>${tagline.split(',')[1] || ', Delivering Results'}</span></h1>
    <p class="hero-sub">From custom homes to commercial fit-outs, we bring your vision to life with quality craftsmanship and attention to detail. Licensed, insured, and committed to excellence.</p>
    <div class="hero-btns">
      <a href="${calendarUrl}" target="_blank" class="btn-primary" data-track="book_call">Get Free Quote →</a>
      <a href="tel:${phoneClean}" class="btn-outline" data-track="phone_click">📞 ${phone}</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hero-stat"><div class="num">25+</div><div class="label">Years Experience</div></div>
    <div class="hero-stat"><div class="num">500+</div><div class="label">Projects Completed</div></div>
    <div class="hero-stat"><div class="num">100%</div><div class="label">Licensed & Insured</div></div>
    <div class="hero-stat"><div class="num">4.9★</div><div class="label">Google Rating</div></div>
  </div>
</section>

<div class="trust-strip">
  <div class="trust-item">${state} Registered Builder</div>
  <div class="trust-item">$20M Public Liability</div>
  <div class="trust-item">Fixed-Price Contracts</div>
  <div class="trust-item">10-Year Structural Warranty</div>
</div>

<section id="services" class="services">
  <div class="services-header">
    <span class="section-tag">What We Build</span>
    <h2 class="section-title">Construction <span>Services</span></h2>
    <p class="section-sub">Full-service building solutions for residential and commercial projects across ${city} and surrounds.</p>
  </div>
  <div class="services-grid">
    <div class="service-card"><span class="service-num">01</span><div class="service-icon">🏠</div><h3>New Home Builds</h3><p>Custom designed homes built to your specifications. From architectural designs to knockdown rebuilds — we handle it all from start to finish.</p></div>
    <div class="service-card"><span class="service-num">02</span><div class="service-icon">🔨</div><h3>Renovations</h3><p>Transform your existing home with expert renovations. Kitchens, bathrooms, open-plan conversions — we make your vision a reality.</p></div>
    <div class="service-card"><span class="service-num">03</span><div class="service-icon">📐</div><h3>Extensions</h3><p>Need more space? Single or double-storey extensions seamlessly integrated with your existing home. Full council approvals handled.</p></div>
    <div class="service-card"><span class="service-num">04</span><div class="service-icon">🏢</div><h3>Commercial Builds</h3><p>Office fit-outs, retail spaces, warehouses and industrial buildings. We work to your timeline with minimal business disruption.</p></div>
    <div class="service-card"><span class="service-num">05</span><div class="service-icon">🏗️</div><h3>Structural Work</h3><p>Load-bearing wall removals, underpinning, restumping and structural repairs. All work engineer-certified and warranty-backed.</p></div>
    <div class="service-card"><span class="service-num">06</span><div class="service-icon">🌳</div><h3>Outdoor Living</h3><p>Decks, pergolas, carports, outdoor kitchens and alfresco areas. Built tough for the Australian climate.</p></div>
  </div>
</section>

<section id="about" class="about">
  <div class="about-grid">
    <div class="about-images">
      <img src="${images.about1}" alt="Construction team" class="about-img-main">
      <img src="${images.about2}" alt="Quality build" class="about-img-float">
      <div class="about-badge"><div class="num">25+</div><div class="text">Years Est.</div></div>
    </div>
    <div class="about-content">
      <span class="section-tag">About Us</span>
      <h2 class="section-title">Built On <span>Trust</span></h2>
      <p>${aboutText}</p>
      <p>We're fully licensed, insured, and registered with the ${state} Building Authority. Every project comes with a fixed-price contract — no surprises, no variations unless you change the scope.</p>
      <div class="about-list">
        <div class="about-list-item">${state} Registered Builder</div>
        <div class="about-list-item">Fixed-Price Contracts</div>
        <div class="about-list-item">$20M Public Liability</div>
        <div class="about-list-item">10-Year Warranty</div>
        <div class="about-list-item">Own Trade Teams</div>
        <div class="about-list-item">Weekly Updates</div>
      </div>
    </div>
  </div>
</section>

<section id="gallery" class="gallery">
  <div class="gallery-header">
    <div>
      <span class="section-tag">Our Work</span>
      <h2 class="section-title">Recent <span>Projects</span></h2>
    </div>
  </div>
  <div class="gallery-grid">
    <div class="gallery-item"><img src="${images.gallery1}" alt="New home"><div class="gallery-label"><h4>Custom Home</h4><p>${city}</p></div></div>
    <div class="gallery-item"><img src="${images.gallery2}" alt="Modern build"><div class="gallery-label"><h4>Modern Build</h4><p>${city}</p></div></div>
    <div class="gallery-item"><img src="${images.gallery3}" alt="Renovation"><div class="gallery-label"><h4>Full Renovation</h4><p>${city}</p></div></div>
    <div class="gallery-item"><img src="${images.gallery4}" alt="Extension"><div class="gallery-label"><h4>Home Extension</h4><p>${city}</p></div></div>
    <div class="gallery-item"><img src="${images.gallery5}" alt="Outdoor area"><div class="gallery-label"><h4>Outdoor Living</h4><p>${city}</p></div></div>
    <div class="gallery-item"><img src="${images.gallery6}" alt="Commercial"><div class="gallery-label"><h4>Commercial Fit-out</h4><p>${city}</p></div></div>
  </div>
</section>

<section class="process">
  <div class="process-header">
    <span class="section-tag">How We Work</span>
    <h2 class="section-title">Our <span>Process</span></h2>
    <p class="section-sub">A straightforward approach that keeps you informed and in control at every stage.</p>
  </div>
  <div class="process-grid">
    <div class="process-step"><div class="process-num">01</div><h4>Consultation</h4><p>Free on-site meeting to understand your vision, assess the site, and discuss options.</p></div>
    <div class="process-step"><div class="process-num">02</div><h4>Design & Quote</h4><p>Detailed plans and fixed-price quote. No hidden costs or surprise variations.</p></div>
    <div class="process-step"><div class="process-num">03</div><h4>Build Phase</h4><p>Our team gets to work. Weekly updates and site access keep you in the loop.</p></div>
    <div class="process-step"><div class="process-num">04</div><h4>Handover</h4><p>Final walkthrough, touch-ups completed, and your warranty certificate handed over.</p></div>
  </div>
</section>

<section id="reviews" class="reviews">
  <div class="reviews-header">
    <span class="section-tag">Testimonials</span>
    <h2 class="section-title">What Our <span>Clients</span> Say</h2>
    <div class="reviews-rating">
      <div class="rating-badge">
        <span class="rating-score">5.0</span>
        <div class="rating-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
        </div>
      <span class="rating-count">Based on 45+ reviews</span>
    </div>
  </div>
  <div class="reviews-carousel-wrapper">
    <button class="carousel-nav prev" onclick="scrollCarousel(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
    <div class="reviews-carousel" id="reviewsCarousel">
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">DM</div><div class="review-author-info"><h4>David M.</h4><span class="review-time">2 weeks ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Built our dream home from scratch and the whole experience was smooth from start to finish. Professional team, quality work, and finished on time.</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">ST</div><div class="review-author-info"><h4>Sarah T.</h4><span class="review-time">1 month ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Major renovation including knocking out walls and adding an extension. They handled everything including council approvals. The result exceeded our expectations.</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">JP</div><div class="review-author-info"><h4>James P.</h4><span class="review-time">1 month ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Professional, reliable, and great communicators. Our office fit-out was completed with minimal disruption to our business. Quality work at a fair price.</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">MK</div><div class="review-author-info"><h4>Mark K.</h4><span class="review-time">2 months ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Excellent granny flat build. From design to completion, they handled everything professionally. Quality finishes and great attention to detail. Highly recommend!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
      <div class="review-card"><div class="review-card-header"><div class="review-avatar">LB</div><div class="review-author-info"><h4>Lisa B.</h4><span class="review-time">3 months ago</span></div></div><div class="review-stars"><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div><p class="review-text">Transformed our outdated kitchen into a modern masterpiece. The team was punctual, clean, and delivered exactly what we envisioned. Worth every penny!</p><div class="review-source"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Posted on Google</div></div>
    </div>
    <button class="carousel-nav next" onclick="scrollCarousel(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
  </div>
  <div class="carousel-dots"><button class="carousel-dot active"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button><button class="carousel-dot"></button></div>
  ${googleMapsUrl ? `<div class="reviews-cta"><a href="${googleMapsUrl}" target="_blank">See all reviews on Google <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>` : ''}
</section>

${instagramSection}

${googleMapsSection}

<section class="cta-section">
  <div class="cta-content">
    <div class="cta-text">
      <h2>Ready to Build?</h2>
      <p>Get a free consultation and fixed-price quote for your project.</p>
    </div>
    <a href="${calendarUrl}" target="_blank" class="btn-dark" data-track="book_call">Book Free Consultation</a>
  </div>
</section>

<section id="contact" class="contact">
  <div style="text-align:center;max-width:700px;margin:0 auto">
    <span class="section-tag">Contact</span>
    <h2 class="section-title">Get In <span>Touch</span></h2>
  </div>
  <div class="contact-grid">
    <div class="contact-info">
      <h3>Let's Discuss Your Project</h3>
      <div class="contact-item"><div class="contact-icon">📞</div><div><h4>Phone</h4><a href="tel:${phoneClean}">${phone}</a><p>Mon-Fri 7am-5pm</p></div></div>
      <div class="contact-item"><div class="contact-icon">📍</div><div><h4>Service Area</h4><p>${city} and surrounds (within 80km)</p></div></div>
      <div class="contact-item"><div class="contact-icon">⚡</div><div><h4>Response Time</h4><p>We respond within 24 hours</p></div></div>
    </div>
    <div class="contact-form">
      <h3>Request a Quote</h3>
      <p class="sub">Tell us about your project and we'll get back to you.</p>
      <div class="form-row">
        <div class="form-group"><label>First Name</label><input type="text" placeholder="Your first name"></div>
        <div class="form-group"><label>Last Name</label><input type="text" placeholder="Your last name"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input type="tel" placeholder="0400 000 000"></div>
        <div class="form-group"><label>Suburb</label><input type="text" placeholder="Your suburb"></div>
      </div>
      <div class="form-group">
        <label>Project Type</label>
        <select>
          <option value="">Select...</option>
          <option>New Home Build</option>
          <option>Renovation</option>
          <option>Extension</option>
          <option>Commercial</option>
          <option>Structural Work</option>
          <option>Outdoor/Deck</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group"><label>Project Details</label><textarea placeholder="Tell us about your project..."></textarea></div>
      <button class="form-submit" onclick="window.open('${calendarUrl}', '_blank')">Get Free Quote →</button>
    </div>
  </div>
</section>

<footer>
  <div class="footer-logo">${companyName.split(' ')[0]} <span>${companyName.split(' ').slice(1).join(' ') || 'Construction'}</span></div>
  <div class="footer-info">© 2026 ${companyName} · ${city}, ${state} · Licensed Builder</div>
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

function scrollCarousel(direction){const c=document.getElementById('reviewsCarousel');if(!c)return;const card=c.querySelector('.review-card');if(!card)return;c.scrollBy({left:direction*(card.offsetWidth+24),behavior:'smooth'})}
(function(){const c=document.getElementById('reviewsCarousel'),dots=document.querySelectorAll('.carousel-dot');if(c&&dots.length){c.addEventListener('scroll',function(){const card=c.querySelector('.review-card');if(!card)return;const idx=Math.round(c.scrollLeft/(card.offsetWidth+24));dots.forEach((d,i)=>d.classList.toggle('active',i===idx))});dots.forEach((d,i)=>d.addEventListener('click',function(){const card=c.querySelector('.review-card');if(card)c.scrollTo({left:i*(card.offsetWidth+24),behavior:'smooth'})}))}})();

(function(){const g='${googleMapsUrl||''}',n='${companyName}',l='${location}',api='https://demo-site-generator-sepia.vercel.app/api/reviews';if(!g&&!n)return;async function f(){try{let u=api+(g?'?mapsUrl='+encodeURIComponent(g):'?businessName='+encodeURIComponent(n)+'&location='+encodeURIComponent(l));const r=await fetch(u),d=await r.json();if(d.success&&d.reviews&&d.reviews.length>0)update(d.reviews,d.place)}catch(e){}}function getI(name){return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}function stars(c){return '<svg class="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'.repeat(c)}function update(reviews,place){const c=document.getElementById('reviewsCarousel'),rs=document.querySelector('.rating-score'),rc=document.querySelector('.rating-count');if(!c)return;if(rs&&place&&place.rating)rs.textContent=place.rating.toFixed(1);if(rc&&place&&place.totalReviews)rc.textContent='Based on '+place.totalReviews+'+ reviews';const gl='<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';let h='';reviews.forEach(r=>{const i=getI(r.author),av=r.authorPhoto?'<img src="'+r.authorPhoto+'" alt="'+r.author+'">':i;h+='<div class="review-card"><div class="review-card-header"><div class="review-avatar">'+av+'</div><div class="review-author-info"><h4>'+r.author+'</h4><span class="review-time">'+r.relativeTime+'</span></div></div><div class="review-stars">'+stars(r.rating||5)+'</div><p class="review-text">'+(r.text||'Great service!')+'</p><div class="review-source">'+gl+'Posted on Google</div></div>'});c.innerHTML=h;const dc=document.querySelector('.carousel-dots');if(dc){let dh='';reviews.forEach((_,i)=>dh+='<button class="carousel-dot'+(i===0?' active':'')+'"></button>');dc.innerHTML=dh;dc.querySelectorAll('.carousel-dot').forEach((d,i)=>d.addEventListener('click',function(){const card=c.querySelector('.review-card');if(card)c.scrollTo({left:i*(card.offsetWidth+24),behavior:'smooth'})}))}}if(document.readyState==='complete')f();else window.addEventListener('load',f)})();
</script>
</body>
</html>`
}
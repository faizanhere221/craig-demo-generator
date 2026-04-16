import { getNicheConfig } from './niche-config'

export function generateSiteHTML({ companyName, phone, niche, location, trackingId = null, customContent = null }) {
  const config = getNicheConfig(niche)
  const baseSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const slug = trackingId ? `${baseSlug}-${trackingId}` : baseSlug
  const phoneClean = phone.replace(/\s/g, '')
  const calendarUrl = 'https://api.leadconnectorhq.com/widget/bookings/website-demo-optimo'
  
  // Use custom content if provided, otherwise use defaults
  const tagline = customContent?.tagline || `Quality ${config.title} You Can Trust`
  const aboutText = customContent?.aboutText || `At ${companyName}, we've built our reputation on quality work, honest pricing, and exceptional customer service. Every project gets our full attention and expertise.`
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} | ${config.titlePlural} in ${location}</title>
    <meta name="description" content="${companyName} provides professional ${config.title.toLowerCase()} services in ${location}. Call ${phone} for a free quote.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://${slug}.vercel.app">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${companyName} | ${config.titlePlural} in ${location}">
    <meta property="og:description" content="Professional ${config.title.toLowerCase()} services in ${location}. Call ${phone} for a free quote.">
    <meta property="og:type" content="website">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        * { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        
        /* Gradient backgrounds */
        .hero-bg { background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); }
        .gradient-text { 
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
            background-clip: text; 
        }
        .gradient-btn { 
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gradient-btn:hover { 
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); 
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.35);
        }
        
        /* Card hover effects */
        .service-card { 
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
            border: 1px solid rgba(148, 163, 184, 0.1);
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(10px);
        }
        .service-card:hover { 
            transform: translateY(-8px) scale(1.02); 
            border-color: rgba(59, 130, 246, 0.5); 
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .service-card:hover .service-icon {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        .service-icon {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Stat card */
        .stat-card { 
            background: rgba(30, 41, 59, 0.6); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(148, 163, 184, 0.1);
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            border-color: rgba(59, 130, 246, 0.4);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        /* Promo badge */
        .promo-badge { 
            background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); 
        }
        
        /* Float animation */
        .float-animation { animation: float 6s ease-in-out infinite; }
        @keyframes float { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-15px); } 
        }
        
        /* Fade animations */
        .fade-up { 
            opacity: 0; 
            transform: translateY(30px); 
            animation: fadeUp 0.8s ease-out forwards; 
        }
        .fade-up-delay-1 { animation-delay: 0.15s; }
        .fade-up-delay-2 { animation-delay: 0.3s; }
        .fade-up-delay-3 { animation-delay: 0.45s; }
        .fade-up-delay-4 { animation-delay: 0.6s; }
        
        @keyframes fadeUp { 
            to { opacity: 1; transform: translateY(0); } 
        }
        
        /* Glow effect */
        .glow { box-shadow: 0 0 80px rgba(59, 130, 246, 0.2); }
        
        /* Scroll reveal */
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Mobile menu */
        .mobile-menu {
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open {
            transform: translateX(0);
        }
        .menu-overlay {
            opacity: 0;
            visibility: hidden;
            transition: all 0.35s ease;
        }
        .menu-overlay.open {
            opacity: 1;
            visibility: visible;
        }
        
        /* Image hover */
        .img-hover {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .img-hover:hover {
            transform: scale(1.08);
        }
        
        /* Gallery lightbox */
        .lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .lightbox.active {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .lightbox img {
            max-width: 90vw;
            max-height: 85vh;
            border-radius: 1rem;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            animation: scaleIn 0.3s ease;
        }
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* Form focus effects */
        .form-input {
            transition: all 0.3s ease;
        }
        .form-input:focus {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
            border-color: #3b82f6;
        }
        
        /* Button ripple */
        .btn-ripple {
            position: relative;
            overflow: hidden;
        }
        .btn-ripple::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }
        .btn-ripple:hover::before {
            transform: translateX(100%);
        }
        
        /* Contact card hover */
        .contact-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-card:hover {
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(30, 41, 59, 0.9);
            transform: translateX(5px);
        }
        .contact-card:hover .contact-icon {
            transform: scale(1.1) rotate(5deg);
        }
        .contact-icon {
            transition: all 0.3s ease;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        
        /* Selection color */
        ::selection { background: rgba(59, 130, 246, 0.3); color: white; }
        
        /* Pulse animation for badges */
        .pulse-ring {
            animation: pulseRing 2s ease-out infinite;
        }
        @keyframes pulseRing {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
            70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        
        /* Gallery card */
        .gallery-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-card:hover {
            transform: scale(1.03);
            z-index: 10;
        }
        .gallery-card:hover img {
            transform: scale(1.1);
        }
        .gallery-card img {
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Floating badges animation */
        .float-badge-1 { animation: floatBadge1 5s ease-in-out infinite; }
        .float-badge-2 { animation: floatBadge2 6s ease-in-out infinite; }
        @keyframes floatBadge1 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes floatBadge2 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-2deg); }
        }
    </style>
</head>
<body class="bg-slate-950 text-white antialiased">

    <!-- Promo Banner -->
    <div class="promo-badge text-center py-2.5 px-4 text-sm font-semibold">
        <span class="inline-flex items-center gap-2">
            🎉 <span class="hidden sm:inline">Limited Time:</span> 10% OFF This Month — 
            <a href="tel:${phoneClean}" class="underline hover:no-underline font-bold">Call Now!</a>
        </span>
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50">
        <div class="max-w-6xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <a href="#" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 gradient-btn rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <div>
                        <span class="text-lg font-bold">${companyName}</span>
                        <div class="text-xs text-slate-400">${location}</div>
                    </div>
                </a>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center gap-8">
                    <a href="#services" class="text-slate-300 hover:text-white transition text-sm font-medium relative group">
                        Services
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a href="#about" class="text-slate-300 hover:text-white transition text-sm font-medium relative group">
                        About
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a href="#gallery" class="text-slate-300 hover:text-white transition text-sm font-medium relative group">
                        Gallery
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a href="#contact" class="text-slate-300 hover:text-white transition text-sm font-medium relative group">
                        Contact
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                    </a>
                    <a href="tel:${phoneClean}" class="gradient-btn btn-ripple text-white px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        Free Quote
                    </a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button onclick="toggleMobileMenu()" class="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition" aria-label="Toggle menu">
                    <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu Overlay -->
        <div id="menu-overlay" class="menu-overlay fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40" onclick="toggleMobileMenu()"></div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="mobile-menu fixed inset-y-0 right-0 w-80 bg-slate-900/98 backdrop-blur-xl border-l border-slate-800 md:hidden z-50 p-6">
            <div class="flex flex-col gap-2 mt-16">
                <a href="#services" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white hover:bg-slate-800/50 transition text-lg font-medium py-3 px-4 rounded-xl">Services</a>
                <a href="#about" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white hover:bg-slate-800/50 transition text-lg font-medium py-3 px-4 rounded-xl">About</a>
                <a href="#gallery" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white hover:bg-slate-800/50 transition text-lg font-medium py-3 px-4 rounded-xl">Gallery</a>
                <a href="#contact" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white hover:bg-slate-800/50 transition text-lg font-medium py-3 px-4 rounded-xl">Contact</a>
                <a href="tel:${phoneClean}" class="gradient-btn text-white px-6 py-4 rounded-xl font-semibold text-center mt-4 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Call ${phone}
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-bg relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div class="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                    <div class="fade-up inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                        <span class="w-2 h-2 bg-green-500 rounded-full pulse-ring"></span>
                        <span class="text-blue-400 text-sm font-medium">${location}'s #1 Rated ${config.title} Experts</span>
                    </div>
                    
                    <h1 class="fade-up fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
                        <span class="gradient-text">${tagline}</span>
                    </h1>
                    
                    <p class="fade-up fade-up-delay-2 text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
                        Transform your property with ${location}'s most trusted ${config.title.toLowerCase()} experts. From small repairs to complete projects, we deliver excellence every time.
                    </p>
                    
                    <div class="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 mb-10">
                        <a href="${calendarUrl}" target="_blank" class="gradient-btn btn-ripple text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Book a Call
                        </a>
                        <a href="tel:${phoneClean}" class="bg-slate-800/80 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 backdrop-blur">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            ${phone}
                        </a>
                    </div>
                    
                    <div class="fade-up fade-up-delay-4 grid grid-cols-3 gap-4">
                        <div class="stat-card rounded-2xl p-4 text-center">
                            <div class="text-2xl md:text-3xl font-black gradient-text">15+</div>
                            <div class="text-slate-500 text-xs mt-1">Years Exp.</div>
                        </div>
                        <div class="stat-card rounded-2xl p-4 text-center">
                            <div class="text-2xl md:text-3xl font-black gradient-text">500+</div>
                            <div class="text-slate-500 text-xs mt-1">Projects</div>
                        </div>
                        <div class="stat-card rounded-2xl p-4 text-center">
                            <div class="text-2xl md:text-3xl font-black gradient-text">5.0</div>
                            <div class="text-slate-500 text-xs mt-1">Google ⭐</div>
                        </div>
                    </div>
                </div>
                
                <div class="relative float-animation">
                    <div class="relative rounded-3xl overflow-hidden glow shadow-2xl">
                        <img src="${config.heroImage}" alt="${config.title}" class="w-full h-[450px] lg:h-[520px] object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    </div>
                    
                    <!-- Floating Badge 1 -->
                    <div class="float-badge-1 absolute -bottom-5 -left-5 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="font-bold text-sm">Fully Licensed</div>
                                <div class="text-slate-500 text-xs">& Insured</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating Badge 2 -->
                    <div class="float-badge-2 absolute -top-5 -right-5 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
                        <div class="text-center">
                            <div class="flex justify-center gap-0.5 text-yellow-400 text-lg">★★★★★</div>
                            <div class="text-xs text-slate-400 mt-1">50+ Google Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-24 bg-slate-900/50">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 reveal">
                <span class="gradient-text font-bold text-sm uppercase tracking-widest">Our Services</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mt-4 mb-4">What We Offer</h2>
                <p class="text-slate-400 max-w-xl mx-auto text-lg">Professional ${config.title.toLowerCase()} solutions tailored to your needs. Quality workmanship on every project.</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${config.services.map((service, index) => `
                <div class="service-card rounded-2xl p-8 reveal" style="transition-delay: ${index * 0.1}s">
                    <div class="service-icon w-14 h-14 gradient-btn rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">${service.name}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">${service.description}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 bg-slate-950">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div class="relative reveal order-2 lg:order-1">
                    <div class="overflow-hidden rounded-3xl shadow-2xl">
                        <img src="${config.aboutImage}" alt="About ${companyName}" class="img-hover w-full h-auto">
                    </div>
                    <div class="absolute -bottom-6 -right-6 gradient-btn rounded-2xl p-6 text-center shadow-xl">
                        <div class="text-3xl font-black">15+</div>
                        <div class="text-sm text-blue-100">Years Experience</div>
                    </div>
                </div>
                
                <div class="reveal order-1 lg:order-2">
                    <span class="gradient-text font-bold text-sm uppercase tracking-widest">Why Choose Us</span>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mt-4 mb-6 leading-tight">${location}'s Most Trusted ${config.title} Experts</h2>
                    <p class="text-slate-400 mb-8 leading-relaxed text-lg">
                        ${aboutText}
                    </p>
                    
                    <div class="space-y-4">
                        ${['Fully Licensed & Insured', 'Free Quotes & Consultations', 'Quality Workmanship Guaranteed', `Local ${location} Business`].map((item, i) => `
                        <div class="flex items-center gap-4 bg-slate-900/50 rounded-xl p-4 border border-slate-800 hover:border-blue-500/40 transition-all hover:bg-slate-800/50 group cursor-default">
                            <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span class="text-slate-300 font-medium">${item}</span>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="py-24 bg-slate-900/50">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-16 reveal">
                <span class="gradient-text font-bold text-sm uppercase tracking-widest">Our Work</span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mt-4 mb-4">Recent Projects</h2>
                <p class="text-slate-400 max-w-xl mx-auto text-lg">See the quality of our workmanship across ${location}.</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${config.galleryImages.map((img, i) => `
                <div class="gallery-card rounded-2xl overflow-hidden cursor-pointer reveal border border-slate-800/50 hover:border-blue-500/30" onclick="openLightbox('${img.replace('w=400&h=300', 'w=1200&h=900')}')" style="transition-delay: ${i * 0.1}s">
                    <div class="relative overflow-hidden">
                        <img src="${img}" alt="Project ${i + 1}" class="w-full h-64 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 flex items-end p-6">
                            <div class="flex items-center gap-2 text-white font-medium">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                                </svg>
                                View Project
                            </div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
        <div class="absolute inset-0 gradient-btn"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        <div class="relative max-w-4xl mx-auto px-6 text-center reveal">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mb-6">${config.ctaText}</h2>
            <p class="text-blue-100 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                See how we can transform your online presence. Book a free demo call with our team today!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="${calendarUrl}" target="_blank" class="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Book a Free Demo
                </a>
                <a href="tel:${phoneClean}" class="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/30 hover:border-white/50 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Call ${phone}
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 bg-slate-950">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div class="reveal">
                    <span class="gradient-text font-bold text-sm uppercase tracking-widest">Get In Touch</span>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mt-4 mb-6">Contact Us Today</h2>
                    <p class="text-slate-400 mb-10 leading-relaxed text-lg">
                        Ready for a free quote? Have a question? We'd love to hear from you!
                    </p>
                    
                    <div class="space-y-5">
                        <a href="tel:${phoneClean}" class="contact-card flex items-center gap-4 bg-slate-900/80 rounded-xl p-5 border border-slate-800 group">
                            <div class="contact-icon w-14 h-14 gradient-btn rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="text-slate-500 text-sm">Call Us</div>
                                <div class="font-bold text-xl group-hover:text-blue-400 transition">${phone}</div>
                            </div>
                        </a>
                        
                        <div class="contact-card flex items-center gap-4 bg-slate-900/80 rounded-xl p-5 border border-slate-800">
                            <div class="contact-icon w-14 h-14 gradient-btn rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="text-slate-500 text-sm">Service Area</div>
                                <div class="font-bold text-lg">${location} & Surrounding</div>
                            </div>
                        </div>
                        
                        <div class="contact-card flex items-center gap-4 bg-slate-900/80 rounded-xl p-5 border border-slate-800">
                            <div class="contact-icon w-14 h-14 gradient-btn rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="text-slate-500 text-sm">Working Hours</div>
                                <div class="font-bold">Mon-Fri 7am-5pm | Sat 8am-2pm</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-3xl p-8 reveal shadow-2xl">
                    <h3 class="text-2xl font-bold mb-6">Request Your Free Quote</h3>
                    <form id="contact-form" class="space-y-5" onsubmit="handleFormSubmit(event)">
                        <div class="grid sm:grid-cols-2 gap-5">
                            <div>
                                <input type="text" id="name" placeholder="Your Name *" required class="form-input w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none">
                            </div>
                            <div>
                                <input type="tel" id="phone-input" placeholder="Phone Number *" required class="form-input w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none">
                            </div>
                        </div>
                        <div>
                            <input type="email" id="email" placeholder="Email Address *" required class="form-input w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none">
                        </div>
                        <div>
                            <select id="service" required class="form-input w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-slate-400 focus:outline-none">
                                <option value="">Select Service Needed *</option>
                                ${config.services.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <textarea id="message" rows="4" placeholder="Tell us about your project..." class="form-input w-full bg-slate-800/80 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none resize-none"></textarea>
                        </div>
                        <button type="submit" id="submit-btn" class="w-full gradient-btn btn-ripple text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                            <span id="btn-text">Get My Free Quote</span>
                            <svg id="btn-arrow" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                            <svg id="btn-spinner" class="w-5 h-5 animate-spin hidden" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                        </button>
                        <p class="text-center text-slate-500 text-sm">We respond within 24 hours. No spam ever.</p>
                    </form>
                    
                    <!-- Success Message -->
                    <div id="success-message" class="hidden text-center py-12">
                        <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h4 class="text-2xl font-bold text-green-400 mb-2">Message Sent!</h4>
                        <p class="text-slate-400">We'll get back to you within 24 hours.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900/80 border-t border-slate-800 py-12">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <a href="#" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 gradient-btn rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <span class="text-lg font-bold">${companyName}</span>
                </a>
                <div class="flex items-center gap-4 text-sm text-slate-500">
                    <span>© ${new Date().getFullYear()} ${companyName}</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="hidden sm:inline">${location}</span>
                    <span class="hidden sm:inline">•</span>
                    <a href="tel:${phoneClean}" class="hover:text-blue-400 transition">${phone}</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Lightbox -->
    <div id="lightbox" class="lightbox" onclick="closeLightbox()">
        <button class="absolute top-6 right-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition" onclick="closeLightbox()">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
        <img id="lightbox-img" src="" alt="Project" onclick="event.stopPropagation()">
    </div>

    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('menu-overlay');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');
            
            menu.classList.toggle('open');
            overlay.classList.toggle('open');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
        }
        
        // Lightbox
        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close lightbox on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
        
        // Form handling
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const btn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnArrow = document.getElementById('btn-arrow');
            const btnSpinner = document.getElementById('btn-spinner');
            const form = document.getElementById('contact-form');
            const success = document.getElementById('success-message');
            
            // Show loading
            btnText.textContent = 'Sending...';
            btnArrow.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                form.classList.add('hidden');
                success.classList.remove('hidden');
            }, 1500);
        }
        
        // Scroll reveal
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach((el, i) => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, i * 50);
                }
            });
        }
        
        window.addEventListener('scroll', reveal);
        window.addEventListener('load', reveal);
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });
        
        // ===== VIEW TRACKING =====
        (function() {
            const trackingId = '${trackingId || slug}';
            const trackingEndpoint = 'https://demo-site-generator-sepia.vercel.app/api/track';
            
            // Track page view
            async function trackView() {
                try {
                    const data = {
                        id: trackingId,
                        event: 'view',
                        timestamp: new Date().toISOString(),
                        userAgent: navigator.userAgent,
                        referrer: document.referrer || 'direct',
                        screen: window.screen.width + 'x' + window.screen.height,
                        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
                    };
                    
                    // Send to tracking endpoint
                    fetch(trackingEndpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                        mode: 'cors'
                    }).catch(() => {});
                    
                    console.log('📊 View tracked:', trackingId);
                } catch (e) {
                    console.log('Tracking skipped');
                }
            }
            
            // Track on load
            if (document.readyState === 'complete') {
                trackView();
            } else {
                window.addEventListener('load', trackView);
            }
            
            // Track CTA clicks
            document.querySelectorAll('a[href*="leadconnectorhq"], a[href^="tel:"]').forEach(link => {
                link.addEventListener('click', function() {
                    const clickData = {
                        id: trackingId,
                        event: link.href.includes('leadconnectorhq') ? 'book_call_click' : 'phone_click',
                        timestamp: new Date().toISOString()
                    };
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon(trackingEndpoint, JSON.stringify(clickData));
                    }
                });
            });
        })();
    </script>

</body>
</html>`
}

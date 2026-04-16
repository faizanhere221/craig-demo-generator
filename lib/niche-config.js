// Niche-specific content templates
export const nicheConfig = {
  roofer: {
    title: "Roofing",
    titlePlural: "Roofing Services",
    primaryColor: "#d2ac33",
    primaryDark: "#b8942d",
    accentColor: "#d2ac33",
    services: [
      { title: "Roof Repairs", icon: "🔧", description: "Fast and reliable roof repairs for leaks, storm damage, and general wear. We fix all roof types quickly and efficiently." },
      { title: "New Roof Installation", icon: "🏠", description: "Complete roof installations for new builds and replacements. Quality materials and expert craftsmanship guaranteed." },
      { title: "Metal Roofing", icon: "🏗️", description: "Durable Colorbond and metal roofing solutions. Long-lasting protection with modern aesthetics for your home." },
      { title: "Roof Restoration", icon: "✨", description: "Breathe new life into tired roofs. Cleaning, repainting and sealing services to extend your roof's lifespan." },
      { title: "Guttering", icon: "💧", description: "New gutters, repairs and cleaning. Keep water away from your foundation with properly functioning gutters." },
      { title: "Roof Inspections", icon: "🔍", description: "Comprehensive inspections and reports. Identify issues before they become costly problems." }
    ],
    heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&h=600&fit=crop",
    ctaText: "Ready to Fix Your Roof?"
  },

  painter: {
    title: "Painting",
    titlePlural: "Painting Services",
    primaryColor: "#3b82f6",
    primaryDark: "#1e3a5f",
    accentColor: "#3b82f6",
    services: [
      { title: "Interior Painting", icon: "🏠", description: "Transform your living spaces with professional interior painting. Clean lines, perfect finishes, every time." },
      { title: "Exterior Painting", icon: "🏡", description: "Protect and beautify your home's exterior. Weather-resistant paints that last for years." },
      { title: "Commercial Painting", icon: "🏢", description: "Professional painting for offices, retail spaces, and commercial properties. Minimal disruption guaranteed." },
      { title: "Cabinet Refinishing", icon: "🪵", description: "Give your kitchen a fresh look without full renovation. Expert cabinet painting and refinishing." },
      { title: "Deck & Fence Staining", icon: "🌲", description: "Protect your outdoor timber with quality stains and finishes. Extend the life of your deck and fences." },
      { title: "Colour Consultation", icon: "🎨", description: "Not sure what colours to choose? Our team can help you select the perfect palette for your space." }
    ],
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop",
    ctaText: "Ready to Transform Your Space?"
  },

  builder: {
    title: "Building",
    titlePlural: "Building & Construction",
    primaryColor: "#f97316",
    primaryDark: "#ea580c",
    accentColor: "#f97316",
    services: [
      { title: "New Home Construction", icon: "🏠", description: "Build your dream home from the ground up. Custom designs tailored to your lifestyle and budget." },
      { title: "Home Extensions", icon: "📐", description: "Expand your living space with seamless extensions. Add bedrooms, living areas, or second stories." },
      { title: "Granny Flats", icon: "🏡", description: "Quality granny flat construction for extra income or family accommodation. Fully compliant builds." },
      { title: "Commercial Construction", icon: "🏢", description: "Professional construction for commercial projects. Offices, retail, and industrial buildings." },
      { title: "Structural Work", icon: "🔨", description: "Expert structural modifications and repairs. Load-bearing walls, foundations, and more." },
      { title: "Project Management", icon: "📋", description: "Full project management from concept to completion. We handle permits, trades, and timelines." }
    ],
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ctaText: "Ready to Start Your Project?"
  },

  renovations: {
    title: "Renovation",
    titlePlural: "Renovation Services",
    primaryColor: "#C0522B",
    primaryDark: "#a04520",
    accentColor: "#C0522B",
    services: [
      { title: "Kitchen Renovations", icon: "🍳", description: "Create your dream kitchen with custom cabinetry, modern appliances, and stunning finishes." },
      { title: "Bathroom Renovations", icon: "🚿", description: "Transform your bathroom into a luxurious retreat. Modern fixtures and quality tiling." },
      { title: "Full Home Renovations", icon: "🏠", description: "Complete home transformations from dated to modern. Comprehensive renovation services." },
      { title: "Laundry Renovations", icon: "🧺", description: "Functional and stylish laundry spaces. Maximize storage and efficiency." },
      { title: "Living Area Updates", icon: "🛋️", description: "Modernize your living spaces with open plan designs, new flooring, and fresh finishes." },
      { title: "Heritage Restorations", icon: "🏛️", description: "Sensitive restoration of heritage properties. Preserve character while adding modern comforts." }
    ],
    heroImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    ctaText: "Ready to Renovate?"
  },

  landscaper: {
    title: "Landscaping",
    titlePlural: "Landscaping Services",
    primaryColor: "#2d5a27",
    primaryDark: "#1e4a1e",
    accentColor: "#4ade80",
    services: [
      { title: "Garden Design", icon: "🌿", description: "Custom garden designs that complement your home. From concept to completion." },
      { title: "Lawn Installation", icon: "🌱", description: "Beautiful lawns with instant turf or seed. Irrigation systems and ongoing maintenance." },
      { title: "Paving & Pathways", icon: "🧱", description: "Quality paving for driveways, patios, and pathways. Durable and beautiful finishes." },
      { title: "Retaining Walls", icon: "🪨", description: "Structural and decorative retaining walls. Solve drainage issues while adding visual appeal." },
      { title: "Outdoor Living Spaces", icon: "🏡", description: "Create your perfect outdoor entertaining area. Decks, pergolas, and outdoor kitchens." },
      { title: "Garden Maintenance", icon: "✂️", description: "Regular garden maintenance to keep your outdoor spaces looking pristine year-round." }
    ],
    heroImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop",
    ctaText: "Ready to Transform Your Outdoors?"
  }
}

export function getNicheConfig(niche) {
  // Handle both 'renovation' and 'renovations' 
  const normalizedNiche = niche === 'renovation' ? 'renovations' : niche
  return nicheConfig[normalizedNiche] || nicheConfig.builder
}
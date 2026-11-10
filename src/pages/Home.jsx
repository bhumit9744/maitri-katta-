import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { GOOGLE_REVIEWS_DATA } from '../data/googleReviews';
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Plus,
  Check,
  Sparkles,
  Soup,
  Trees,
  Users,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import './Home.css';

// Minimal Inline Google Multi-color Icon
function GoogleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Authentic Maitri Katta Photography for Hero Slideshow
const HERO_SLIDES = [
  {
    src: '/assets/hero-maitri-facade.webp',
    alt: 'Maitri Katta Restaurant illuminated warm facade and main entrance signboard',
    title: 'Illuminated Facade & Entrance Gate',
    location: 'Ambernath East',
  },
  {
    src: '/assets/maitri-pergola-night.webp',
    alt: 'Maitri Katta outdoor dining under warm glowing bamboo lanterns and wooden pergolas',
    title: 'Lantern Pergolas & Night Garden',
    location: 'Open-Air Seating',
  },
  {
    src: '/assets/maitri-garden-pavilion.webp',
    alt: 'Maitri Katta garden pavilion with starlit dinner tables and greenery',
    title: 'Garden Pavilion & Lush Palms',
    location: 'Family Dining Lawn',
  },
  {
    src: '/assets/maitri-garden-lounge-opt.webp',
    alt: 'Evening garden lounge with cozy cushioned seating and fairy lights',
    title: 'Evening Garden Lounge',
    location: 'Fairy-Lit Ambiance',
  },
  {
    src: '/assets/maitri-table-feast.webp',
    alt: 'Family and friends enjoying evening dinner feast at Maitri Katta',
    title: 'Starlit Feasts & Gatherings',
    location: 'Celebration Kattas',
  },
];

// Curated Blockbuster Signature Dishes for Interactive Slideshow
const SIGNATURE_DISHES_SLIDES = [
  {
    id: 'agri-mutton-lapeta',
    name: 'Mutton Lapeta (Agri Special)',
    category: 'Agri Heritage',
    price: 750,
    isVeg: false,
    tag: 'Agri Signature Heritage',
    badge: 'Chef’s Masterpiece',
    description: 'Slow-simmered tender goat mutton coated in dark stone-ground Agri masala, roasted dry coconut, and black peppercorn.',
    image: '/assets/mutton-lapeta.webp',
    features: ['Stone-Ground Spices', 'Slow Clay Embers', 'Rich Dark Gravy'],
  },
  {
    id: 'chicken-dum-biryani',
    name: 'Chicken Dum Biryani (Handi)',
    category: 'Dum Pukht Biryani',
    price: 380,
    isVeg: false,
    tag: 'Dum Pukht Legend',
    badge: 'Guest Favourite',
    description: 'Fragrant long-grain basmati rice layered with succulent chicken, Kashmiri saffron, fried golden onions, and fresh mint sealed on charcoal dum.',
    image: '/assets/dishes/mutton-dum-biryani.webp',
    features: ['Aromatic Saffron Dum', 'Tender Chicken', 'Served with Raita'],
  },
  {
    id: 'tandoori-kebab-skewers',
    name: 'Charcoal Tandoori Kebab Skewers',
    category: 'Clay Tandoor',
    price: 399,
    isVeg: false,
    tag: 'Clay Tandoor Roast',
    badge: 'Live Grill Sizzle',
    description: 'Char-grilled skewers of tender chicken tikka and spiced seekh kebabs roasted fresh over smoking charcoal embers with lemon and chaat masala.',
    image: '/assets/IMG-20250504-WA0004.webp',
    features: ['Smoking Charcoal Grill', 'Hung Curd Marinade', 'Mint Chutney Dip'],
  },
  {
    id: 'chicken-lollipop',
    name: 'Chicken Lollipop (Crispy)',
    category: 'Starters',
    price: 290,
    isVeg: false,
    tag: 'Crispy Starter',
    badge: 'House Special',
    description: 'Crispy fried chicken wings frenched and tossed in spicy house Schezwan glaze with crunchy golden garlic and fresh green chillies.',
    image: '/assets/Indulge_in_the_crispy,_tender_.webp',
    features: ['Signature Crunch', 'House Schezwan Dip', 'Crowd Favourite'],
  },
  {
    id: 'dragon-chicken',
    name: 'Dragon Chicken (Crispy Wok)',
    category: 'Chinese Wok',
    price: 290,
    isVeg: false,
    tag: 'Indo-Chinese Blockbuster',
    badge: 'Spicy & Tangy',
    description: 'Fiery wok-tossed crispy chicken tenders tossed with whole dry red chillies, crunchy toasted cashew nuts, and fresh scallions in dark glaze.',
    image: '/assets/dragon-chicken.webp',
    features: ['Wok-Hei Char', 'Toasted Cashew Crunch', 'Fiery Dark Glaze'],
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken & Garlic Naan',
    category: 'Curries & Gravies',
    price: 420,
    isVeg: false,
    tag: 'Mughlai Royalty',
    badge: 'Creamy Classic',
    description: 'Tender tandoori chicken simmered in velvety tomato-cashew makhani gravy enriched with fresh butter and cream, paired with hot garlic naan.',
    image: '/assets/dishes/butter-chicken.webp',
    features: ['Velvety Makhani Gravy', 'Fresh Cream & Butter', 'Tandoori Garlic Naan'],
  },
  {
    id: 'paneer-tikka-angara',
    name: 'Paneer Tikka Angara',
    category: 'Vegetarian Pride',
    price: 320,
    isVeg: true,
    tag: 'Charcoal Vegetarian Pride',
    badge: '100% Pure Veg',
    description: 'Large cubes of fresh cottage cheese marinated in spiced curd, mustard oil, and ground spices, roasted to smoky perfection over open charcoal.',
    image: '/assets/dishes/paneer-tandoor-special.webp',
    features: ['Fresh Malai Paneer', 'Smoky Charcoal Char', 'Crunchy Bell Peppers'],
  },
  {
    id: 'ghavan-solkadhi-thali',
    name: 'Traditional Ghavan & Solkadhi Thali',
    category: 'Konkan Heritage',
    price: 180,
    isVeg: true,
    tag: 'Agri Konkan Heritage',
    badge: 'Authentic Traditional',
    description: 'Lacy, feather-light traditional rice crepes served with authentic cooling pink kokum-coconut milk Solkadhi and homestyle fresh chutney.',
    image: '/assets/IMG-20250212-WA0027.webp',
    features: ['Lacy Rice Crepes', 'Fresh Coconut Solkadhi', 'Grandma’s Recipe'],
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDishSlide, setCurrentDishSlide] = useState(0);
  const [isDishPaused, setIsDishPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Automatic hero slideshow transition every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Automatic signature dishes slideshow transition every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isDishPaused) return;
    const timer = setInterval(() => {
      setCurrentDishSlide((prev) => (prev + 1) % SIGNATURE_DISHES_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isDishPaused]);

  const handleAddDish = (dish) => {
    addToCart(dish);
    setAddedItem(dish.id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  const handleDishTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleDishTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // swipe left -> next slide
      setCurrentDishSlide((prev) => (prev + 1) % SIGNATURE_DISHES_SLIDES.length);
    } else if (diff < -50) {
      // swipe right -> prev slide
      setCurrentDishSlide(
        (prev) => (prev - 1 + SIGNATURE_DISHES_SLIDES.length) % SIGNATURE_DISHES_SLIDES.length
      );
    }
    setTouchStart(null);
  };

  const currentDish = SIGNATURE_DISHES_SLIDES[currentDishSlide];

  return (
    <div className="home-fluid-page">
      {/* =========================================================================
          SECTION 01 — HERO (Full-width, Immersive Video & Illuminated Facade)
          ========================================================================= */}
      <section className="hero-fluid-section" aria-label="Welcome to Maitri Katta">
        {/* Full-width edge-to-edge photo slideshow of authentic Maitri Katta restaurant */}
        <div className="hero-media-backdrop" aria-label="Restaurant photo slideshow">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.src}
              className={`hero-slide-item ${idx === currentSlide ? 'is-active-slide' : ''}`}
              aria-hidden={idx !== currentSlide}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="hero-slide-image"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                width="1920"
                height="1080"
              />
            </div>
          ))}
          {/* Subtle cinematic gradient overlay for high contrast text readability */}
          <div className="hero-cinematic-scrim" />
        </div>

        {/* Foreground Content */}
        <div className="container-custom hero-fluid-inner">
          <div className="hero-text-block">
            <span className="hero-eyebrow">
              AMBERNATH'S FAVOURITE FOOD DESTINATION
            </span>

            <h1 className="hero-giant-headline">
              <span className="headline-part-red">KHANA BHI.</span>
              <span className="headline-part-yellow">KAHANI BHI.</span>
            </h1>

            <p className="hero-lead-copy">
              Where every meal becomes a memory.
            </p>

            {/* Two Primary Actions */}
            <div className="hero-actions-group">
              <Link to="/menu" className="btn-hero-primary">
                <span>Explore Menu</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-glass"
              >
                <MessageCircle size={18} className="wa-icon-green" />
                <span>WhatsApp Ordering</span>
              </a>
            </div>

            {/* Bottom 3-Feature Strip */}
            <div className="hero-features-bar">
              <div className="feature-pill">
                <Soup size={18} className="feature-glyph" />
                <span>Indian & Chinese Cuisine</span>
              </div>
              <div className="feature-pill">
                <Trees size={18} className="feature-glyph" />
                <span>Family Friendly Garden Seating</span>
              </div>
              <div className="feature-pill">
                <Users size={18} className="feature-glyph" />
                <span>Perfect for Every Occasion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Slideshow Controls & Photo Label */}
        <div className="hero-slideshow-dock" aria-label="Hero photo navigation">
          <div className="hero-slide-meta">
            <span className="slide-counter">0{currentSlide + 1} / 0{HERO_SLIDES.length}</span>
            <span className="slide-meta-sep">•</span>
            <span className="slide-meta-title">{HERO_SLIDES[currentSlide].title}</span>
          </div>

          <div className="hero-slideshow-nav">
            <button
              type="button"
              className="btn-slide-nav-arrow"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="hero-slide-indicators">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`slide-indicator-dash ${idx === currentSlide ? 'is-active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to photo ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="btn-slide-nav-arrow"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="Next Photo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — SIGNATURE DISHES SLIDESHOW
          Interactive Cinematic Carousel of Maitri Katta's Blockbuster Stars
          ========================================================================= */}
      <section
        className="food-editorial-section dishes-slideshow-section"
        aria-label="Signature Dishes Slideshow"
        onMouseEnter={() => setIsDishPaused(true)}
        onMouseLeave={() => setIsDishPaused(false)}
      >
        <div className="container-custom">
          {/* Section Heading & Slide Navigation Controls */}
          <div className="food-editorial-header dishes-slideshow-header">
            <div className="header-text-group">
              <span className="editorial-kicker">KITCHEN SPECIALITIES</span>
              <h2 className="food-display-title">THE REAL STARS OF OUR MENU.</h2>
              <p className="food-display-subtitle">
                Good food needs no introduction. Swipe or slide through our chef’s signature creations.
              </p>
            </div>

            {/* Slideshow Top Controls (Counter & Arrows) */}
            <div className="dishes-slide-controls-dock" aria-label="Signature dishes controls">
              <div className="dishes-slide-counter">
                <span className="counter-current">0{currentDishSlide + 1}</span>
                <span className="counter-slash">/</span>
                <span className="counter-total">0{SIGNATURE_DISHES_SLIDES.length}</span>
              </div>

              <div className="dishes-nav-buttons">
                <button
                  type="button"
                  className="btn-dish-nav-arrow"
                  onClick={() =>
                    setCurrentDishSlide(
                      (prev) => (prev - 1 + SIGNATURE_DISHES_SLIDES.length) % SIGNATURE_DISHES_SLIDES.length
                    )
                  }
                  aria-label="Previous signature dish"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="btn-dish-nav-arrow"
                  onClick={() =>
                    setCurrentDishSlide((prev) => (prev + 1) % SIGNATURE_DISHES_SLIDES.length)
                  }
                  aria-label="Next signature dish"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Featured Slide Stage */}
          <div
            className="signature-dish-slide-stage"
            onTouchStart={handleDishTouchStart}
            onTouchEnd={handleDishTouchEnd}
          >
            {/* Left: Large Dish Photo with Badges & Floating Navigation */}
            <div className="slide-photo-column">
              <div className="slide-photo-wrapper">
                <img
                  key={currentDish.id}
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="slide-hero-photo"
                />
                <span className="slide-hero-tag">{currentDish.tag}</span>
                {currentDish.badge && (
                  <span className="slide-hero-badge">{currentDish.badge}</span>
                )}

                {/* Over-image floating slide arrows */}
                <button
                  type="button"
                  className="floating-slide-arrow arrow-left"
                  onClick={() =>
                    setCurrentDishSlide(
                      (prev) => (prev - 1 + SIGNATURE_DISHES_SLIDES.length) % SIGNATURE_DISHES_SLIDES.length
                    )
                  }
                  aria-label="Previous dish photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="floating-slide-arrow arrow-right"
                  onClick={() =>
                    setCurrentDishSlide((prev) => (prev + 1) % SIGNATURE_DISHES_SLIDES.length)
                  }
                  aria-label="Next dish photo"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>

            {/* Right: Rich Editorial Content & Add-to-Order */}
            <div className="slide-details-column">
              <div className="slide-details-meta">
                <div className="slide-diet-tag-row">
                  <span
                    className={`diet-symbol-box ${currentDish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                    title={currentDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  />
                  <span className="slide-category-kicker">{currentDish.category}</span>
                </div>

                <div className="slide-title-price-row">
                  <h3 className="slide-dish-title">{currentDish.name}</h3>
                  <span className="slide-dish-price">₹{currentDish.price}</span>
                </div>

                <p className="slide-dish-desc">{currentDish.description}</p>

                {/* Flavor & Prep Highlights */}
                {currentDish.features && (
                  <div className="slide-features-pills">
                    {currentDish.features.map((feat, i) => (
                      <span key={i} className="feature-highlight-pill">
                        <Sparkles size={13} className="feature-sparkle-glyph" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="slide-actions-row">
                <button
                  type="button"
                  className={`btn-slide-add-order ${addedItem === currentDish.id ? 'is-added' : ''}`}
                  onClick={() => handleAddDish(currentDish)}
                >
                  {addedItem === currentDish.id ? (
                    <>
                      <Check size={18} />
                      <span>ADDED TO ORDER</span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>ADD TO ORDER • ₹{currentDish.price}</span>
                    </>
                  )}
                </button>

                <Link to="/menu" className="btn-slide-explore-menu">
                  <span>EXPLORE IN MENU</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Slide Progress Indicator Dots */}
              <div className="slide-dots-indicator-row" aria-label="Select signature dish">
                {SIGNATURE_DISHES_SLIDES.map((dish, idx) => (
                  <button
                    key={dish.id}
                    type="button"
                    className={`slide-dot-pill ${idx === currentDishSlide ? 'is-active-dot' : ''}`}
                    onClick={() => setCurrentDishSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${dish.name}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Signature Dishes Thumbnail Tray */}
          <div className="dishes-thumbnail-tray-container" aria-label="All signature dishes">
            <div className="thumbnail-tray-header">
              <span className="tray-label">EXPLORE ALL {SIGNATURE_DISHES_SLIDES.length} SIGNATURE CREATIONS</span>
              <span className="tray-hint">Click any dish to preview details</span>
            </div>

            <div className="dishes-thumbnail-strip">
              {SIGNATURE_DISHES_SLIDES.map((dish, idx) => (
                <button
                  key={dish.id}
                  type="button"
                  className={`dish-thumb-card ${idx === currentDishSlide ? 'is-active-thumb' : ''}`}
                  onClick={() => setCurrentDishSlide(idx)}
                  aria-label={`View ${dish.name}`}
                >
                  <div className="thumb-card-img-wrap">
                    <img src={dish.image} alt={dish.name} className="thumb-card-img" loading="lazy" width="80" height="80" />
                    {idx === currentDishSlide && (
                      <span className="thumb-active-pill">NOW SHOWING</span>
                    )}
                  </div>
                  <div className="thumb-card-meta">
                    <span className="thumb-card-name">{dish.name}</span>
                    <span className="thumb-card-price">₹{dish.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom View Complete Menu Button */}
          <div className="dishes-slideshow-bottom-cta">
            <Link to="/menu" className="btn-bottom-full-menu">
              <span>VIEW COMPLETE 67+ DISHES MENU</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — RESTAURANT EXPERIENCE (Open Asymmetrical Composition)
          ========================================================================= */}
      <section className="experience-fluid-section" aria-label="Restaurant Atmosphere">
        <div className="container-custom">
          <div className="experience-header-block">
            <span className="experience-eyebrow">OPEN-AIR AMBIENCE</span>
            <h2 className="experience-display-title">GOOD FOOD. BETTER COMPANY.</h2>
            <p className="experience-short-copy">
              A breezy garden escape. Warm lantern-lit pergolas, open starlit lawns, and joyful family celebrations under Ambernath skies.
            </p>
          </div>

          {/* Open Asymmetrical Photographic Layout (No Boxed Cards!) */}
          <div className="experience-asymmetrical-spread">
            {/* Commanding Panoramic Feature */}
            <div className="experience-panoramic-pane">
              <img
                src="/assets/Have-some-time.webp"
                alt="Evening Garden Lounge at Maitri Katta at night with fairy lights and projector screen"
                className="panoramic-photo"
                loading="lazy"
                width="1200"
                height="600"
              />
              <div className="photo-open-caption">
                <span className="caption-bold">EVENING GARDEN LOUNGE</span>
                <span className="caption-muted">Fairy lights, plush seating & open skies for conversations that last past midnight</span>
              </div>
            </div>

            {/* Triplet of Supporting Authentic Gatherings */}
            <div className="experience-triplet-row">
              <div className="triplet-photo-item">
                <img
                  src="/assets/maitri-pergola-night.webp"
                  alt="Illuminated wooden dining pergola at Maitri Katta"
                  className="triplet-photo"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <span className="triplet-label">LANTERN PERGOLAS</span>
              </div>

              <div className="triplet-photo-item">
                <img
                  src="/assets/Celebrate_your_birthday_at_Mai.webp"
                  alt="Family birthday celebration at Maitri Katta"
                  className="triplet-photo"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <span className="triplet-label">FAMILY CELEBRATIONS</span>
              </div>

              <div className="triplet-photo-item">
                <img
                  src="/assets/thumb-interactive-1.webp"
                  alt="Festive entrance gateway at Maitri Katta"
                  className="triplet-photo"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <span className="triplet-label">THE WELCOME GATE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — BRAND STORY (A KATTA FULL OF MEMORIES)
          Vibrant Yellow Canvas, Authentic Narrative, Mudra Hand & Maitri Promise
          ========================================================================= */}
      <section className="brand-story-fluid-section" aria-label="Brand Story">
        {/* Curved Film Strip Top Banner */}
        <div className="brand-film-strip-banner">
          <img
            src="/assets/curved-film-strip-banner.webp"
            alt="Dynamic film strip celebrating food and community moments"
            className="film-banner-image"
            loading="lazy"
            width="1440"
            height="320"
          />
        </div>

        <div className="container-custom story-fluid-content">
          <div className="story-editorial-split">
            {/* Left Narrative Column */}
            <div className="story-narrative-block">
              <span className="story-eyebrow">OUR HERITAGE</span>
              <h2 className="story-giant-headline">A KATTA FULL OF MEMORIES.</h2>

              <div className="story-prose-paragraphs">
                <p>
                  Food brings people together. But what happens when those friends who never show up actually arrive? That's not the time for panic. It's the time for <strong>Maitri Katta</strong>. You plan for eight, but twelve show up. Your cousin brings his new family. Suddenly you're mentally calculating rice portions.
                </p>
                <p>
                  Here's the thing: food in India is how we celebrate, comfort, and say <em>"you matter."</em> Whether it's lunch for fifteen or a family feast for fifty, it needs to be right. Hot curries that steam. Biryani that doesn't clump. Slow-simmered Agri curries that taste like home.
                </p>
                <p>
                  At Maitri Katta, we have one setting: <strong>flawless warmth</strong>. Your dinner for two gets the same love and care as a grand celebration. No exceptions. Festivals, birthdays, weekend kattas, Sunday lunches. Whatever the occasion, whatever the headcount.
                </p>
                <p className="story-signoff-line">
                  Just Maitri it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Mudra Hand Illustration — Anchored Flush to Very Right Corner of the Page */}
        <div className="story-mudra-corner-wrapper">
          <div className="mudra-graphic-container">
            <div className="falling-spice-dots" aria-hidden="true">
              <span className="dot dot-a">•</span>
              <span className="dot dot-b">★</span>
              <span className="dot dot-c">✦</span>
              <span className="dot dot-d">m</span>
              <span className="dot dot-e">s</span>
            </div>
            <img
              src="/assets/brand-story-mudra-hand-transparent.png"
              alt="Pop-art illustrated Indian hand with alta and bangles in spice pinch mudra gesture"
              className="mudra-hand-graphic"
              width="580"
              height="620"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05.5 — GOOGLE REVIEWS SHOWCASE (4.1 ★ • 5,500+ VERIFIED RATINGS)
          ========================================================================= */}
      <section className="google-reviews-section" aria-label="Google Customer Reviews">
        <div className="container-custom">
          {/* Header */}
          <div className="google-reviews-header">
            <div className="google-badge-pill">
              <GoogleIcon size={20} />
              <span className="google-badge-title">GOOGLE REVIEWS</span>
              <span className="google-badge-dot">•</span>
              <span className="google-rating-score">4.1</span>
              <div className="stars-mini-row" aria-label="4.1 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="star-filled" fill="#FFC900" />
                ))}
              </div>
              <span className="google-reviews-count">({GOOGLE_REVIEWS_DATA.totalReviewsCount} verified ratings)</span>
            </div>

            <h2 className="reviews-display-title">
              ASLI SWAD. ASLI TAREEF.
            </h2>
            <p className="reviews-display-subtitle">
              Real stories and honest words from families, celebration hosts, and evening katta regulars in Ambernath.
            </p>

            {/* Quick Metrics Breakdown */}
            <div className="reviews-category-metrics">
              <div className="metric-pill">
                <span className="metric-label">Garden Ambience</span>
                <span className="metric-val">4.6 ★</span>
              </div>
              <div className="metric-pill">
                <span className="metric-label">Food & Flavour</span>
                <span className="metric-val">4.3 ★</span>
              </div>
              <div className="metric-pill">
                <span className="metric-label">Value for Money</span>
                <span className="metric-val">4.2 ★</span>
              </div>
              <div className="metric-pill">
                <span className="metric-label">Hospitality</span>
                <span className="metric-val">4.0 ★</span>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="reviews-cards-grid">
            {(showAllReviews ? GOOGLE_REVIEWS_DATA.reviews : GOOGLE_REVIEWS_DATA.reviews.slice(0, 6)).map((rev) => (
              <article key={rev.id} className="google-review-card">
                <div className="review-card-top">
                  <div className="reviewer-avatar">
                    {rev.avatarImg ? (
                      <img
                        src={rev.avatarImg}
                        alt={rev.author}
                        className="avatar-img-circle"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <span>{rev.author.charAt(0)}</span>
                  </div>
                  <div className="reviewer-info">
                    <div className="reviewer-name-row">
                      <h3 className="reviewer-name">{rev.author}</h3>
                      {rev.verified && (
                        <span className="verified-check" title="Verified Reviewer">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <span className="reviewer-meta">
                      {rev.authorType} • {rev.reviewsCount}
                    </span>
                  </div>
                  <div className="google-source-icon" title="Verified Google Review">
                    <GoogleIcon size={18} />
                  </div>
                </div>

                <div className="review-rating-row">
                  <div className="card-stars-row">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="star-filled" fill="#FFC900" />
                    ))}
                  </div>
                  <span className="review-date-str">{rev.date}</span>
                </div>

                <p className="review-card-text">“{rev.text}”</p>

                {rev.favoriteDishes && rev.favoriteDishes.length > 0 && (
                  <div className="review-dishes-tags">
                    <span className="dishes-tag-label">Favorites:</span>
                    {rev.favoriteDishes.map((dishName) => (
                      <span key={dishName} className="dish-pill-tag">
                        {dishName}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Expand / Collapse All Reviews */}
          {GOOGLE_REVIEWS_DATA.reviews.length > 6 && (
            <div className="reviews-expand-row">
              <button
                type="button"
                className="btn-expand-reviews"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? (
                  <span>SHOW LESS REVIEWS ↑</span>
                ) : (
                  <span>SHOW ALL {GOOGLE_REVIEWS_DATA.reviews.length} VERIFIED REVIEWS ({GOOGLE_REVIEWS_DATA.reviews.length - 6} MORE) ↓</span>
                )}
              </button>
            </div>
          )}

          {/* Direct CTA Bar */}
          <div className="reviews-cta-bar">
            <a
              href={GOOGLE_REVIEWS_DATA.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-google-read-all"
            >
              <GoogleIcon size={18} />
              <span>READ ALL {GOOGLE_REVIEWS_DATA.totalReviewsCount} GOOGLE REVIEWS</span>
              <ArrowRight size={16} />
            </a>

            <a
              href={GOOGLE_REVIEWS_DATA.googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-google-write-review"
            >
              <span>WRITE A REVIEW ON GOOGLE ✍️</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — LOCATION & CONTACT (Open, Highly Readable Layout)
          ========================================================================= */}
      <section className="location-fluid-section" aria-label="Location and Hours">
        <div className="container-custom">
          <div className="location-split-layout">
            {/* Info Column */}
            <div className="location-text-details">
              <span className="location-kicker">VISIT US TODAY</span>
              <h2 className="location-main-title">
                YOUR NEXT STOP?<br />MAITRI KATTA.
              </h2>

              <div className="location-details-list">
                <div className="location-item">
                  <MapPin size={22} className="loc-icon" />
                  <div>
                    <h3 className="loc-label">Address</h3>
                    <p className="loc-address">
                      Pawar Section, Near Panvelkar Green City, Navare Nagar, Ambernath Badlapur Road, Chikhaloli, Ambernath East, Maharashtra 421501.
                    </p>
                  </div>
                </div>

                <div className="location-item">
                  <Clock size={22} className="loc-icon" />
                  <div>
                    <h3 className="loc-label">Opening Hours</h3>
                    <p className="loc-hours-bold">12 PM–12 AM daily</p>
                    <span className="loc-hours-sub">Open all 7 days for lunch, family feasts & dinner</span>
                  </div>
                </div>

                <div className="location-item">
                  <Phone size={22} className="loc-icon" />
                  <div>
                    <h3 className="loc-label">Direct Phone</h3>
                    <p>
                      <a href={`tel:${RESTAURANT_INFO.whatsappNumber}`} className="loc-phone-link">
                        +91 95610 19972
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="location-action-pills">
                <a href={`tel:${RESTAURANT_INFO.whatsappNumber}`} className="action-pill pill-dark">
                  <Phone size={16} />
                  <span>CALL US</span>
                </a>

                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-pill pill-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>WHATSAPP</span>
                </a>

                <a
                  href={RESTAURANT_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-pill pill-yellow"
                >
                  <MapPin size={16} />
                  <span>GET DIRECTIONS</span>
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="location-map-wrapper">
              <iframe
                title="Maitri Katta Family Garden Restaurant Map"
                src={RESTAURANT_INFO.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="location-iframe"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

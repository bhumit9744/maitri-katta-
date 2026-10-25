import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import './FromTheKitchen.css';

// Verified dish data from the visual reference & restaurant offerings
const DISHES_DATA = [
  {
    id: 'chicken-kebab',
    name: 'Chicken Kebab',
    description: 'Juicy, tender and loved by our guests.',
    price: '₹320',
    categories: ['All', 'Indian'],
    image: '/assets/chicken-kebab.png',
    alt: 'Direct top-down overhead view of grilled Chicken Kebab skewers with mint chutney and fresh onion rings',
    annotation: {
      text: 'Customer Favourite',
      position: 'right',
      svg: (
        <svg className="annotation-curve curve-right" viewBox="0 0 100 48" fill="none" aria-hidden="true">
          <path d="M 12 10 C 45 4, 75 16, 88 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 83 34 L 88 40 L 92 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
  {
    id: 'prawns-tawa-fry',
    name: 'Prawns Tawa Fry',
    description: 'Spicy, flavourful and a clear favourite among our guests.',
    price: '₹420',
    categories: ['All', 'Seafood', 'Indian'],
    image: '/assets/prawns-tawa-fry.png',
    alt: 'Direct top-down overhead view of spicy Prawns Tawa Fry sizzling in a round cast iron skillet with lemon wedges',
    annotation: {
      text: 'Spicy & Flavourful',
      position: 'left',
      svg: (
        <svg className="annotation-curve curve-left" viewBox="0 0 110 48" fill="none" aria-hidden="true">
          <path d="M 96 10 C 65 4, 35 16, 20 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 26 34 L 20 40 L 16 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
  {
    id: 'mutton-lapeta',
    name: 'Mutton Lapeta',
    description: 'Traditional Agri-style preparation, best enjoyed with soft ghavna.',
    price: '₹380',
    categories: ['All', 'Indian'],
    image: '/assets/mutton-lapeta.png',
    alt: 'Direct top-down overhead view of authentic Agri-style Mutton Lapeta in a hammered copper handi with brass handles',
    annotation: {
      text: 'Must Try',
      position: 'right',
      svg: (
        <svg className="annotation-curve curve-right" viewBox="0 0 90 48" fill="none" aria-hidden="true">
          <path d="M 10 10 C 40 6, 68 18, 78 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 72 34 L 78 40 L 83 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
  {
    id: 'veg-biryani',
    name: 'Khudar Special Veg Biryani',
    description: 'Rich flavours, generous portions and a guest favourite.',
    price: '₹280',
    categories: ['All', 'Vegetarian', 'Indian'],
    image: '/assets/veg-biryani.png',
    alt: 'Direct top-down overhead view of royal vegetable dum biryani in a traditional brass bowl with cashews and mint',
    annotation: {
      text: 'Rich & Aromatic',
      position: 'left',
      svg: (
        <svg className="annotation-curve curve-left" viewBox="0 0 110 48" fill="none" aria-hidden="true">
          <path d="M 98 10 C 68 5, 38 18, 22 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 28 34 L 22 40 L 18 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    description: 'Perfectly grilled cottage cheese marinated with aromatic spices.',
    price: '₹380',
    categories: ['All', 'Vegetarian', 'Indian'],
    image: '/assets/paneer-tikka.png',
    alt: 'Direct top-down overhead view of charred tandoori Paneer Tikka cubes on a round black ceramic dish',
    annotation: {
      text: 'Charcoal Grilled',
      position: 'right',
      svg: (
        <svg className="annotation-curve curve-right" viewBox="0 0 100 48" fill="none" aria-hidden="true">
          <path d="M 10 12 C 42 6, 70 18, 84 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 78 34 L 84 40 L 88 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
  {
    id: 'dragon-chicken',
    name: 'Crispy Dragon Chicken',
    description: 'Crispy wok-tossed chicken strips with cashews, chili glaze, and scallions.',
    price: '₹340',
    categories: ['All', 'Chinese'],
    image: '/assets/dragon-chicken.png',
    alt: 'Direct top-down overhead view of Indo-Chinese Crispy Dragon Chicken in a round dark wok pan',
    annotation: {
      text: 'Chef’s Special',
      position: 'left',
      svg: (
        <svg className="annotation-curve curve-left" viewBox="0 0 100 48" fill="none" aria-hidden="true">
          <path d="M 90 10 C 60 5, 32 18, 18 40" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 24 34 L 18 40 L 14 33" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  },
];

const CATEGORIES = ['All', 'Indian', 'Chinese', 'Vegetarian', 'Seafood'];

export default function FromTheKitchen({ onOpenBooking, onOpenFullMenu }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [progress, setProgress] = useState(0);

  const carouselViewportRef = useRef(null);
  const trackRef = useRef(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTrackXRef = useRef(0);
  const currentXRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const tweenRef = useRef(null);

  // Filter dishes based on active category
  const filteredDishes = useMemo(() => {
    return DISHES_DATA.filter((dish) => dish.categories.includes(selectedCategory));
  }, [selectedCategory]);

  // Multiply items so we have a sufficiently wide seamless loop track
  const loopItems = useMemo(() => {
    if (filteredDishes.length === 0) return [];
    if (filteredDishes.length <= 2) {
      return [...filteredDishes, ...filteredDishes, ...filteredDishes, ...filteredDishes, ...filteredDishes, ...filteredDishes];
    }
    if (filteredDishes.length <= 4) {
      return [...filteredDishes, ...filteredDishes, ...filteredDishes, ...filteredDishes];
    }
    return [...filteredDishes, ...filteredDishes, ...filteredDishes];
  }, [filteredDishes]);

  // Recalculate single set width whenever items change or window resizes
  const updateMetrics = useCallback(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (!cards || cards.length === 0) return;

    const count = filteredDishes.length;
    if (count === 0) return;

    let totalWidth = 0;
    for (let i = 0; i < count; i++) {
      const card = cards[i];
      if (card) {
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        totalWidth += card.offsetWidth + marginRight;
      }
    }
    singleSetWidthRef.current = totalWidth;
  }, [filteredDishes.length]);

  // Apply track X and update progress bar indicator
  const applyX = useCallback((x) => {
    if (!trackRef.current) return;
    currentXRef.current = x;
    gsap.set(trackRef.current, { x });

    const setWidth = singleSetWidthRef.current;
    if (setWidth > 0) {
      // Calculate normalized 0 to 1 position
      let p = (-x % setWidth) / setWidth;
      if (p < 0) p += 1;
      setProgress(p);
    }
  }, []);

  // Wrap X seamlessly within [-singleSetWidth, 0]
  const wrapX = useCallback((x) => {
    const setWidth = singleSetWidthRef.current;
    if (setWidth <= 0) return x;
    let wrapped = x;
    while (wrapped <= -setWidth) {
      wrapped += setWidth;
    }
    while (wrapped > 0) {
      wrapped -= setWidth;
    }
    return wrapped;
  }, []);

  // Filter change handler
  const handleCategoryChange = (cat) => {
    if (cat === selectedCategory) return;
    if (tweenRef.current) tweenRef.current.kill();
    setSelectedCategory(cat);
    // Smooth reset
    applyX(0);
  };

  // Setup GSAP Continuous Drift & resize listener
  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Continuous ticker for slow, elegant drifting
    const driftSpeed = prefersReducedMotion ? 0 : 0.65; // ~38px per second at 60fps

    const tickerCallback = (time, deltaTime) => {
      if (isPausedRef.current || isDraggingRef.current || driftSpeed === 0) return;
      if (singleSetWidthRef.current <= 0) return;

      const deltaFactor = deltaTime ? deltaTime / 16.666 : 1;
      let nextX = currentXRef.current - driftSpeed * deltaFactor;
      nextX = wrapX(nextX);
      applyX(nextX);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      gsap.ticker.remove(tickerCallback);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [updateMetrics, applyX, wrapX]);

  // Navigation button handlers (Next / Previous)
  const handlePrev = () => {
    if (singleSetWidthRef.current <= 0) return;
    if (tweenRef.current) tweenRef.current.kill();

    const card = trackRef.current?.firstElementChild;
    const cardStep = card ? card.offsetWidth + 36 : 360;

    const targetX = currentXRef.current + cardStep;
    tweenRef.current = gsap.to(
      {},
      {
        duration: 0.65,
        ease: 'power2.out',
        onUpdate: function () {
          const ratio = this.progress();
          const interpolated = currentXRef.current + (targetX - currentXRef.current) * ratio;
          applyX(wrapX(interpolated));
        },
      }
    );
  };

  const handleNext = () => {
    if (singleSetWidthRef.current <= 0) return;
    if (tweenRef.current) tweenRef.current.kill();

    const card = trackRef.current?.firstElementChild;
    const cardStep = card ? card.offsetWidth + 36 : 360;

    const targetX = currentXRef.current - cardStep;
    tweenRef.current = gsap.to(
      {},
      {
        duration: 0.65,
        ease: 'power2.out',
        onUpdate: function () {
          const ratio = this.progress();
          const interpolated = currentXRef.current + (targetX - currentXRef.current) * ratio;
          applyX(wrapX(interpolated));
        },
      }
    );
  };

  // Pointer drag & touch swipe interactions
  const handlePointerDown = (e) => {
    if (tweenRef.current) tweenRef.current.kill();
    isDraggingRef.current = true;
    isPausedRef.current = true;
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartTrackXRef.current = currentXRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartXRef.current;
    const nextX = wrapX(dragStartTrackXRef.current + deltaX);
    applyX(nextX);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Delay unpause slightly so user can admire the stopped position
    setTimeout(() => {
      isPausedRef.current = false;
    }, 1200);
  };

  return (
    <section className="from-the-kitchen" id="menu" aria-label="From the Kitchen — Maitri Katta Signature Dishes">
      <div className="kitchen-container">
        {/* Top Editorial Header Row */}
        <header className="kitchen-header">
          {/* Left Column: Identifier & Headline */}
          <div className="kitchen-header-left">
            <div className="kitchen-section-badge">
              <span className="badge-number">03</span>
              <span className="badge-line" aria-hidden="true" />
              <span className="badge-label">FROM THE KITCHEN</span>
            </div>

            <h2 className="kitchen-headline">
              <span className="headline-charcoal">The dishes worth</span>
              <span className="headline-terracotta">coming back for.</span>
            </h2>

            <p className="kitchen-subtext">
              A few customer favourites, from our kitchen to your table.
            </p>
          </div>

          {/* Right Column: Category Filters & Script Accent */}
          <div className="kitchen-header-right">
            <nav className="kitchen-category-nav" aria-label="Dish category filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={selectedCategory === cat}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </nav>

            {/* Handwritten Editorial Script Accent */}
            <div className="kitchen-script-accent" aria-hidden="true">
              <span className="script-text">Good Food Longer Evenings</span>
              <svg className="script-underline" viewBox="0 0 140 12" fill="none">
                <path d="M 4 8 C 45 4, 95 10, 136 6" stroke="#A6533B" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </header>

        {/* Floating Overhead Food Carousel Track */}
        <div
          className="kitchen-carousel-viewport"
          ref={carouselViewportRef}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { if (!isDraggingRef.current) isPausedRef.current = false; }}
          onFocusCapture={() => { isPausedRef.current = true; }}
          onBlurCapture={() => { isPausedRef.current = false; }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <div className="kitchen-carousel-track" ref={trackRef}>
            {loopItems.map((dish, idx) => (
              <article key={`${dish.id}-${idx}`} className="kitchen-dish-card">
                {/* Handwritten Terracotta Annotation */}
                {dish.annotation && (
                  <div className={`dish-annotation pos-${dish.annotation.position}`} aria-hidden="true">
                    <span className="annotation-text">{dish.annotation.text}</span>
                    {dish.annotation.svg}
                  </div>
                )}

                {/* Independent Floating Overhead Plate */}
                <div
                  className="dish-plate-container"
                  onClick={onOpenBooking}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details and reserve ${dish.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenBooking();
                    }
                  }}
                >
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    className="dish-plate-img"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Dish Information beneath plate */}
                <div className="dish-info-block">
                  <div className="dish-text-group">
                    <h3 className="dish-name">{dish.name}</h3>
                    <p className="dish-description">{dish.description}</p>
                    <div className="dish-price-row">
                      <span className="dish-price">{dish.price}</span>
                      <button
                        type="button"
                        className="dish-arrow-btn"
                        onClick={onOpenBooking}
                        aria-label={`Reserve table for ${dish.name}`}
                      >
                        <ArrowRight size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <footer className="kitchen-bottom-bar">
          {/* Lower-left: Botanical Branch & Motto */}
          <div className="bottom-botanical-group">
            <svg className="bottom-botanical-svg" viewBox="0 0 110 80" fill="none" aria-hidden="true">
              <path d="M 10 70 C 25 50, 50 35, 95 15" stroke="#A6533B" strokeWidth="2.0" strokeLinecap="round" />
              <path d="M 28 55 C 18 45, 12 32, 22 24 C 32 32, 34 46, 28 55 Z" fill="#A6533B" />
              <path d="M 44 42 C 56 38, 68 45, 65 56 C 53 54, 44 47, 44 42 Z" fill="#A6533B" />
              <path d="M 64 28 C 55 18, 54 6, 65 2 C 72 10, 73 21, 64 28 Z" fill="#A6533B" />
              <path d="M 80 18 C 92 16, 102 24, 100 34 C 88 32, 80 25, 80 18 Z" fill="#A6533B" />
            </svg>
            <div className="bottom-motto-stack">
              <span>BOLD FLAVOURS.</span>
              <span>BETTER COMPANY.</span>
            </div>
          </div>

          {/* Center: Thin Progress Indicator & Guidance */}
          <div className="bottom-progress-center">
            <div className="progress-track" aria-hidden="true">
              <div
                className="progress-bar-indicator"
                style={{
                  transform: `translateX(${progress * 190}px)`,
                }}
              />
            </div>
            <span className="progress-guidance-text">SCROLL TO EXPLORE MORE DISHES</span>
          </div>

          {/* Right: Circular Navigation Arrows, Divider, & Full Menu CTA */}
          <div className="bottom-nav-right">
            <div className="carousel-nav-arrows">
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous dishes"
              >
                <ArrowLeft size={18} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handleNext}
                aria-label="Next dishes"
              >
                <ArrowRight size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="bottom-divider" aria-hidden="true" />

            <button
              type="button"
              className="btn-view-full-menu"
              onClick={onOpenFullMenu || onOpenBooking}
            >
              VIEW FULL MENU
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

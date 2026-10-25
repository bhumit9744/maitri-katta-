import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import './Hero.css';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Evening Garden Pergola',
    description: 'Under glowing wicker lanterns and lush greenery',
    image: '/assets/maitri-pergola-night.jpg',
    thumb: '/assets/thumb-interactive-1.jpg',
    alt: 'Maitri Katta outdoor garden dining under wooden pergola with warm lanterns'
  },
  {
    id: 2,
    title: 'Garden Pavilion & Dining Lawn',
    description: 'Open-air family seating surrounded by manicured plants',
    image: '/assets/maitri-garden-pavilion.jpg',
    thumb: '/assets/thumb-interactive-2.jpg',
    alt: 'Wide view of Maitri Katta garden pavilion at dusk with candlelit tables'
  },
  {
    id: 3,
    title: 'Signature Ambiance & Feast',
    description: 'Fragrant biryanis, sizzlers, and tandoori grills',
    image: '/assets/maitri-table-feast.jpg',
    thumb: '/assets/thumb-interactive-3.jpg',
    alt: 'Candlelit dining table with kebabs and biryani in copper handi under rattan lantern'
  },
  {
    id: 4,
    title: 'Lantern-Lit Garden Pathways',
    description: 'Cozy private dining cabanas amidst tropical greenery',
    image: '/assets/maitri-garden-walkway.jpg',
    thumb: '/assets/thumb-interactive-4.jpg',
    alt: 'Stone pathway with brass lanterns leading to illuminated garden cabanas'
  }
];

export default function Hero({ onOpenSpace }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);
  const heroRef = useRef(null);

  // Entrance animations using scoped GSAP
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-word-maitri', {
        y: 45,
        opacity: 0,
        duration: 1.0,
        delay: 0.15,
      })
      .from('.hero-divider-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-word-katta', {
        y: 45,
        opacity: 0,
        duration: 1.0,
      }, '-=0.6')
      .from('.hero-category-label', {
        y: 16,
        opacity: 0,
        duration: 0.65,
      }, '-=0.6')
      .from('.hero-subtext', {
        y: 16,
        opacity: 0,
        duration: 0.65,
      }, '-=0.5')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.hero-photo-wrapper', {
        scale: 1.05,
        opacity: 0.6,
        duration: 1.3,
        ease: 'power2.out',
      }, 0.15)
      .from('.rail-container', {
        x: -25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8')
      .from('.scroll-indicator', {
        scale: 0.8,
        opacity: 0,
        duration: 0.75,
      }, '-=0.6')
      .from('.hero-tag-column', {
        y: -15,
        opacity: 0,
        duration: 0.75,
      }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSlideChange = (index) => {
    if (index === currentSlide) return;
    setImageLoaded(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setImageLoaded(true);
    }, 150);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="hero-section" id="home" ref={heroRef} aria-label="Welcome to Maitri Katta">
      {/* SVG Clip Path Definition for Asymmetric Organic Arch */}
      <svg className="svg-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-arch" clipPathUnits="objectBoundingBox">
            {/*
              Organic arch separating ivory canvas from the photograph:
              Starts at (0.36, 0) at the top, clears all center nav links,
              arches gracefully leftwards to (0.05, 0.52), then sweeps down into (0.28, 1.0) at the base.
            */}
            <path d="M 0.39 0 C 0.18 0.16, 0.05 0.34, 0.05 0.52 C 0.05 0.68, 0.15 0.84, 0.28 1.0 L 1.0 1.0 L 1.0 0.0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle Botanical Leaf Shadow in Lower-Left Ivory Canvas */}
      <div className="botanical-shadow-layer" aria-hidden="true">
        <svg viewBox="0 0 600 600" className="botanical-svg" fill="none">
          <g filter="url(#leaf-blur)" opacity="0.03" fill="#25251F">
            <path d="M 0 600 C 60 520 120 460 210 440 C 230 460 200 510 180 540 C 240 500 290 470 340 470 C 340 500 300 550 250 580 C 310 570 380 580 430 600 Z" />
            <path d="M 50 600 C 100 500 180 410 280 370 C 290 390 260 430 220 460 C 280 410 350 380 410 390 C 390 420 330 460 280 480 C 350 470 420 490 480 530 Z" />
          </g>
          <defs>
            <filter id="leaf-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="hero-stage">
        {/* Leftmost Vertical Image Navigation Rail (Desktop) */}
        <aside className="rail-container" aria-label="Venue Views Selector">
          {/* Slide Counter */}
          <div className="rail-counter">
            <span className="counter-current">0{currentSlide + 1}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">0{HERO_SLIDES.length}</span>
          </div>

          <div className="rail-divider top-divider" />

          {/* Interactive Thumbnails */}
          <div className="rail-thumbnails" role="tablist" aria-label="Garden Photography Views">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`View ${slide.title}`}
                className={`rail-thumb-btn ${currentSlide === index ? 'is-active' : ''}`}
                onClick={() => handleSlideChange(index)}
              >
                <img
                  src={slide.thumb}
                  alt={slide.title}
                  className="rail-thumb-img"
                  width="44"
                  height="55"
                  loading="eager"
                />
                <span className="thumb-active-dot" />
              </button>
            ))}
          </div>

          <div className="rail-divider bottom-divider" />

          {/* Vertical Label */}
          <div className="rail-vertical-label">
            <span>GOOD FOOD</span>
            <span>GOOD COMPANY</span>
          </div>
        </aside>

        {/* Main Editorial Typography & Actions Column */}
        <div className="hero-content-column">
          <div className="editorial-wrapper">
            {/* The Main Headline: MAITRI [line] KATTA */}
            <div className="headline-block" aria-label="Maitri Katta">
              <div className="title-row title-row-top">
                <h1 className="hero-word hero-word-maitri">MAITRI</h1>
              </div>

              <div className="hero-divider-line" />

              <div className="title-row title-row-bottom">
                <span className="hero-word hero-word-katta">KATTA</span>
              </div>
            </div>

            {/* Supporting Hierarchy */}
            <div className="hero-meta-block">
              <p className="hero-category-label">FAMILY GARDEN RESTAURANT</p>
              <p className="hero-subtext">Good food. Your people. Long evenings.</p>
            </div>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group">
              <a href="#menu" className="btn-explore-menu" aria-label="Explore Maitri Katta Menu">
                <span className="btn-explore-text">EXPLORE MENU</span>
                <ArrowRight size={15} strokeWidth={2} className="btn-arrow" />
              </a>

              <button
                type="button"
                className="btn-watch-space"
                onClick={onOpenSpace}
                aria-label="Watch and explore our garden restaurant space"
              >
                <span className="play-icon-circle">
                  <Play size={11} fill="currentColor" strokeWidth={0} className="play-triangle" />
                </span>
                <span className="btn-watch-text">WATCH OUR SPACE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Circular Scroll Indicator */}
        <a href="#experience" className="scroll-indicator" aria-label="Scroll to The Maitri Katta Experience">
          <div className="scroll-circle">
            <span className="scroll-dot" />
            <span className="scroll-text">SCROLL</span>
          </div>
          <div className="scroll-stem" />
        </a>

        {/* Right 55-60%: Dominant Restaurant Photograph with Organic Arch Mask */}
        <div className="hero-photo-container">
          <div className="hero-photo-wrapper">
            <div className={`photo-media-box ${imageLoaded ? 'is-loaded' : 'is-fading'}`}>
              <img
                src={activeSlideData.image}
                alt={activeSlideData.alt}
                className="hero-main-photo"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Subtle Gradient & Vignette for Architectural Depth */}
            <div className="photo-ambient-overlay" aria-hidden="true" />
          </div>

          {/* Floating Vertical Label in Top-Right Corner */}
          <div className="hero-tag-column" aria-hidden="true">
            <span>INDIAN</span>
            <span>CHINESE</span>
            <span>FLAVOURS</span>
            <span>GOOD</span>
            <span>TIMES</span>
          </div>
        </div>
      </div>
    </section>
  );
}

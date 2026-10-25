import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TheCelebration.css';

gsap.registerPlugin(ScrollTrigger);

// Configurable occasion highlights for Section 04
const OCCASIONS_DATA = [
  {
    num: '01',
    title: 'Birthdays & Milestones',
    desc: 'Make their day feel special in a beautiful setting.',
  },
  {
    num: '02',
    title: 'Family Gatherings',
    desc: 'More space, more time together.',
  },
  {
    num: '03',
    title: 'Get-Togethers',
    desc: 'Good food, great company and a relaxed atmosphere.',
  },
];

export default function TheCelebration({ onOpenBooking }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.celebration-badge', {
        y: 16,
        opacity: 0,
        duration: 0.7,
      })
      .from('.celebration-top-right', {
        y: -10,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.celebration-eyebrow', {
        y: 12,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.title-line', {
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
      }, '-=0.45')
      .from('.celebration-subcopy', {
        y: 18,
        opacity: 0,
        duration: 0.7,
      }, '-=0.6')
      .from('.btn-plan-celebration', {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
      }, '-=0.5')
      .from('.celebration-micro-quote', {
        opacity: 0,
        x: -12,
        duration: 0.6,
      }, '-=0.4')
      .from('.photo-main-garden', {
        scale: 1.04,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
      }, '-=0.85')
      .from('.photo-candle-table', {
        y: 28,
        opacity: 0,
        duration: 0.85,
      }, '-=0.7')
      .from('.photo-celebration-toast', {
        y: -22,
        opacity: 0,
        duration: 0.85,
      }, '-=0.7')
      .from('.photo-pavilion-night', {
        y: 22,
        opacity: 0,
        duration: 0.85,
      }, '-=0.7')
      .from('.photo-botanical-branch', {
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
      }, '-=0.7')
      .from('.parchment-accent', {
        opacity: 0,
        duration: 0.8,
      }, '-=0.75')
      .from('.occasion-item', {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
      }, '-=0.5');

      // Subtle desktop-only parallax
      const isDesktop = window.innerWidth > 1024;
      if (isDesktop) {
        gsap.to('.photo-candle-table', {
          y: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to('.photo-celebration-toast', {
          y: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="the-celebration-section"
      id="celebrations"
      ref={sectionRef}
      aria-label="Section 04: The Celebration at Maitri Katta"
    >
      <div className="celebration-container">
        {/* Top Header Row with Section Identifier */}
        <header className="celebration-top-row">
          <div className="celebration-badge">
            <span className="badge-num">04</span>
            <span className="badge-divider" aria-hidden="true" />
            <span className="badge-title">THE CELEBRATION</span>
          </div>

          <div className="celebration-top-right" aria-hidden="true">
            <span className="top-right-text">GOOD FOOD  ·  YOUR PEOPLE  ·  YOUR MOMENTS</span>
            <span className="top-right-line" />
          </div>
        </header>

        {/* Main Composition: Left Editorial Column & Right Photography Wall */}
        <div className="celebration-main-grid">
          {/* Left Editorial Copy & CTA Column */}
          <div className="celebration-text-column">
            <span className="celebration-eyebrow">A PLACE FOR YOUR MOMENTS</span>

            <h2 className="celebration-headline">
              <span className="title-line title-charcoal">Every occasion</span>
              <span className="title-line title-terracotta">deserves a table.</span>
            </h2>

            <p className="celebration-subcopy">
              Birthdays, reunions, achievements or simply a reason to get together — some moments taste better when shared.
            </p>

            <div className="celebration-cta-wrap">
              <button
                type="button"
                className="btn-plan-celebration"
                onClick={onOpenBooking}
                aria-label="Plan a celebration at Maitri Katta"
              >
                <span>PLAN A CELEBRATION</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Left Micro-Label with vertical bar */}
            <div className="celebration-micro-quote" aria-hidden="true">
              <div className="micro-quote-line" />
              <div className="micro-quote-text">
                <span>GOOD FOOD.</span>
                <span>YOUR PEOPLE.</span>
                <span>YOUR MOMENTS.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Photography Wall Collage */}
          <div className="celebration-wall-column">
            <div className="celebration-collage">
              {/* Parchment Backing Layers */}
              <div className="parchment-accent parchment-center-strip" aria-hidden="true" />
              <div className="parchment-accent parchment-left-strip" aria-hidden="true" />
              <div className="parchment-accent parchment-right-strip" aria-hidden="true" />

              {/* 1. Main Dominant Garden Dining Photo (Center) */}
              <div
                className="collage-frame photo-main-garden"
                onClick={onOpenBooking}
                role="button"
                tabIndex={0}
                aria-label="View Maitri Katta evening garden restaurant ambiance"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenBooking();
                  }
                }}
              >
                <img
                  src="/assets/celebration/celebration-main-garden.jpg"
                  alt="Maitri Katta outdoor garden dining canopy with hanging rattan lantern and illuminated tables"
                  className="collage-img"
                  loading="lazy"
                />
              </div>

              {/* 2. Left Supporting Candlelit Floral Table (Overlapping) */}
              <div
                className="collage-frame photo-candle-table"
                onClick={onOpenBooking}
                role="button"
                tabIndex={0}
                aria-label="View candlelit dinner table arrangement"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenBooking();
                  }
                }}
              >
                <img
                  src="/assets/celebration/celebration-candle-table.jpg"
                  alt="Intimate candlelit dining table with floral centerpiece and glowing glassware"
                  className="collage-img"
                  loading="lazy"
                />
              </div>

              {/* 3. Top-Right Celebration Toasting Detail */}
              <div
                className="collage-frame photo-celebration-toast"
                onClick={onOpenBooking}
                role="button"
                tabIndex={0}
                aria-label="View celebratory dining toast"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenBooking();
                  }
                }}
              >
                <img
                  src="/assets/celebration/celebration-toast.jpg"
                  alt="Friends and family raising a toast across an evening celebration table"
                  className="collage-img"
                  loading="lazy"
                />
              </div>

              {/* 4. Bottom-Right Pavilion & Night Foliage Detail */}
              <div
                className="collage-frame photo-pavilion-night"
                onClick={onOpenBooking}
                role="button"
                tabIndex={0}
                aria-label="View garden dining pavilion at night"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenBooking();
                  }
                }}
              >
                <img
                  src="/assets/celebration/celebration-pavilion-night.jpg"
                  alt="Warmly illuminated garden dining pergola pavilion amidst lush night greenery"
                  className="collage-img"
                  loading="lazy"
                />
              </div>

              {/* Soft Olive Botanical Branch Shadow */}
              <div className="photo-botanical-branch" aria-hidden="true">
                <img
                  src="/assets/celebration/celebration-leaf-branch.png"
                  alt=""
                  className="branch-shadow-img"
                  draggable={false}
                />
              </div>

              {/* Far-Right Vertical Rail Typography */}
              <aside className="celebration-vertical-rail" aria-hidden="true">
                <span>CELEBRATIONS AT MAITRI KATTA</span>
              </aside>

              {/* Lower-Right Micro Caption */}
              <div className="collage-corner-caption" aria-hidden="true">
                <span>SAME TABLES.</span>
                <span>NEW STORIES.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Divider & Three Compact Occasion Groups */}
        <footer className="celebration-bottom-details">
          {OCCASIONS_DATA.map((item, idx) => (
            <React.Fragment key={item.num}>
              {idx > 0 && <div className="occasion-separator" aria-hidden="true" />}
              <div className="occasion-item">
                <div className="occasion-meta">
                  <span className="occasion-num">{item.num}</span>
                  <span className="occasion-dash" aria-hidden="true" />
                </div>
                <div className="occasion-body">
                  <h3 className="occasion-title">{item.title}</h3>
                  <p className="occasion-desc">{item.desc}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </footer>
      </div>
    </section>
  );
}

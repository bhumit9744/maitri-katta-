import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TheExperience.css';

gsap.registerPlugin(ScrollTrigger);

const PAGING_INDEX = ['01', '02', '03', '04', '05', '06', '07'];

export default function TheExperience({ onOpenSpace, onOpenBooking }) {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance reveal timeline with masked reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.exp-meta-bar', {
        y: -16,
        opacity: 0,
        duration: 0.8,
      })
      .from('.headline-part-main', {
        yPercent: 105,
        duration: 1.15,
      }, '-=0.45')
      .from('.headline-part-italic', {
        yPercent: 105,
        duration: 1.15,
      }, '-=0.85')
      .from('.exp-right-tagline', {
        x: 18,
        opacity: 0,
        duration: 0.8,
      }, '-=0.7')
      .from('.exp-right-index', {
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.exp-bottom-left', {
        y: 22,
        opacity: 0,
        duration: 0.85,
      }, '-=0.55');

      // Subtle desktop-only parallax on restaurant photograph
      const isDesktop = window.innerWidth > 1024;
      if (isDesktop && photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    if (onOpenSpace) {
      onOpenSpace();
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section
      className="the-experience-section"
      id="experience"
      ref={sectionRef}
      aria-label="Section 05: The Experience — Have some time at Maitri Katta"
    >
      {/* 1. Real Restaurant Photograph Background Layer */}
      <div className="experience-photo-layer" aria-hidden="true">
        <img
          ref={photoRef}
          src="/assets/Have-some-time.png"
          alt="Maitri Katta dining space illuminated with warm string lights, lanterns, and lush garden seating"
          className="experience-bg-img"
          loading="lazy"
        />
        {/* Soft top gradient feather melting the photo ceiling seamlessly into the #171713 canvas */}
        <div className="experience-photo-feather" />
        {/* Soft lower-left vignette to ensure supporting copy and CTA contrast */}
        <div className="experience-photo-vignette" />
      </div>

      {/* 2. Top Charcoal Canvas Base */}
      <div className="experience-top-canvas" aria-hidden="true" />

      {/* 3. Editorial Content & Overlapping Typography Container */}
      <div className="experience-container">
        {/* Top Editorial Metadata Row */}
        <header className="exp-meta-bar">
          <div className="meta-left-group">
            <span className="meta-section-num">05</span>
            <span className="meta-dash" aria-hidden="true">—</span>
            <span className="meta-section-name">THE EXPERIENCE</span>
            <div className="meta-rule-track" aria-hidden="true">
              <span className="meta-rule-line" />
              <span className="meta-rule-accent" />
            </div>
          </div>

          <div className="meta-right-group">
            <span className="meta-brand-name">MAITRI KATTA</span>
          </div>
        </header>

        {/* Center Editorial Typography Composition */}
        <div className="exp-headline-area">
          <h2 className="exp-main-headline">
            {/* Line 1: In Warm Ivory, anchored in Charcoal Canvas */}
            <div className="headline-line-mask">
              <span className="headline-part-main">Have some</span>
            </div>

            {/* Line 2: In Muted Champagne Italic, crossing into Restaurant Photograph */}
            <div className="headline-line-mask italic-mask">
              <span className="headline-part-italic">
                time<span className="headline-dot">.</span>
              </span>
            </div>
          </h2>

          {/* Upper-Right Secondary Copy Block */}
          <div className="exp-right-tagline" aria-hidden="true">
            <span>GOOD FOOD.</span>
            <span>GOOD COMPANY.</span>
            <span>NOWHERE ELSE</span>
            <span>YOU NEED TO BE.</span>
          </div>
        </div>

        {/* Far-Right Vertical Paging Index Indicator (Desktop) */}
        <aside className="exp-right-index" aria-hidden="true">
          <div className="index-line" />
          <div className="index-list">
            {PAGING_INDEX.map((num) => (
              <span
                key={num}
                className={`index-num ${num === '05' ? 'is-active' : ''}`}
              >
                {num === '05' && <span className="active-dash">—</span>}
                {num}
              </span>
            ))}
          </div>
        </aside>

        {/* Bottom-Left Supporting Copy & CTA Link */}
        <footer className="exp-bottom-left">
          <p className="exp-supporting-text">
            Stay a little longer.<br />
            Make another memory.
          </p>

          <button
            type="button"
            className="exp-cta-btn"
            onClick={handleCtaClick}
            aria-label="Experience Maitri Katta garden restaurant space"
          >
            <span className="exp-cta-circle">
              <ArrowUpRight size={17} strokeWidth={1.8} className="cta-arrow-icon" />
            </span>
            <span className="exp-cta-label">EXPERIENCE MAITRI KATTA</span>
            <span className="cta-trailing-rule" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
}

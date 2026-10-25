import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EditorialExperience.css';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialExperience({ onOpenSpace }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create scroll-triggered or entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from('.experience-top-label', {
        y: 16,
        opacity: 0,
        duration: 0.8,
      })
      .from('.exp-left-rail', {
        x: -20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.headline-line.line-charcoal', {
        y: 40,
        opacity: 0,
        duration: 1.0,
      }, '-=0.6')
      .from('.headline-line.line-terracotta', {
        y: 40,
        opacity: 0,
        duration: 1.0,
      }, '-=0.75')
      .from('.exp-subcopy', {
        y: 18,
        opacity: 0,
        duration: 0.7,
      }, '-=0.6')
      .from('.btn-explore-space', {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.exp-main-garden-frame', {
        scale: 1.05,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      }, '-=0.9')
      .from('.exp-food-dish-card', {
        y: 35,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from('.exp-botanical-branch', {
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
      }, '-=0.6')
      .from('.exp-lamp-arch-card', {
        y: 30,
        opacity: 0,
        duration: 0.9,
      }, '-=0.6')
      .from('.exp-connecting-line', {
        opacity: 0,
        duration: 1.0,
      }, '-=0.7')
      .from('.exp-right-rail', {
        x: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="editorial-exp-section"
      id="experience"
      ref={sectionRef}
      aria-label="The Maitri Katta Experience - Made for Together"
    >
      {/* SVG Clip Path Definition for the Organic S-Curve Garden Mask */}
      <svg className="svg-clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="editorial-organic-garden-mask" clipPathUnits="objectBoundingBox">
            {/*
              Organic S-curve undulating boundary:
              Bulges leftwards over the headline area (x ~ 0.0 at y ~ 0.35),
              curves gently inwards (x ~ 0.28 at y ~ 0.75), then sweeps down into (0.50, 1.0).
            */}
            <path d="M 0.24 0 C 0.08 0.12, 0.0 0.24, 0.0 0.38 C 0.0 0.54, 0.12 0.68, 0.28 0.80 L 0.52 1.0 L 1.0 1.0 L 1.0 0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Connecting Terracotta Linework */}
      <div className="exp-linework-layer" aria-hidden="true">
        <svg
          className="exp-connecting-line"
          viewBox="0 0 1000 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 80 200 C 240 270, 420 290, 560 260 C 720 225, 870 190, 955 60"
            stroke="#C9B8A5"
            strokeWidth="1.2"
          />
          <circle cx="955" cy="60" r="4.5" fill="#A6533B" />
        </svg>
      </div>

      <div className="editorial-exp-stage">
        {/* Leftmost Vertical Editorial Rail (Desktop) */}
        <aside className="exp-left-rail" aria-hidden="true">
          <span className="rail-index">02</span>
          <span className="rail-line" />
          <div className="rail-words">
            <span>FOOD</span>
            <span>PEOPLE</span>
            <span>GARDEN</span>
          </div>
        </aside>

        {/* Left Column: Typography, Hierarchy & Interaction */}
        <div className="exp-content-column">
          {/* Small Top Label + Rule */}
          <div className="experience-top-label">
            <div className="top-label-text">
              <span>THE MAITRI KATTA</span>
              <span>EXPERIENCE</span>
            </div>
            <span className="top-label-rule" />
          </div>

          {/* Main Editorial Headline */}
          <h2 className="exp-headline">
            <span className="headline-line line-charcoal">Made for</span>
            <span className="headline-line line-terracotta">Together.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="exp-subcopy">
            Open-air dining. Great food.<br />
            Better company.
          </p>

          {/* Primary Interaction CTA */}
          <div className="exp-cta-wrapper">
            <button
              type="button"
              className="btn-explore-space"
              onClick={onOpenSpace}
              aria-label="Explore Maitri Katta garden restaurant space"
            >
              <span className="btn-circle-arrow">
                <ArrowRight size={18} strokeWidth={1.8} className="arrow-icon" />
              </span>
              <div className="btn-label-stack">
                <span>EXPLORE</span>
                <span>OUR SPACE</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Composition: The 3 Interconnected Editorial Photographs */}
        <div className="exp-visual-composition">
          {/* 1. Dominant Organic-Masked Garden Restaurant Photograph */}
          <div className="exp-main-garden-frame" onClick={onOpenSpace} role="button" tabIndex={0} aria-label="Open garden space viewer">
            <img
              src="/assets/editorial-garden-dusk.jpg"
              alt="Maitri Katta outdoor dining pavilion with illuminated woven lanterns and garden greenery"
              className="main-garden-img"
              loading="lazy"
            />
            <div className="main-garden-overlay" aria-hidden="true" />
          </div>

          {/* 2. Secondary Overlapping Signature Dish Photograph */}
          <div className="exp-food-dish-card" onClick={onOpenSpace} role="button" tabIndex={0} aria-label="View culinary specialty details">
            <img
              src="/assets/editorial-dish-crisp.jpg"
              alt="Signature Asian crispy stir-fry dish with fresh basil on dark rustic wooden table"
              className="food-dish-img"
              loading="lazy"
            />
            {/* Terracotta Botanical Leaf Silhouette Accent */}
            <svg className="exp-botanical-branch" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <path d="M 10 110 C 35 90, 65 65, 100 20" stroke="#A6533B" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 35 90 C 24 78, 18 64, 28 54 C 38 64, 42 78, 35 90 Z" fill="#A6533B" />
              <path d="M 52 75 C 65 72, 78 80, 75 92 C 62 90, 52 82, 52 75 Z" fill="#A6533B" />
              <path d="M 68 58 C 58 45, 56 32, 68 25 C 76 35, 78 48, 68 58 Z" fill="#A6533B" />
              <path d="M 85 42 C 98 40, 110 48, 108 60 C 95 58, 85 50, 85 42 Z" fill="#A6533B" />
              <path d="M 100 20 C 102 10, 112 5, 118 10 C 115 20, 108 22, 100 20 Z" fill="#A6533B" />
            </svg>
          </div>

          {/* 3. Narrow Vertical Detail Photograph with Architectural Arch */}
          <div className="exp-lamp-arch-card" onClick={onOpenSpace} role="button" tabIndex={0} aria-label="View woven lantern details">
            <img
              src="/assets/editorial-lamp-arch.jpg"
              alt="Intricate woven rattan pendant lamp illuminated amidst garden trees"
              className="lamp-arch-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Rightmost Vertical Editorial Rail (Desktop) */}
        <aside className="exp-right-rail" aria-hidden="true">
          <div className="right-rail-words">
            <span>GOOD</span>
            <span>FOOD</span>
            <span>GOOD</span>
            <span>PEOPLE</span>
            <span>LONGER</span>
            <span>EVENINGS</span>
          </div>
          <span className="right-rail-dot" />
          <span className="right-rail-line" />
        </aside>
      </div>
    </section>
  );
}

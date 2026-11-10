import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Flame,
  Heart,
  Compass
} from 'lucide-react';
import './About.css';

// Reusable SVG Vintage Postage Stamps with Maitri Katta's Red, Yellow & Gold Brand Colors
function VintageStampTiger() {
  return (
    <div className="vintage-postage-stamp stamp-red" title="1 Anna Heritage Stamp">
      <div className="stamp-perforations-border">
        <div className="stamp-inner-art">
          <div className="stamp-header-text">INDIA POSTAGE</div>
          <div className="stamp-illustration-box">
            {/* Engraved Royal Bengal Tiger Motif */}
            <svg viewBox="0 0 60 40" className="stamp-svg-motif" fill="currentColor">
              <path d="M12,24 C14,18 20,15 28,15 C36,15 42,19 46,24 C44,22 38,20 28,20 C18,20 14,22 12,24 Z" />
              <circle cx="20" cy="18" r="2.5" />
              <circle cx="36" cy="18" r="2.5" />
              <path d="M22,23 Q28,27 34,23" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M16,12 Q20,8 24,11 M32,11 Q36,8 40,12" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="stamp-motif-label">MAITRI KATTA</span>
          </div>
          <div className="stamp-footer-text">
            <span>1 ANNA</span>
            <span>अंबरनाथ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VintageStampTransit() {
  return (
    <div className="vintage-postage-stamp stamp-yellow" title="2 Annas Central Railway Stamp">
      <div className="stamp-perforations-border">
        <div className="stamp-inner-art">
          <div className="stamp-header-text">CENTRAL RLY</div>
          <div className="stamp-illustration-box">
            {/* Engraved Auto Rickshaw / Local Train Transit Motif */}
            <svg viewBox="0 0 60 40" className="stamp-svg-motif" fill="currentColor">
              <rect x="14" y="12" width="32" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="30" r="4" />
              <circle cx="40" cy="30" r="4" />
              <line x1="20" y1="12" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5" />
              <line x1="32" y1="12" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10,22 L14,22 M46,22 L50,22" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="stamp-motif-label">AMBERNATH EAST</span>
          </div>
          <div className="stamp-footer-text">
            <span>2 ANNAS</span>
            <span>CHIKHALOLI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostalCancellationMark() {
  return (
    <div className="postal-cancellation-mark" aria-hidden="true">
      <div className="cancel-circle">
        <span>AMBERNATH</span>
        <span className="cancel-date">ESTD. MAITRI</span>
        <span>MAHARASHTRA</span>
      </div>
      <div className="cancel-wavy-lines">
        <span className="wave" />
        <span className="wave" />
        <span className="wave" />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="our-story-page">
      {/* =========================================================================
          SECTION 01 — OUR STORY INTRODUCTION (Archival Parchment Composition)
          Textured Parchment Paper Canvas with Postage Stamps & Serif Typography
          ========================================================================= */}
      <section className="story-split-hero-section" aria-label="Our Story Introduction">
        <div className="story-hero-centered-container">
          {/* Aged Parchment Paper Canvas */}
          <div className="story-hero-parchment-col">
            <div className="vintage-parchment-canvas">
              {/* Top-Right Postal Stamps Cluster */}
              <div className="parchment-stamps-cluster">
                <PostalCancellationMark />
                <VintageStampTiger />
                <VintageStampTransit />
              </div>

              {/* Story Content */}
              <div className="parchment-content-body">
                <span className="parchment-eyebrow">A TRIBUTE TO MAHARASHTRIAN HOSPITALITY</span>

                <h1 className="parchment-main-headline">
                  <span>Our Story.</span>
                  <span className="headline-italic-accent">Our Maitri.</span>
                </h1>

                <h2 className="parchment-subheadline">
                  A PLACE WHERE FOOD BRINGS PEOPLE TOGETHER.
                </h2>

                <div className="parchment-prose-text">
                  <p>
                    In Maharashtra, the word <em>Katta</em> is never just a bench. It is an informal, sacred institution — where college friends debate until dusk, where working folks shed the day’s fatigue, and where lifelong bonds (<em>Maitri</em>) are celebrated over steaming food.
                  </p>
                  <p>
                    Nestled in Chikhaloli, Ambernath East, Maitri Katta Family Garden Restaurant was born from a timeless conviction: that true dining cannot be rushed inside sterile air-conditioned boxes. It belongs under the open sky, surrounded by green foliage, fragrant with the aroma of charcoal embers and whole stone-ground Agri spices.
                  </p>
                  <p>
                    From slow-simmered Mutton and Chicken Lapeta to clay-pot Handis, sizzling Chinese wok appetisers, and fragrant Dum Biryanis, we welcome every guest with the same unhurried generosity as an old family home.
                  </p>
                </div>

                <div className="parchment-signature-row">
                  <div className="marathi-calligraphy-mark">
                    <span className="marathi-script">अस्सल चव • आपुलकीची माणसं</span>
                    <span className="marathi-sub">Authentic Flavour • Genuine People</span>
                  </div>
                  <div className="parchment-stamp-seal">
                    <span className="seal-star">★</span>
                    <span className="seal-text">100% ASLI MASALA</span>
                    <span className="seal-star">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — THE BEGINNING (Archival Editorial Layout)
          Headline: EVERY KATTA HAS A STORY.
          ========================================================================= */}
      <section className="story-beginning-section" aria-label="The Beginning">
        <div className="container-custom">
          <div className="beginning-header-block">
            <span className="section-vintage-kicker">HISTORIC CONTEXT</span>
            <h2 className="beginning-headline">EVERY KATTA HAS A STORY.</h2>
            <p className="beginning-lead-quote">
              “Before there were restaurant tables, there were kattas under banyan trees. Friends gathered, tiffin boxes were shared, and hours slipped away unnoticed.”
            </p>
          </div>

          <div className="beginning-archival-grid">
            {/* Archival Woodcut Station Frame */}
            <div className="archival-woodcut-card">
              <div className="woodcut-image-wrapper">
                <img
                  src="/assets/ambernath-station.webp"
                  alt="Vintage woodcut illustration of Ambernath Central Railway Station"
                  className="woodcut-img"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="woodcut-tag-strip">
                  <span>CENTRAL RAILWAY • AMBERNATH HERITAGE</span>
                </div>
              </div>
              <div className="woodcut-caption">
                <strong>Suburban Roots & Commuter Spirit</strong>
                <p>Located along the historic Kalyan–Badlapur artery, Ambernath has always been a crossroads where families return home hungry for genuine food.</p>
              </div>
            </div>

            {/* Archival Narrative Column */}
            <div className="beginning-narrative-card">
              <div className="ticket-header-strip">
                <span>PASSENGER MEMORANDUM</span>
                <span>DESTINATION: MAITRI KATTA</span>
              </div>

              <div className="archival-prose">
                <h3 className="archival-card-title">Born on Open Garden Soils</h3>
                <p>
                  While modern suburban dining drifted toward cookie-cutter fast-food joints and high-decibel lounges, Maitri Katta chose a different path. We built an open lawn surrounded by breezy wooden cabanas, planted trees, installed warm lanterns, and built traditional clay tandoors.
                </p>
                <p>
                  We wanted a sanctuary where grandparents could enjoy comforting soft Bhakris, parents could relish fiery Agri mutton gravies, and youngsters could click photographs under hand-painted Bollywood caricatures.
                </p>
                <div className="archival-annotation">
                  <span className="annotation-arrow">↳</span>
                  <span className="annotation-handwritten">“A dining katta where no one waves the bill in your face.”</span>
                </div>
              </div>

              <div className="archival-pillars-bar">
                <div className="pillar-metric">
                  <span className="metric-number">01</span>
                  <strong className="metric-title">Open Sky Lawns</strong>
                  <p>Spacious, natural garden breeze away from highway dust.</p>
                </div>
                <div className="pillar-metric">
                  <span className="metric-number">02</span>
                  <strong className="metric-title">Clay Hearth Cooking</strong>
                  <p>Slow dum over genuine charcoal and cast-iron kadhais.</p>
                </div>
                <div className="pillar-metric">
                  <span className="metric-number">03</span>
                  <strong className="metric-title">Zero Artificial Bases</strong>
                  <p>Fresh whole spices roasted daily by our master chefs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — OUR FOOD PHILOSOPHY
          Headline: ROOTED IN FLAVOUR. MADE FOR MEMORIES.
          ========================================================================= */}
      <section className="food-philosophy-section" aria-label="Our Food Philosophy">
        <div className="container-custom">
          <div className="philosophy-asymmetric-spread">
            {/* Left: Text & Creed */}
            <div className="philosophy-text-col">
              <span className="section-vintage-kicker">CULINARY MANIFESTO</span>
              <h2 className="philosophy-headline">
                <span>ROOTED IN FLAVOUR.</span>
                <span className="headline-serif-italic">Made for Memories.</span>
              </h2>

              <p className="philosophy-lead-paragraph">
                The soul of Maitri Katta is our authentic <strong>Agri coastal heritage</strong>. Native to the Raigad and Thane districts, Agri cooking is celebrated for its deep roasted masalas, dry coconut, and thick onion gravies known as <em>Lapeta</em>.
              </p>

              <div className="philosophy-facets-list">
                <div className="philosophy-facet">
                  <div className="facet-bullet-num">A</div>
                  <div>
                    <h3 className="facet-heading">Stone-Ground Agri Heritage Masalas</h3>
                    <p className="facet-body">Whole coriander seeds, dagad phool (stone flower), black cardamoms, and dry red chillies roasted on heavy cast iron and stone-ground to release rich, natural oils.</p>
                  </div>
                </div>

                <div className="philosophy-facet">
                  <div className="facet-bullet-num">B</div>
                  <div>
                    <h3 className="facet-heading">Clay Tandoor & Live Charcoal Embers</h3>
                    <p className="facet-body">Skewered chicken kebabs and buttery garlic naans baked directly against glowing clay walls — achieving that unmistakable smokiness that gas stoves can never replicate.</p>
                  </div>
                </div>

                <div className="philosophy-facet">
                  <div className="facet-bullet-num">C</div>
                  <div>
                    <h3 className="facet-heading">Chinese Wok & Tawa Delights</h3>
                    <p className="facet-body">High-heat flaming woks creating crispy Dragon Chicken, sizzling Chicken Lollipops, and savoury fried rice to satisfy every generation at the table.</p>
                  </div>
                </div>
              </div>

              <div className="philosophy-action-link">
                <Link to="/menu" className="btn-story-editorial-cta">
                  <span>DISCOVER THE FULL MENU</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right: Large Editorial Food Photo */}
            <div className="philosophy-photo-col">
              <div className="philosophy-photo-frame">
                <img
                  src="/assets/mutton-lapeta.webp"
                  alt="Slow-simmered authentic Maharashtrian Agri Mutton Lapeta served in a traditional handi"
                  className="philosophy-dish-photo"
                  loading="lazy"
                  width="600"
                  height="450"
                />
                <div className="philosophy-badge-stamp">
                  <Flame size={16} className="flame-icon" />
                  <span>SIGNATURE AGRI LAPETA</span>
                </div>
                <div className="photo-tape-corner tape-top-right" aria-hidden="true" />
                <div className="photo-tape-corner tape-bottom-left" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — THE KATTA EXPERIENCE
          Headline: GOOD FOOD. BETTER COMPANY.
          ========================================================================= */}
      <section className="katta-experience-section" aria-label="The Katta Experience">
        <div className="container-custom">
          <div className="experience-header-row">
            <div>
              <span className="section-vintage-kicker">GARDEN DINING & CELEBRATIONS</span>
              <h2 className="katta-experience-headline">GOOD FOOD. BETTER COMPANY.</h2>
            </div>
            <p className="experience-header-subcopy">
              A cinematic look into the lantern-lit pergolas, open lawns, and celebratory tables of Maitri Katta.
            </p>
          </div>

          {/* Film-Strip Frames Collage */}
          <div className="experience-film-collage">
            {/* Cell 1: Garden Lounge */}
            <div className="film-strip-card card-span-2">
              <div className="film-perf-top">
                {[...Array(8)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
              <div className="film-photo-window">
                <img
                  src="/assets/maitri-garden-lounge-opt.webp"
                  alt="Maitri Katta dining garden lounge at night with fairy lights and projector screen"
                  className="experience-collage-img"
                  loading="lazy"
                  width="600"
                  height="340"
                />
                <div className="collage-caption-tag">
                  <span className="tag-place">STARRY GARDEN LOUNGE</span>
                  <span className="tag-desc">Under open evening skies with fairy lights</span>
                </div>
              </div>
              <div className="film-perf-bottom">
                {[...Array(8)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
            </div>

            {/* Cell 2: Wooden Pergola Cabanas */}
            <div className="film-strip-card">
              <div className="film-perf-top">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
              <div className="film-photo-window">
                <img
                  src="/assets/maitri-pergola-night.webp"
                  alt="Illuminated wooden dining pergola with dining guests at night"
                  className="experience-collage-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="collage-caption-tag">
                  <span className="tag-place">LANTERN PERGOLAS</span>
                  <span className="tag-desc">Intimate wooden dining cabanas</span>
                </div>
              </div>
              <div className="film-perf-bottom">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
            </div>

            {/* Cell 3: Family Birthday Celebration */}
            <div className="film-strip-card">
              <div className="film-perf-top">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
              <div className="film-photo-window">
                <img
                  src="/assets/Celebrate_your_birthday_at_Mai.webp"
                  alt="Authentic family birthday celebration with cakes at Maitri Katta restaurant"
                  className="experience-collage-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="collage-caption-tag">
                  <span className="tag-place">FAMILY CELEBRATIONS</span>
                  <span className="tag-desc">Birthdays, milestones & get-togethers</span>
                </div>
              </div>
              <div className="film-perf-bottom">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
            </div>

            {/* Cell 4: Festive Welcome Gateway */}
            <div className="film-strip-card">
              <div className="film-perf-top">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
              <div className="film-photo-window">
                <img
                  src="/assets/thumb-interactive-1.webp"
                  alt="Maitri Katta entrance gate with glowing sign and festive decor"
                  className="experience-collage-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="collage-caption-tag">
                  <span className="tag-place">THE WELCOME GATE</span>
                  <span className="tag-desc">Your sanctuary for food and nostalgia</span>
                </div>
              </div>
              <div className="film-perf-bottom">
                {[...Array(6)].map((_, i) => <span key={i} className="perf-hole" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — OUR BRAND SIGNATURE
          Headline: MADE FOR GOOD TIMES. MADE FOR MAITRI.
          ========================================================================= */}
      <section className="brand-signature-section" aria-label="Brand Signature">
        <div className="container-custom">
          <div className="signature-showcase-box">
            {/* Central Original Marathi Logo */}
            <div className="signature-logo-emblem">
              <img
                src="/assets/maitri-katta-logo-transparent.png"
                alt="Original Maitri Katta Marathi Logo"
                className="signature-logo-img"
                width="240"
                height="130"
              />
              <span className="signature-location-tag">CHIKHALOLI • AMBERNATH EAST</span>
            </div>

            {/* Oversized Headline */}
            <h2 className="signature-monument-headline">
              <span className="line-serif">MADE FOR</span>
              <span className="line-bold-display">GOOD TIMES.</span>
              <span className="line-serif">MADE FOR</span>
              <span className="line-yellow-display">MAITRI.</span>
            </h2>

            <p className="signature-prose">
              A Katta is not built with bricks and mortar alone. It is crafted with laughter that carries over garden fences, clay handis passed between friends, and an open table where there is always room for one more.
            </p>

            <div className="signature-decorative-rule">
              <span className="rule-line" />
              <span className="rule-symbol">✦ ✦ ✦</span>
              <span className="rule-line" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — VISIT MAITRI KATTA
          Headline: YOUR NEXT MEMORY STARTS HERE.
          ========================================================================= */}
      <section className="visit-katta-section" aria-label="Visit Maitri Katta">
        {/* Full-width warm restaurant background */}
        <div className="visit-bg-container">
          <img
            src="/assets/hero-maitri-facade.webp"
            alt="Maitri Katta Family Garden Restaurant facade illuminated at night"
            className="visit-bg-img"
          />
          <div className="visit-dark-scrim" />
        </div>

        <div className="container-custom visit-content-layer">
          <div className="visit-editorial-card">
            <span className="visit-kicker">JOIN US TONIGHT</span>
            <h2 className="visit-headline">
              YOUR NEXT MEMORY<br />STARTS HERE.
            </h2>

            <div className="visit-info-details">
              <div className="visit-detail-item">
                <MapPin size={22} className="visit-icon" />
                <div>
                  <strong>Restaurant Location</strong>
                  <p>Maitri Katta Family Garden Restaurant, Pawar Section, Near Panvelkar Green City, Navare Nagar, Ambernath Badlapur Road, Chikhaloli, Ambernath East, Maharashtra 421501.</p>
                </div>
              </div>

              <div className="visit-detail-item">
                <Clock size={22} className="visit-icon" />
                <div>
                  <strong>Opening Hours</strong>
                  <p className="visit-hours">12 PM–12 AM daily</p>
                  <span className="visit-hours-sub">Open all 7 days for lunch, family feasts & late dinners.</span>
                </div>
              </div>

              <div className="visit-detail-item">
                <Phone size={22} className="visit-icon" />
                <div>
                  <strong>Direct Reservations & Takeaway</strong>
                  <p>
                    <a href={`tel:${RESTAURANT_INFO.whatsappNumber}`} className="visit-phone-link">
                      +91 95610 19972
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="visit-actions-row">
              <a
                href={RESTAURANT_INFO.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-visit-primary"
              >
                <Compass size={18} />
                <span>VISIT US (DIRECTIONS)</span>
              </a>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-visit-whatsapp"
              >
                <MessageCircle size={18} />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

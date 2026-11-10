import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Camera,
  Maximize2
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import './Gallery.css';

// Curated 21 authentic Maitri Katta restaurant photographs
export const GALLERY_ITEMS = [
  {
    id: 1,
    scene: '01',
    title: 'Pergola Dining Courtyard',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/maitri-pergola-night.webp',
    caption: 'Evening dining under handcrafted wicker lanterns with the warm glow of the Maitri Katta garden lights.',
    aspect: 'landscape',
    gridClass: 'frame-feature-8',
  },
  {
    id: 2,
    scene: '02',
    title: 'Actual Tandoor Skewers',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/IMG-20250504-WA0004.webp',
    caption: 'Live from our clay oven: Pahadi, Banjara and Red Tandoori chicken sizzling fresh off the long metal skewers.',
    aspect: 'portrait',
    gridClass: 'frame-tall-4',
  },
  {
    id: 3,
    scene: '03',
    title: 'Pahadi Kebab on Slate Platter',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/unnamed (11).webp',
    caption: 'Charred mint-marinated chicken kebabs served on rustic black slate with spicy tossed cabbage slaw.',
    aspect: 'landscape',
    gridClass: 'frame-medium-4',
  },
  {
    id: 4,
    scene: '04',
    title: 'Lawn Pavilion at Dusk',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/maitri-garden-pavilion.webp',
    caption: 'Wide-angle view of the garden lawn with stone paving, candlelit tables and surrounding tropical palms.',
    aspect: 'landscape',
    gridClass: 'frame-medium-4',
  },
  {
    id: 5,
    scene: '05',
    title: 'Traditional Ghavan & Solkadhi Thali',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/IMG-20250212-WA0027.webp',
    caption: 'Authentic Maharashtrian feast: lacy rice Ghavan, wild Kokum Solkadhi, dal, country gravies and Gulab Jamun.',
    aspect: 'portrait',
    gridClass: 'frame-tall-4',
  },
  {
    id: 6,
    scene: '06',
    title: 'Evening Katta with Friends',
    category: 'celebrations',
    categoryLabel: 'The People',
    image: '/assets/unnamed (6).webp',
    caption: 'Good food tastes better with the crew. A lively family and friends dinner gathering under the pergola rafters.',
    aspect: 'landscape',
    gridClass: 'frame-feature-8',
  },
  {
    id: 7,
    scene: '07',
    title: 'Chicken Lollipop Platter',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/Indulge_in_the_crispy,_tender_.webp',
    caption: 'Crispy French-trimmed chicken lollipops served with fresh garden salad and spicy Indo-Chinese dipping glaze.',
    aspect: 'square',
    gridClass: 'frame-square-4',
  },
  {
    id: 8,
    scene: '08',
    title: 'Main Hall Booth Seating',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/unnamed (2).webp',
    caption: 'Spacious covered garden dining area with plush mustard and forest green lounge booths for family dinners.',
    aspect: 'landscape',
    gridClass: 'frame-medium-4',
  },
  {
    id: 9,
    scene: '09',
    title: 'Real Birthday Celebration',
    category: 'celebrations',
    categoryLabel: 'The People',
    image: '/assets/Celebrate_your_birthday_at_Mai.webp',
    caption: 'A real family celebrating their daughter’s birthday under the garden canopies at Maitri Katta.',
    aspect: 'square',
    gridClass: 'frame-square-4',
  },
  {
    id: 10,
    scene: '10',
    title: 'Charcoal Skewer Roast',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/unnamed (12).webp',
    caption: 'Sizzling tandoori chicken skewers brushed with spicy garlic butter and charred over glowing embers.',
    aspect: 'square',
    gridClass: 'frame-square-4',
  },
  {
    id: 11,
    scene: '11',
    title: 'Have Some Time — Night Lounge',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/Have-some-time.webp',
    caption: 'Our open dining lawn framed by fairy light strings and comfortable garden sofa seating under starlit skies.',
    aspect: 'landscape',
    gridClass: 'frame-panoramic-12',
  },
  {
    id: 12,
    scene: '12',
    title: 'Grand Party Feast Platter',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/unnamed (7).webp',
    caption: 'A giant family-sized starter platter laden with sizzling kebabs, tandoori specialties and crisp salads.',
    aspect: 'landscape',
    gridClass: 'frame-feature-7',
  },
  {
    id: 13,
    scene: '13',
    title: '“Party Kab Hai?” Wall Mural',
    category: 'celebrations',
    categoryLabel: 'The Moments',
    image: '/assets/party_maitrikatta_ambernatheat.webp',
    caption: 'Hand-painted Bollywood caricature on our restaurant wall — the favorite photo-op for families and kids.',
    aspect: 'portrait',
    gridClass: 'frame-tall-5',
  },
  {
    id: 14,
    scene: '14',
    title: 'Tandoori Tikka with Logo Wall',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/IMG_20250126_220117.webp',
    caption: 'Freshly baked spicy chicken tandoori tikka served against the official Maitri Katta checkered wall.',
    aspect: 'landscape',
    gridClass: 'frame-feature-7',
  },
  {
    id: 15,
    scene: '15',
    title: 'Pergola Walkway with Vintage Cycle',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/unnamed (4).webp',
    caption: 'Illuminated stone path flanked by our signature retro blue delivery bicycle and rustic timber pergolas.',
    aspect: 'portrait',
    gridClass: 'frame-tall-5',
  },
  {
    id: 16,
    scene: '16',
    title: 'Chef Special Gravy Presentation',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/IMG_20250120_203937.webp',
    caption: 'Slow-simmered rich red curry with hand-carved vegetable garnish, prepared for weekend dinner service.',
    aspect: 'portrait',
    gridClass: 'frame-square-4',
  },
  {
    id: 17,
    scene: '17',
    title: 'Covered Dining Lounge',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/unnamed (1).webp',
    caption: 'Relaxed afternoon lounge area featuring low tables, soft cushions, and the iconic MAITRI KATTA wall.',
    aspect: 'portrait',
    gridClass: 'frame-square-4',
  },
  {
    id: 18,
    scene: '18',
    title: 'Rich Red Agri Roast Gravy',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/unnamed (3).webp',
    caption: 'Country style chicken roasted in stone-ground Agri masala, dried coconut, and peppery dark gravy.',
    aspect: 'portrait',
    gridClass: 'frame-tall-4',
  },
  {
    id: 19,
    scene: '19',
    title: 'Candlelit Feast Table',
    category: 'garden',
    categoryLabel: 'The Garden',
    image: '/assets/maitri-table-feast.webp',
    caption: 'Fragrant Dum Biryani in copper handi, fresh tandoor grills and fresh mint coolers at twilight.',
    aspect: 'landscape',
    gridClass: 'frame-feature-8',
  },
  {
    id: 20,
    scene: '20',
    title: 'Crispy Desi Chinese Starter',
    category: 'food',
    categoryLabel: 'The Food',
    image: '/assets/unnamed (5).webp',
    caption: 'Fiery wok-tossed crispy chicken tossed with spring onions, green chillies, and toasted sesame crunch.',
    aspect: 'portrait',
    gridClass: 'frame-square-4',
  },
  {
    id: 21,
    scene: '21',
    title: 'Ambernath Station Heritage Artwork',
    category: 'celebrations',
    categoryLabel: 'The Moments',
    image: '/assets/ambernath-station.webp',
    caption: 'Original architectural artwork celebrating the historic Victorian heritage of Ambernath Railway Station.',
    aspect: 'landscape',
    gridClass: 'frame-feature-8',
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const filteredPhotos = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => {
        if (activeFilter === 'celebrations') {
          return item.category === 'celebrations';
        }
        return item.category === activeFilter;
      });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  const showNextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [lightboxIndex, showPrevPhoto, showNextPhoto]);

  // Touch swipe support for mobile lightbox
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (diff > 50) showPrevPhoto();
    if (diff < -50) showNextPhoto();
    setTouchStartX(null);
  };

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="gallery-editorial-page">
      {/* =========================================================================
          01. GALLERY EDITORIAL INTRODUCTION
          ========================================================================= */}
      <section className="gallery-editorial-hero" aria-label="Gallery Introduction">
        <div className="container-custom gallery-hero-inner">
          <div className="gallery-kicker-tag">
            <span className="kicker-bullet">✦</span>
            <span>MAITRI KATTA · THE GALLERY</span>
            <span className="kicker-bullet">✦</span>
          </div>

          <h1 className="gallery-giant-headline">LIFE AT MAITRI.</h1>

          <p className="gallery-editorial-subheading">
            Every picture has a story.
          </p>

          <p className="gallery-supporting-copy">
            Food, family, celebrations and moments worth remembering.
          </p>

          {/* Understated Filter Bar */}
          <div className="gallery-filter-bar" role="tablist" aria-label="Filter gallery photographs">
            <button
              type="button"
              className={`filter-tab-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <span>All Moments</span>
              <span className="filter-count">({GALLERY_ITEMS.length})</span>
            </button>
            <button
              type="button"
              className={`filter-tab-pill ${activeFilter === 'food' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('food')}
            >
              <span>The Food</span>
              <span className="filter-count">
                ({GALLERY_ITEMS.filter((i) => i.category === 'food').length})
              </span>
            </button>
            <button
              type="button"
              className={`filter-tab-pill ${activeFilter === 'garden' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('garden')}
            >
              <span>The Garden</span>
              <span className="filter-count">
                ({GALLERY_ITEMS.filter((i) => i.category === 'garden').length})
              </span>
            </button>
            <button
              type="button"
              className={`filter-tab-pill ${activeFilter === 'celebrations' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('celebrations')}
            >
              <span>The People & Moments</span>
              <span className="filter-count">
                ({GALLERY_ITEMS.filter((i) => i.category === 'celebrations').length})
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. IRREGULAR EDITORIAL MASONRY / FRAME SPREAD
          ========================================================================= */}
      <main className="gallery-spread-section" aria-label="Photograph Collection">
        <div className="container-custom">
          <div className="gallery-editorial-grid">
            {filteredPhotos.map((photo, index) => (
              <article
                key={photo.id}
                className={`gallery-editorial-card ${photo.gridClass}`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${photo.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
                }}
              >
                <div className="editorial-frame-inner">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="gallery-frame-photo"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="600"
                    height="450"
                  />

                  {/* Subtle Cinematic Scene Badge */}
                  <div className="frame-scene-tag">
                    <span className="scene-num">SCENE {photo.scene}</span>
                    <span className="scene-sep">•</span>
                    <span className="scene-category">{photo.categoryLabel}</span>
                  </div>

                  {/* Minimalist Hover Overlay */}
                  <div className="frame-hover-overlay">
                    <div className="hover-maximize-glyph">
                      <Maximize2 size={20} />
                    </div>
                    <div className="hover-caption-meta">
                      <h3 className="hover-photo-title">{photo.title}</h3>
                      <p className="hover-photo-caption">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* =========================================================================
          03. GALLERY CLOSING SECTION
          ========================================================================= */}
      <section className="gallery-closing-section" aria-label="Gallery Conclusion">
        <div className="container-custom gallery-closing-inner">
          <div className="closing-accent-divider" aria-hidden="true">
            <span className="film-hole-dash" />
            <span className="film-hole-dash" />
            <span className="film-hole-dash" />
          </div>

          <h2 className="gallery-closing-headline">
            GOOD FOOD.<br />
            GREAT PEOPLE.<br />
            BETTER MEMORIES.
          </h2>

          <p className="gallery-closing-subline">
            Some moments are too good to keep in a frame.
          </p>

          <div className="gallery-closing-actions">
            <Link to="/menu" className="btn-gallery-menu">
              <span>EXPLORE COMPLETE MENU</span>
              <ArrowRight size={17} />
            </Link>

            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gallery-whatsapp"
            >
              <MessageCircle size={17} />
              <span>BOOK TABLE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04. PREMIUM FULL-SCREEN LIGHTBOX VIEWER
          ========================================================================= */}
      {currentPhoto && (
        <div
          className="gallery-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${currentPhoto.title}`}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-counter-dock">
              <span className="lightbox-scene-num">SCENE {currentPhoto.scene}</span>
              <span className="lightbox-sep">/</span>
              <span className="lightbox-total">
                {lightboxIndex + 1} OF {filteredPhotos.length}
              </span>
              <span className="lightbox-pill-cat">{currentPhoto.categoryLabel}</span>
            </div>

            <button
              type="button"
              className="btn-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close photo preview"
            >
              <X size={24} />
            </button>
          </div>

          {/* Center Stage with Prev / Next Arrow Controls */}
          <div
            className="lightbox-center-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="lightbox-arrow-btn arrow-prev"
              onClick={showPrevPhoto}
              aria-label="Previous photograph"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="lightbox-photo-canvas">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                className="lightbox-display-img"
              />
            </div>

            <button
              type="button"
              className="lightbox-arrow-btn arrow-next"
              onClick={showNextPhoto}
              aria-label="Next photograph"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Editorial Caption Bar */}
          <div className="lightbox-bottom-tray" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-caption-card">
              <h3 className="lightbox-photo-title">{currentPhoto.title}</h3>
              <p className="lightbox-photo-desc">{currentPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './SpaceModal.css';

const SPACE_GALLERY = [
  {
    title: 'The Evening Pergola Pavilion',
    category: 'AL FRESCO DINING',
    image: '/assets/maitri-pergola-night.jpg',
    description: 'Surrounded by tropical plants and warm woven rattan lanterns, our central pergola creates an intimate family sanctuary under the starlit sky.',
    specs: ['Capacity: 80 Guests', 'Natural Stone Flooring', 'Warm Woven Lanterns', 'Family Style Tables'],
  },
  {
    title: 'Open Garden Pavilion & Lawns',
    category: 'NATURE & AMBIANCE',
    image: '/assets/maitri-garden-pavilion.jpg',
    description: 'An expansive open-air setting cooled by evening garden breezes, perfect for large family gatherings and weekend dinners.',
    specs: ['Capacity: 120 Guests', 'Lawn Seating', 'Live Garden Ambience', 'Fairy Light Canopy'],
  },
  {
    title: 'Signature Culinary Experience',
    category: 'AUTHENTIC KITCHEN',
    image: '/assets/maitri-table-feast.jpg',
    description: 'Savor slow-cooked copper handi biryanis, succulent charcoal kebabs, and authentic multi-cuisine delicacies curated for sharing.',
    specs: ['North Indian & Asian', 'Signature Tawa Masala', 'Smoky Tandoor', 'Vegetarian & Non-Veg'],
  },
  {
    title: 'Lantern-Lit Garden Walkway & Cabanas',
    category: 'EXCLUSIVE SEATING',
    image: '/assets/maitri-garden-walkway.jpg',
    description: 'Meandering stone pathways illuminated by brass lanterns lead to cozy private cabanas designed for memorable celebrations.',
    specs: ['Private Cabanas', 'Romantic & Family Zones', 'Custom Celebration Setup', 'Attentive Service'],
  },
];

export default function SpaceModal({ isOpen, onClose, onBookTable }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SPACE_GALLERY.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SPACE_GALLERY.length) % SPACE_GALLERY.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextSlide, prevSlide]);

  if (!isOpen) return null;

  const current = SPACE_GALLERY[activeIndex];

  return (
    <div className="space-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Our Space Gallery">
      <div className="space-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="space-modal-close"
          onClick={onClose}
          aria-label="Close Space Gallery"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="space-modal-content">
          {/* Main Visual Display */}
          <div className="space-visual-pane">
            <img
              src={current.image}
              alt={current.title}
              className="space-active-img"
              loading="eager"
            />
            
            {/* Gallery Navigation Controls */}
            <button
              type="button"
              className="space-nav-btn space-nav-prev"
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="space-nav-btn space-nav-next"
              onClick={nextSlide}
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            <div className="space-slide-indicator">
              0{activeIndex + 1} / 0{SPACE_GALLERY.length}
            </div>
          </div>

          {/* Editorial Space Details */}
          <div className="space-details-pane">
            <div className="space-details-header">
              <span className="space-category-badge">{current.category}</span>
              <h3 className="space-title">{current.title}</h3>
              <p className="space-description">{current.description}</p>
            </div>

            <div className="space-specs-list">
              {current.specs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-bullet">✦</span>
                  <span className="spec-text">{spec}</span>
                </div>
              ))}
            </div>

            {/* Thumbnail Strip */}
            <div className="space-thumb-strip">
              {SPACE_GALLERY.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`space-mini-thumb ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View ${item.title}`}
                >
                  <img src={item.image} alt={item.title} />
                </button>
              ))}
            </div>

            <div className="space-actions">
              <button
                type="button"
                className="btn-space-book"
                onClick={() => {
                  onClose();
                  onBookTable();
                }}
              >
                Reserve Table In This Area
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './NextSection.css';

export default function NextSection({ onOpenBooking, onOpenSpace }) {
  const experiences = [
    {
      id: 'garden',
      badge: 'ARCHITECTURAL SPACE',
      title: 'Open Garden Pergolas & Lawns',
      description: 'Lush greenery, natural stone paving, and warm woven wicker lanterns creating an inviting evening sanctuary.',
      image: '/assets/maitri-garden-pavilion.jpg',
      meta: '400+ Seating Capacity · Open Air',
    },
    {
      id: 'culinary',
      badge: 'SIGNATURE KITCHEN',
      title: 'North Indian & Asian Traditions',
      description: 'Slow-cooked handi biryanis, smoky charcoal tandoor platters, and vibrant wok-tossed delicacies prepared fresh.',
      image: '/assets/maitri-table-feast.jpg',
      meta: 'Multi-Cuisine · Ambernath Special',
    },
    {
      id: 'cabanas',
      badge: 'FAMILY GATHERINGS',
      title: 'Private Cabanas & Long Tables',
      description: 'Dedicated zones designed for unhurried dinners, family birthdays, anniversaries, and evenings that linger on.',
      image: '/assets/maitri-garden-walkway.jpg',
      meta: 'Family Friendly · Ambient Lighting',
    },
  ];

  return (
    <section className="experience-section" id="experience" aria-label="The Maitri Katta Experience">
      <div className="experience-container">
        {/* Section Header */}
        <header className="experience-header">
          <div className="header-ornament">
            <span className="ornament-line" />
            <span className="ornament-dot" />
            <span className="ornament-line" />
          </div>

          <h2 className="experience-eyebrow">THE MAITRI KATTA EXPERIENCE</h2>
          <p className="experience-lead">A place for good food, garden evenings, and time well spent.</p>
        </header>

        {/* Curated 3-Card Editorial Gallery */}
        <div className="experience-grid">
          {experiences.map((item, idx) => (
            <article key={item.id} className="experience-card">
              <div className="card-media-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-image"
                  loading="lazy"
                />
                <div className="card-badge">{item.badge}</div>
              </div>

              <div className="card-content">
                <div className="card-meta-line">
                  <span className="card-index">0{idx + 1}</span>
                  <span className="card-meta-tag">{item.meta}</span>
                </div>

                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Transition Banner */}
        <div className="experience-cta-strip">
          <div className="cta-strip-text">
            <h4>Plan Your Evening at Maitri Katta</h4>
            <p>Navare Nagar, Ambernath (W) — Open Daily from 1:00 PM to Midnight</p>
          </div>
          <div className="cta-strip-buttons">
            <button type="button" className="btn-strip-primary" onClick={onOpenBooking}>
              Reserve Table
            </button>
            <button type="button" className="btn-strip-secondary" onClick={onOpenSpace}>
              View Venue Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

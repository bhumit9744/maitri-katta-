import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  Users,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import './Contact.css';

// Minimal Instagram Icon matching design system
function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '4',
    date: '',
    time: '08:30 PM',
    seatingPreference: 'garden-pergola',
    notes: '',
  });

  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formError) setFormError('');
  };

  const generateWhatsAppReservationUrl = () => {
    const lines = [
      `*TABLE RESERVATION INQUIRY — MAITRI KATTA* 🌿`,
      ``,
      `👤 *Name:* ${form.name.trim()}`,
      `📞 *Contact Number:* ${form.phone.trim()}`,
      `👥 *Number of Guests:* ${form.guests} Guests`,
      `📅 *Preferred Date:* ${form.date || 'Today / Tonight'}`,
      `⏰ *Preferred Time:* ${form.time}`,
      `🪑 *Seating Area:* ${form.seatingPreference.replace('-', ' ').toUpperCase()}`,
    ];

    if (form.notes.trim()) {
      lines.push(`🎉 *Occasion / Notes:* ${form.notes.trim()}`);
    }

    lines.push(``);
    lines.push(`Kindly verify table availability and confirm our reservation. Thank you!`);

    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError('');
    setSubmitted(true);
    window.open(generateWhatsAppReservationUrl(), '_blank');
  };

  const FAQS = [
    {
      q: 'Do you offer pure vegetarian food and separate Jain preparations?',
      a: 'Yes, absolutely. We have an extensive vegetarian section including Paneer Tandoori specials, Veg Kolhapuri, Dal Khichdi, and soft Ghavan prepared with clean dedicated cookware and fresh ingredients.',
    },
    {
      q: 'Is there parking space available for cars and bikes?',
      a: 'Yes! Maitri Katta has dedicated on-site parking for four-wheelers and two-wheelers right adjacent to the garden entrance, with easy drive-in access.',
    },
    {
      q: 'Can we book tables for birthday celebrations or family gatherings?',
      a: 'Yes, our open-air lawn and pergolas host birthdays, anniversaries, and family get-togethers regularly. Let us know in advance and we can arrange custom seating and cake-cutting areas.',
    },
    {
      q: 'How far is the restaurant from Ambernath Railway Station?',
      a: 'We are situated approximately 5 minutes away from Ambernath Station (East side), easily accessible by auto-rickshaw or personal vehicle via Ambernath-Badlapur Road.',
    },
    {
      q: 'What is the last order timing for dinner?',
      a: 'Our kitchen accepts fresh dinner orders until 11:30 PM, and the dining garden remains open until 12:00 AM midnight daily.',
    },
  ];

  return (
    <div className="contact-editorial-page">
      {/* =========================================================================
          01. COMPACT EDITORIAL HERO SECTION
          ========================================================================= */}
      <section className="contact-editorial-hero" aria-label="Contact and Reservations">
        <div className="contact-hero-scrim" />
        <div className="container-custom contact-hero-content">
          <div className="hero-kicker-row">
            <span className="hero-kicker-dot">•</span>
            <span className="hero-editorial-kicker">MAITRI KATTA · AMBERNATH EAST</span>
            <span className="hero-kicker-dot">•</span>
          </div>

          <h1 className="contact-editorial-headline">
            LET'S MAKE IT A PLAN.
          </h1>

          <p className="contact-editorial-sublead">
            Good food tastes better together. Visit us, book your table or simply get in touch. We'd love to welcome you to Maitri Katta.
          </p>
        </div>
      </section>

      {/* =========================================================================
          02. MAIN TWO-COLUMN CONTACT & RESERVATION SECTION
          ========================================================================= */}
      <section className="contact-two-col-section" aria-label="Visit and Table Reservations">
        <div className="container-custom">
          <div className="contact-editorial-grid">
            {/* LEFT SIDE — VISIT MAITRI KATTA */}
            <div className="contact-info-column">
              <span className="editorial-kicker">VISIT MAITRI KATTA</span>
              <h2 className="editorial-display-heading">COME ON IN.</h2>
              <p className="column-lead-text">
                Under starlit pergolas and open garden lawns, every meal becomes a memory. Walk-ins are always warmly welcomed.
              </p>

              <div className="contact-details-stack">
                {/* Restaurant & Address */}
                <div className="contact-detail-row">
                  <div className="detail-icon-box">
                    <MapPin size={22} className="detail-glyph" />
                  </div>
                  <div className="detail-text-block">
                    <h3 className="detail-item-title">Maitri Katta Family Garden Restaurant</h3>
                    <p className="detail-item-desc">
                      {RESTAURANT_INFO.address.full}
                    </p>
                    <a
                      href={RESTAURANT_INFO.address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-action-link"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="contact-detail-row">
                  <div className="detail-icon-box">
                    <Clock size={22} className="detail-glyph" />
                  </div>
                  <div className="detail-text-block">
                    <h3 className="detail-item-title">Opening Hours</h3>
                    <p className="detail-item-desc">
                      <strong>12:00 PM – 12:00 AM</strong> daily
                    </p>
                    <span className="detail-sub-caption">Serving fresh lunch, afternoon kattas, and candlelit dinners 7 days a week.</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-row">
                  <div className="detail-icon-box">
                    <Phone size={22} className="detail-glyph" />
                  </div>
                  <div className="detail-text-block">
                    <h3 className="detail-item-title">Direct Restaurant Phone</h3>
                    <a href={`tel:${RESTAURANT_INFO.whatsappNumber}`} className="detail-phone-link">
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                    <span className="detail-sub-caption">Available daily for table inquiries and takeout orders.</span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="contact-detail-row">
                  <div className="detail-icon-box">
                    <InstagramIcon size={22} className="detail-glyph" />
                  </div>
                  <div className="detail-text-block">
                    <h3 className="detail-item-title">Follow Our Story</h3>
                    <a
                      href={RESTAURANT_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-insta-link"
                    >
                      @maitri_katta_restaurant
                    </a>
                    <span className="detail-sub-caption">Behind-the-scenes recipes, weekend kattas, and festive moments.</span>
                  </div>
                </div>
              </div>

              {/* Small Visual Highlights */}
              <div className="contact-highlights-bar">
                <div className="highlight-pill">
                  <UtensilsCrossed size={15} />
                  <span>Family-friendly garden seating</span>
                </div>
                <div className="highlight-pill">
                  <Sparkles size={15} />
                  <span>Lunch & dinner</span>
                </div>
                <div className="highlight-pill">
                  <Users size={15} />
                  <span>Family gatherings & celebrations</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — RESERVE YOUR TABLE */}
            <div className="contact-reservation-column">
              <div className="reservation-editorial-card">
                <div className="reservation-card-header">
                  <span className="editorial-kicker">TABLE RESERVATIONS</span>
                  <h2 className="editorial-display-heading">YOUR TABLE IS WAITING.</h2>
                  <p className="reservation-card-subtitle">
                    Select your party size and preferred time. We will format your inquiry directly for quick WhatsApp verification.
                  </p>
                </div>

                {formError && (
                  <div className="form-alert-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{formError}</span>
                  </div>
                )}

                {submitted && (
                  <div className="form-success-banner" role="status">
                    <CheckCircle2 size={18} />
                    <span>Inquiry opened in WhatsApp! Our team will reply shortly to confirm.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="reservation-editorial-form" noValidate>
                  {/* Row 1: Name & Phone */}
                  <div className="form-fields-grid-2">
                    <div className="form-field-group">
                      <label htmlFor="res-name" className="field-label">
                        Full Name <span className="label-required">*</span>
                      </label>
                      <input
                        id="res-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Anand Kulkarni"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="res-phone" className="field-label">
                        Mobile Number <span className="label-required">*</span>
                      </label>
                      <input
                        id="res-phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. 98200 12345"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Guests & Seating Preference */}
                  <div className="form-fields-grid-2">
                    <div className="form-field-group">
                      <label htmlFor="res-guests" className="field-label">
                        Number of Guests
                      </label>
                      <select
                        id="res-guests"
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="field-select"
                      >
                        <option value="2">2 Guests (Couple Table)</option>
                        <option value="4">4 Guests (Family Table)</option>
                        <option value="6">6 Guests (Garden Table)</option>
                        <option value="8">8 Guests (Large Pergola)</option>
                        <option value="12+">12+ Guests (Party Feast)</option>
                        <option value="25+">25+ Guests (Private Lawn)</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="res-seating" className="field-label">
                        Seating Preference
                      </label>
                      <select
                        id="res-seating"
                        name="seatingPreference"
                        value={form.seatingPreference}
                        onChange={handleChange}
                        className="field-select"
                      >
                        <option value="garden-pergola">Garden Pergola (Lantern-lit)</option>
                        <option value="open-lawn">Open Dining Lawn</option>
                        <option value="sheltered-pavilion">Sheltered Pavilion</option>
                        <option value="any">First Available Table</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Date & Time */}
                  <div className="form-fields-grid-2">
                    <div className="form-field-group">
                      <label htmlFor="res-date" className="field-label">
                        Preferred Date
                      </label>
                      <input
                        id="res-date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="field-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="res-time" className="field-label">
                        Preferred Time
                      </label>
                      <select
                        id="res-time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="field-select"
                      >
                        <option value="12:30 PM">12:30 PM (Lunch)</option>
                        <option value="01:30 PM">01:30 PM (Lunch)</option>
                        <option value="07:30 PM">07:30 PM (Dinner)</option>
                        <option value="08:30 PM">08:30 PM (Peak Dinner)</option>
                        <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                        <option value="10:15 PM">10:15 PM (Last Seating)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Occasion / Special Requests */}
                  <div className="form-field-group field-full-width">
                    <label htmlFor="res-notes" className="field-label">
                      Occasion / Special Requests (Optional)
                    </label>
                    <textarea
                      id="res-notes"
                      name="notes"
                      rows={2}
                      placeholder="e.g. Birthday celebration, cake-cutting table, highchair for toddler"
                      value={form.notes}
                      onChange={handleChange}
                      className="field-textarea"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button type="submit" className="btn-confirm-whatsapp">
                    <MessageCircle size={20} className="cta-icon-glyph" />
                    <span>CONFIRM VIA WHATSAPP →</span>
                  </button>

                  {/* Verification Note */}
                  <p className="reservation-verification-note">
                    * Please note: Opening WhatsApp sends your reservation inquiry. Our team will verify live table availability and reply with your official booking confirmation.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. MAP AND LOCATION SECTION
          ========================================================================= */}
      <section className="contact-map-section" aria-label="Restaurant Map Location">
        <div className="container-custom">
          <div className="map-section-header">
            <span className="editorial-kicker">EASY TO REACH</span>
            <h2 className="editorial-display-heading">FIND US ON THE MAP.</h2>
            <p className="map-section-sublead">
              Your next favourite food destination is closer than you think. Conveniently situated in Ambernath East with smooth highway access and on-site parking.
            </p>
          </div>

          <div className="map-integration-layout">
            {/* Embedded Google Map */}
            <div className="map-frame-wrapper">
              <iframe
                title="Google Maps Location for Maitri Katta Family Garden Restaurant"
                src={RESTAURANT_INFO.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe"
              />
            </div>

            {/* Beside Map Landmark Details */}
            <div className="map-location-card">
              <div className="location-card-photo-box">
                <img
                  src="/assets/editorial-garden-photo.webp"
                  alt="Maitri Katta welcoming open-air garden walkway"
                  className="location-card-photo"
                  loading="lazy"
                  width="400"
                  height="240"
                />
                <span className="location-photo-badge">AMBERNATH EAST</span>
              </div>

              <div className="location-card-content">
                <span className="location-sub-kicker">LANDMARK DIRECTIONS</span>
                <h3 className="location-card-title">Maitri Katta</h3>
                <p className="location-card-address">
                  {RESTAURANT_INFO.address.full}
                </p>

                <ul className="landmark-bullet-list">
                  <li>
                    <span className="bullet-glyph">✦</span>
                    <span><strong>5 Minutes</strong> from Ambernath Railway Station (East)</span>
                  </li>
                  <li>
                    <span className="bullet-glyph">✦</span>
                    <span>Near Panvelkar Green City & Chikhaloli road junction</span>
                  </li>
                  <li>
                    <span className="bullet-glyph">✦</span>
                    <span>Dedicated complimentary parking for cars and two-wheelers</span>
                  </li>
                </ul>

                <a
                  href={RESTAURANT_INFO.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-directions-maps"
                >
                  <MapPin size={16} />
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="contact-faq-section" aria-label="Frequently Asked Questions">
        <div className="container-custom">
          <div className="faq-section-header">
            <span className="editorial-kicker">GOOD TO KNOW</span>
            <h2 className="editorial-display-heading">A FEW THINGS TO KNOW.</h2>
            <p className="faq-section-sublead">
              Everything you need to know about our garden dining, celebrations, and kitchen policies.
            </p>
          </div>

          <div className="faq-accordion-container">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. FINAL EDITORIAL CTA
          ========================================================================= */}
      <section className="contact-final-cta" aria-label="Closing Call to Action">
        <div className="container-custom contact-final-inner">
          <span className="final-cta-kicker">WELCOME TO MAITRI KATTA</span>
          <h2 className="final-cta-headline">
            GOOD FOOD. GREAT COMPANY. SEE YOU SOON.
          </h2>
          <p className="final-cta-copy">
            Whether it’s a spontaneous family dinner or a planned weekend celebration, our tables are ready.
          </p>

          <div className="final-cta-buttons">
            <a href={`tel:${RESTAURANT_INFO.whatsappNumber}`} className="btn-final-call">
              <Phone size={17} />
              <span>Call Us: {RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            <a
              href={RESTAURANT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-final-whatsapp"
            >
              <MessageCircle size={17} />
              <span>Order on WhatsApp</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { MapPin, Phone, Clock } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="site-footer" id="contact" aria-label="Restaurant Information and Contact">
      {/* Celebrations & Events Anchor Section */}
      <section className="celebrations-strip" id="celebrations">
        <div className="celebrations-container">
          <div className="celebrations-info" id="events">
            <span className="celebrations-eyebrow">HOST WITH US</span>
            <h3 className="celebrations-title">Celebrations & Private Garden Events</h3>
            <p className="celebrations-desc">
              From milestone birthdays and family anniversaries to corporate dinners, our garden cabanas and lawns provide the perfect open-air backdrop.
            </p>
          </div>
          <button type="button" className="btn-events-inquire" onClick={onOpenBooking}>
            Plan an Event
          </button>
        </div>
      </section>

      {/* Main Footer Details */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img
                src="/assets/maitri-katta-logo-transparent.png"
                alt="मैत्री कट्टा - Maitri Katta"
                className="footer-logo"
              />
              <div className="footer-brand-titles">
                <h4>MAITRI KATTA</h4>
                <p>Family Garden Restaurant</p>
              </div>
            </div>
            <p className="footer-tagline">
              Good food. Your people. Long evenings under the open Maharashtra sky.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-heading">NAVIGATION</h5>
            <ul className="footer-nav">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#experience">Our Space</a></li>
              <li><a href="#celebrations">Celebrations</a></li>
              <li><a href="#events">Private Events</a></li>
              <li><a href="#contact">Contact & Location</a></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="footer-col">
            <h5 className="footer-heading">HOURS & LOCATION</h5>
            <div className="footer-meta-list">
              <div className="meta-row">
                <Clock size={16} className="meta-icon" />
                <div>
                  <strong>Open Daily</strong>
                  <p>1:00 PM – 12:00 AM (Midnight)</p>
                </div>
              </div>
              <div className="meta-row">
                <MapPin size={16} className="meta-icon" />
                <div>
                  <strong>Ambernath, Maharashtra</strong>
                  <p>Navare Nagar / MIDC Area, Ambernath (W), Thane District - 421501</p>
                </div>
              </div>
              <div className="meta-row">
                <Phone size={16} className="meta-icon" />
                <div>
                  <strong>Reservations & Dineout</strong>
                  <p>+91 98200 00000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="footer-bottom">
        <div className="footer-container bottom-container">
          <p>© 2026 Maitri Katta Family Garden Restaurant. All rights reserved.</p>
          <p className="footer-subtle">Ambernath, Maharashtra · Premium Dining Experience</p>
        </div>
      </div>
    </footer>
  );
}

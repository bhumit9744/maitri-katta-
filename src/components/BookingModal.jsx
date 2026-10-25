import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import './BookingModal.css';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    guests: '4',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    area: 'Central Garden Pergola',
    occasion: 'Casual Dinner',
  }));

  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = 'MK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Reserve a Table">
      <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="booking-close-btn"
          onClick={onClose}
          aria-label="Close Reservation Form"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {!confirmed ? (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="booking-header">
              <span className="booking-eyebrow">RESERVATIONS</span>
              <h3 className="booking-title">Book a Garden Table</h3>
              <p className="booking-subtitle">
                Maitri Katta Family Garden Restaurant · Ambernath, Maharashtra
              </p>
            </div>

            <div className="booking-fields">
              <div className="form-group">
                <label htmlFor="b-name">FULL NAME</label>
                <input
                  id="b-name"
                  type="text"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="b-phone">PHONE NUMBER</label>
                <input
                  id="b-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="b-guests">GUESTS</label>
                  <select
                    id="b-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  >
                    <option value="2">2 Guests (Couple)</option>
                    <option value="4">4 Guests (Family)</option>
                    <option value="6">6 Guests (Group)</option>
                    <option value="8">8 Guests (Celebration)</option>
                    <option value="12">12+ Guests (Large Party)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="b-date">DATE</label>
                  <input
                    id="b-date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="b-time">PREFERRED TIME</label>
                  <select
                    id="b-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <optgroup label="Evening Dining (Recommended)">
                      <option value="19:00">7:00 PM (Sunset Dusk)</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM (Peak Ambiance)</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </optgroup>
                    <optgroup label="Afternoon Dining">
                      <option value="13:00">1:00 PM (Lunch)</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="b-area">SEATING ZONE</label>
                  <select
                    id="b-area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  >
                    <option value="Central Garden Pergola">Central Garden Pergola</option>
                    <option value="Private Family Cabana">Private Family Cabana</option>
                    <option value="Open Starlit Lawn">Open Starlit Lawn</option>
                    <option value="Lantern Walkway Patio">Lantern Walkway Patio</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="b-occasion">SPECIAL OCCASION</label>
                <select
                  id="b-occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                >
                  <option value="Casual Dinner">Casual Family Dinner</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary Gathering</option>
                  <option value="Get-together">Friends & Colleagues Reunion</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-confirm-booking">
              Confirm Table Reservation
            </button>
          </form>
        ) : (
          <div className="booking-success-view">
            <div className="success-icon-circle">
              <Check size={28} strokeWidth={2.2} />
            </div>
            <span className="success-eyebrow">RESERVATION CONFIRMED</span>
            <h3 className="success-title">We Look Forward to Welcoming You</h3>
            <p className="success-message">
              Thank you, <strong>{formData.name}</strong>. Your table at Maitri Katta has been reserved for{' '}
              <strong>{formData.guests} guests</strong> on <strong>{formData.date}</strong> at{' '}
              <strong>{formData.time}</strong> in the <strong>{formData.area}</strong>.
            </p>

            <div className="booking-ref-card">
              <span className="ref-label">RESERVATION REFERENCE</span>
              <span className="ref-code">{bookingRef}</span>
              <span className="ref-note">Present this code upon arrival</span>
            </div>

            <button type="button" className="btn-success-done" onClick={handleReset}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

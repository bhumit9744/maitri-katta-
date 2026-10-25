import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import './MenuModal.css';

const FULL_MENU = {
  tandoor: {
    category: 'Tandoor & Starters',
    items: [
      { name: 'Chicken Kebab Skewers', desc: 'Charcoal charred chicken thigh marinated in crushed black pepper, burnt garlic, and tandoori spices.', price: '₹320', badge: 'FAVOURITE' },
      { name: 'Kashmiri Malai Seekh Kebab', desc: 'Melt-in-mouth minced mutton skewers infused with green cardamom, saffron, and cheese.', price: '₹440', badge: 'SIGNATURE' },
      { name: 'Paneer Tikka Zaffrani', desc: 'Cottage cheese cubes steeped in hung curd, Kashmiri chilies, and aromatic carom seeds.', price: '₹380', badge: 'VEG SPECIAL' },
      { name: 'Tandoori Jheenga (Tiger Prawns)', desc: 'Coastal tiger prawns roasted in charcoal clay tandoor with coastal yellow mustard.', price: '₹520', badge: 'SEAFOOD SPECIAL' },
    ],
  },
  curries: {
    category: 'Mains & Agri Curries',
    items: [
      { name: 'Mutton Lapeta (Agri Style)', desc: 'Traditional slow-roasted Agri preparation with dark roasted coconut-onion masala, best with ghavna.', price: '₹380', badge: 'HOUSE SPECIAL' },
      { name: 'Prawns Tawa Fry', desc: 'Juicy coastal prawns pan-tossed in fiery red coastal masala, lemon juice, and roasted spices.', price: '₹420', badge: 'SEAFOOD BESTSELLER' },
      { name: 'Chicken Tawa Masala', desc: 'Semi-dry spicy chicken tossed on heavy iron tawa with crushed roasted coriander and fenugreek.', price: '₹360', badge: 'POPULAR' },
      { name: 'Dal Bukhara Overnight Simmered', desc: 'Whole black lentils slow-cooked overnight with vine tomatoes, white butter, and gentle cream.', price: '₹280', badge: 'CLASSIC' },
    ],
  },
  biryani: {
    category: 'Handi Dum Biryani',
    items: [
      { name: 'Khudar Special Veg Biryani', desc: 'Rich flavours, generous portions with aged basmati rice, royal vegetables, and golden cashews.', price: '₹280', badge: 'POPULAR' },
      { name: 'Ambernath Handi Chicken Biryani', desc: 'Fragrant long-grain basmati layered with tender spiced chicken, saffron broth, and fried onions.', price: '₹390', badge: 'BESTSELLER' },
      { name: 'Agri Mutton Dum Biryani', desc: 'Slow dum-cooked spiced mutton with regional spice blend, fresh mint bouquet, and brown garlic.', price: '₹480', badge: 'CHEF RECOMMENDED' },
    ],
  },
  chinese: {
    category: 'Indo-Chinese Wok',
    items: [
      { name: 'Crispy Dragon Chicken', desc: 'Tender chicken strips wok-tossed in fiery red chili sauce, spring onions, and roasted whole cashews.', price: '₹340', badge: 'POPULAR' },
      { name: 'Burnt Garlic Fried Rice', desc: 'Wok-charred fragrant rice scented with golden garlic, served with house-made fiery chili bean dip.', price: '₹290', badge: 'FAVOURITE' },
      { name: 'Chili Paneer Dry (Hakka Style)', desc: 'Crisp paneer cubes wok-flashed with bell peppers, green chilies, and dark artisanal soy.', price: '₹310', badge: 'VEG DELIGHT' },
    ],
  },
};

export default function MenuModal({ isOpen, onClose, onBookTable }) {
  const [activeTab, setActiveTab] = useState('tandoor');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="menu-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="menu-modal-title">
      <div className="menu-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="menu-modal-close" onClick={onClose} aria-label="Close menu modal">
          <X size={20} />
        </button>

        <header className="menu-modal-header">
          <span className="menu-modal-eyebrow">MAITRI KATTA · CULINARY ARCHIVE</span>
          <h2 id="menu-modal-title" className="menu-modal-title">Complete Restaurant Menu</h2>
          <p className="menu-modal-subtitle">
            Authentic coastal Agri specialties, charcoal tandoor delicacies, and rich garden recipes prepared fresh to order.
          </p>
        </header>

        {/* Categories Tab Navigation */}
        <div className="menu-modal-tabs">
          {Object.entries(FULL_MENU).map(([key, data]) => (
            <button
              key={key}
              type="button"
              className={`menu-modal-tab-btn ${activeTab === key ? 'is-active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {data.category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="menu-modal-grid">
          {FULL_MENU[activeTab].items.map((item, i) => (
            <div key={i} className="menu-modal-dish-row">
              <div className="modal-dish-head">
                <h4 className="modal-dish-name">{item.name}</h4>
                <div className="modal-dish-divider" />
                <span className="modal-dish-price">{item.price}</span>
              </div>
              <p className="modal-dish-desc">{item.desc}</p>
              {item.badge && <span className="modal-dish-badge">{item.badge}</span>}
            </div>
          ))}
        </div>

        {/* Modal Footer CTA */}
        <footer className="menu-modal-footer">
          <p className="modal-footer-note">
            Prices are exclusive of applicable taxes. Fresh ingredients sourced daily.
          </p>
          <button
            type="button"
            className="btn-modal-reserve"
            onClick={() => {
              onClose();
              onBookTable();
            }}
          >
            <Calendar size={16} />
            <span>RESERVE TABLE FOR DINNER</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

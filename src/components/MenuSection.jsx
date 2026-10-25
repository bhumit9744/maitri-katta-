import React, { useState } from 'react';
import { Utensils, Flame, Leaf, Award } from 'lucide-react';
import './MenuSection.css';

const MENU_CATEGORIES = [
  { id: 'tandoor', label: 'Tandoor & Starters', icon: Flame },
  { id: 'mains', label: 'Signature Curries & Biryani', icon: Award },
  { id: 'chinese', label: 'Asian & Chinese', icon: Utensils },
  { id: 'garden', label: 'Vegetarian Specialties', icon: Leaf },
];

const MENU_ITEMS = {
  tandoor: [
    {
      name: 'Maitri Special Murgh Tawa Angaar',
      desc: 'Slow-charred chicken thigh marinated in crushed black pepper, burnt garlic, and royal spices.',
      price: '₹380',
      badge: 'CHEF RECOMMENDED',
    },
    {
      name: 'Kashmiri Malai Seekh Kebab',
      desc: 'Melt-in-mouth minced mutton skewers infused with green cardamom, saffron, and cheese.',
      price: '₹440',
      badge: 'SIGNATURE',
    },
    {
      name: 'Paneer Tandoori Tikka Zaffrani',
      desc: 'Cottage cheese cubes steeped in hung curd, Kashmiri chilies, and aromatic carom seeds.',
      price: '₹320',
      badge: 'POPULAR',
    },
    {
      name: 'Tandoori Jheenga (Tiger Prawns)',
      desc: 'Coastal tiger prawns roasted in charcoal clay tandoor with coastal yellow mustard.',
      price: '₹520',
      badge: 'SEAFOOD SPECIAL',
    },
  ],
  mains: [
    {
      name: 'Ambernath Handi Dum Biryani',
      desc: 'Fragrant aged long-grain basmati rice layered with spiced meat, saffron broth, and caramelized shallots.',
      price: '₹390',
      badge: 'BESTSELLER',
    },
    {
      name: 'Chicken Tawa Masala (Maitri Style)',
      desc: 'Semi-dry spicy chicken tossed on heavy iron tawa with crushed roasted coriander and dried fenugreek.',
      price: '₹360',
      badge: 'HOUSE SPECIAL',
    },
    {
      name: 'Dal Bukhara Overnight Simmered',
      desc: 'Whole black lentils slow-cooked overnight with vine tomatoes, white butter, and gentle cream.',
      price: '₹280',
      badge: 'CLASSIC',
    },
    {
      name: 'Butter Garlic Naan & Kulcha Basket',
      desc: 'Assortment of wood-fired leavened breads brushed with melted farm butter and roasted garlic.',
      price: '₹180',
      badge: 'ACCOMPANIMENT',
    },
  ],
  chinese: [
    {
      name: 'Crispy Dragon Chicken & Cashews',
      desc: 'Tender chicken strips wok-tossed in fiery red chili sauce, spring onions, and roasted whole cashews.',
      price: '₹340',
      badge: 'POPULAR',
    },
    {
      name: 'Burnt Garlic Fried Rice with Schezwan Gravy',
      desc: 'Wok-charred fragrant rice scented with golden garlic, served with house-made fiery chili bean dip.',
      price: '₹290',
      badge: 'FAVOURITE',
    },
    {
      name: 'Chili Paneer Dry (Hakka Style)',
      desc: 'Crisp paneer cubes wok-flashed with bell peppers, green chilies, and dark artisanal soy.',
      price: '₹310',
      badge: 'VEG DELIGHT',
    },
  ],
  garden: [
    {
      name: 'Paneer Lababdar Awadhi',
      desc: 'Fresh paneer simmers in a luscious cashew, onion, and melon seed gravy finished with fresh cream.',
      price: '₹320',
      badge: 'VEG SPECIAL',
    },
    {
      name: 'Subz Miloni Handi',
      desc: 'Seasonal farm-fresh garden greens and corn tossed in rich spinach and garlic reduction.',
      price: '₹280',
      badge: 'FARM FRESH',
    },
    {
      name: 'Veg Dum Pukht Biryani',
      desc: 'Basmati rice cooked on charcoal embers with baby vegetables, rose water, and mint bouquet.',
      price: '₹310',
      badge: 'ROYAL DUM',
    },
  ],
};

export default function MenuSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('tandoor');

  return (
    <section className="menu-section" id="menu" aria-label="Maitri Katta Menu">
      <div className="menu-container">
        <header className="menu-header">
          <span className="menu-eyebrow">THE CULINARY REPERTOIRE</span>
          <h2 className="menu-title">Curated Flavours of Maitri Katta</h2>
          <p className="menu-subtitle">
            Authentic North Indian tandoor, royal handi biryanis, and sizzling Asian wok creations prepared with passion.
          </p>
        </header>

        {/* Categories Tab Bar */}
        <div className="menu-tab-bar" role="tablist">
          {MENU_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`menu-tab-btn ${activeTab === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <Icon size={16} strokeWidth={1.8} className="tab-icon" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items List */}
        <div className="menu-items-grid">
          {MENU_ITEMS[activeTab].map((item, idx) => (
            <article key={idx} className="menu-dish-card">
              <div className="dish-top-line">
                <div className="dish-title-group">
                  <h3 className="dish-name">{item.name}</h3>
                  <span className="dish-badge">{item.badge}</span>
                </div>
                <div className="dish-divider" />
                <span className="dish-price">{item.price}</span>
              </div>
              <p className="dish-desc">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Bottom Menu Action */}
        <div className="menu-bottom-note">
          <p>
            * All dishes are prepared fresh to order using certified ingredients. Taxes as applicable.
          </p>
          <button type="button" className="btn-menu-reserve" onClick={onOpenBooking}>
            Reserve Table for Dinner
          </button>
        </div>
      </div>
    </section>
  );
}

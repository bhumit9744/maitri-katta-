import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ArrowRight,
  X,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Soup,
  Drumstick,
  CookingPot,
  ChefHat,
  Wheat,
  GlassWater,
  IceCream,
  MessageCircle,
  Clock,
  Award,
  ExternalLink
} from 'lucide-react';
import './Menu.css';

// Category icons mapping
const CATEGORY_ICONS = {
  all: Sparkles,
  agri: Flame,
  tandoor: UtensilsCrossed,
  biryani: Soup,
  starters: Drumstick,
  chinese: CookingPot,
  'main-course': ChefHat,
  'breads-rice': Wheat,
  mocktails: GlassWater,
  desserts: IceCream,
};

// Curated Category Personalities & Visual Compositions
// Composition A: Signature Spotlight Hero + Rows (Agri, Biryani, Curries)
// Composition B: Standard Clean Editorial Rows (Breads & Rice, Mocktails, Desserts)
// Composition C: Featured Food Moments - Split Atmosphere Banner + Rows (Tandoor, Chinese, Starters)
const CATEGORY_CONFIGS = {
  agri: {
    layoutType: 'signature-hero', // Composition A
    kicker: 'AGRI HERITAGE',
    headline: 'AGRI SPECIALS.',
    subtext: 'The Taste of Tradition.',
    description: 'Slow-simmered in clay handis with dark stone-ground Agri masala, roasted dry coconut, and black peppercorn.',
    signatureId: 'agri-mutton-lapeta',
    badgeText: 'CHEF’S ASLI PRIDE',
  },
  tandoor: {
    layoutType: 'food-moment', // Composition C
    kicker: 'CLAY OVEN ROASTS',
    headline: 'TANDOOR KI AAG SE.',
    subtext: 'Smoked Over Glowing Charcoal.',
    description: 'Charcoal-grilled to smoky perfection, marinated in hung curd, Kashmiri deghi mirch, and fresh mountain mint.',
    signatureId: 'chicken-tandoori',
    momentTag: 'CHARCOAL EMBERS · LIVE CLAY ROAST',
    momentBadge: 'FIRE-KISSED TANDOOR',
  },
  biryani: {
    layoutType: 'signature-hero', // Composition A
    kicker: 'DUM PUKHT ROYAL HEARTH',
    headline: 'BIRYANI & KEPSA.',
    subtext: 'The Art of Aroma & Dum.',
    description: 'Aromatic long-grain basmati rice layered with spiced meat, saffron, and caramelised onions sealed on slow coal dum.',
    signatureId: 'chicken-kepsa',
    badgeText: 'ROYAL FEAST',
  },
  starters: {
    layoutType: 'food-moment', // Composition C
    kicker: 'CRISPY APPETIZERS',
    headline: 'STARTERS & CRISPIES.',
    subtext: 'Crunch, Sizzle & Fresh Spices.',
    description: 'Irresistible bites tossed with garlic, curry leaves, crushed pepper, and zesty house dipping chutneys.',
    signatureId: 'chicken-lollipop',
    momentTag: 'CRUNCH & SPICE · SIZZLING APPETISERS',
    momentBadge: 'CRISPY BLOCKBUSTER',
  },
  chinese: {
    layoutType: 'food-moment', // Composition C
    kicker: 'INDO-CHINESE WOK',
    headline: 'CHINESE WOK.',
    subtext: 'Fresh from the Roaring Wok.',
    description: 'Tossed on roaring wok flames with dark soya, spring onions, fresh ginger, and fiery crushed chillies.',
    signatureId: 'dragon-chicken',
    momentTag: 'HIGH-HEAT FLAMES · WOK HEI SIZZLE',
    momentBadge: 'WOK SIGNATURE',
  },
  'main-course': {
    layoutType: 'signature-hero', // Composition A
    kicker: 'RICH HERITAGE GRAVIES',
    headline: 'CURRIES & GRAVIES.',
    subtext: 'Slow Simmered to Perfection.',
    description: 'Velvety makhani sauces, spiced kadas, and homestyle onion-tomato masala gravies cooked fresh daily.',
    signatureId: 'butter-chicken',
    badgeText: 'MAITRI CLASSIC',
  },
  'breads-rice': {
    layoutType: 'standard-rows', // Composition B
    kicker: 'OVEN & HEARTH',
    headline: 'BREADS & RICE.',
    subtext: 'Fresh Tandoor Rotis & Fragrant Basmati.',
    description: 'Soft butter naans, crispy Agri bhakris, delicate rice ghavans, and steaming jeera basmati rice.',
    signatureId: null,
  },
  mocktails: {
    layoutType: 'standard-rows', // Composition B
    kicker: 'CHILLED REFRESHERS',
    headline: 'MOCKTAILS & DRINKS.',
    subtext: 'Chilled, Shaken & Refreshing.',
    description: 'Digestive fresh coconut milk Solkadhi, spiced buttermilk, and hand-crafted coolers.',
    signatureId: null,
  },
  desserts: {
    layoutType: 'standard-rows', // Composition B
    kicker: 'SWEET FINALES',
    headline: 'DESSERTS & SHAKES.',
    subtext: 'Pure Sweet Indulgence.',
    description: 'Warm gulab jamuns, thick royal milkshakes, and creamy matka kulfi to end your feast on a sweet note.',
    signatureId: null,
  },
};

// Flagship Signature Dishes for the Living Menu Hero Carousel
const HERO_SIGNATURE_DISHES = [
  {
    id: 'agri-mutton-lapeta',
    name: 'Mutton Lapeta (Agri Special)',
    category: 'agri',
    categoryLabel: 'AGRI HERITAGE',
    price: 750,
    isVeg: false,
    description: 'Slow-simmered tender mutton wrapped in authentic stone-ground Agri masala, roasted dry coconut, and dark aromatic gravy.',
    badge: 'Signature Agri Legend',
    image: '/assets/mutton-lapeta.webp',
  },
  {
    id: 'chicken-kepsa',
    name: 'Chicken Kepsa (Dum Pukht)',
    category: 'biryani',
    categoryLabel: 'ROYAL BIRYANI',
    price: 750,
    options: [{ label: 'Half', price: 750 }, { label: 'Full', price: 1300 }],
    isVeg: false,
    description: 'Fragrant long-grain saffron basmati layered with tender spiced chicken, caramelised onions and boiled egg garnishing.',
    badge: 'Celebration Feast',
    image: '/assets/dishes/chicken-kepsa.webp',
  },
  {
    id: 'chicken-tandoori',
    name: 'Tandoori Chicken (Charcoal Roasted)',
    category: 'tandoor',
    categoryLabel: 'CLAY OVEN ROASTS',
    price: 330,
    options: [{ label: 'Half', price: 330 }, { label: 'Full', price: 550 }],
    isVeg: false,
    description: 'Charcoal-grilled to smoky perfection, marinated in hung curd, Kashmiri deghi mirch, and fresh mountain mint.',
    badge: 'Straight from the Fire',
    image: '/assets/IMG_20250126_220117.webp',
  },
  {
    id: 'dragon-chicken',
    name: 'Dragon Chicken (Crispy Wok)',
    category: 'chinese',
    categoryLabel: 'CHINESE WOK',
    price: 399,
    isVeg: false,
    description: 'Fiery wok-tossed crispy chicken strips coated in spicy red chilli glaze, toasted cashews and fresh scallions.',
    badge: 'Wok Blockbuster',
    image: '/assets/dragon-chicken.webp',
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken (Murgh Makhani)',
    category: 'main-course',
    categoryLabel: 'CURRIES & GRAVIES',
    price: 550,
    options: [{ label: 'Half', price: 550 }, { label: 'Full', price: 850 }],
    isVeg: false,
    description: 'Tender tandoor chicken pieces cooked in a rich, buttery tomato and cashew nut makhani gravy with kasuri methi.',
    badge: 'All-Time Classic',
    image: '/assets/dishes/butter-chicken.webp',
  },
];

export default function Menu() {
  const {
    items,
    addToCart,
    updateQuantity,
    openCart,
    totalCount,
    grandTotal,
    getWhatsAppOrderUrl,
  } = useCart();

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeScrollCategory, setActiveScrollCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addedItemAnim, setAddedItemAnim] = useState(null);

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroIsPaused, setHeroIsPaused] = useState(false);

  // Category section refs for scrollspy
  const categorySectionRefs = useRef({});
  const navTrackRef = useRef(null);

  // Auto-advance hero carousel
  useEffect(() => {
    if (heroIsPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SIGNATURE_DISHES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroIsPaused]);

  const activeHeroDish = HERO_SIGNATURE_DISHES[heroIndex];

  // Option selection
  const handleSelectOption = (dishId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [dishId]: option }));
  };

  // Add to cart with feedback
  const handleAddWithFeedback = (dish, option = null) => {
    addToCart(dish, option);
    const key = `${dish.id}_${option?.label || 'default'}`;
    setAddedItemAnim(key);
    setTimeout(() => {
      setAddedItemAnim((curr) => (curr === key ? null : curr));
    }, 1200);
  };

  // Helper to get cart quantity for an item/option
  const getItemCartInfo = useCallback(
    (dish, option = null) => {
      const optionLabel = option?.label || null;
      const key = `${dish.id}_${optionLabel || 'default'}`;
      const found = items.find((i) => i.cartKey === key);
      return {
        cartKey: key,
        quantity: found ? found.quantity : 0,
      };
    },
    [items]
  );

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter (if specific category chosen in single-view)
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, dietFilter]);

  // Group dishes by category if 'all' is active
  const groupedDishes = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) {
      return null;
    }
    const groups = {};
    MENU_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') return;
      const catItems = filteredDishes.filter((dish) => dish.category === cat.id);
      if (catItems.length > 0) {
        groups[cat.id] = {
          id: cat.id,
          label: cat.label,
          config: CATEGORY_CONFIGS[cat.id] || {
            layoutType: 'standard-rows',
            kicker: 'OUR SELECTION',
            headline: cat.label.toUpperCase(),
            subtext: 'Crafted with passion.',
            description: 'Authentic flavours prepared fresh for every order.',
            signatureId: null,
          },
          items: catItems,
        };
      }
    });
    return groups;
  }, [selectedCategory, searchQuery, filteredDishes]);

  // Scrollspy: detect visible category section on scroll
  useEffect(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // offset below sticky headers
      let currentVisible = 'all';

      // Check each category section
      for (const cat of MENU_CATEGORIES) {
        if (cat.id === 'all') continue;
        const el = categorySectionRefs.current[cat.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentVisible = cat.id;
            break;
          }
        }
      }

      setActiveScrollCategory(currentVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory, searchQuery]);

  // Handle Category Navigation Click
  const handleCategoryNavClick = (catId) => {
    if (catId === 'all') {
      setSelectedCategory('all');
      setSearchQuery('');
      window.scrollTo({ top: 420, behavior: 'smooth' });
      return;
    }

    if (searchQuery) setSearchQuery('');

    // If already in 'all' grouped view, scroll smoothly to that section
    if (selectedCategory === 'all') {
      const el = categorySectionRefs.current[catId];
      if (el) {
        const yOffset = -140; // account for global navbar + sticky category nav
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveScrollCategory(catId);
        return;
      }
    }

    // Otherwise switch category filter directly
    setSelectedCategory(catId);
  };

  return (
    <div className="living-menu-root">
      {/* =========================================================================
          02. REDESIGN THE MENU INTRODUCTION: THE LIVING MENU HERO
          Cinematic Living Showcase with Auto/Interactive Signature Carousel
          ========================================================================= */}
      <section className="living-menu-hero-section" aria-label="Menu Introduction">
        <div className="container-custom">
          <div className="living-hero-split-grid">
            {/* Left Column: Brand Identity, Headline, Search & Dietary Toggles */}
            <div className="living-hero-editorial-col">
              <div className="living-hero-brand-badge">
                <img
                  src="/assets/maitri-katta-logo-transparent.png"
                  alt="Maitri Katta Original Emblem"
                  className="living-hero-brand-logo"
                  width="110"
                  height="55"
                />
                <span className="living-hero-brand-sep" aria-hidden="true" />
                <div className="living-hero-brand-titles">
                  <span className="living-hero-brand-name">MAITRI KATTA</span>
                  <span className="living-hero-brand-sub">FAMILY GARDEN RESTAURANT • ASLI SWAD</span>
                </div>
              </div>

              <div className="living-hero-headline-wrap">
                <span className="living-hero-eyebrow">THE LIVING MENU · KITCHEN SPECIALS</span>
                <h1 className="living-hero-main-title">THE MENU.</h1>
                <p className="living-hero-tagline">Something delicious awaits.</p>
              </div>

              <p className="living-hero-story-prose">
                Good food needs no introduction. Explore our authentic Agri specialities, sizzling clay-oven tandoori grills, royal Dum biryanis, and comforting Indian classics — prepared fresh under the open skies of Ambernath.
              </p>

              {/* Real-time Search Box */}
              <div className="living-hero-controls-bar">
                <div className="living-search-field-wrapper">
                  <Search size={18} className="search-icon-adornment" />
                  <input
                    type="text"
                    placeholder="Search by dish name (e.g. Lapeta, Biryani, Tandoori)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search menu dishes"
                    className="living-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="btn-clear-search"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Dietary Filter Buttons */}
                <div className="living-diet-filter-pills" role="group" aria-label="Dietary filters">
                  <button
                    type="button"
                    className={`diet-filter-pill ${dietFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setDietFilter('all')}
                  >
                    All Items
                  </button>
                  <button
                    type="button"
                    className={`diet-filter-pill diet-pill-veg ${dietFilter === 'veg' ? 'is-active-veg' : ''}`}
                    onClick={() => setDietFilter(dietFilter === 'veg' ? 'all' : 'veg')}
                  >
                    <span className="diet-dot-symbol dot-veg" />
                    <span>Pure Veg</span>
                  </button>
                  <button
                    type="button"
                    className={`diet-filter-pill diet-pill-nonveg ${dietFilter === 'non-veg' ? 'is-active-nonveg' : ''}`}
                    onClick={() => setDietFilter(dietFilter === 'non-veg' ? 'all' : 'non-veg')}
                  >
                    <span className="diet-dot-symbol dot-nonveg" />
                    <span>Non-Veg</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Living Signature Carousel Stage */}
            <div
              className="living-hero-showcase-col"
              onMouseEnter={() => setHeroIsPaused(true)}
              onMouseLeave={() => setHeroIsPaused(false)}
            >
              <div className="living-carousel-stage-card">
                {/* Photo Stage with Motion & Ken Burns Drift */}
                <div className="living-stage-photo-viewport">
                  <img
                    key={activeHeroDish.id}
                    src={activeHeroDish.image}
                    alt={activeHeroDish.name}
                    className="living-stage-dish-image"
                    loading="eager"
                    fetchPriority="high"
                    width="600"
                    height="450"
                  />
                  <div className="living-stage-gradient-overlay" />
                  <span className="living-stage-floating-badge">
                    ★ {activeHeroDish.badge}
                  </span>

                  {/* Carousel Chevron Controls */}
                  <div className="living-carousel-nav-arrows">
                    <button
                      type="button"
                      className="carousel-arrow-btn"
                      onClick={() =>
                        setHeroIndex((prev) =>
                          prev === 0 ? HERO_SIGNATURE_DISHES.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous signature dish"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="carousel-arrow-btn"
                      onClick={() =>
                        setHeroIndex((prev) => (prev + 1) % HERO_SIGNATURE_DISHES.length)
                      }
                      aria-label="Next signature dish"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Dish Info & Live Action Bar */}
                <div className="living-stage-info-plate">
                  <div className="stage-info-header-row">
                    <div className="stage-dish-category-kicker">
                      <span className="category-kicker-dot" />
                      <span>{activeHeroDish.categoryLabel}</span>
                    </div>

                    {/* FSSAI Veg / Non-Veg Indicator */}
                    <span
                      className={`diet-symbol-box ${activeHeroDish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                      title={activeHeroDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      aria-label={activeHeroDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    />
                  </div>

                  <div className="stage-dish-title-row">
                    <h3 className="stage-dish-name">{activeHeroDish.name}</h3>
                    <span className="stage-dish-price">₹{activeHeroDish.price}</span>
                  </div>

                  <p className="stage-dish-description">{activeHeroDish.description}</p>

                  {/* Portion Selection if available */}
                  {activeHeroDish.options && (
                    <div className="stage-portion-selectors">
                      {activeHeroDish.options.map((opt) => {
                        const isSel =
                          (selectedOptions[activeHeroDish.id]?.label ||
                            activeHeroDish.options[0].label) === opt.label;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            className={`portion-selector-pill ${isSel ? 'is-active-portion' : ''}`}
                            onClick={() => handleSelectOption(activeHeroDish.id, opt)}
                          >
                            <span>{opt.label} • ₹{opt.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Add to Cart / Live Quantity Stepper */}
                  <div className="stage-action-cta-wrap">
                    {(() => {
                      const selOpt =
                        selectedOptions[activeHeroDish.id] ||
                        (activeHeroDish.options ? activeHeroDish.options[0] : null);
                      const cartInfo = getItemCartInfo(activeHeroDish, selOpt);
                      const isRecentlyAdded = addedItemAnim?.startsWith(activeHeroDish.id);

                      return cartInfo.quantity > 0 ? (
                        <div className="living-stepper-control hero-stepper">
                          <button
                            type="button"
                            className="living-stepper-btn"
                            onClick={() =>
                              updateQuantity(cartInfo.cartKey, cartInfo.quantity - 1)
                            }
                            aria-label={`Decrease ${activeHeroDish.name}`}
                          >
                            <Minus size={15} />
                          </button>
                          <span className="living-stepper-qty-num">
                            {cartInfo.quantity} in Order
                          </span>
                          <button
                            type="button"
                            className="living-stepper-btn"
                            onClick={() =>
                              updateQuantity(cartInfo.cartKey, cartInfo.quantity + 1)
                            }
                            aria-label={`Increase ${activeHeroDish.name}`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className={`btn-stage-add-cart ${isRecentlyAdded ? 'just-added' : ''}`}
                          onClick={() => handleAddWithFeedback(activeHeroDish, selOpt)}
                        >
                          {isRecentlyAdded ? (
                            <>
                              <Check size={18} />
                              <span>Added to Order!</span>
                            </>
                          ) : (
                            <>
                              <Plus size={18} />
                              <span>
                                ADD TO ORDER • ₹
                                {selOpt ? selOpt.price : activeHeroDish.price}
                              </span>
                            </>
                          )}
                        </button>
                      );
                    })()}
                  </div>

                  {/* Carousel Indicator Dots */}
                  <div className="living-carousel-pagination-row">
                    {HERO_SIGNATURE_DISHES.map((d, idx) => (
                      <button
                        key={d.id}
                        type="button"
                        className={`carousel-pagination-dot ${idx === heroIndex ? 'is-active' : ''}`}
                        onClick={() => setHeroIndex(idx)}
                        aria-label={`Show ${d.name}`}
                      >
                        <span className="dot-fill" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. STICKY CATEGORY NAVIGATION (Scrollspy Enabled & Mobile Horizontal Scroll)
          ========================================================================= */}
      <nav className="living-sticky-category-nav" aria-label="Menu Categories Navigation">
        <div className="container-custom">
          <div className="living-category-track" ref={navTrackRef} role="tablist">
            {MENU_CATEGORIES.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.id] || Sparkles;
              const isSelected =
                selectedCategory === 'all'
                  ? activeScrollCategory === cat.id
                  : selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`living-category-tab ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleCategoryNavClick(cat.id)}
                >
                  <IconComp size={15} className="category-tab-glyph" />
                  <span className="category-tab-label">{cat.label}</span>
                  {isSelected && <span className="category-active-underline" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          04. REIMAGINED CATEGORY SECTIONS: VISUAL RHYTHM
          Composition A: Signature Spotlight Hero + Rows (Agri, Biryani, Curries)
          Composition B: Standard Clean Editorial Rows (Breads & Rice, Mocktails, Desserts)
          Composition C: Featured Food Moments - Split Atmosphere Banner + Rows (Tandoor, Chinese, Starters)
          ========================================================================= */}
      <main className="living-menu-body" id="living-menu-content">
        <div className="container-custom">
          {/* Active Filter / Search Indicator Ribbon */}
          {(searchQuery || selectedCategory !== 'all' || dietFilter !== 'all') && (
            <div className="living-filter-status-ribbon">
              <div className="filter-status-text">
                Showing <strong>{filteredDishes.length}</strong> dishes
                {selectedCategory !== 'all' && (
                  <span>
                    {' '}
                    in{' '}
                    <strong>
                      {MENU_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                    </strong>
                  </span>
                )}
                {dietFilter !== 'all' && (
                  <span>
                    {' '}
                    (<strong>{dietFilter === 'veg' ? 'Pure Veg' : 'Non-Veg'}</strong>)
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {' '}
                    matching <em>"{searchQuery}"</em>
                  </span>
                )}
              </div>
              <button
                type="button"
                className="btn-clear-all-filters"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietFilter('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Empty Search State */}
          {filteredDishes.length === 0 ? (
            <div className="living-zero-results-card">
              <div className="zero-results-icon-wrap">
                <UtensilsCrossed size={36} />
              </div>
              <h3 className="zero-results-headline">No dishes found matching your search.</h3>
              <p className="zero-results-sub">
                Try searching for “Lapeta”, “Biryani”, “Tandoori”, “Naan” or reset your filters.
              </p>
              <button
                type="button"
                className="btn-reset-empty-search"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietFilter('all');
                }}
              >
                View Full Restaurant Menu
              </button>
            </div>
          ) : groupedDishes ? (
            /* ===================================================================
               GROUPED VIEW (Full Menu Mode with Distinct Compositions)
               =================================================================== */
            <div className="living-categories-flow">
              {Object.entries(groupedDishes).map(([catId, group]) => {
                const config = group.config;
                const signatureDish = group.items.find(
                  (d) => d.id === config.signatureId || (d.badge && d.image)
                );
                const regularDishes = group.items.filter(
                  (d) => !signatureDish || d.id !== signatureDish.id
                );

                return (
                  <section
                    key={catId}
                    id={`category-${catId}`}
                    ref={(el) => (categorySectionRefs.current[catId] = el)}
                    className={`living-category-block composition-${config.layoutType}`}
                    aria-label={group.label}
                  >
                    {/* Category Personality Header */}
                    <header className="living-category-header">
                      <div className="category-header-title-stack">
                        <span className="category-header-kicker">{config.kicker}</span>
                        <h2 className="category-header-headline">{config.headline}</h2>
                        <p className="category-header-subtext">{config.subtext}</p>
                      </div>
                      <div className="category-items-count-badge">
                        <span>{group.items.length} DISHES</span>
                      </div>
                    </header>
                    <p className="category-header-description">{config.description}</p>

                    {/* =========================================================
                        COMPOSITION A: SIGNATURE SPOTLIGHT HERO
                        (Large hero photograph card + clean dotted-leader rows)
                        ========================================================= */}
                    {config.layoutType === 'signature-hero' && signatureDish && (
                      <div className="composition-a-spotlight">
                        <div className="spotlight-photo-frame">
                          <img
                            src={signatureDish.image}
                            alt={signatureDish.name}
                            className="spotlight-photo-img"
                            loading="lazy"
                          />
                          <span className="spotlight-signature-seal">
                            {config.badgeText || 'HOUSE SIGNATURE'}
                          </span>
                        </div>

                        <div className="spotlight-content-card">
                          <div className="spotlight-meta-top">
                            <span
                              className={`diet-symbol-box ${signatureDish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                              title={signatureDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                            />
                            <span className="spotlight-badge-label">
                              {signatureDish.badge || 'LEGENDARY FLAVOUR'}
                            </span>
                          </div>

                          <h3 className="spotlight-card-name">{signatureDish.name}</h3>
                          <p className="spotlight-card-desc">{signatureDish.description}</p>

                          {/* Portion selection */}
                          {signatureDish.options && (
                            <div className="spotlight-portions-row">
                              {signatureDish.options.map((opt) => {
                                const isSel =
                                  (selectedOptions[signatureDish.id]?.label ||
                                    signatureDish.options[0].label) === opt.label;
                                return (
                                  <button
                                    key={opt.label}
                                    type="button"
                                    className={`portion-chip-btn ${isSel ? 'is-selected' : ''}`}
                                    onClick={() => handleSelectOption(signatureDish.id, opt)}
                                  >
                                    <span>{opt.label} • ₹{opt.price}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          <div className="spotlight-action-footer">
                            <div className="spotlight-price-tag">
                              <span className="price-currency">₹</span>
                              <span className="price-number">
                                {selectedOptions[signatureDish.id]?.price || signatureDish.price}
                              </span>
                            </div>

                            {(() => {
                              const selOpt =
                                selectedOptions[signatureDish.id] ||
                                (signatureDish.options ? signatureDish.options[0] : null);
                              const cartInfo = getItemCartInfo(signatureDish, selOpt);
                              const isRecentlyAdded = addedItemAnim?.startsWith(signatureDish.id);

                              return cartInfo.quantity > 0 ? (
                                <div className="living-stepper-control">
                                  <button
                                    type="button"
                                    className="living-stepper-btn"
                                    onClick={() =>
                                      updateQuantity(cartInfo.cartKey, cartInfo.quantity - 1)
                                    }
                                    aria-label={`Decrease ${signatureDish.name}`}
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="living-stepper-qty-num">
                                    {cartInfo.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    className="living-stepper-btn"
                                    onClick={() =>
                                      updateQuantity(cartInfo.cartKey, cartInfo.quantity + 1)
                                    }
                                    aria-label={`Increase ${signatureDish.name}`}
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className={`btn-spotlight-add-cart ${isRecentlyAdded ? 'just-added' : ''}`}
                                  onClick={() => handleAddWithFeedback(signatureDish, selOpt)}
                                >
                                  {isRecentlyAdded ? (
                                    <>
                                      <Check size={16} />
                                      <span>Added</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus size={16} />
                                      <span>ADD TO ORDER</span>
                                    </>
                                  )}
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        COMPOSITION C: FEATURED FOOD MOMENT
                        (Split atmosphere photo moment + kebab/wok cards)
                        ========================================================= */}
                    {config.layoutType === 'food-moment' && signatureDish && (
                      <div className="composition-c-moment-banner">
                        <div className="moment-banner-visual">
                          <img
                            src={signatureDish.image}
                            alt={signatureDish.name}
                            className="moment-visual-img"
                            loading="lazy"
                          />
                          <div className="moment-banner-overlay" />
                          <div className="moment-banner-content">
                            <span className="moment-banner-kicker">
                              {config.momentTag || 'CHEF’S BLOCKBUSTER'}
                            </span>
                            <h3 className="moment-banner-title">{signatureDish.name}</h3>
                            <p className="moment-banner-desc">{signatureDish.description}</p>
                            <div className="moment-banner-cta-row">
                              <span className="moment-banner-price">₹{signatureDish.price}</span>
                              {(() => {
                                const cartInfo = getItemCartInfo(signatureDish, null);
                                return cartInfo.quantity > 0 ? (
                                  <div className="living-stepper-control moment-stepper">
                                    <button
                                      type="button"
                                      className="living-stepper-btn"
                                      onClick={() =>
                                        updateQuantity(cartInfo.cartKey, cartInfo.quantity - 1)
                                      }
                                    >
                                      <Minus size={13} />
                                    </button>
                                    <span className="living-stepper-qty-num">{cartInfo.quantity}</span>
                                    <button
                                      type="button"
                                      className="living-stepper-btn"
                                      onClick={() =>
                                        updateQuantity(cartInfo.cartKey, cartInfo.quantity + 1)
                                      }
                                    >
                                      <Plus size={13} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn-moment-add"
                                    onClick={() => handleAddWithFeedback(signatureDish, null)}
                                  >
                                    <Plus size={15} />
                                    <span>Add • ₹{signatureDish.price}</span>
                                  </button>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dotted Leader Menu Rows Grid (All Compositions) */}
                    <div className="living-regular-dishes-grid">
                      {regularDishes.map((dish) => (
                        <LivingMenuRow
                          key={dish.id}
                          dish={dish}
                          selectedOption={
                            selectedOptions[dish.id] || (dish.options ? dish.options[0] : null)
                          }
                          onSelectOption={handleSelectOption}
                          cartInfo={getItemCartInfo(
                            dish,
                            selectedOptions[dish.id] || (dish.options ? dish.options[0] : null)
                          )}
                          onAdd={handleAddWithFeedback}
                          onUpdateQuantity={updateQuantity}
                          isAddedRecently={addedItemAnim?.startsWith(dish.id)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            /* ===================================================================
               FLAT STREAM (Active Search or Single Category Filter)
               =================================================================== */
            <div className="living-filtered-stream">
              <div className="living-regular-dishes-grid">
                {filteredDishes.map((dish) => (
                  <LivingMenuRow
                    key={dish.id}
                    dish={dish}
                    selectedOption={
                      selectedOptions[dish.id] || (dish.options ? dish.options[0] : null)
                    }
                    onSelectOption={handleSelectOption}
                    cartInfo={getItemCartInfo(
                      dish,
                      selectedOptions[dish.id] || (dish.options ? dish.options[0] : null)
                    )}
                    onAdd={handleAddWithFeedback}
                    onUpdateQuantity={updateQuantity}
                    isAddedRecently={addedItemAnim?.startsWith(dish.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          08. FLOATING ORDER BAR (Bottom Viewport Persistent Order Summary)
          ========================================================================= */}
      {totalCount > 0 && (
        <aside className="living-floating-order-bar" aria-label="Persistent Order Summary">
          <div className="floating-order-container">
            {/* Left: Bag Icon, Count & Total */}
            <div className="floating-order-summary-left">
              <div className="floating-bag-badge-wrap">
                <ShoppingBag size={20} className="floating-bag-glyph" />
                <span className="floating-bag-count-pill">{totalCount}</span>
              </div>
              <div className="floating-order-labels">
                <span className="floating-order-count-text">
                  {totalCount} {totalCount === 1 ? 'Dish Selected' : 'Dishes Selected'}
                </span>
                <span className="floating-order-total-num">Total: ₹{grandTotal}</span>
              </div>
            </div>

            {/* Right: Actions Cluster */}
            <div className="floating-order-actions-right">
              <button
                type="button"
                className="btn-floating-view-cart"
                onClick={openCart}
              >
                <span>VIEW CART</span>
              </button>

              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-floating-order-whatsapp"
                title="Order on WhatsApp with pre-filled items"
              >
                <MessageCircle size={16} />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

// =============================================================================
// SUBCOMPONENT: Individual Living Menu Row (Dotted Leader with Thumbnails)
// =============================================================================
function LivingMenuRow({
  dish,
  selectedOption,
  onSelectOption,
  cartInfo,
  onAdd,
  onUpdateQuantity,
  isAddedRecently,
}) {
  const displayPrice = selectedOption ? selectedOption.price : dish.price;

  return (
    <article className="living-dish-row-card" aria-label={dish.name}>
      {/* Authentic Thumbnail */}
      {dish.image && (
        <div className="living-row-thumb-frame">
          <img
            src={dish.image}
            alt={dish.name}
            className="living-row-thumb-img"
            loading="lazy"
          />
        </div>
      )}

      {/* Main Content & Dotted Leader Line */}
      <div className="living-row-content-body">
        <div className="living-row-title-line">
          {/* FSSAI Veg / Non-Veg Indicator */}
          <span
            className={`diet-symbol-box ${dish.isVeg ? 'is-veg' : 'is-nonveg'}`}
            title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            aria-label={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          />

          <h3 className="living-row-dish-name">{dish.name}</h3>

          {/* Dotted Leader Line */}
          <span className="living-row-dotted-leader" aria-hidden="true" />

          {/* Price */}
          <span className="living-row-price-tag">₹{displayPrice}</span>
        </div>

        {/* Short Authentic Description */}
        {dish.description && (
          <p className="living-row-desc-text">{dish.description}</p>
        )}

        {/* Portion Selector Chips (Half / Full) */}
        {dish.options && (
          <div className="living-row-portions-cluster">
            {dish.options.map((opt) => {
              const isSelected = selectedOption?.label === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  className={`portion-chip-mini ${isSelected ? 'is-active' : ''}`}
                  onClick={() => onSelectOption(dish.id, opt)}
                >
                  <span>{opt.label} • ₹{opt.price}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Live Stepper Action */}
      <div className="living-row-action-slot">
        {cartInfo.quantity > 0 ? (
          <div className="living-stepper-control mini-stepper">
            <button
              type="button"
              className="living-stepper-btn"
              onClick={() => onUpdateQuantity(cartInfo.cartKey, cartInfo.quantity - 1)}
              aria-label={`Decrease ${dish.name}`}
            >
              <Minus size={12} />
            </button>
            <span className="living-stepper-qty-num">{cartInfo.quantity}</span>
            <button
              type="button"
              className="living-stepper-btn"
              onClick={() => onUpdateQuantity(cartInfo.cartKey, cartInfo.quantity + 1)}
              aria-label={`Increase ${dish.name}`}
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`btn-row-add-pill ${isAddedRecently ? 'just-added' : ''}`}
            onClick={() => onAdd(dish, selectedOption)}
            aria-label={`Add ${dish.name} for ₹${displayPrice}`}
          >
            {isAddedRecently ? (
              <>
                <Check size={13} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

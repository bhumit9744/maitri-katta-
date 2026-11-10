import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS } from '../../data/menuData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  AlertCircle,
  ArrowRight,
  Utensils,
  Bike,
  Package,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    packagingCharge,
    deliveryCharge,
    grandTotal,
    orderType,
    setOrderType,
    customer,
    setCustomer,
    isCartOpen,
    closeCart,
    getWhatsAppOrderUrl,
  } = useCart();

  const [formError, setFormError] = useState('');
  const drawerPanelRef = useRef(null);

  // Fast thumbnail lookup from MENU_ITEMS
  const dishImageMap = useMemo(() => {
    const map = {};
    if (Array.isArray(MENU_ITEMS)) {
      MENU_ITEMS.forEach((dish) => {
        if (dish.image) {
          map[dish.id] = dish.image;
        }
      });
    }
    return map;
  }, []);

  // Lock body scroll & listen for Escape key when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeCart();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleInputChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError('');
  };

  const handleProceedToWhatsApp = (e) => {
    if (items.length === 0) {
      e.preventDefault();
      setFormError('Your cart is empty. Please add dishes from our menu.');
      return;
    }
    if (!customer.phone || customer.phone.trim().replace(/\D/g, '').length < 10) {
      e.preventDefault();
      setFormError('Please enter a valid 10-digit mobile number so our team can contact you.');
      return;
    }
    if (orderType === 'delivery' && (!customer.deliveryAddress || customer.deliveryAddress.trim().length < 5)) {
      e.preventDefault();
      setFormError('Please enter your full delivery address in Ambernath.');
      return;
    }
    // Validation passed, link opens WhatsApp
  };

  return (
    <div
      className="cart-drawer-overlay"
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label="Your Food Order"
    >
      <aside
        ref={drawerPanelRef}
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===================================================================
            1. HEADER: Deep warm-red background with transparent brand logo
            =================================================================== */}
        <header className="cart-drawer-header">
          <div className="cart-header-left">
            <img
              src="/assets/maitri-katta-logo-transparent.png"
              alt="Maitri Katta"
              className="cart-brand-emblem"
              width="68"
              height="68"
            />
            <div className="cart-header-titles">
              <span className="cart-header-kicker">Maitri Katta Kitchen</span>
              <h2 className="cart-header-title">
                YOUR ORDER <span className="cart-count-badge">({totalCount})</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            className="cart-header-close-btn"
            onClick={closeCart}
            aria-label="Close order drawer"
            title="Close (Esc)"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </header>

        {/* ===================================================================
            2. ORDER TYPE SELECTOR: Clean segmented pills with mustard active state
            =================================================================== */}
        <div className="order-type-selector-wrap">
          <div className="order-type-segmented" role="tablist" aria-label="Order Mode">
            <button
              type="button"
              role="tab"
              aria-selected={orderType === 'dine-in'}
              className={`segmented-tab ${orderType === 'dine-in' ? 'is-active' : ''}`}
              onClick={() => setOrderType('dine-in')}
            >
              <Utensils size={15} className="tab-icon" />
              <span>Dine-In Table</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={orderType === 'takeaway'}
              className={`segmented-tab ${orderType === 'takeaway' ? 'is-active' : ''}`}
              onClick={() => setOrderType('takeaway')}
            >
              <Package size={15} className="tab-icon" />
              <span>Takeaway Pick-up</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={orderType === 'delivery'}
              className={`segmented-tab ${orderType === 'delivery' ? 'is-active' : ''}`}
              onClick={() => setOrderType('delivery')}
            >
              <Bike size={15} className="tab-icon" />
              <span>Home Delivery</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            DRAWER SCROLLABLE BODY
            =================================================================== */}
        <div className="cart-drawer-scrollable">
          {items.length === 0 ? (
            /* Empty State */
            <div className="cart-empty-state">
              <div className="empty-symbol-wrap">
                <ShoppingBag size={42} strokeWidth={1.5} />
              </div>
              <h3 className="empty-state-title">Your Thali is Empty</h3>
              <p className="empty-state-text">
                Browse our sizzling clay-handi Agri specials, fragrant tandoor platters, and spicy curries to start your order.
              </p>
              <Link
                to="/menu"
                className="empty-state-cta"
                onClick={closeCart}
              >
                <span>EXPLORE THE MENU</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              {/* =================================================================
                  3. SELECTED DISHES LIST
                  ================================================================= */}
              <section className="cart-dishes-section" aria-label="Selected Dishes">
                <div className="cart-dishes-header">
                  <span className="cart-dishes-kicker">
                    SELECTED DISHES ({items.length})
                  </span>
                  <button
                    type="button"
                    className="cart-clear-link"
                    onClick={clearCart}
                    aria-label="Clear all items from cart"
                  >
                    Clear All
                  </button>
                </div>

                <div className="cart-items-collection">
                  {items.map((item) => {
                    const dishImage = item.image || dishImageMap[item.id] || null;

                    return (
                      <article key={item.cartKey} className="cart-dish-row">
                        {/* Food Thumbnail */}
                        <div className="dish-thumbnail-wrap">
                          {dishImage ? (
                            <img
                              src={dishImage}
                              alt={item.name}
                              className="dish-thumbnail-img"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextElementSibling) {
                                  e.currentTarget.nextElementSibling.style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <div
                            className="dish-thumbnail-placeholder"
                            aria-hidden="true"
                            style={{ display: dishImage ? 'none' : 'flex' }}
                          >
                            <Utensils size={18} />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="dish-details">
                          <div className="dish-name-line">
                            {/* Veg / Non-Veg Indicator */}
                            <span
                              className={`dietary-badge ${item.isVeg ? 'is-veg' : 'is-non-veg'}`}
                              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                              aria-label={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                            >
                              <span className="dietary-dot" />
                            </span>
                            <h4 className="dish-name">{item.name}</h4>
                          </div>

                          {item.option && (
                            <span className="dish-option-pill">{item.option}</span>
                          )}

                          <div className="dish-pricing-meta">
                            <span className="dish-unit-price">₹{item.unitPrice} each</span>
                            <span className="dish-line-price">
                              ₹{item.unitPrice * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="dish-actions">
                          <div
                            className="dish-qty-stepper"
                            role="group"
                            aria-label={`Quantity for ${item.name}`}
                          >
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                            >
                              <Minus size={13} strokeWidth={2.4} />
                            </button>
                            <span className="qty-digit" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="qty-btn"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                            >
                              <Plus size={13} strokeWidth={2.4} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="dish-remove-btn"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeFromCart(item.cartKey)}
                            title="Remove dish"
                          >
                            <Trash2 size={15} strokeWidth={1.8} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* =================================================================
                  4. CUSTOMER DETAILS FORM
                  ================================================================= */}
              <section className="cart-customer-section" aria-label="Customer Information">
                <div className="customer-section-header">
                  <h3 className="customer-section-title">Guest & Order Details</h3>
                  <span className="customer-section-subtitle">
                    {orderType === 'dine-in' && 'For Dine-in Service at Ambernath'}
                    {orderType === 'takeaway' && 'Ready for Pickup at Restaurant'}
                    {orderType === 'delivery' && 'Doorstep Delivery in Ambernath'}
                  </span>
                </div>

                <div className="customer-form-grid">
                  <div className="form-field">
                    <label htmlFor="customer-name" className="field-label">
                      Your Name
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      className="field-input"
                      placeholder="e.g. Rahul Patil"
                      value={customer.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="customer-phone" className="field-label">
                      Mobile Number <span className="required-star">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      className="field-input"
                      placeholder="10-digit number"
                      value={customer.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  {/* Conditional: Dine-in Table / Cabana */}
                  {orderType === 'dine-in' && (
                    <div className="form-field full-width">
                      <label htmlFor="customer-table" className="field-label">
                        Table / Cabana Number <span className="optional-hint">(If seated)</span>
                      </label>
                      <input
                        id="customer-table"
                        type="text"
                        className="field-input"
                        placeholder="e.g. Table T-12 / Garden Pergola 4"
                        value={customer.tableNumber}
                        onChange={(e) => handleInputChange('tableNumber', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Conditional: Delivery Address */}
                  {orderType === 'delivery' && (
                    <div className="form-field full-width">
                      <label htmlFor="customer-address" className="field-label">
                        Ambernath Delivery Address <span className="required-star">*</span>
                      </label>
                      <textarea
                        id="customer-address"
                        rows={2}
                        className="field-textarea"
                        placeholder="Flat / Wing, Society name, Landmark, Ambernath (East/West)"
                        value={customer.deliveryAddress}
                        onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      />
                    </div>
                  )}

                  {/* Cooking Instructions (All order types) */}
                  <div className="form-field full-width">
                    <label htmlFor="customer-instructions" className="field-label">
                      Cooking Instructions / Notes <span className="optional-hint">(Optional)</span>
                    </label>
                    <input
                      id="customer-instructions"
                      type="text"
                      className="field-input"
                      placeholder="e.g. Medium spicy, extra lemons, keep gravy separate"
                      value={customer.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* ===================================================================
            5 & 6. STICKY FOOTER: ORDER SUMMARY & SIGNATURE-RED WHATSAPP CTA
            =================================================================== */}
        {items.length > 0 && (
          <footer className="cart-drawer-footer">
            {/* Validation Error Banner */}
            {formError && (
              <div className="cart-error-pill" role="alert">
                <AlertCircle size={15} className="error-icon" />
                <span>{formError}</span>
              </div>
            )}

            {/* Order Summary */}
            <div className="order-summary-box">
              <div className="summary-row">
                <span className="summary-label">Dishes Subtotal</span>
                <span className="summary-value">₹{subtotal}</span>
              </div>

              {packagingCharge > 0 && (
                <div className="summary-row">
                  <span className="summary-label">Packaging Charge</span>
                  <span className="summary-value">₹{packagingCharge}</span>
                </div>
              )}

              {deliveryCharge > 0 && (
                <div className="summary-row">
                  <span className="summary-label">Delivery Fee</span>
                  <span className="summary-value">₹{deliveryCharge}</span>
                </div>
              )}

              <div className="summary-row summary-total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{grandTotal}</span>
              </div>
            </div>

            {/* Informational Kitchen Note */}
            <p className="kitchen-review-note">
              Your order will be reviewed and confirmed by our kitchen team on WhatsApp.
            </p>

            {/* Signature-Red WhatsApp Checkout Button */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signature-whatsapp"
              onClick={handleProceedToWhatsApp}
            >
              <MessageCircle size={20} className="wa-icon" />
              <span className="btn-text">
                SEND ORDER ON WHATSAPP (₹{grandTotal}) →
              </span>
            </a>

            {/* Add more dishes quick return */}
            <div className="cart-bottom-actions">
              <Link to="/menu" onClick={closeCart} className="link-add-more">
                + Add More Dishes from Menu
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}

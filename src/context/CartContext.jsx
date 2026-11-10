import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

const CartContext = createContext();

const STORAGE_KEY = 'maitri_katta_cart_v2';
const CUSTOMER_KEY = 'maitri_katta_customer_v2';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'delivery' | 'takeaway'
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_KEY);
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        tableNumber: '',
        deliveryAddress: '',
        specialInstructions: '',
      };
    } catch {
      return {
        name: '',
        phone: '',
        tableNumber: '',
        deliveryAddress: '',
        specialInstructions: '',
      };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    } catch (e) {
      console.warn('Could not save customer info', e);
    }
  }, [customer]);

  const addToCart = (product, selectedOption = null) => {
    setItems((prev) => {
      const optionLabel = selectedOption?.label || null;
      const unitPrice = selectedOption ? selectedOption.price : product.price;
      const key = `${product.id}_${optionLabel || 'default'}`;

      const existingIndex = prev.findIndex((i) => i.cartKey === key);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          cartKey: key,
          id: product.id,
          name: product.name,
          unitPrice,
          quantity: 1,
          option: optionLabel,
          isVeg: product.isVeg,
          category: product.category,
          image: product.image || null,
        },
      ];
    });
  };

  const removeFromCart = (cartKey) => {
    setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // Transparent restaurant pricing — zero hidden or invented fees
  const packagingCharge = 0;
  const deliveryCharge = 0;
  const grandTotal = subtotal;

  // Generate WhatsApp order message string
  const generateWhatsAppMessage = () => {
    const lines = [];
    lines.push(`*NAMASTE MAITRI KATTA!* 🌿`);
    lines.push(`I would like to place an order inquiry:`);
    lines.push(``);
    lines.push(`📋 *ORDER TYPE:* ${orderType.toUpperCase()}`);
    if (orderType === 'dine-in' && customer.tableNumber) {
      lines.push(`🪑 *Table Number:* ${customer.tableNumber}`);
    }
    if (orderType === 'delivery' && customer.deliveryAddress) {
      lines.push(`📍 *Delivery Address:* ${customer.deliveryAddress}`);
    }
    lines.push(`👤 *Customer:* ${customer.name || 'Guest'} (${customer.phone || 'Phone provided'})`);
    lines.push(``);
    lines.push(`🍽️ *ITEMS ORDERED:*`);

    items.forEach((item, index) => {
      const opt = item.option ? ` (${item.option})` : '';
      const lineTotal = item.unitPrice * item.quantity;
      lines.push(`${index + 1}. ${item.name}${opt} × ${item.quantity} = ₹${lineTotal}`);
    });

    lines.push(``);
    lines.push(`----------------------------------`);
    lines.push(`Subtotal: ₹${subtotal}`);
    if (packagingCharge > 0) lines.push(`Packaging Charge: ₹${packagingCharge}`);
    if (deliveryCharge > 0) lines.push(`Delivery Charge: ₹${deliveryCharge}`);
    lines.push(`*ESTIMATED TOTAL: ₹${grandTotal}*`);
    lines.push(`----------------------------------`);

    if (customer.specialInstructions) {
      lines.push(`📝 *Special Instructions:* ${customer.specialInstructions}`);
      lines.push(``);
    }

    lines.push(`⚠️ *Note:* Order is confirmed only after restaurant confirms readiness & timings.`);

    return encodeURIComponent(lines.join('\n'));
  };

  const getWhatsAppOrderUrl = () => {
    const text = generateWhatsAppMessage();
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        generateWhatsAppMessage,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


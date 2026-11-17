'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CustomerOrderDetails } from '@/types';

interface CartContextType {
  items: CartItem[];
  customer: CustomerOrderDetails;
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setCustomer: (details: Partial<CustomerOrderDetails>) => void;
  setIsCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cozly_cart_items_v1';
const CUSTOMER_STORAGE_KEY = 'cozly_customer_info_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomerState] = useState<CustomerOrderDetails>({
    name: '',
    phone: '',
    city: '',
    pincode: '',
    state: 'Kerala',
    notes: '',
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
      const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (savedCustomer) {
        setCustomerState(JSON.parse(savedCustomer));
      }
    } catch (e) {
      console.warn('Could not load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
  }, [items, isLoaded]);

  // Save customer details to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    } catch (e) {
      console.warn('Could not save customer to localStorage:', e);
    }
  }, [customer, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      // Check if matching item exists
      const existingIdx = prev.findIndex((item) => {
        if (newItem.isCustomDesign || item.isCustomDesign) {
          return item.id === newItem.id;
        }
        return (
          item.productId === newItem.productId &&
          item.selectedFabric === newItem.selectedFabric &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedFinish === newItem.selectedFinish
        );
      });

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity || 1;
        return updated;
      }

      return [...prev, { ...newItem, id: newItem.id || `cart-${Date.now()}` }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setCustomer = (details: Partial<CustomerOrderDetails>) => {
    setCustomerState((prev) => ({ ...prev, ...details }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        customer,
        isCartOpen,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCustomer,
        setIsCartOpen,
        clearCart,
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

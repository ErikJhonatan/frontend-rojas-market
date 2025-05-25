import {cartReducer, loadCart} from '../utils/cart-state';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => loadCart(localStorage));

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); } catch { /* Keep the in-memory cart available. */ }
  }, [state.cartItems]);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cartState: state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

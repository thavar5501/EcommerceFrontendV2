import { createReducer } from "@reduxjs/toolkit";


export const cartReducer = createReducer(
  {
    cart_Items: []
  }, 
  (builder) => {
    builder.addCase('addToCart', (state, action) => {
      const item = action.payload;
      const existingItem = state.cart_Items.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity = item.quantity; // Set new quantity
      } else {
        state.cart_Items.push({ ...item, quantity: item.quantity || 1 }); // Add new item with default quantity 1
      }
    }).addCase('removeFromCart', (state, action) => {
      const itemId = action.payload;
      state.cart_Items = state.cart_Items.filter(cartItem => cartItem.id !== itemId);
    }).addCase('clearCart', (state) => {
      state.cart_Items = [];
    });
  }
);

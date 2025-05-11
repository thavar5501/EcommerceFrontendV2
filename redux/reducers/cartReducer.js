// cartReducer.js

import { createReducer } from "@reduxjs/toolkit";

/**
 * Initial state of the cart reducer.
 * - cart_Items: An array to hold all the items added to the shopping cart.
 */
const initialState = {
  cart_Items: [],
};

/**
 * cartReducer handles all cart-related actions such as:
 * - Adding an item to the cart
 * - Removing an item from the cart
 * - Clearing the entire cart
 * 
 * This reducer uses Redux Toolkit's `createReducer` which allows writing
 * "mutating" logic that is internally translated to immutable updates.
 */
export const cartReducer = createReducer(initialState, (builder) => {
  
  builder

    /**
     * Action: addToCart
     * 
     * Payload: An object representing the item to add, which must contain at least `id`.
     * 
     * Behavior:
     * - If the item already exists in the cart, update its quantity.
     * - If the item doesn't exist, add it to the cart with the specified quantity (or default to 1).
     */
    .addCase('addToCart', (state, action) => {
      const item = action.payload;

      // Find if the item already exists in the cart by comparing IDs
      const existingItem = state.cart_Items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity = item.quantity;
      } else {
        // Add new item with quantity, defaulting to 1 if not provided
        state.cart_Items.push({ ...item, quantity: item.quantity || 1 });
      }
    })

    /**
     * Action: removeFromCart
     * 
     * Payload: The `id` of the item to remove from the cart.
     * 
     * Behavior:
     * - Removes the item that matches the given ID from the cart_Items array.
     */
    .addCase('removeFromCart', (state, action) => {
      const itemId = action.payload;

      // Filter out the item with the matching ID
      state.cart_Items = state.cart_Items.filter(
        (cartItem) => cartItem.id !== itemId
      );
    })

    /**
     * Action: clearCart
     * 
     * Payload: None.
     * 
     * Behavior:
     * - Empties the entire cart by resetting cart_Items to an empty array.
     */
    .addCase('clearCart', (state) => {
      state.cart_Items = [];
    });
});

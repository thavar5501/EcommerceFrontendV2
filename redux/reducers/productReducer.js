import { createReducer } from "@reduxjs/toolkit";

/**
 * Initial state for product management.
 * - products: Array to store all products.
 * - product: Object to store a single product’s details.
 * - loading: Boolean indicating data-fetch status.
 * - error: Stores error messages for UI/error handling.
 * - message: General messages (e.g., success alerts).
 * - inStock / outOfStock: Metrics used on Admin dashboard.
 */
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  message: null,
  inStock: 0,
  outOfStock: 0,
};

// Product reducer handles product-related asynchronous actions
export const productReducer = createReducer(initialState, (builder) => {
  // ==== REQUEST ACTIONS ====

  // Triggered when fetching all products (e.g., for homepage or shop)
  builder.addCase("getAllProductsRequest", (state) => {
    state.loading = true;
  });

  // Triggered when fetching products for admin dashboard
  builder.addCase("getAdminProductsRequest", (state) => {
    state.loading = true;
  });

  // Triggered when fetching a single product's details (e.g., product screen)
  builder.addCase("getProductDetailsRequest", (state) => {
    state.loading = true;
  });

  // ==== SUCCESS ACTIONS ====

  // Fired when all products are successfully fetched
  builder.addCase("getAllProductsSuccess", (state, action) => {
    state.loading = false;
    state.products = action.payload; // Array of products
  });

  // Fired when admin-specific product data is fetched
  builder.addCase("getAdminProductsSuccess", (state, action) => {
    const { data, inStock, outOfStock } = action.payload;
    state.loading = false;
    state.products = data; // Admin sees more detailed/filtered product list
    state.inStock = inStock;
    state.outOfStock = outOfStock;
  });

  // Fired when a single product's details are fetched
  builder.addCase("getProductDetailsSuccess", (state, action) => {
    state.loading = false;
    state.product = action.payload;
  });

  // ==== FAILURE ACTIONS ====

  // Called when fetching all products fails
  builder.addCase("getAllProductsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Called when admin fetch fails
  builder.addCase("getAdminProductsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // Called when single product details fetch fails
  builder.addCase("getProductDetailsFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // ==== UTILITY ACTIONS ====

  // Clears error from state (e.g., on retry or navigation)
  builder.addCase("clearError", (state) => {
    state.error = null;
  });

  // Clears general messages (e.g., after toast/snackbar shown)
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});

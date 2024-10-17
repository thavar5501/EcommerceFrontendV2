import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    product: {},
  },
  (builder) => {
    builder
      .addCase("getAllProductsRequest", (state) => {
        // Your logic here
        state.loading = true;
      })
      .addCase("getAdminProductsRequest", (state) => {
        // Your logic here
        state.loading = true;
      })
      .addCase("getProductDetailsRequest", (state) => {
        // Your logic here
        state.loading = true;
      })
      .addCase("getAllProductsSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.products = action.payload;
      })
      .addCase("getAdminProductsSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.products = action.payload.data;
        state.inStock = action.payload.inStock;
        state.outOfStock = action.payload.outOfStock;

      })
      .addCase("getProductDetailsSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.product = action.payload;
      })
      .addCase("getAllProductsFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminProductsFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getProductDetailsFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
      });
    // Add other cases here if needed
    builder.addCase("clearError", (state, action) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state, action) => {
      state.message = null;
    });
  }
);

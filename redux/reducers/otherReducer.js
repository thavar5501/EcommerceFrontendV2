import { createReducer } from "@reduxjs/toolkit";

// Initial state for handling miscellaneous asynchronous operations
const initialState = {
  loading: false,
  message: null,
  error: null,
};

/**
 * A reusable helper to handle multiple action types that set loading = true.
 */
const requestHandler = (state) => {
  state.loading = true;
};

/**
 * A reusable helper to handle success action types.
 * It stops the loader and stores the success message.
 */
const successHandler = (state, action) => {
  state.loading = false;
  state.message = action.payload;
};

/**
 * A reusable helper to handle failure action types.
 * It stops the loader and stores the error message.
 */
const failureHandler = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

/**
 * Reducer to handle various async operations like updating profile,
 * placing orders, managing products/categories, etc.
 */
export const otherReducer = createReducer(initialState, (builder) => {
  // Request Actions: Set loading to true
  builder
    .addCase("updatePasswordRequest", requestHandler)
    .addCase("updateProfileRequest", requestHandler)
    .addCase("updatePicRequest", requestHandler)
    .addCase("placeOrderRequest", requestHandler)
    .addCase("processOrderRequest", requestHandler)
    .addCase("addCategoryRequest", requestHandler)
    .addCase("deleteCategoryRequest", requestHandler)
    .addCase("addProductRequest", requestHandler)
    .addCase("updateProductRequest", requestHandler)
    .addCase("updateProductImageRequest", requestHandler)
    .addCase("deleteProductImageRequest", requestHandler)
    .addCase("deleteProductRequest", requestHandler)
    .addCase("forgetPasswordRequest", requestHandler)
    .addCase("resetPasswordRequest", requestHandler)
    .addCase("updateLocationRequest", requestHandler);

  // Success Actions: Set loading to false and store message
  builder
    .addCase("updatePasswordSuccess", successHandler)
    .addCase("updateProfileSuccess", successHandler)
    .addCase("updatePicSuccess", successHandler)
    .addCase("placeOrderSuccess", successHandler)
    .addCase("processOrderSuccess", successHandler)
    .addCase("addCategorySuccess", successHandler)
    .addCase("deleteCategorySuccess", successHandler)
    .addCase("addProductSuccess", successHandler)
    .addCase("updateProductSuccess", successHandler)
    .addCase("updateProductImageSuccess", successHandler)
    .addCase("deleteProductImageSuccess", successHandler)
    .addCase("deleteProductSuccess", successHandler)
    .addCase("forgetPasswordSuccess", successHandler)
    .addCase("resetPasswordSuccess", successHandler)
    .addCase("updateLocationSuccess", successHandler);

  // Failure Actions: Set loading to false and store error
  builder
    .addCase("updatePasswordFail", failureHandler)
    .addCase("updateProfileFail", failureHandler)
    .addCase("updatePicFail", failureHandler)
    .addCase("placeOrderFail", failureHandler)
    .addCase("processOrderFail", failureHandler)
    .addCase("addCategoryFail", failureHandler)
    .addCase("deleteCategoryFail", failureHandler)
    .addCase("addProductFail", failureHandler)
    .addCase("updateProductFail", failureHandler)
    .addCase("updateProductImageFail", failureHandler)
    .addCase("deleteProductImageFail", failureHandler)
    .addCase("deleteProductFail", failureHandler)
    .addCase("forgetPasswordFail", failureHandler)
    .addCase("resetPasswordFail", failureHandler)
    .addCase("updateLocationFail", failureHandler);

  // Clear error from state
  builder.addCase("clearError", (state) => {
    state.error = null;
  });

  // Clear message from state
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});

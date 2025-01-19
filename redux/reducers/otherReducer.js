import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({}, (builder) =>{
    builder.addCase("updatePasswordRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updateProfileRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updatePicRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("placeOrderRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("processOrderRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("addCategoryRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("deleteCategoryRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("addProductRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updateProductRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updateProductImageRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("deleteProductImageRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("deleteProductRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("forgetPasswordRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("resetPasswordRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updateLocationRequest", (state) => {
        // Your logic here
        state.loading = true;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updateProfileSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updatePicSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("placeOrderSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("processOrderSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("addCategorySuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("deleteCategorySuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("addProductSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updateProductSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updateProductImageSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("deleteProductImageSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("deleteProductSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("forgetPasswordSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("resetPasswordSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updateLocationSuccess", (state, action) => {
        // Your logic here
        state.loading = false;
        state.message = action.payload;
    })
    .addCase("updatePasswordFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("updatePicFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("placeOrderFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("processOrderFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("addCategoryFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("deleteCategoryFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("addProductFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("updateProductFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("updateProductImageFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("deleteProductImageFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("forgetPasswordFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("resetPasswordFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("updateLocationFail", (state, action) => {
        // Your logic here
        state.loading = false;
        state.error = action.payload;
    })
    // Add other cases here if needed
    builder.addCase("clearError", (state, action) => {
        state.error = null;
    })
    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    })
});
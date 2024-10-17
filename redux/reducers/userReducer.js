import { createReducer } from "@reduxjs/toolkit";

// JUST FOR UNDERSTANDING PURPOSE
// export const userReducer = createReducer(INITIAL_STATE, FUNCTION_FOR_BUILDER)

export const userReducer = createReducer(
    {
        isAuthenticated: false,
        loading: false,
        user: null,
        message: null,
        error: null,
    }, 
    (builder)=>{
    builder.addCase('loginRequest', (state) => {
        state.loading = true;
    }).addCase("loadUserRequest", (state) => {
        state.loading = true;
    }).addCase("logoutRequest", (state) => {
        state.loading = true;
    }).addCase("registerRequest", (state) => {
        state.loading = true;
    })
    builder.addCase('loginSuccess', (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload
    }).addCase("loadUserSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;  
    }).addCase("logoutSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        // state.user = null;
        state.message = action.payload;
    }).addCase("registerSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload
    })
    builder.addCase("loginFailure", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    }).addCase("loadUserFail", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    }).addCase("logoutFail", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    }).addCase("registerFail", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    })
    builder.addCase("clearError", (state, action) => {
        state.error = null;
    })
    builder.addCase("clearMessage", (state, action) => {
        state.message = null;
    })
})
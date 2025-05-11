// store.js

// ---------------------------------------------
// Redux Store Configuration for eCommerce App
// ---------------------------------------------
// This file sets up the global Redux store for state management.
// It imports and combines all reducers used throughout the app.
// Optimization goals: scalability, modularity, maintainability.
// ---------------------------------------------

// Import Redux Toolkit method to configure the store
import { configureStore } from "@reduxjs/toolkit";

// Import all required reducers from the reducers folder
import { userReducer } from "./reducers/userReducer";       // Handles user authentication and profile data
import { otherReducer } from "./reducers/otherReducer";     // Manages miscellaneous app-level state
import { productReducer } from "./reducers/productReducer"; // Handles product listing, details, and filters
import { cartReducer } from "./reducers/cartReducer";       // Manages cart actions, items, and quantities

// ---------------------------------------------
// Configure and export the Redux store
// ---------------------------------------------
export const store = configureStore({
    reducer: {
        // Each reducer manages a specific slice of the global state
        user: userReducer,     // User-related state
        other: otherReducer,   // UI-related or miscellaneous app state
        product: productReducer, // Product listing, filtering, details
        cart: cartReducer      // Shopping cart functionality
    },
    // Middleware and DevTools are automatically added by Redux Toolkit for convenience and debugging
    // You can customize them here if needed (e.g., for logging, analytics)
});

// ---------------------------------------------
// API Base URL for Backend Server (HTTPS enforced)
// ---------------------------------------------
// Used for making API calls to the backend server via fetch or axios
// This is kept as a single source of truth to avoid hardcoding URLs across components
// NOTE: Make sure sensitive endpoints (auth, payments) are protected on the backend
export const server = "https://ecommerce-server-7s3b.onrender.com/api/v1";

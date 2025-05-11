import { createReducer } from "@reduxjs/toolkit";

/**
 * Action type constants to avoid hardcoding strings and reduce the chance of typos.
 */
const LOGIN_REQUEST = "loginRequest";
const LOAD_USER_REQUEST = "loadUserRequest";
const LOGOUT_REQUEST = "logoutRequest";
const REGISTER_REQUEST = "registerRequest";

const LOGIN_SUCCESS = "loginSuccess";
const LOAD_USER_SUCCESS = "loadUserSuccess";
const LOGOUT_SUCCESS = "logoutSuccess";
const REGISTER_SUCCESS = "registerSuccess";

const LOGIN_FAILURE = "loginFailure";
const LOAD_USER_FAILURE = "loadUserFail";
const LOGOUT_FAILURE = "logoutFail";
const REGISTER_FAILURE = "registerFail";

const CLEAR_ERROR = "clearError";
const CLEAR_MESSAGE = "clearMessage";

/**
 * Initial state for user authentication reducer.
 * It manages user session status, loading state, messages, and errors.
 */
const initialState = {
  isAuthenticated: false, // Indicates whether a user is logged in
  loading: false,         // Indicates API call in progress
  user: null,             // Stores user object once authenticated
  message: null,          // Stores success messages
  error: null,            // Stores error messages
};

/**
 * Reducer to handle all user-related state changes such as login, logout,
 * registration, user loading, and clearing of error or message states.
 */
export const userReducer = createReducer(initialState, (builder) => {
  // -------- REQUEST ACTIONS --------
  builder
    .addCase(LOGIN_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOGOUT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(REGISTER_REQUEST, (state) => {
      state.loading = true;
    });

  // -------- SUCCESS ACTIONS --------
  builder
    .addCase(LOGIN_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload; // Example: "Login successful"
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // User object with profile data
    })
    .addCase(LOGOUT_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload; // Example: "Logout successful"
    })
    .addCase(REGISTER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload; // Example: "Account created successfully"
    });

  // -------- FAILURE ACTIONS --------
  builder
    .addCase(LOGIN_FAILURE, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload; // Example: "Invalid credentials"
    })
    .addCase(LOAD_USER_FAILURE, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload; // Example: "Failed to load user"
    })
    .addCase(LOGOUT_FAILURE, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true; // Still logged in despite logout failure
      state.error = action.payload;
    })
    .addCase(REGISTER_FAILURE, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });

  // -------- CLEAR STATE ACTIONS --------
  builder
    .addCase(CLEAR_ERROR, (state) => {
      state.error = null; // Reset error to null
    })
    .addCase(CLEAR_MESSAGE, (state) => {
      state.message = null; // Reset message to null
    });
});

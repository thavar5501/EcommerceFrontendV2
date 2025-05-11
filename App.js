// Importing core React library for component creation
import React from "react";

// Importing Main component that holds the application's core logic and routes
import Main from "./Main";

// Importing Redux Provider to make the Redux store available to the entire app
import { Provider } from "react-redux";

// Importing the Redux store which contains the global application state
import { store } from "./redux/store";

/**
 * The root App component serves as the entry point of the application.
 * It wraps the entire app with Redux's <Provider> to enable global state management.
 *
 * Performance:
 * - Minimal re-renders as this component does not hold any local state.
 * - Wrapped only once at the top level to prevent unnecessary reinitialization.
 *
 * Scalability:
 * - Easy to plug in context providers (e.g., ThemeProvider, NavigationContainer) if needed.
 *
 * Maintainability:
 * - Clean separation of concerns by isolating the main logic in the <Main /> component.
 *
 * Security:
 * - No sensitive logic handled here.
 */
const App = () => {
  return (
    // Redux Provider allows any nested component to access the store via connect/useSelector
    <Provider store={store}>
      {/* Main component handles navigation and app structure */}
      <Main />
    </Provider>
  );
};

// Exporting the root component as default
export default App;

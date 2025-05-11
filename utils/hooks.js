import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../redux/store";
import { getAdminProducts } from "../redux/actions/productAction";

/**
 * Custom hook to handle loading, errors, and success messages from user-related actions.
 * Navigates to the specified screen (default: "login") upon success.
 *
 * @param {object} navigation - React Navigation object for redirection.
 * @param {string} navigateTo - Screen name to navigate to on success.
 * @param {function} dispatch - Redux dispatch function.
 * @returns {boolean} - Loading state from the user reducer.
 */
export const useMessageAndErrorUser = (navigation, navigateTo = "login", dispatch) => {
  const { loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });

      // Reset the navigation stack and go to the desired screen
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });

      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, navigation, navigateTo]);

  return loading;
};

/**
 * Custom hook to handle loading, messages, and errors from non-user actions (e.g., orders, reviews).
 * Optionally dispatches a function after success.
 *
 * @param {object} navigation - React Navigation object.
 * @param {function} dispatch - Redux dispatch function.
 * @param {string} navigateTo - Screen name to navigate to on success.
 * @param {function} [func] - Optional function to dispatch after success.
 * @returns {boolean} - Loading state from the 'other' reducer.
 */
export const useMessageAndErrorOther = (navigation, dispatch, navigateTo, func) => {
  const { loading, error, message } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({ type: "clearError" });
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });

      dispatch({ type: "clearMessage" });

      // Optionally dispatch additional function if provided
      if (typeof func === "function") {
        dispatch(func());
      }
    }
  }, [error, message, dispatch, navigation, navigateTo, func]);

  return loading;
};

/**
 * Custom hook to fetch and set product categories from the backend.
 *
 * @param {function} setCategories - State setter function for categories.
 * @param {boolean} isFocused - Flag to indicate if the screen is focused.
 */
export const useSetCategories = (setCategories, isFocused) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${server}/product/categories`);
        setCategories(data.data);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch categories";
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    };

    if (isFocused) fetchCategories();
  }, [isFocused, setCategories]);
};

/**
 * Custom hook to fetch orders (admin or user-specific) from the backend.
 *
 * @param {boolean} isFocused - Flag to trigger fetch when screen is focused.
 * @param {boolean} isAdmin - Set to true to fetch admin orders.
 * @returns {object} - { orders: array, loading: boolean }
 */
export const useSetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/order/${isAdmin ? "admin" : "my"}`);
        setOrders(isAdmin ? data.orders : data.data);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "Failed to fetch orders";
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) fetchOrders();
  }, [isFocused, isAdmin]);

  return { orders, loading };
};

/**
 * Custom hook to fetch and manage admin product data.
 *
 * @param {function} dispatch - Redux dispatch function.
 * @param {boolean} isFocused - Triggers fetch when screen is focused.
 * @returns {object} - { products, inStock, outOfStock, loading }
 */
export const useAdminProducts = (dispatch, isFocused) => {
  const { products, inStock, outOfStock, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchAdminProducts = () => {
      if (error) {
        Toast.show({
          type: "error",
          text1: error,
        });
        dispatch({ type: "clearError" });
      }

      dispatch(getAdminProducts());
    };

    if (isFocused) fetchAdminProducts();
  }, [dispatch, error, isFocused]);

  return {
    products,
    inStock,
    outOfStock,
    loading,
  };
};

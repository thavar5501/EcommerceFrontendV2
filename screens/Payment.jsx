import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/actions/otherAction';
import NetInfo from '@react-native-community/netinfo';

// Memoized screen names for navigation to avoid re-creating the object on every render
const SCREENS = Object.freeze({
  LOGIN: 'login',
  PROFILE: 'profile',
});

const Payment = ({ navigation, route }) => {
  // State to hold selected payment method; default is "Cash On Delivery"
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Loading state while placing the order
  const [isLoading, setIsLoading] = useState(false);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Access user authentication and cart data from Redux state
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart_Items } = useSelector((state) => state.cart);

  // Destructure price breakdown from route params
  const { itemsPrice, shippingCharges, tax, totalAmount } = route.params;

  /**
   * Validates whether the user profile has complete address information.
   * Alerts the user if the profile is incomplete.
   * @returns {boolean} - True if profile is valid, else false.
   */
  const validateUserProfile = useCallback(() => {
    if (!user || !user.address || !user.city || !user.country || !user.pinCode) {
      Alert.alert('Incomplete Profile', 'Please complete your profile to place an order.');
      return false;
    }
    return true;
  }, [user]);

  /**
   * Checks if the device has an active internet connection.
   * Alerts the user if no internet connection is found.
   * @returns {Promise<boolean>} - True if connected, else false.
   */
  const checkInternetConnection = useCallback(async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert('No Internet', 'Please check your internet connection and try again.');
      return false;
    }
    return true;
  }, []);

  /**
   * Handles the full order placement process.
   * Performs validation, checks internet connectivity, constructs shipping info, and dispatches order.
   */
  const placeOrderWithDetails = async () => {
    if (!validateUserProfile() || !(await checkInternetConnection())) return;

    if (!Array.isArray(cart_Items) || cart_Items.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is empty. Please add items to continue.');
      return;
    }

    // Prepare shipping information from user's profile
    const shippingInfo = {
      address: user.address,
      location: user.location,
      city: user.city,
      country: user.country,
      pinCode: user.pinCode,
    };

    try {
      setIsLoading(true);

      // Dispatch the order placement action
      await dispatch(
        placeOrder(
          shippingInfo,
          cart_Items,
          paymentMethod,
          null, // payment info (if required in future)
          itemsPrice,
          tax,
          shippingCharges,
          totalAmount
        )
      );

      // Navigate to profile screen on success
      navigation.navigate(SCREENS.PROFILE);
    } catch (error) {
      // Handle any errors that occur during order placement
      Alert.alert('Order Failed', 'There was an issue placing your order. Please try again.');
      console.error('Order Placement Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the payment flow based on user authentication.
   * Redirects to login if not authenticated, else places order.
   */
  const handlePayment = () => {
    if (!isAuthenticated) {
      navigation.navigate(SCREENS.LOGIN);
    } else {
      placeOrderWithDetails();
    }
  };

  return (
    <View style={defaultStyle}>
      {/* Header with back button */}
      <Header back />

      {/* Heading section */}
      <Heading text1="Payment" text2="Methods" containerStyle={{ paddingTop: 70 }} />

      {/* Payment selection form */}
      <View style={styles.container}>
        <RadioButton.Group value={paymentMethod} onValueChange={setPaymentMethod}>
          <View style={styles.radioStyle}>
            <Text style={styles.radioStyleText}>Cash On Delivery</Text>
            <RadioButton color={colors.color1} value="COD" />
          </View>
        </RadioButton.Group>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity onPress={handlePayment} activeOpacity={0.8}>
        <Button
          style={styles.btn}
          textColor={colors.color2}
          icon="check-circle"
          loading={isLoading}
          disabled={isLoading}
        >
          Place Order
        </Button>
      </TouchableOpacity>
    </View>
  );
};

// Local styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});

export default Payment;

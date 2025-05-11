import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Heading from '../components/Heading';
import CartItem from '../components/CartItem';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { colors, defaultStyle } from '../styles/styles';

/**
 * Cart screen displaying user's selected cart items,
 * allowing quantity changes and navigation to the Confirm Order screen.
 */
const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Select cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cart_Items);

  /**
   * Memoized calculation of total item count and total price
   * to prevent recalculation on each render unless cartItems changes.
   */
  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, [cartItems]);

  /**
   * Handles increasing item quantity in cart.
   * Prevents increasing beyond available stock.
   */
  const incrementHandler = useCallback(
    (productId) => {
      const item = cartItems.find((i) => i.product === productId);
      if (item) {
        if (item.quantity < item.stock) {
          dispatch({
            type: 'addToCart',
            payload: { ...item, quantity: item.quantity + 1 },
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Out of Stock',
          });
        }
      }
    },
    [cartItems, dispatch]
  );

  /**
   * Handles decreasing item quantity in cart.
   * If quantity reaches 1 and is decreased, item is removed from cart.
   */
  const decrementHandler = useCallback(
    (productId) => {
      const item = cartItems.find((i) => i.product === productId);
      if (item) {
        if (item.quantity > 1) {
          dispatch({
            type: 'addToCart',
            payload: { ...item, quantity: item.quantity - 1 },
          });
        } else {
          dispatch({
            type: 'removeFromCart',
            payload: productId,
          });
        }
      }
    },
    [cartItems, dispatch]
  );

  /**
   * Handles navigation to the Confirm Order screen.
   * Prevents navigation when cart is empty.
   */
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigation.navigate('confirmOrder');
    }
  };

  return (
    <View style={styles.cartContainer}>
      {/* Top header */}
      <Header back={true} emptyCart={cartItems.length !== 0} />

      {/* Heading text */}
      <Heading text1="Shopping" text2="Cart" containerStyle={styles.heading} />

      {/* Cart item list */}
      <View style={styles.cartItemsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                id={item.product}
                name={item.name}
                stock={item.stock}
                amount={item.price}
                imgSrc={item.image}
                quantity={item.quantity}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No Items Yet</Text>
          )}
        </ScrollView>
      </View>

      {/* Total summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>{totalItems} Item(s)</Text>
        <Text style={styles.summaryText}>₹ {totalPrice.toFixed(2)}</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity onPress={handleCheckout} activeOpacity={0.8}>
        <Button
          style={styles.checkoutButton}
          icon={'cart'}
          textColor={colors.color2}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  cartContainer: {
    ...defaultStyle,
    padding: 5,
  },
  heading: {
    paddingTop: 75,
    marginLeft: 35,
  },
  cartItemsContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#555',
    marginTop: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    margin: 30,
    elevation: 2,
  },
});

export default Cart;

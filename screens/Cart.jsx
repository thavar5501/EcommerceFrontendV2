import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { colors, defaultStyle } from '../styles/styles';
import Heading from '../components/Heading';
import { Button } from 'react-native-paper';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const Cart = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  // Access cart items from Redux state
  const cart_Items = useSelector((state) => state.cart.cart_Items);

  // Memoizing the calculations to avoid unnecessary re-renders
  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = cart_Items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart_Items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, [cart_Items]);

  // Function to handle increment of item quantity
  const incrementHandler = (id) => {
    const item = cart_Items.find((i) => i.product === id);
    if (item) {
      if (item.quantity < item.stock) {
        dispatch({
          type: 'addToCart',
          payload: { ...item, quantity: item.quantity + 1 },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Out of stock',
        });
      }
    }
  };

  // Function to handle decrement of item quantity
  const decrementHandler = (id) => {
    const item = cart_Items.find((i) => i.product === id);
    if (item) {
      if (item.quantity > 1) {
        dispatch({
          type: 'addToCart',
          payload: { ...item, quantity: item.quantity - 1 },
        });
      } else {
        dispatch({
          type: 'removeFromCart',
          payload: id,
        });
      }
    }
  };

  return (
    <View style={styles.cartOuterView}>
      {/* Header */}
      <Header back={true} emptyCart={cart_Items.length !== 0} />

      {/* Heading */}
      <Heading text1="Shopping" text2="Cart" containerStyle={styles.headingView} />

      {/* Main body of cart */}
      <View style={styles.cartMainView}>
        <ScrollView>
          {cart_Items.length > 0 ? (
            cart_Items.map((item) => (
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
            <Text style={styles.noItemsYet}>No Items Yet</Text>
          )}
        </ScrollView>
      </View>

      {/* Cart summary */}
      <View style={styles.cartMainView2}>
        <Text>{totalItems} Items</Text>
        <Text>₹ {totalPrice}</Text>
      </View>

      {/* Checkout button */}
      <TouchableOpacity onPress={cart_Items.length > 0 ? () => navigate.navigate('confirmOrder') : () => null}>
        <Button style={styles.checkoutButton} icon={'cart'} textColor={colors.color2} disabled={cart_Items.length === 0}>
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartOuterView: {
    ...defaultStyle,
    padding: 5,
  },
  headingView: {
    paddingTop: 75,
    marginLeft: 35,
  },
  cartMainView: {
    paddingVertical: 20,
    flex: 1,
  },
  cartMainView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  checkoutButton: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    margin: 30,
  },
  noItemsYet: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 22,
  },
});

export default Cart;

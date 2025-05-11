import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

// Importing custom components and styles
import Header from '../components/Header';
import Heading from '../components/Heading';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { colors, defaultStyle } from '../styles/styles';

/**
 * ConfirmOrder Screen
 * This screen displays cart items, calculates totals, and navigates to payment.
 */
const ConfirmOrder = () => {
  // Access navigation instance for screen transitions
  const navigation = useNavigation();

  // Retrieve cart items from Redux state
  const { cart_Items = [] } = useSelector((state) => state.cart || {});

  /**
   * useMemo is used to memoize price calculations and
   * prevent recalculations unless cart_Items change.
   */
  const { itemsPrice, shippingCharges, tax, totalAmount } = useMemo(() => {
    const calculatedItemsPrice = cart_Items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const calculatedShippingCharges = calculatedItemsPrice >= 1000 ? 0 : 40;
    const calculatedTax = Number((calculatedItemsPrice * 0.1).toFixed(0));
    const calculatedTotalAmount =
      calculatedItemsPrice + calculatedShippingCharges + calculatedTax;

    return {
      itemsPrice: calculatedItemsPrice,
      shippingCharges: calculatedShippingCharges,
      tax: calculatedTax,
      totalAmount: calculatedTotalAmount,
    };
  }, [cart_Items]);

  // Navigate to payment screen with price breakdown
  const handlePayment = () => {
    navigation.navigate('payment', {
      itemsPrice,
      tax,
      shippingCharges,
      totalAmount,
    });
  };

  return (
    <View style={styles.container}>
      {/* Reusable header with back button */}
      <Header back={true} />

      {/* Title Heading */}
      <Heading
        containerStyle={styles.headingContainer}
        text1="Confirm"
        text2="Order"
      />

      {/* Scrollable list of cart items */}
      <View style={styles.itemsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cart_Items.length > 0 ? (
            cart_Items.map((item) => (
              <ConfirmOrderItem
                key={item.product}
                image={{ uri: item.image }}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          )}
        </ScrollView>
      </View>

      {/* Price summary tags */}
      <PriceTag heading="Subtotal" value={itemsPrice} />
      <PriceTag heading="Tax" value={tax} />
      <PriceTag heading="Shipping Charges" value={shippingCharges} />
      <PriceTag heading="Total" value={totalAmount} />

      {/* Button to proceed to payment */}
      <TouchableOpacity onPress={handlePayment} activeOpacity={0.8}>
        <Button
          style={styles.paymentButton}
          textColor={colors.color2}
          icon="chevron-right"
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

/**
 * PriceTag Component
 * Displays a heading and its corresponding price.
 */
const PriceTag = React.memo(({ heading, value }) => (
  <View style={styles.priceTagContainer}>
    <Text style={styles.priceTagHeading}>{heading}</Text>
    <Text style={styles.priceTagValue}>₹{value}</Text>
  </View>
));

// Stylesheet for ConfirmOrder screen
const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
  },
  headingContainer: {
    paddingTop: 70,
  },
  itemsContainer: {
    paddingVertical: 20,
    flex: 1,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 30,
    color: 'gray',
    fontSize: 16,
  },
  priceTagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  priceTagHeading: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  priceTagValue: {
    fontSize: 15,
  },
  paymentButton: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    margin: 10,
    elevation: 2,
  },
});

export default ConfirmOrder;

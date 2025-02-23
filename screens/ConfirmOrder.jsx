import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

// Main ConfirmOrder Component
const ConfirmOrder = () => {
  // Get cart items from the Redux store
  const { cart_Items } = useSelector((state) => state.cart);

  // Calculate price, shipping, tax, and total using useMemo for optimization
  const { itemsPrice, shippingCharges, tax, totalAmount } = useMemo(() => {
    const calculatedItemsPrice = cart_Items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    const calculatedShippingCharges = calculatedItemsPrice >= 1000 ? 0 : 40;
    const calculatedTax = Number((0.1 * calculatedItemsPrice).toFixed());
    const calculatedTotalAmount = Number(calculatedItemsPrice + calculatedShippingCharges + calculatedTax);
    
    return {
      itemsPrice: calculatedItemsPrice,
      shippingCharges: calculatedShippingCharges,
      tax: calculatedTax,
      totalAmount: calculatedTotalAmount,
    };
  }, [cart_Items]); // Recalculate only when cart_Items change

  // Use navigation hook
  const navigate = useNavigation();

  return (
    <View style={styles.confirmOrderView1}>
      {/* Header Component */}
      <Header back={true} />

      {/* Heading Component */}
      <Heading containerStyle={{ paddingTop: 70 }} text1="Confirm" text2="Order" />

      {/* Main View */}
      <View style={styles.confirmOrderMainView}>
        <ScrollView>
          {/* Map through cart items */}
          {cart_Items.map((item) => (
            <ConfirmOrderItem
              key={item.product}
              image={{ uri: item.image }}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </ScrollView>
      </View>

      {/* Price Tags */}
      <PriceTag heading="Subtotal" value={itemsPrice} />
      <PriceTag heading="Tax" value={tax} />
      <PriceTag heading="Shipping Charges" value={shippingCharges} />
      <PriceTag heading="Total" value={totalAmount} />

      {/* Payment Button */}
      <TouchableOpacity
        onPress={() =>
          navigate.navigate('payment', { itemsPrice, tax, shippingCharges, totalAmount })
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon="chevron-right"
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the ConfirmOrder component
const styles = StyleSheet.create({
  confirmOrderView1: {
    ...defaultStyle,
  },
  confirmOrderMainView: {
    paddingVertical: 20,
    flex: 1,
  },
});

// Memoized PriceTag Component
const PriceTag = React.memo(({ heading, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
    <Text style={{ fontWeight: '800' }}>{heading}</Text>
    <Text>₹{value}</Text>
  </View>
));

export default ConfirmOrder;

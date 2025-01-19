import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { colors, defaultStyle } from '../../styles/styles';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { useMessageAndErrorOther, useSetOrders } from '../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import { Headline } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { processOrder } from '../../redux/actions/otherAction';

const AdminOrders = ({ navigation }) => {
  const dispatch = useDispatch(); // Redux dispatch for updating orders in the store

  /**
   * Function to handle order processing
   * @param {string} id - ID of the order to process
   */
  const updateHandler = (id) => {
    console.log('Processing Order ID:', id);
    dispatch(processOrder(id));
  };

  // Check if the screen is focused
  const isFocused = useIsFocused();
  // Custom hook to fetch orders when the screen is focused
  const { loading, orders } = useSetOrders(isFocused, true);

  // Custom hook for processing order loading state and error handling
  const processOrderLoading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      {/* Header Component with Back Navigation */}
      <Header back={true} />

      {/* Heading for Admin Orders */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>All Orders</Text>
      </View>

      {/* Loader when fetching orders */}
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.ordersContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  address={
                    `${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.pinCode}, ${item.shippingInfo.country}`
                  }
                  orderedOn={item.createdAt.split('T')[0]}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
                  customerName={item.userDetails.name}
                  mapAddress={item.userDetails.location}
                />
              ))
            ) : (
              <Headline style={styles.noOrdersText}>No Orders Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  ordersContainer: {
    padding: 10,
    flex: 1,
  },
  noOrdersText: {
    textAlign: 'center',
  },
});

export default AdminOrders;

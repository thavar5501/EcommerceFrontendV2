import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Headline } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { processOrder } from '../../redux/actions/otherAction';
import { useMessageAndErrorOther, useSetOrders } from '../../utils/hooks';
import { colors, defaultStyle } from '../../styles/styles';

/**
 * AdminOrders Screen - Displays all orders placed by customers.
 * Only accessible to admins.
 *
 * @param {object} navigation - React Navigation prop for navigation actions
 */
const AdminOrders = ({ navigation }) => {
  const dispatch = useDispatch();

  // Detect if this screen is currently focused
  const isFocused = useIsFocused();

  /**
   * useSetOrders hook fetches orders from backend
   * @param {boolean} isFocused - ensures refetch on screen focus
   * @param {boolean} isAdmin - true to fetch admin-accessible data
   * @returns {object} - loading state and list of orders
   */
  const { loading, orders } = useSetOrders(isFocused, true);

  /**
   * useMessageAndErrorOther hook handles toasts, errors, and loader states
   * @param {function} dispatch - Redux dispatch function
   * @param {string} screen - identifier for handling context
   * @returns {boolean} - loading state for processing orders
   */
  const processOrderLoading = useMessageAndErrorOther(
    navigation,
    dispatch,
    'adminpanel'
  );

  /**
   * Updates the status of the given order by dispatching the processOrder action
   * @param {string} orderId - ID of the order to update
   */
  const updateHandler = (orderId) => {
    // Avoid console logs in production apps
    // Use analytics if needed
    if (__DEV__) console.log('Processing Order ID:', orderId);
    dispatch(processOrder(orderId));
  };

  return (
    <View style={[defaultStyle, { backgroundColor: colors.color5 }]}>
      {/* Top Header with back button */}
      <Header back />

      {/* Page Title */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>All Orders</Text>
      </View>

      {/* Show Loader while orders are being fetched */}
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.ordersContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Show orders if available */}
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderItem
                  key={order._id}
                  id={order._id}
                  i={index}
                  price={order.totalAmount}
                  address={`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  orderedOn={order.createdAt.split('T')[0]}
                  status={order.orderStatus}
                  paymentMethod={order.paymentMethod}
                  admin
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
                  customerName={order.userDetails?.name || 'N/A'}
                  mapAddress={order.shippingInfo?.location || null}
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
    fontSize: 16,
    color: colors.color1,
    marginTop: 20,
  },
});

export default AdminOrders;

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { colors, defaultStyle } from '../../styles/styles'
import Loader from '../../components/Loader'
import OrderItem from '../../components/OrderItem'
import { useMessageAndErrorOther, useSetOrders } from '../../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { Headline } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { processOrder } from '../../redux/actions/otherAction'

const AdminOrders = ({navigation}) => {
  const dispatch = useDispatch(); // Redux dispatch for updating orders in the store
  const updateHandler = (id) => {
    console.log(id);
    dispatch(processOrder(id));
  };

  const isFocused = useIsFocused();
  const {loading, orders}= useSetOrders(isFocused, true);
  console.log(orders);

  const processOrderLoading = useMessageAndErrorOther(navigation, dispatch, "adminpanel");

  return (
    <View style={{...defaultStyle, backgroundColor: colors.color5}}>
      {/* Header*/}
      <Header back={true} />

      {/* All Orders Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>All Orders</Text>
      </View>

      {/* ScrollView Containing All Active Orders */}
      {/* Loading And Loader */}
      {loading ? <Loader /> : (
        <View style={{ padding: 10, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? orders.map((item, index) => (
              <View key={item._id}>
                {/* Order Item */}
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.pinCode}, ${item.shippingInfo.country}`}
                  orderedOn={item.createdAt.split("T")[0]}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
                  customerName={item.userDetails.name}
                />
              </View>
            )) : (
              <Headline style={{ textAlign: "center" }}>
                No Orders Yet
              </Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20
  },
  customerName: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.color1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left'
  }
});

export default AdminOrders;

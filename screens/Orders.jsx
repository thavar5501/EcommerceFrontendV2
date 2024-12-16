import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { defaultStyle, colors } from "../styles/styles";
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import { useSetOrders } from "../utils/hooks"
import { useIsFocused } from '@react-navigation/native';



const Orders = () => {
    const isFocused = useIsFocused();
    const {loading, orders=[]}= useSetOrders(isFocused);
    console.log(orders)
    return (
        <View style={defaultStyle}>
            {/* Header */}
            <Header back={true} />

            {/* Page Heading */}
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>My Orders</Text>
            </View>

            {/* Loading and Content */}
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.contentContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders?.length > 0 ? (
                            orders.map((item, index) => (
                                <OrderItem
                                    key={item._id}
                                    id={item._id}
                                    i={index}
                                    price={item.totalAmount}
                                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.pinCode}, ${item.shippingInfo.country}`}
                                    orderedOn={item.createdAt.split("T")[0]}
                                    status={item.orderStatus}
                                    paymentMethod={item.paymentMethod}
                                    admin={false}
                                />
                            ))
                        ) : (
                            <Headline style={styles.noOrdersText}>
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
    headingContainer: {
        marginBottom: 20,
        paddingTop: 70
    },
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
    contentContainer: {
        padding: 10,
        flex: 1
    },
    noOrdersText: {
        textAlign: "center"
    }
});

export default Orders;

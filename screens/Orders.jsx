import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { defaultStyle, colors } from "../styles/styles";
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import { useSetOrders } from "../utils/hooks";
import { useIsFocused } from '@react-navigation/native';

const Orders = () => {
    // Checks if this screen is currently focused
    const isFocused = useIsFocused();

    // Custom hook to fetch user orders when screen is focused
    const { loading, orders } = useSetOrders(isFocused);

    /**
     * useMemo is used here to memoize the list of rendered order components.
     * This improves performance by preventing unnecessary re-renders when the orders don't change.
     */
    const renderedOrders = useMemo(() => {
        if (!orders || orders.length === 0) {
            return (
                <Headline style={styles.noOrdersText}>
                    No Orders Yet
                </Headline>
            );
        }

        return orders.map((item, index) => (
            <OrderItem
                key={item._id}
                id={item._id}
                i={index}
                price={item.totalAmount}
                address={`${item.shippingInfo?.address}, ${item.shippingInfo?.city}, ${item.shippingInfo?.pinCode}, ${item.shippingInfo?.country}`}
                orderedOn={item.createdAt?.split("T")[0] || "N/A"}
                status={item.orderStatus}
                paymentMethod={item.paymentMethod}
                admin={false}
            />
        ));
    }, [orders]);

    return (
        <View style={defaultStyle}>
            {/* Top App Header with back navigation */}
            <Header back={true} />

            {/* Page Title */}
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>My Orders</Text>
            </View>

            {/* Main Content: Loader or Order List */}
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.contentContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {renderedOrders}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headingContainer: {
        marginBottom: 20,
        paddingTop: 70, // Ensures safe distance from top on all devices
    },
    heading: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "500",
        backgroundColor: colors.color3,
        color: colors.color2,
        padding: 5,
        borderRadius: 5,
        marginTop: 20,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    noOrdersText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
        color: "#888",
    },
});

export default Orders;

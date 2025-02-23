import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/actions/otherAction';
import RNUpiPayment from 'react-native-upi-payment';
import NetInfo from '@react-native-community/netinfo';

const SCREENS = {
    LOGIN: "login",
    PROFILE: "profile",
};

const Payment = ({ navigation, route }) => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isLoading, setIsLoading] = useState(false); // Loading state for the 'Place Order' button
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cart_Items } = useSelector((state) => state.cart);
    const { itemsPrice, shippingCharges, tax, totalAmount } = route.params;

    // Validate if user profile is complete
    const validateUserProfile = useCallback(() => {
        if (!user || !user.address) {
            Alert.alert("Incomplete Profile", "Please complete your profile to place an order.");
            return false;
        }
        return true;
    }, [user]);

    // Check internet connection status
    const checkInternetConnection = useCallback(async () => {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            Alert.alert("No Internet", "Please check your internet connection and try again.");
            return false;
        }
        return true;
    }, []);

    // Handle UPI Payment
    const handleUPIPayment = async () => {
        if (!(await checkInternetConnection())) return;
        if (!RNUpiPayment || !RNUpiPayment.initializePayment) {
            Alert.alert("Error", "UPI Payment module not loaded. Please restart the app.");
            return;
        }

        if (totalAmount <= 0) {
            Alert.alert("Invalid Amount", "The total amount must be greater than zero.");
            return;
        }

        const paymentConfig = {
            vpa: 'setiyamanav@axl', // Replace with actual UPI ID
            payeeName: user?.name || "User",
            amount: totalAmount.toString(),
            transactionRef: `order-${Date.now()}`,
        };

        RNUpiPayment.initializePayment(
            paymentConfig,
            (data) => handleUPISuccess(data),
            (error) => handleUPIFailure(error)
        );
    };

    const handleUPISuccess = (data) => {
        console.log("UPI Payment Success:", data);
        if (data.Status === 'SUCCESS') {
            placeOrderWithDetails(data);
        } else {
            Alert.alert("Payment Failed", "Transaction was unsuccessful. Please try again.");
        }
    };

    const handleUPIFailure = (error) => {
        console.log("UPI Payment Error:", error);
        Alert.alert("Payment Canceled", "The payment was canceled or failed.");
    };

    const placeOrderWithDetails = (paymentInfo = null) => {
        if (!validateUserProfile()) return;

        if (cart_Items.length === 0) {
            Alert.alert("Cart Empty", "Your cart is empty. Please add items to continue.");
            return;
        }

        const shippingInfo = {
            address: user.address,
            location: user.location,
            city: user.city,
            country: user.country,
            pinCode: user.pinCode,
        };

        setIsLoading(true); // Start loading when placing the order

        dispatch(
            placeOrder(
                shippingInfo,
                cart_Items,
                paymentMethod,
                paymentInfo,
                itemsPrice,
                tax,
                shippingCharges,
                totalAmount
            )
        )
        .then(() => {
            setIsLoading(false); // Stop loading after order placement
            navigation.navigate(SCREENS.PROFILE); // Redirect to profile screen
        })
        .catch((error) => {
            setIsLoading(false);
            Alert.alert("Order Failed", "There was an issue placing your order. Please try again.");
            console.error(error);
        });
    };

    const handlePayment = () => {
        if (!isAuthenticated) {
            navigation.navigate(SCREENS.LOGIN);
        } else if (paymentMethod === "COD") {
            placeOrderWithDetails();
        } else {
            handleUPIPayment();
        }
    };

    return (
        <View style={defaultStyle}>
            <Header back={true} />
            <Heading text1="Payment" text2="Methods" containerStyle={{ paddingTop: 70 }} />

            <View style={styles.container}>
                <RadioButton.Group value={paymentMethod} onValueChange={setPaymentMethod}>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Cash On Delivery</Text>
                        <RadioButton color={colors.color1} value="COD" />
                    </View>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Online Payment</Text>
                        <RadioButton color={colors.color1} value="ONLINE" />
                    </View>
                </RadioButton.Group>
            </View>

            <TouchableOpacity onPress={handlePayment}>
                <Button
                    style={styles.btn}
                    textColor={colors.color2}
                    icon={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}
                    loading={isLoading} // Show loading spinner when button is in loading state
                    disabled={isLoading} // Disable button when loading
                >
                    {paymentMethod === "COD" ? "Place Order" : "Pay"}
                </Button>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color3,
        padding: 30,
        borderRadius: 10,
        marginVertical: 10,
        flex: 1,
        justifyContent: "center",
    },
    radioStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    radioStyleText: {
        fontWeight: "600",
        fontSize: 18,
        textTransform: "uppercase",
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

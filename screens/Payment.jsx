import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';
import RNUpiPayment from 'react-native-upi-payment';
import NetInfo from '@react-native-community/netinfo';


const SCREENS = {
    LOGIN: "login",
    PROFILE: "profile",
};

const Payment = ({ navigation, route }) => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { cart_Items } = useSelector((state) => state.cart);

    const { itemsPrice, shippingCharges, tax, totalAmount } = route.params;

    const redirectToLogin = () => navigation.navigate(SCREENS.LOGIN);

    const validateUserProfile = () => {
        if (!user || !user.address) {
            Alert.alert("Incomplete Profile", "Please complete your profile to place an order.");
            return false;
        }
        return true;
    };

    const checkInternetConnection = async () => {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            Alert.alert("No Internet", "Please check your internet connection and try again.");
            return false;
        }
        return true;
    };

    const checkUpiPaymentModule = () => {
        if (!RNUpiPayment || !RNUpiPayment.initializePayment) {
            console.error("RNUpiPayment module not loaded correctly");
            Alert.alert("Error", "UPI Payment module not loaded. Please restart the app.");
            return false;
        }
        return true;
    };

    const codHandler = (paymentInfo = null) => {
        if (!validateUserProfile()) return;

        if (cart_Items.length === 0) {
            Alert.alert("Cart Empty", "Your cart is empty. Please add items to continue.");
            return;
        }

        const shippingInfo = {
            address: user.address,
            city: user.city,
            country: user.country,
            pinCode: user.pinCode,
        };

        dispatch(placeOrder(
            shippingInfo,
            cart_Items,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            tax,
            shippingCharges,
            totalAmount
        ));
    };

    const onlineHandler = async () => {
        if (!(await checkInternetConnection())) return;
        if (!checkUpiPaymentModule()) return;

        if (totalAmount <= 0) {
            Alert.alert("Invalid Amount", "The total amount must be greater than zero.");
            return;
        }

        const paymentConfig = {
            vpa: 'setiyamanav@axl',  // Example UPI ID (replace with dynamic data from API)
            payeeName: user?.name || "User",
            amount: totalAmount.toString(),
            transactionRef: `order-${Date.now()}`,
        };

        RNUpiPayment.initializePayment(paymentConfig, successCallback, failureCallback);
    };

    const successCallback = (data) => {
        console.log("UPI Payment Success Data: ", data); // Debug log
        if (data.Status === 'SUCCESS') {
            codHandler(data);
        } else {
            Alert.alert("Payment Failed", "Transaction was unsuccessful. Please try again.");
        }
    };

    const failureCallback = (error) => {
        console.log("UPI Payment Failure Error: ", error); // Debug log
        Alert.alert("Payment Canceled", "The payment was canceled by the user.");
    };

    const loading = useMessageAndErrorOther(navigation, dispatch, SCREENS.PROFILE, () => ({
        type: "clearCart"
    }));

    const handlePaymentPress = () => {
        if (!isAuthenticated) {
            redirectToLogin();
        } else if (paymentMethod === "COD") {
            codHandler();
        } else {
            onlineHandler();
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

            <TouchableOpacity disabled={loading} onPress={handlePaymentPress}>
                <Button
                    loading={loading}
                    style={styles.btn}
                    textColor={colors.color2}
                    icon={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}
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

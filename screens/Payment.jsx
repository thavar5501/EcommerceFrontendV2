import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { useDispatch,useSelector } from 'react-redux';
import { placeOrder } from '../redux/actions/otherAction';
import OrderItem from '../components/OrderItem';
import { useMessageAndErrorOther } from '../utils/hooks';
// import { request, PERMISSIONS } from 'react-native-permissions'; 

const Payment = ({ navigation, route }) => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state)=>state.user);
    const {cart_Items} = useSelector((state)=>state.cart);
    // console.log(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    // Redirect to login screen if not authenticated
    const redirectToLogin = () => {
        navigation.navigate("login");
    };

    // Handler for Cash On Delivery payment
    const codHandler = (paymentInfo) => {
        // Implement COD logic
        const shippingInfo = {
            address:user.address,
            city: user.city,
            country: user.country,
            pinCode: user.pinCode
        }
        const itemsPrice = route.params.itemsPrice;
        const shippingCharges = route.params.shippingCharges;
        const taxPrice = route.params.tax;
        const totalAmount = route.params.totalAmount;

        dispatch(placeOrder(shippingInfo,
            cart_Items,
            paymentMethod,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount))
    };

    // Handler for Online Payment
    const onlineHandler = () => {
        // Implement online payment logic
    };

    const loading = useMessageAndErrorOther(navigation, dispatch, "profile",()=>({
        type: "clearCart"
    }));

    return (
        <View style={defaultStyle}>
            {/* Payment Header */}
            <Header back={true} />

            {/* Payment Heading */}
            <Heading text1='Payment' text2='Methods' containerStyle={{ paddingTop: 70 }} />

            {/* Payment Container */}
            <View style={styles.container}>
                <RadioButton.Group value={paymentMethod} onValueChange={setPaymentMethod}>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Cash On Delivery</Text>
                        <RadioButton color={colors.color1} value={"COD"} />
                    </View>
                    <View style={styles.radioStyle}>
                        <Text style={styles.radioStyleText}>Online Payment</Text>
                        <RadioButton color={colors.color1} value={"ONLINE"} />
                    </View>
                </RadioButton.Group>
            </View>

            {/* Payment Button */}
            <TouchableOpacity disabled={loading} onPress={!isAuthenticated ? redirectToLogin : paymentMethod === "COD" ? ()=>codHandler() : onlineHandler}>
                <Button
                    loading={loading}
                    style={styles.btn}
                    textColor={colors.color2}
                    icon={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}>
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
        justifyContent: "center"
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
        padding: 5
    }
});

export default Payment;

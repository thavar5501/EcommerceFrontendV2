import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, defaultStyle } from '../styles/styles'
import Header from '../components/Header';
import Heading from '../components/Heading';
// import {initialCartItems} from '../screens/Cart';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
const ConfirmOrder = () => {

const {cart_Items} = useSelector((state)=>state.cart)

const [itemsPrice] = useState(cart_Items.reduce((prev, curr)=> prev+curr.price*curr.quantity, 0));
const [shippingCharges] = useState(itemsPrice>=1000? 0: 40);
const [tax] = useState(Number((0.1 * itemsPrice).toFixed()));
const [totalAmount] = useState(Number(itemsPrice + shippingCharges + tax));

const navigate = useNavigation();
  return (
    <View style={styles.confirmOrderView1}>
    {/* Header Component */}
    <Header back={true}/>
    {/* Heading Component */}
    <Heading containerStyle={{
        paddingTop:70
    }} text1='Confirm' text2='Order'/>
    {/* Main View */}
    <View style={styles.confirmOrderMainView}>
    <ScrollView>
    {
        cart_Items.map((item)=>(
            <ConfirmOrderItem 
            key={item.product}
            image={{uri:item.image}}
            name={item.name}
            price={item.price}
            quantity={item.quantity} 
            />
        ))
    }
    </ScrollView>
    </View>

    <PriceTag heading={"Subtotal"} value={itemsPrice}></PriceTag>
    <PriceTag heading={"Tax"} value={tax}></PriceTag>
    <PriceTag heading={"ShippingCharges"} value={shippingCharges}></PriceTag>
    <PriceTag heading={"Total"} value={totalAmount}></PriceTag>
    <TouchableOpacity onPress={()=>(navigate.navigate("payment", {itemsPrice, tax, shippingCharges, totalAmount}))}>
        <Button style={
            {
                backgroundColor:colors.color3,
                borderRadius:100,
                padding:5,
                margin:10,
            }
        }
        textColor={colors.color2}
        icon={"chevron-right"}
        >Payment</Button>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    confirmOrderView1: {
        ...defaultStyle,
    },
    confirmOrderMainView:{
        paddingVertical:20,
        flex:1
    }
})

const PriceTag = ({heading, value }) => 
    (
    <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:5
    }}>
    <Text style={{fontWeight:800}}>{heading}</Text>
    <Text>₹{value}</Text>
    </View>
    )


export default ConfirmOrder
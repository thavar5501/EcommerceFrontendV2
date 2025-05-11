import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'
import { Avatar } from 'react-native-paper'

/**
 * CartItem component displays an individual item in the cart with options to increment/decrement its quantity.
 * 
 * Props:
 * - id: Unique identifier for the cart item.
 * - name: Name of the product.
 * - stock: The available stock for the item (not currently used in the UI but could be used for validation).
 * - amount: Price of the item.
 * - imgSrc: Image URL of the item.
 * - index: Index of the item for applying alternating background color.
 * - quantity: The current quantity of the item in the cart.
 * - incrementHandler: Function to increment the quantity.
 * - decrementHandler: Function to decrement the quantity.
 */
const CartItem = ({id, name, stock, amount, imgSrc, index, quantity, incrementHandler, decrementHandler}) => {
  return (
    <View style={styles.cartItemView1}>
        {/* Image Section */}
        <View style={{
            width:"40%",
            backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3, // Alternating background color
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
        }}>
            <Image 
                source={{ uri: imgSrc }} 
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    top: "-30%", // Position adjustments for centering the image
                    left: "14%", // Position adjustments for centering the image
                }} 
            />
        </View>

        {/* Product Info Section */}
        <View style={styles.productInfoContainer}>
            <Text numberOfLines={1} style={styles.productName}>
                {name}
            </Text>
            <Text numberOfLines={1} style={styles.productPrice}>
                ₹{amount}
            </Text>
        </View>

        {/* Quantity Controls Section */}
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => incrementHandler(id)} style={styles.incrementButton}>
                <Avatar.Icon icon={"plus"} size={25} style={styles.avatarIcon} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity onPress={() => decrementHandler(id)} style={styles.decrementButton}>
                <Avatar.Icon icon={"minus"} size={25} style={styles.avatarIcon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

// Styles with optimized readability and reusability
const styles = StyleSheet.create({
    cartItemView1: {
        flexDirection: "row",
        height: 75,
        marginVertical: 15,
    },
    productInfoContainer: {
        width: "40%",
        paddingHorizontal: 25,
    },
    productName: {
        fontSize: 17,
        fontWeight: "normal", // Ensures consistent font weight
    },
    productPrice: {
        fontSize: 17,
        fontWeight: "900", // Stronger emphasis on the price
    },
    quantityContainer: {
        alignItems: "center",
        width: "20%",
        height: 80,
        justifyContent: 'space-between',
        alignSelf: "center",
    },
    incrementButton: {
        marginBottom: 5, // Space between increment and quantity display
    },
    decrementButton: {
        marginTop: 5, // Space between decrement and quantity display
    },
    avatarIcon: {
        borderRadius: 5,
        backgroundColor: colors.color5,
    },
    quantityText: {
        borderWidth: 1,
        borderColor: colors.color5,
        height: 25,
        width: 25,
        textAlign: "center",
        textAlignVertical: "center",
    }
})

export default CartItem

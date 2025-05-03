import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'
import { Avatar } from 'react-native-paper'

const CartItem = ({id, name, stock, amount, imgSrc, index, quantity, incrementHandler, decrementHandler}) => {
  return (
    <View style={styles.cartItemView1}>
        <View style={{
            width:"40%",
            backgroundColor: index % 2 === 0? colors.color1 : colors.color3,
            borderTopRightRadius:100,
            borderBottomRightRadius:100
        }}>
        <Image source={{uri:imgSrc}} style={{
            width:"100%",
            height:"100%",
            resizeMode:"contain",
            top:"-30%",
            left:"14%"
        }}/>
        </View>

        <View style={{
            width:"40%",
            paddingHorizontal:25,
        }}>
            <Text numberOfLines={1} style={{
                fontSize:17
            }}>{name}</Text>
            <Text numberOfLines={1} style={{
                fontSize:17,
                fontWeight:900
            }}>₹{amount}</Text>
        </View>

        <View style={{
            alignItems:"center",
            width:"20%",
            height:80,
            justifyContent:'space-between',
            alignSelf:"center"
        }}>
            <TouchableOpacity onPress={()=>incrementHandler(id)}>
                <Avatar.Icon icon={"plus"} size={25} style={{
                    borderRadius:5,
                    backgroundColor:colors.color5,
                }}></Avatar.Icon>
            </TouchableOpacity>
            <Text style={{
                borderWidth:1,
                borderColor:colors.color5,
                height:25,
                width:25,
                textAlign:"center",
                textAlignVertical:"center"
            }}>{quantity}</Text>
            <TouchableOpacity onPress={()=>decrementHandler(id)}>
                <Avatar.Icon icon={"minus"} size={25} style={{
                    borderRadius:5,
                    backgroundColor:colors.color5,
                }}></Avatar.Icon>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cartItemView1:{
        flexDirection:"row",
        height:75,
        marginVertical:15
    }
})
export default CartItem
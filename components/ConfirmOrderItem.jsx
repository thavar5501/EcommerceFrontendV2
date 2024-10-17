import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'


const ConfirmOrderItem = ({image, name, price, quantity}) => {
  return (
    <View style={styles.confirmOrderItemOuterView}>
      <Image  style={styles.confirmOrderItemImage} source={image}/>
      <Text>{name}</Text>
      <View style={styles.confirmOrderItemInnerView}>
        <Text>{quantity}</Text>
        <Text style={{marginHorizontal:5}}>X</Text>
        <Text>{price}</Text>
      </View>
    </View>
  )
}

const styles =  StyleSheet.create({
  confirmOrderItemOuterView: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    margin:10,
    padding:10,
    borderWidth:1,
    borderColor:"rgba(0,0,0,0.1)",
    borderRadius:18
  },
  confirmOrderItemImage:{
    width:85,
    height:85,
    resizeMode:"contain"
  },
  confirmOrderItemInnerView:{
    flexDirection:"row"
  }
})

export default ConfirmOrderItem
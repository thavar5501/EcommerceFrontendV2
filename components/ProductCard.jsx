import { View, Text, TouchableOpacity, StyleSheet , Image} from 'react-native'
import React from 'react'
import { colors } from '../styles/styles'
import { Button } from 'react-native-paper'

const ProductCard = ({stock, name, price, image, id, addToCartHandler, index, navigate}) => {
  const cardStyleView = {
    ...styles.cardView,
    backgroundColor: parseInt(index) % 2 === 0 ? colors.color1 : colors.color2
  }
  const addToCartButton = {
    ...styles.addToCartButton,
    backgroundColor: parseInt(index) % 2 === 0 ? colors.color2 : colors.color3
  }
  return (
    <TouchableOpacity
    activeOpacity={1} 
    onPress={()=>{
      navigate.navigate("productdetails", {id})
    }}>
    <View style={cardStyleView}>

    <View style={styles.firstViewOfCard}>

    <Text style={{
      color: index%2===0? colors.color2:colors.color3,
      fontSize:16,
      fontWeight:"500"
    }}>{name}</Text>

<Text style={{
      color: index%2===0? colors.color2:colors.color3,
      fontSize:16,
      fontWeight:"700"
    }}>₹{price}</Text>

    </View>
    <Image style={styles.imgStyle} source={{uri: image}}/>
    
    {/* ADD TO CART BUTTON  */}
    <TouchableOpacity style={addToCartButton}>
      <Button onPress={()=> addToCartHandler(id, name, price, image, stock)}>
        <Text style={{color:index%2===0?colors.color1:colors.color2,fontWeight:"900", fontSize:17}}>ADD TO CART</Text>
      </Button>
    </TouchableOpacity>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardView:{
    elevation:15,
    width:230,
    alignItems:"center",
    justifyContent:"space-between",
    margin:20,
    borderRadius:20,
    height:340,
  },
  firstViewOfCard:{
    justifyContent:"space-between",
    padding:20,
    width:"100%",
    flexDirection:"row",
    alignItems:"center"
  },
  imgStyle:{
    width:"100%",
    height:200,
    resizeMode:"contain",
    position:"absolute",
    left:55,
    top:75
  },
  addToCartButton:{
    width:"100%",
    borderRadius:0,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    padding:5
  }
})
export default ProductCard
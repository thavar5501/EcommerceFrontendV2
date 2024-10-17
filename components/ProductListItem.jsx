import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../styles/styles'
import MyModal from '../components/MyModal';

const ProductListItem = ({
  navigate,
  deleteHandler,
  id,
  i,
  price,
  stock,
  name, 
  category,
  imgSrc 
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
    <TouchableOpacity 
    onPress={()=>navigate.navigate("productdetails", { id })}
    onLongPress={()=>setOpenModal((prev)=>!prev)}
    activeOpacity={0.9}
    >
      <View style={{
        ...styles.container, 
        backgroundColor:i%2===0? colors.color1 : colors.color3
      }}>
        {/* 1.Image */}
        <Image 
        source={{uri:imgSrc}}
        style={
          {
            height:45,
            width:45,
            resizeMode:"contain"
          }
        }
        />
        {/* 2.Price */}
        <Text style={{color:colors.color2, width:50,marginLeft:10}}
        numberOfLines={1}
        >₹{price}</Text>
        {/* 3.Name */}
        <Text style={{color:colors.color2, width:60}}
        numberOfLines={1}
        >{name}</Text>
        {/* 4.Category */}
        <Text style={{color:colors.color2, width:65}}
        numberOfLines={1}
        >{category}</Text>
        {/* 5.Stock */}
        <Text style={{color:colors.color2, width:35}}
        numberOfLines={1}
        >{stock}</Text>
      </View>
    </TouchableOpacity>

    {/* Modal Logic */}
    {
      openModal && (
        <MyModal
        id={id}
        deleteHandler={deleteHandler}
        navigate={navigate}
        setOpenModal={setOpenModal}
        />
      )
    }
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    height:75,
    alignItems:"center",
    padding:10,
    borderRadius:10,
    marginVertical:10,
    width:"100%"
  }
})
export default ProductListItem
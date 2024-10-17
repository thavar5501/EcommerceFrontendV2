import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Avatar, Headline } from 'react-native-paper'
import { colors } from '../styles/styles'

const SelectComponent = ({
    visible, 
    setVisible, 
    setCategory, 
    setCategoryID,
    categories=[]
}) => {
  const selectCategoryHandler = (item) => {
    console.log(item)
    setCategory(item.name)
    setCategoryID(item._id)
    setVisible(false)
  }  
  return (
    visible && (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=>setVisible(false)}
            >
                <Avatar.Icon 
                icon={"close"}
                size={30}
                style={styles.closeBTN}
                />
            </TouchableOpacity>
            <Headline style={styles.heading}>Select a Category</Headline>
            <ScrollView>
                {
                    categories.map((item)=>(
                        <Text
                        key={item._id}
                        style={styles.categoryText}
                        onPress={()=>selectCategoryHandler(item)}
                        >{item.name}</Text>
                    ))
                }
            </ScrollView>
        </View>
    )
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.color2,
        padding:35,
        borderRadius:20,
        width:"90%",
        height:"90%",
        alignSelf:"center",
        elevation:5,
        position:"absolute",
        top:50
    },
    closeBTN:{
        alignSelf:"flex-end",
        backgroundColor:colors.color1
    },
    heading:{
        textAlign:"center",
        marginVertical:10,
        backgroundColor:colors.color3,
        borderRadius:5,
        padding:3,
        color:colors.color2
    },
    categoryText:{
        fontSize:17,
        fontWeight:"100",
        textTransform:"uppercase",
        marginVertical:10
    }
})
export default SelectComponent
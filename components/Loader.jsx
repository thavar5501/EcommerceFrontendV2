import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../styles/styles'

const Loader = () => {
  return (
    <ActivityIndicator 
    style={styles.loaderStyle}
    size={50}
    color={colors.color1}
    />
  )
}

const styles = StyleSheet.create({
    loaderStyle:{
        top:"50%",
        position:"absolute",
        alignSelf:"center"
    }
})

export default Loader
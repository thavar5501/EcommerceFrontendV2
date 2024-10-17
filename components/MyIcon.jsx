import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { colors } from '../styles/styles'

const MyIcon = ({icon, handler}) => {
  return (
    <TouchableOpacity onPress={handler}>
        <Avatar.Icon 
        icon={icon} 
        size={40}
        style={styles.iconStyle}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    iconStyle:{
        backgroundColor:colors.color1,
        color:colors.color2
    }
})
export default MyIcon
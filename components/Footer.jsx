import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../styles/styles';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Footer = ({activeRoute="home", }) => {
    const navigate = useNavigation();
    const {loading, isAuthenticated} = useSelector(state=>state.user);
    const navigationHandler = (key) => {
        switch (key) {
            case 0:
                navigate.navigate("Home")
                break;
            case 1:
                navigate.navigate("cart")
                break;
            case 2:
                if(isAuthenticated){
                    navigate.navigate("profile")
                }
                else{
                navigate.navigate("login")
                }
                break;    
            default:
                navigate.navigate("home")
                break;
        }
    }
    const avatarOptions = {
      color:colors.color2,
      size:50,
      style:{
        backgroundColor:colors.color1
      }
    }
  return (
    loading === false && (
    <View style={styles.outerFooterView}>
      <View style={styles.footerFirstView}>

      {/* Cart Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigationHandler(1)}>
      <Avatar.Icon
      {...avatarOptions} 
      icon={activeRoute === "cart" ? "shopping" : "shopping-outline"}/>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigationHandler(2)}>
      <Avatar.Icon
      {...avatarOptions} 
      icon={ isAuthenticated === false? "login" : activeRoute === "profile" ? "account" : "account-outline"}/>
      </TouchableOpacity>

      </View>

      <View style={styles.footerSecondView_i}>
      <View style={styles.footerSecondView_ii}>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigationHandler(0)}>
      <Avatar.Icon
      {...avatarOptions} 
      icon={activeRoute === "home" ? "home" : "home-outline"}/>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
  )
}

const styles = StyleSheet.create({
    outerFooterView:{
        backgroundColor:colors.color1,
        borderTopLeftRadius:120,
        borderTopRightRadius:120,
        position:"absolute",
        width:"100%",
        bottom:0
    },
    footerFirstView:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    footerSecondView_i:{
        position:"absolute",
        width:80,
        height:80,
        backgroundColor:colors.color2,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        top:-50,
        alignSelf:"center"
    },
    footerSecondView_ii:{
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Footer
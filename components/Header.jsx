import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart}) => {
  const navigate = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const emptyCartHandler = ()=>{
    dispatch({
      type: "clearCart"
    })
  }
  return (
    <View>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 1,
            top: 12,
            zIndex: 10,
          }}
          onPress={()=>navigate.goBack()}
        >
          <Avatar.Icon
            style={{ backgroundColor: colors.color4 }}
            icon={"arrow-left"}
            color={route.name==="productdetails"? colors.color2 : colors.color3}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
          style={{
            position: "absolute",
            right:0,
            top: 15,
            zIndex: 10,
          }}
          onPress={emptyCart? emptyCartHandler : ()=>navigate.navigate("cart")}
        >
          <Avatar.Icon
            style={{ backgroundColor: colors.color4 }}
            icon={emptyCart ? "delete-outline" : "cart-outline"}
            color={route.name==="productdetails"? colors.color2 : colors.color3}
          />
        </TouchableOpacity>

    </View>
  );
};

export default Header;

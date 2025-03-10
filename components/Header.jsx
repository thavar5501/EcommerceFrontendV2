import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import CartBadge from "./CartBadge";
import { useSelector } from "react-redux";

const Header = ({ back, emptyCart}) => {
  
  // Fetch totalItems directly from Redux
  const totalItems = useSelector((state) =>
    state.cart.cart_Items.reduce((acc, item) => acc + item.quantity, 0)
  );

  // Fetch user login status from Redux store
  const { user } = useSelector((state) => state.user);
  // console.log(isLoggedIn)


  const navigate = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const emptyCartHandler = ()=>{
    dispatch({
      type: "clearCart"
    })
  }


  // Handle the back button press
const handleBackPress = () => {
  if (navigate.canGoBack()) {
    navigate.goBack(); // Go back only if we can go back
  } else {
    // If cannot go back, navigate based on user's login state
    if (user) {  // Check if the user is logged in
      navigate.navigate("profile"); // Go to Profile screen for logged-in users
    } else {
      navigate.navigate("login"); // Go to Login screen for non-logged-in users
    }
  }
};

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
          onPress={handleBackPress}
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
          {/* Badge */}
          {!emptyCart && totalItems > 0 && <CartBadge count={totalItems} />}
        </TouchableOpacity>

    </View>
  );
};

export default Header;

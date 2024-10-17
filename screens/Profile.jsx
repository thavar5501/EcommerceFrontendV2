import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultStyle } from "../styles/styles";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { loadUser, logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  useMessageAndErrorOther,
  useMessageAndErrorUser,
} from "../utils/hooks";
import defaultImg from "../assets/defaultImg.png";
import { useIsFocused } from "@react-navigation/native";
import { updatePic } from "../redux/actions/otherAction";
import mime from "mime";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  const loading = useMessageAndErrorUser(navigation, "login", dispatch);

  const { user } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : false);

  const logoutHandler = () => {
    setAvatar(false); // Reset avatar state
    dispatch(logout());
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        navigation.navigate("orders");
        break;
    }
  };

  const loadingPic = useMessageAndErrorOther(
    navigation,
    dispatch,
    "profile",
    loadUser
  );

  useEffect(() => {
    // Handle image change from route params
    if (route.params?.image) {
      setAvatar(route.params.image);
      
      const myForm = new FormData();
      myForm.append("file", {
        uri: route.params.image,
        name: route.params.image.split("/").pop(),
        type: mime.getType(route.params.image),
      });
      dispatch(updatePic(myForm));
    }
  }, [route.params?.image, dispatch]);
  
  useEffect(() => {
    // Handle avatar update when user changes
    if (user?.avatar) {
      setAvatar(user.avatar.url); // Set new avatar if user exists and has an avatar
    } else {
      setAvatar(false); // Reset avatar if no user or avatar
    }
  }, [user]);
  
  useEffect(() => {
    // Load user only when screen is focused
    if (isFocused) {
      dispatch(loadUser());
    }
  }, [isFocused, dispatch]);
  

  return (
    <>
      <View style={defaultStyle}>
        {/* Profile Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Profile</Text>
        </View>

        {/* Loading */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                source={avatar ? { uri: avatar } : defaultImg}
                size={80}
                style={{ backgroundColor: colors.color1 }}
              />

              {/* Change Photo Button */}
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button
                  disabled={loadingPic}
                  loading={loadingPic}
                  textColor={colors.color2}
                >
                  Change Photo
                </Button>
              </TouchableOpacity>

              {/* User Name And Email */}

              {user ? (
                <>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                </>
              ) : (
                <Text style={styles.name}>User information not available</Text>
              )}
            </View>

            <View>
              <View style={styles.container2}>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Orders"}
                  icon={"format-list-bulleted-square"}
                />
                {user?.role === "admin" && (
                  <ButtonBox
                    handler={navigateHandler}
                    text={"Admin"}
                    icon={"view-dashboard"}
                    reverse={true}
                  />
                )}
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>
              <View style={styles.container3}>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
  email: {
    fontWeight: "300",
    color: colors.color2,
    marginTop: 5,
  },
  container2: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  container3: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-evenly",
  },
});

export default Profile;

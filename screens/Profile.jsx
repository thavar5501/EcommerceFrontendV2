import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultStyle } from "../styles/styles";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { loadUser, logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorOther, useMessageAndErrorUser } from "../utils/hooks";
import defaultImg from "../assets/defaultImg.png";
import { useIsFocused } from "@react-navigation/native";
import { updatePic } from "../redux/actions/otherAction";
import mime from "mime";

const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loading = useMessageAndErrorUser(navigation, "login", dispatch);
  const loadingPic = useMessageAndErrorOther(navigation, dispatch, "profile", loadUser);

  const { user } = useSelector((state) => state.user);

  // Avoid redundant re-renders by only updating when user.avatar changes
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user?.avatar?.url) {
      setAvatar(user.avatar.url);
    } else {
      setAvatar(null);
    }
  }, [user?.avatar?.url]);

  // Logout Handler
  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Navigation Handler
  const navigateHandler = useCallback((text) => {
    const routes = {
      Admin: "adminpanel",
      Orders: "orders",
      Profile: "updateprofile",
      Password: "changepassword",
      "Sign Out": logoutHandler,
    };

    if (text === "Sign Out") {
      routes[text](); // Call logout handler
    } else {
      navigation.navigate(routes[text] || "orders");
    }
  }, [logoutHandler, navigation]);

  // Handle profile image update from route params
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);

      const myForm = new FormData();
      myForm.append("file", {
        uri: route.params.image,
        name: route.params.image.split("/").pop(),
        type: mime.getType(route.params.image),
      });

      try {
        dispatch(updatePic(myForm));
      } catch (error) {
        console.error("Failed to update profile picture:", error);
      }
    }
  }, [route.params?.image, dispatch]);

  // Load user only if the screen is focused and user data is not already available
  useEffect(() => {
    if (isFocused && !user) {
      try {
        dispatch(loadUser());
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    }
  }, [isFocused, dispatch, user]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Profile Heading */}
        <Text style={styles.heading}>Profile</Text>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              {/* Profile Picture */}
              <Avatar.Image
                source={avatar ? { uri: avatar } : defaultImg}
                size={80}
                style={styles.avatar}
              />

              {/* Change Photo Button */}
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() => navigation.navigate("camera", { updateProfile: true })}
              >
                <Button disabled={loadingPic} loading={loadingPic} textColor={colors.color2}>
                  Change Photo
                </Button>
              </TouchableOpacity>

              {/* User Info */}
              <Text style={styles.name}>{user?.name || "User information not available"}</Text>
              {user?.email && <Text style={styles.email}>{user.email}</Text>}
            </View>

            {/* Buttons for Actions */}
            <View>
              <View style={styles.buttonRow}>
                <ButtonBox handler={navigateHandler} text={"Orders"} icon={"format-list-bulleted-square"} />
                {user?.role === "admin" && (
                  <ButtonBox handler={navigateHandler} text={"Admin"} icon={"view-dashboard"} reverse />
                )}
                <ButtonBox handler={navigateHandler} text={"Profile"} icon={"pencil"} />
              </View>

              <View style={styles.buttonRow}>
                <ButtonBox handler={navigateHandler} text={"Password"} icon={"pencil"} />
                <ButtonBox handler={navigateHandler} text={"Sign Out"} icon={"exit-to-app"} />
              </View>
            </View>
          </>
        )}
      </View>

      <Footer />
    </>
  );
};

// Styles
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
    marginBottom: 20,
  },
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: colors.color1,
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
  buttonRow: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-evenly",
  },
});

export default Profile;

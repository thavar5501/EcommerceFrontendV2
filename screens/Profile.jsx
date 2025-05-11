import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";

// Custom styles and components
import { colors, defaultStyle } from "../styles/styles";
import ButtonBox from "../components/ButtonBox";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

// Redux actions and custom hooks
import { loadUser, logout } from "../redux/actions/userActions";
import { updatePic } from "../redux/actions/otherAction";
import { useMessageAndErrorOther, useMessageAndErrorUser } from "../utils/hooks";

// Default avatar image
import defaultImg from "../assets/defaultImg.png";

// Main Profile Component
const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Redux state for user
  const { user } = useSelector((state) => state.user);

  // Hooks to handle message and error handling for loaders
  const loading = useMessageAndErrorUser(navigation, "login", dispatch);
  const loadingPic = useMessageAndErrorOther(navigation, dispatch, "profile", loadUser);

  // Avatar state to manage profile image rendering
  const [avatar, setAvatar] = useState(null);

  // Set avatar whenever user changes
  useEffect(() => {
    setAvatar(user?.avatar?.url || null);
  }, [user?.avatar?.url]);

  // Memoized logout handler for better performance
  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  // Handles navigation or logout based on text
  const navigateHandler = useCallback(
    (text) => {
      const routes = {
        Admin: "adminpanel",
        Orders: "orders",
        Profile: "updateprofile",
        Password: "changepassword",
        "Sign Out": logoutHandler,
      };

      if (text === "Sign Out") {
        routes[text](); // Executes logoutHandler
      } else {
        navigation.navigate(routes[text] || "orders");
      }
    },
    [logoutHandler, navigation]
  );

  // Handles profile picture update if new image is passed through route
  useEffect(() => {
    if (route.params?.image) {
      const imageUri = route.params.image;
      setAvatar(imageUri);

      const myForm = new FormData();
      myForm.append("file", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: mime.getType(imageUri),
      });

      try {
        dispatch(updatePic(myForm));
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  }, [route.params?.image, dispatch]);

  // Load user data only when screen is focused and user isn't already loaded
  useEffect(() => {
    if (isFocused && !user) {
      dispatch(loadUser());
    }
  }, [isFocused, dispatch, user]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Screen Title */}
        <Text style={styles.heading}>Profile</Text>

        {/* Loader shown during user data fetch */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Profile Details */}
            <View style={styles.container}>
              {/* Avatar Image */}
              <Avatar.Image
                source={avatar ? { uri: avatar } : defaultImg}
                size={80}
                style={styles.avatar}
              />

              {/* Button to change profile photo */}
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() => navigation.navigate("camera", { updateProfile: true })}
              >
                <Button
                  disabled={loadingPic}
                  loading={loadingPic}
                  textColor={colors.color2}
                >
                  Change Photo
                </Button>
              </TouchableOpacity>

              {/* User Name and Email */}
              <Text style={styles.name}>
                {user?.name || "User Name Unavailable"}
              </Text>
              {user?.email && <Text style={styles.email}>{user.email}</Text>}
            </View>

            {/* Action Buttons Grid */}
            <View>
              {/* Row 1 */}
              <View style={styles.buttonRow}>
                <ButtonBox handler={navigateHandler} text="Orders" icon="format-list-bulleted-square" />
                {user?.role === "admin" && (
                  <ButtonBox handler={navigateHandler} text="Admin" icon="view-dashboard" reverse />
                )}
                <ButtonBox handler={navigateHandler} text="Profile" icon="pencil" />
              </View>

              {/* Row 2 */}
              <View style={styles.buttonRow}>
                <ButtonBox handler={navigateHandler} text="Password" icon="pencil" />
                <ButtonBox handler={navigateHandler} text="Sign Out" icon="exit-to-app" />
              </View>
            </View>
          </>
        )}
      </View>

      {/* Footer Navigation */}
      <Footer />
    </>
  );
};

// Stylesheet for the Profile screen
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginVertical: 20,
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

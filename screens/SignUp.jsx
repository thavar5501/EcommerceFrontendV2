import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import Footer from "../components/Footer";
import defaultImg from "../assets/defaultImg.png";
import mime from "mime";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { useMessageAndErrorUser } from "../utils/hooks";

/**
 * SignUp screen handles user registration by collecting user details,
 * validating input, and dispatching registration action to Redux.
 */
const SignUp = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // Local state for user registration form inputs
  const [avatar, setAvatar] = useState(""); // Image URI
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // Hook to handle user feedback and navigation on registration success/failure
  const loading = useMessageAndErrorUser(navigation, "profile", dispatch);

  // Handle avatar update via camera screen
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
    }
  }, [route.params]);

  // Email validation using regex
  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  /**
   * Disable the "Sign Up" button if any validation fails
   */
  const disableBtn = useMemo(() => {
    return (
      !name ||
      !isValidEmail ||
      password.length < 6 ||
      address.length < 5 ||
      city.length < 2 ||
      pinCode.length !== 6 ||
      state.length < 2 ||
      country.length < 2 ||
      phone.length !== 10
    );
  }, [name, isValidEmail, password, address, city, pinCode, state, country, phone]);

  /**
   * Submit handler for user registration
   */
  const submitHandler = useCallback(() => {
    try {
      const myForm = new FormData();

      // Append form fields
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("address", address);
      myForm.append("city", city);
      myForm.append("pinCode", pinCode);
      myForm.append("state", state);
      myForm.append("country", country);
      myForm.append("phone", phone);

      // Append avatar image if selected
      if (avatar) {
        const imageType = mime.getType(avatar);
        if (imageType) {
          myForm.append("file", {
            uri: avatar,
            name: avatar.split("/").pop(),
            type: imageType,
          });
        }
      }

      // Dispatch user registration action
      dispatch(registerUser(myForm));
    } catch (error) {
      console.error("Error in SignUp:", error);
    }
  }, [
    avatar,
    name,
    email,
    password,
    address,
    city,
    pinCode,
    state,
    country,
    phone,
    dispatch,
  ]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Header */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        {/* Main form */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          {/* Avatar display */}
          <Avatar.Image
            style={styles.avatar}
            source={avatar ? { uri: avatar } : defaultImg}
          />
          <TouchableOpacity onPress={() => navigation.navigate("camera")}>
            <Button textColor={colors.color2}>Change Photo</Button>
          </TouchableOpacity>

          {/* Form Fields */}
          <TextInput
            {...inputOptions}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TextInput
            {...inputOptions}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            {...inputOptions}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            {...inputOptions}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            {...inputOptions}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            {...inputOptions}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            {...inputOptions}
            placeholder="Pin Code"
            value={pinCode}
            onChangeText={setPinCode}
            keyboardType="numeric"
            maxLength={6}
          />
          <TextInput
            {...inputOptions}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            {...inputOptions}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />

          {/* Sign Up Button */}
          <Button
            labelStyle={styles.buttonLabel}
            style={styles.btn}
            disabled={disableBtn}
            onPress={submitHandler}
            loading={loading}
          >
            Sign Up
          </Button>

          {/* Navigation Link to Login */}
          <Text style={styles.orText}>OR</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Persistent Footer */}
      <Footer activeRoute={"profile"} />
    </>
  );
};

/**
 * Input styling options used across all TextInputs
 */
const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

/**
 * Component-specific styles
 */
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    backgroundColor: colors.color3,
    borderRadius: 5,
    paddingVertical: 5,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    color: colors.color2,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.color1,
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  buttonLabel: {
    color: colors.color2,
  },
  orText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },
  loginLink: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800",
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

export default SignUp;

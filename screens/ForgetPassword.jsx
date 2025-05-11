import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { forgetPassword } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';

const ForgetPassword = ({ navigation }) => {
  // State to manage the email input
  const [email, setEmail] = useState("");

  // Redux dispatch function
  const dispatch = useDispatch();

  // Custom hook to handle message and error after API call
  const loading = useMessageAndErrorOther(navigation, dispatch, "verify");

  // Input field configurations for consistency and cleaner JSX
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
    keyboardType: "email-address",
    autoCapitalize: "none",
    autoCorrect: false
  };

  /**
   * Function to validate email using basic regex.
   * This prevents unnecessary dispatches with malformed emails.
   */
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  /**
   * Handler to dispatch forgot password action.
   * Includes validation and error feedback.
   */
  const submitHandler = useCallback(() => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email field cannot be empty.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Dispatch forgetPassword action with valid email
    try {
      dispatch(forgetPassword(email.trim()));
    } catch (error) {
      console.error("Forget Password Error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  }, [email, dispatch]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Screen Heading */}
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Forget Password</Text>
        </View>

        {/* Main Container */}
        <View style={styles.container}>
          {/* Email Input */}
          <TextInput
            {...inputOptions}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          {/* Submit Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
            disabled={!email.trim()}
            loading={loading}
          >
            Send OTP
          </Button>

          {/* Divider Text */}
          <Text style={styles.or}>OR</Text>

          {/* Navigate to Login */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.signUp}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Navigation */}
      <Footer activeRoute="profile" />
    </>
  );
};

// Stylesheet for ForgetPassword screen
const styles = StyleSheet.create({
  headingWrapper: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: colors.color3,
    color: colors.color2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 12,
    elevation: 10,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: colors.color1,
    marginVertical: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "400",
    color: colors.color2,
  },
  signUp: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "700",
    color: colors.color2,
    textTransform: "uppercase",
    marginTop: 10,
  },
});

export default ForgetPassword;

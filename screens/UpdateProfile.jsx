import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import { updateProfile } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";
import { colors, defaultStyle, inputStyling } from "../styles/styles";

// UpdateProfile screen allows users to edit and update their profile information
const UpdateProfile = ({ navigation }) => {
  // Get current user from Redux store
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // State to hold the form input values, initialized with existing user info
  const [formData, setFormData] = useState({
    avatar: '', // Currently unused, placeholder for future profile picture update
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    pinCode: user?.pinCode?.toString() || '',
    state: user?.state || '',
    country: user?.country || '',
    phone: user?.phone || '',
  });

  // Common TextInput props to ensure consistency and reusability
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  /**
   * Updates form state when any input field value changes.
   * @param {string} field - The form field being updated
   * @param {string} value - The new value for the field
   */
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Validates form and dispatches updateProfile action if valid.
   */
  const submitHandler = () => {
    const { phone, name, email, address, city, pinCode, country } = formData;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Incomplete Form", "Name, Email, and Phone are required.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert("Invalid Phone", "Phone number must be 10 digits.");
      return;
    }

    if (pinCode && !/^\d{6}$/.test(pinCode)) {
      Alert.alert("Invalid Pin Code", "Pin Code must be a 6-digit number.");
      return;
    }

    // Dispatch update profile action
    dispatch(updateProfile(phone, name, email, address, city, pinCode, country));
  };

  // Custom hook to handle loading, navigation, and error handling
  const loading = useMessageAndErrorOther(navigation, dispatch, "profile");

  return (
    <View style={defaultStyle}>
      {/* Header with Back Button */}
      <Header back={true} />

      {/* Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Edit Profile</Text>
      </View>

      {/* Form Wrapper */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Input Fields (excluding avatar) */}
          {Object.keys(formData).map((key) => {
            if (key === "avatar") return null;

            return (
              <TextInput
                key={key}
                {...inputOptions}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChangeText={(value) => handleInputChange(key, value)}
                keyboardType={
                  key === "email"
                    ? "email-address"
                    : key === "phone" || key === "pinCode"
                    ? "numeric"
                    : "default"
                }
                autoCapitalize={key === "email" || key === "phone" ? "none" : "words"}
                autoCorrect={false}
              />
            );
          })}

          {/* Submit Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
            loading={loading}
            disabled={loading}
          >
            Update
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// Styles used in UpdateProfile screen
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
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
  scrollContainer: {
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
    flexGrow: 1,
  },
  btn: {
    backgroundColor: colors.color1,
    marginVertical: 20,
    padding: 5,
    borderRadius: 5,
  },
});

export default UpdateProfile;

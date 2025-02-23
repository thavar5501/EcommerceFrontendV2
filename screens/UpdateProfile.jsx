import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

// Optimized Profile Update Component
const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Combined state for form fields
  const [formData, setFormData] = useState({
    avatar: '',
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    pinCode: user?.pinCode?.toString() || '',
    state: user?.state || '',
    country: user?.country || '',
    phone: user?.phone || '',
  });

  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Form submission handler
  const submitHandler = () => {
    const { phone, name, email, address, city, pinCode, country } = formData;
    if (!phone || !name || !email) {
      alert("Please fill in all required fields");
      return;
    }
    dispatch(updateProfile(phone, name, email, address, city, pinCode, country));
  };

  // Handle loading and error handling
  const loading = useMessageAndErrorOther(navigation, dispatch, "profile");

  return (
    <View style={defaultStyle}>
      {/* Header */}
      <Header back={true} />

      {/* Update Profile Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Edit Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* Update Profile Form */}
        <View>
          {Object.keys(formData).map((key) => (
            key !== 'avatar' && (
              <TextInput
                key={key}
                {...inputOptions}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChangeText={(value) => handleInputChange(key, value)}
                keyboardType={key === 'email' ? 'email-address' : 'default'}
              />
            )
          ))}

          {/* Update Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
            loading={loading}
          >
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

// StyleSheet for the component
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
});

export default UpdateProfile;

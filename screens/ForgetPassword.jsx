import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(navigation, dispatch, "verify");
  
  // Input styling options for TextInput components
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
    keyboardType: "email-address" // Ensure keyboard type is suitable for email input
  };

  // Function to handle forget password submission
  const submitHandler = () => {
    // Basic validation to ensure the email is not empty
    if (email === "") {
      Alert.alert("Error", "Email field cannot be empty.");
      return;
    }
    dispatch(forgetPassword(email))
  };

  return (
    <>
      <View style={defaultStyle}>
        {/* ForgetPassword Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Forget Password</Text>
        </View>

        {/* ForgetPassword Container */}
        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          
          {/* ForgetPassword Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={email === ""}
            onPress={submitHandler}
            loading={loading}
          >
            Send OTP
          </Button>

          {/* OR TEXT */}
          <Text style={styles.or}>OR</Text>

          {/* Log In Text */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.signUp}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Footer activeRoute={"profile"} />
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20 
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center"
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2
  },
  signUp: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800",
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20 
  }
});

export default ForgetPassword;

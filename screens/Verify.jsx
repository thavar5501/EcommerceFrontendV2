import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import { useMessageAndErrorOther } from '../utils/hooks';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/actions/otherAction';

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(navigation, dispatch, "login");

  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  const submitHandler = () => {
    if (otp && password) {
      dispatch(resetPassword(otp, password));
    }
  };

  return (
    <>
      <View style={defaultStyle}>
        {/* Verify Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Reset Password</Text>
        </View>

        {/* Verify Container */}
        <View style={styles.container}>
          <TextInput 
            {...inputOptions} 
            placeholder="OTP" 
            value={otp} 
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6} // Limit OTP input to 6 digits for consistency
          />

          <TextInput 
            {...inputOptions} 
            placeholder="New Password" 
            value={password} 
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Verify Button */}
          <Button 
            textColor={colors.color2} 
            style={styles.btn}
            disabled={!otp || !password}  // Conditionally disable the button
            loading={loading}
            onPress={submitHandler}
          >
            Reset
          </Button>

          {/* OR TEXT */}
          <Text style={styles.or}>OR</Text>

          {/* Resend OTP Text */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={styles.signUp}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Footer activeRoute="profile" />
    </>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
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
    justifyContent: "center",
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
    color: colors.color2,
  },
  signUp: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800",
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Verify;

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { useMessageAndErrorOther } from '../utils/hooks';
import { resetPassword } from '../redux/actions/otherAction';

const Verify = ({ navigation }) => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Local state for OTP and new password
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  // Custom hook to handle loading, messages, and errors
  const loading = useMessageAndErrorOther(navigation, dispatch, 'login');

  /**
   * Common options for TextInput styling and behavior.
   */
  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  /**
   * Validates and dispatches resetPassword action.
   * Adds basic checks for better UX and security.
   */
  const submitHandler = useCallback(() => {
    const trimmedOtp = otp.trim();
    const trimmedPassword = password.trim();

    // Simple validation before dispatch
    if (!trimmedOtp || !trimmedPassword) return;

    if (trimmedPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    dispatch(resetPassword(trimmedOtp, trimmedPassword));
  }, [dispatch, otp, password]);

  /**
   * Navigate to resend OTP screen.
   */
  const handleResendOTP = useCallback(() => {
    navigation.navigate('forgetpassword');
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={defaultStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Reset Password</Text>
        </View>

        {/* Input Form Container */}
        <View style={styles.container}>
          {/* OTP Input */}
          <TextInput
            {...inputOptions}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />

          {/* New Password Input */}
          <TextInput
            {...inputOptions}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Submit Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={!otp || !password}
            loading={loading}
            onPress={submitHandler}
            accessibilityLabel="Reset Password Button"
          >
            Reset
          </Button>

          {/* OR Divider */}
          <Text style={styles.or}>OR</Text>

          {/* Resend OTP Link */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleResendOTP}
            accessibilityLabel="Resend OTP"
          >
            <Text style={styles.signUp}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Footer */}
      <Footer activeRoute="profile" />
    </>
  );
};

/**
 * Component-specific styles.
 */
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
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
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  or: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    color: colors.color2,
  },
  signUp: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: colors.color2,
    textTransform: 'uppercase',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Verify;

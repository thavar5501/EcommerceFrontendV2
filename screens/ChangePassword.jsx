import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

// Constants & Utilities
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import Header from '../components/Header';
import { updatePassword } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';

/**
 * ChangePassword Component
 * Allows the user to securely update their password
 */
const ChangePassword = ({ navigation }) => {
  // Redux dispatch hook for sending actions
  const dispatch = useDispatch();

  // State hooks for form inputs
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Custom hook to handle loading, error, and message
  const loading = useMessageAndErrorOther(navigation, dispatch, 'profile');

  /**
   * Input styling and behavior configuration
   * useMemo used to prevent object recreation on each render
   */
  const inputOptions = useMemo(() => ({
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
    secureTextEntry: true, // hides the password
    autoCapitalize: 'none',
    autoCorrect: false,
  }), []);

  /**
   * Handler for submitting password change
   * Validates inputs and dispatches Redux action
   */
  const submitHandler = useCallback(() => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill in both password fields.');
      return;
    }

    // Additional basic security check (optional enhancement)
    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'New password must be at least 6 characters.');
      return;
    }

    dispatch(updatePassword(oldPassword, newPassword));
  }, [oldPassword, newPassword, dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={defaultStyle}
    >
      {/* Header with back button */}
      <Header back={true} />

      {/* Heading Text */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Change Password</Text>
      </View>

      {/* Form Container */}
      <View style={styles.container}>
        {/* Old Password Input */}
        <TextInput
          {...inputOptions}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        {/* New Password Input */}
        <TextInput
          {...inputOptions}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {/* Submit Button */}
        <Button
          textColor={colors.color2}
          style={styles.btn}
          disabled={!oldPassword.trim() || !newPassword.trim()}
          onPress={submitHandler}
          loading={loading}
        >
          Change Password
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;

/**
 * StyleSheet for ChangePassword screen
 */
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 12,
    elevation: 5,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: colors.color1,
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 6,
    borderRadius: 6,
  },
});

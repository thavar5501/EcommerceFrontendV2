import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import Footer from '../components/Footer';

const Login = ({ navigation }) => {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // Custom hook to manage loading, errors, and navigation after login
  const loading = useMessageAndErrorUser(navigation, 'profile', dispatch);

  // Common TextInput props
  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
    autoCapitalize: 'none',
    autoCorrect: false,
  };

  /**
   * @description Handles the login form submission
   * @security Prevents empty or malformed values from being submitted
   */
  const submitHandler = useCallback(() => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Simple front-end validation
    if (!trimmedEmail || !trimmedPassword) return;

    dispatch(login(trimmedEmail, trimmedPassword));
  }, [dispatch, email, password]);

  return (
    <>
      <View style={defaultStyle}>
        {/* Screen Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Login</Text>
        </View>

        {/* Login Form Fields */}
        <View style={styles.container}>
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

          {/* Forget Password Redirect */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('forgetpassword')}
          >
            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </TouchableOpacity>

          {/* Submit Login */}
          <Button
            labelStyle={styles.btnText}
            style={styles.btn}
            disabled={!email.trim() || !password.trim()}
            onPress={submitHandler}
            loading={loading}
            mode="contained"
          >
            Log In
          </Button>

          <Text style={styles.or}>OR</Text>

          {/* Navigate to Sign Up */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('signup')}
          >
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <Footer activeRoute="profile" />
    </>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: colors.color3,
    color: colors.color2,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 12,
    elevation: 10,
    justifyContent: 'center',
  },
  forgetPasswordText: {
    color: colors.color2,
    alignSelf: 'flex-end',
    marginVertical: 10,
    fontWeight: '300',
  },
  btn: {
    backgroundColor: colors.color1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnText: {
    color: colors.color2,
    fontWeight: 'bold',
  },
  or: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: colors.color2,
    marginVertical: 10,
  },
  signUp: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color2,
    textTransform: 'uppercase',
    marginTop: 10,
  },
});

export default Login;

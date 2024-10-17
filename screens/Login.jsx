import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const loading = useMessageAndErrorUser(navigation, "profile", dispatch)
  
  // Input field options for TextInput
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  // Function to handle form submission
  const submitHandler = () => {
    dispatch(login(email, password))
  };

  // We will handle loading state in backend integration
  // const loading = false;

  return (
    <>
      <View style={defaultStyle}>
        {/* Login Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Login</Text>
        </View>

        {/* Login Container */}
        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            {...inputOptions}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {/* Forget Password Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
          {/* Login Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={email === "" || password === ""}
            onPress={submitHandler}
            loading={loading}
          >
            Log In
          </Button>
          {/* OR TEXT */}
          <Text style={styles.or}>OR</Text>
          {/* SignUp Text */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer Component */}
      <Footer activeRoute={"profile"} />
    </>
  );
};

const styles = StyleSheet.create({
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
  forgetPasswordText: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
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

export default Login;

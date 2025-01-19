import React, { useEffect, useState } from "react";
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

const SignUp = ({ navigation, route }) => {
  // State variables for form data
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  // Disable SignUp button if any required field is empty
  const disableBtn =
    !name || !email || !password || !address || !city || !pinCode || !state || !country || !phone;

  // Input styling options for consistency
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, "profile", dispatch);

  // Set avatar if it's passed as a route parameter (e.g., from camera)
  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  // Form submission handler
  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("address", address);
    myForm.append("city", city);
    myForm.append("pinCode", pinCode);
    myForm.append("state", state);
    myForm.append("country", country);
    myForm.append("phone", phone);

    // Append avatar if selected
    if (avatar !== "") {
      myForm.append("file", {
        uri: avatar,
        name: avatar.split("/").pop(),
        type: mime.getType(avatar),
      });
    }

    // Dispatch registration action and open modal (could be a success modal)
    dispatch(registerUser(myForm));
    // Redirect to a modal after successful registration (assuming modal screen exists)
    navigation.navigate("profile");
  };

  return (
    <>
      <View style={defaultStyle}>
        {/* Sign Up Header */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/* Avatar Section with Change Photo Button */}
          <Avatar.Image
            style={styles.avatar}
            source={avatar ? { uri: avatar } : defaultImg}
          />
          <TouchableOpacity onPress={() => navigation.navigate("camera")}>
            <Button textColor={colors.color2}>Change Photo</Button>
          </TouchableOpacity>

          {/* Input Fields for user details */}
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
            secureTextEntry={true}
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
            placeholder="PinCode"
            value={pinCode}
            onChangeText={setPinCode}
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

          <Text style={styles.orText}>OR</Text>

          {/* Redirect to Login Screen */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Footer Component */}
      <Footer activeRoute={"profile"} />
    </>
  );
};

const styles = StyleSheet.create({
  // Heading section style
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
  // Main container style
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
  },
  // Avatar and photo change button styling
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.color1,
  },
  // Sign up button styling
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  buttonLabel: {
    color: colors.color2,
  },
  // 'OR' text styling
  orText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },
  // Login Link styling
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

import React, { useEffect, useState, useMemo, useCallback } from "react";
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

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, "profile", dispatch);

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
    }
  }, [route.params]);

  // Validate email format
  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // Compute disableBtn value efficiently
  const disableBtn = useMemo(
    () =>
      !name ||
      !isValidEmail ||
      password.length < 6 ||
      address.length < 5 ||
      city.length < 2 ||
      pinCode.length !== 6 ||
      state.length < 2 ||
      country.length < 2 ||
      phone.length !== 10,
    [name, isValidEmail, password, address, city, pinCode, state, country, phone]
  );

  // Form submission
  const submitHandler = useCallback(() => {
    try {
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

      if (avatar) {
        myForm.append("file", {
          uri: avatar,
          name: avatar.split("/").pop(),
          type: mime.getType(avatar),
        });
      }

      dispatch(registerUser(myForm));
      navigation.navigate("profile");
    } catch (error) {
      console.error("Error in SignUp:", error);
    }
  }, [avatar, name, email, password, address, city, pinCode, state, country, phone, dispatch, navigation]);

  return (
    <>
      <View style={defaultStyle}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <Avatar.Image style={styles.avatar} source={avatar ? { uri: avatar } : defaultImg} />
          <TouchableOpacity onPress={() => navigation.navigate("camera")}>
            <Button textColor={colors.color2}>Change Photo</Button>
          </TouchableOpacity>

          <TextInput {...inputOptions} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />
          <TextInput {...inputOptions} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput {...inputOptions} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput {...inputOptions} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput {...inputOptions} placeholder="Address" value={address} onChangeText={setAddress} />
          <TextInput {...inputOptions} placeholder="City" value={city} onChangeText={setCity} />
          <TextInput {...inputOptions} placeholder="Pin Code" value={pinCode} onChangeText={setPinCode} keyboardType="numeric" maxLength={6} />
          <TextInput {...inputOptions} placeholder="State" value={state} onChangeText={setState} />
          <TextInput {...inputOptions} placeholder="Country" value={country} onChangeText={setCountry} />

          <Button labelStyle={styles.buttonLabel} style={styles.btn} disabled={disableBtn} onPress={submitHandler} loading={loading}>
            Sign Up
          </Button>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("login")}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Footer activeRoute={"profile"} />
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    elevation: 10,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.color1,
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 5,
  },
  buttonLabel: {
    color: colors.color2,
  },
  orText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },
  loginLink: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800",
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

// Common input options
const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export default SignUp;

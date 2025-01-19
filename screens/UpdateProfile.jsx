import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";

const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  // Dispatch Here
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());
  const [state, setState] = useState(user?.state);
  const [country, setCountry] = useState(user?.country);
  const [phone, setPhone] = useState(user?.phone);

  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  const submitHandler = () => {
    dispatch(updateProfile(phone, name, email, address, city, pinCode, country));
  };

  // We will see in backend
  const loading = useMessageAndErrorOther(navigation, dispatch, "profile");
  return (
    <>
      <View style={defaultStyle}>
        {/* Header*/}
        <Header back={true} />

        {/*UpdateProfile Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Edit Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {/* UpdateProfile Container */}
          <View style={{}}>
            {/* Name */}
            <TextInput
              {...inputOptions}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
            />
            {/* Name */}
            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            {/* Email */}
            <TextInput
              {...inputOptions}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {/* Address */}
            <TextInput
              {...inputOptions}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            {/* City */}
            <TextInput
              {...inputOptions}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            {/* PinCode */}
            <TextInput
              {...inputOptions}
              placeholder="PinCode"
              value={pinCode}
              onChangeText={setPinCode}
            />
            {/* State */}
            <TextInput
              {...inputOptions}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
            {/* Country */}
            <TextInput
              {...inputOptions}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
            {/* UpdateProfile Button */}
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
      {/* <Footer activeRoute={"profile"}/> */}
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
    // justifyContent:"center"
  },
  UpdateProfileText: {
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
  UpdateProfile: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800",
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default UpdateProfile;

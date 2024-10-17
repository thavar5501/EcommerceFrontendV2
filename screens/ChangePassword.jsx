import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../redux/actions/otherAction';
import { useMessageAndErrorOther } from '../utils/hooks';

const ChangePassword = ({ navigation }) => {

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loading = useMessageAndErrorOther(navigation, dispatch, "profile");

  // Input styling options for TextInput components
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
    secureTextEntry: true // Ensure password fields are hidden
  };

  // Function to handle password change submission
  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
  };

  return (
    <>
      <View style={defaultStyle}>
        <Header back={true} />
        {/* ChangePassword Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Change Password</Text>
        </View>

        {/* ChangePassword Container */}
        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder='Old Password'
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            {...inputOptions}
            placeholder='New Password'
            value={newPassword}
            onChangeText={setNewPassword}
          />
          {/* ChangePassword Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={oldPassword === "" || newPassword === ""}
            onPress={submitHandler}
            loading={loading}
          >
            Change Password
          </Button>
        </View>
      </View>
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
  }
});

export default ChangePassword;
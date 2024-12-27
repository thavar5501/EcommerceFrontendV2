import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import Footer from '../components/Footer';
import defaultImg from '../assets/defaultImg.png';
import mime from 'mime';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { useMessageAndErrorUser } from '../utils/hooks';
import NetInfo from '@react-native-community/netinfo';

const SignUp = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const disableBtn = !name || !email || !password || !address || !city || !pinCode || !state || !country;

  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, 'profile', dispatch);

  // Fetch and Set Location with retry mechanism and handling offline mode
  const fetchAndSetLocation = async (retry = 0) => {
    try {
      setLoadingLocation(true);

      // Check network connectivity
      const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
      if (!isConnected) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to fetch your address.');
        setUseManualAddress(true);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const mapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      if (mapsURL) {
        setAddress(mapsURL);
        Alert.alert('Location Fetched Successfully');
      } else {
        throw new Error('Unable to fetch address from coordinates.');
      }
    } catch (error) {
      if (retry < 2) {
        // Retry mechanism with 2 attempts
        Alert.alert(
          'Error',
          'Failed to fetch location. Would you like to retry?',
          [
            { text: 'Cancel', onPress: () => setUseManualAddress(true), style: 'cancel' },
            {
              text: 'Retry',
              onPress: () => fetchAndSetLocation(retry + 1),
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error('Error fetching location:', error.message);
        Alert.alert('Error', error.message);
        setUseManualAddress(true);
      }
    } finally {
      setLoadingLocation(false);
    }
  };

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('address', address);
    myForm.append('city', city);
    myForm.append('pinCode', pinCode);
    myForm.append('state', state);
    myForm.append('country', country);

    if (avatar !== '') {
      myForm.append('file', {
        uri: avatar,
        name: avatar.split('/').pop(),
        type: mime.getType(avatar),
      });
    }

    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  return (
    <>
      <View style={defaultStyle}>
        {/* SignUp Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          {/* Profile Picture Avatar */}
          <Avatar.Image
            style={{
              alignSelf: 'center',
              backgroundColor: colors.color1,
            }}
            source={avatar ? { uri: avatar } : defaultImg}
          />
          <TouchableOpacity onPress={() => navigation.navigate('camera')}>
            <Button textColor={colors.color2}>Change Photo</Button>
          </TouchableOpacity>

          {/* Name */}
          <TextInput {...inputOptions} placeholder="Name" value={name} onChangeText={setName} />

          {/* Email */}
          <TextInput {...inputOptions} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          {/* Password */}
          <TextInput {...inputOptions} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />

          {/* Address */}
          {!useManualAddress ? (
            <Button
              mode="contained"
              onPress={() => fetchAndSetLocation()}
              style={styles.btn}
              textColor={colors.color2}
              loading={loadingLocation}
            >
              {loadingLocation ? 'Fetching Location...' : 'Use Current Location'}
            </Button>
          ) : (
            <TextInput {...inputOptions} placeholder="Address" value={address} onChangeText={setAddress} />
          )}

          {/* City */}
          <TextInput {...inputOptions} placeholder="City" value={city} onChangeText={setCity} />

          {/* PinCode */}
          <TextInput {...inputOptions} placeholder="PinCode" value={pinCode} onChangeText={setPinCode} />

          {/* State */}
          <TextInput {...inputOptions} placeholder="State" value={state} onChangeText={setState} />

          {/* Country */}
          <TextInput {...inputOptions} placeholder="Country" value={country} onChangeText={setCountry} />

          {/* SignUp Button */}
          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={disableBtn}
            onPress={submitHandler}
            loading={loading}
          >
            Sign Up
          </Button>

          {/* OR TEXT */}
          <Text style={styles.or}>OR</Text>

          {/* Log In Text */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
            <Text style={styles.signUp}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Footer activeRoute={'profile'} />
    </>
  );
};

const styles = StyleSheet.create({
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

export default SignUp;

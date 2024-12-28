import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Easing,
} from 'react-native';
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
import { MaterialIcons } from '@expo/vector-icons'; // For Location Icon

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
  const [overlayAnimation, setOverlayAnimation] = useState(false);
  const overlayOpacity = useState(new Animated.Value(0))[0];

  const disableBtn =
    !name || !email || !password || !address || !city || !pinCode || !state || !country;

  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, 'profile', dispatch);

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  const startOverlayAnimation = () => {
    setOverlayAnimation(true);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setOverlayAnimation(false);
      overlayOpacity.setValue(0);
    });
  };

  const fetchAndSetLocation = async () => {
    try {
      setLoadingLocation(true);

      const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
      if (!isConnected) {
        throw new Error('No internet connection. Please check your network and try again.');
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to fetch your address.'
        );
        setUseManualAddress(true);
        return;
      }

      startOverlayAnimation();

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
      console.error('Error fetching location:', error.message);
      Alert.alert('Error', error.message);
      setUseManualAddress(true);
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

  return (
    <>
      <View style={defaultStyle}>
        {/* SignUp Heading */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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

          <TextInput {...inputOptions} placeholder="Name" value={name} onChangeText={setName} />
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
          <TextInput {...inputOptions} placeholder="Address" value={address} onChangeText={setAddress} />
          <TextInput {...inputOptions} placeholder="City" value={city} onChangeText={setCity} />
          <TextInput {...inputOptions} placeholder="PinCode" value={pinCode} onChangeText={setPinCode} />
          <TextInput {...inputOptions} placeholder="State" value={state} onChangeText={setState} />
          <TextInput {...inputOptions} placeholder="Country" value={country} onChangeText={setCountry} />

          {!useManualAddress && (
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={fetchAndSetLocation}
              disabled={loadingLocation}
            >
              <MaterialIcons name="my-location" size={20} color={colors.color2} />
              <Text style={styles.locationBtnText}>
                {loadingLocation ? 'Fetching...' : 'Use Current Location'}
              </Text>
            </TouchableOpacity>
          )}

          <Button
            textColor={colors.color2}
            style={styles.btn}
            disabled={disableBtn}
            onPress={submitHandler}
            loading={loading}
          >
            Sign Up
          </Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
            <Text style={styles.signUp}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {overlayAnimation && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Text style={styles.overlayText}>Fetching Location...</Text>
        </Animated.View>
      )}

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
  locationBtn: {
    backgroundColor: colors.color1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 20,
    borderRadius: 30,
  },
  locationBtnText: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.color1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayText: {
    color: colors.color2,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SignUp;

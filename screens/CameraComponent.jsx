import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';

import MyIcon from '../components/MyIcon';
import { defaultStyle } from '../styles/styles';

const CameraComponent = ({ navigation, route }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null); // Tracks camera permission status
  const [cameraType, setCameraType] = useState(CameraType.back); // Tracks which camera is active
  const cameraRef = useRef(null); // Reference to Camera instance

  /**
   * Request camera permission on component mount.
   */
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permission Required", "Camera access is required to proceed.");
        }
        setHasCameraPermission(status === 'granted');
      } catch (error) {
        console.error("Camera permission error:", error);
        setHasCameraPermission(false);
      }
    };

    requestCameraPermission();
  }, []);

  /**
   * Opens the image picker to choose an image from the device gallery.
   */
  const openImagePicker = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Gallery access is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        navigateWithImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  }, [navigateWithImage]);

  /**
   * Captures a picture using the camera.
   */
  const clickPicture = useCallback(async () => {
    try {
      if (cameraRef.current) {
        const data = await cameraRef.current.takePictureAsync({ quality: 1 });
        if (data?.uri) {
          navigateWithImage(data.uri);
        }
      }
    } catch (error) {
      console.error("Camera capture error:", error);
    }
  }, [navigateWithImage]);

  /**
   * Handles navigation and passes the selected or captured image URI.
   * Navigates based on intent specified in `route.params`.
   * 
   * @param {string} imageUri - The URI of the selected or captured image
   */
  const navigateWithImage = useCallback((imageUri) => {
    const { newProduct, updateProduct, updateProfile } = route.params || {};

    if (newProduct) {
      navigation.navigate('newproduct', { image: imageUri });
    } else if (updateProduct) {
      navigation.navigate('productimages', { image: imageUri });
    } else if (updateProfile) {
      navigation.navigate('profile', { image: imageUri });
    } else {
      navigation.navigate('signup', { image: imageUri });
    }
  }, [navigation, route.params]);

  /**
   * Toggles the camera between front and back.
   */
  const toggleCameraType = () => {
    setCameraType((prevType) =>
      prevType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  // Handle camera permission UI rendering
  if (hasCameraPermission === null) return <View />;

  if (hasCameraPermission === false) {
    return (
      <View style={defaultStyle}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No Access To Camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        style={styles.camera}
        ratio="1:1"
        ref={cameraRef}
      />
      <View style={styles.controls}>
        <MyIcon icon="image" handler={openImagePicker} />
        <MyIcon icon="camera" handler={clickPicture} />
        <MyIcon icon="camera-flip" handler={toggleCameraType} />
      </View>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, CameraType } from 'expo-camera/legacy'
import { StyleSheet } from 'react-native'
import MyIcon from '../components/MyIcon'
import * as ImagePicker from "expo-image-picker"
import { defaultStyle } from '../styles/styles'

const CameraComponent = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  // Function to open the image picker
  const openImagePicker = async () => {
    try {
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required.");
        return;
      }

      // Launch image picker
      const data = await ImagePicker.launchImageLibraryAsync();

      if (!data.cancelled && data.assets?.[0]?.uri) {
        const imageUri = data.assets[0].uri;
        handleNavigation(imageUri);
      }
    } catch (error) {
      console.error("Error opening image picker: ", error);
    }
  };

  // Function to click picture using the camera
  const clickPicture = async () => {
    try {
      if (camera) {
        const data = await camera.takePictureAsync();
        if (data.uri) {
          handleNavigation(data.uri);
        }
      }
    } catch (error) {
      console.error("Error taking picture: ", error);
    }
  };

  // Function to handle navigation with the captured image URI
  const handleNavigation = (imageUri) => {
    if (route.params?.newProduct) {
      navigation.navigate("newproduct", { image: imageUri });
    } else if (route.params?.updateProduct) {
      navigation.navigate("productimages", { image: imageUri });
    } else if (route.params?.updateProfile) {
      navigation.navigate("profile", { image: imageUri });
    } else {
      navigation.navigate("signup", { image: imageUri });
    }
  };

  // Request camera permissions on component mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          alert("Permission to access camera is required.");
        }
      } catch (error) {
        console.error("Error requesting camera permissions: ", error);
      }
    })();
  }, []);

  // Render different views based on permission status
  if (hasPermission === null) return <View />;
  if (hasPermission === false) return (
    <View style={defaultStyle}>
      <Text>No Access To Camera</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={styles.cameraStyle}
        ratio={'1:1'}
        ref={(ref) => setCamera(ref)}
      />
      <View style={styles.childView}>
        <MyIcon icon={"image"} handler={openImagePicker} />
        <MyIcon icon={"camera"} handler={clickPicture} />
        <MyIcon icon={"camera-flip"} handler={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraStyle: {
    flex: 1,
    aspectRatio: 1,
  },
  childView: {
    flexDirection: "row",
    bottom: 10,
    width: "100%",
    justifyContent: "space-evenly",
    position: "absolute",
  },
});

export default CameraComponent;

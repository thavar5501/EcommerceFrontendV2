import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../redux/actions/otherAction";
import { MaterialIcons } from '@expo/vector-icons'; // For Location Icon

const LocationComponent = () => {
  const { user } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [manualAddress, setManualAddress] = useState(user?.address);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = user?.location;

  const openGoogleMaps = useCallback(() => {
    if (location) {
      Linking.openURL(location).catch((err) => {
        console.error("Failed to open URL:", err);
        Alert.alert("Error", "Unable to open the address. Please check the URL.");
      });
    } else {
      Alert.alert("Location not available", "Please fetch the location first.");
    }
  }, [location]);

  const fetchCurrentLocation = useCallback(async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to fetch your current location.");
      setLoading(false);
      return;
    }

    try {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      dispatch(updateLocation(url));
      Alert.alert("Location Updated", "Current location has been saved.");
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Could not fetch the location.");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  }, [dispatch]);

  const saveManualAddress = useCallback(() => {
    if (manualAddress.trim()) {
      dispatch(updateLocation(manualAddress));
      Alert.alert("Address Saved", manualAddress);
      setModalVisible(false);
    } else {
      Alert.alert("Invalid Address", "Please enter a valid address.");
    }
  }, [dispatch, manualAddress]);

  return (
    <View style={styles.container}>
      <Text style={styles.deliveringText}>Delivering to</Text>

      <TouchableOpacity onPress={openGoogleMaps}>
        <Avatar.Icon icon="home" color="rgba(199,0,73,0.8)" style={styles.icon} size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Avatar.Icon icon="pen" color="rgba(199,0,73,0.8)" style={styles.icon} size={25} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.fetchButton}
              onPress={fetchCurrentLocation}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Fetch Current Location</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <TextInput
              placeholder="Enter Address"
              value={manualAddress}
              onChangeText={setManualAddress}
              style={styles.input}
            />

            <TouchableOpacity style={styles.saveButton} onPress={saveManualAddress}>
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  deliveringText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  icon: {
    backgroundColor: "white",
    elevation: 12,
    marginHorizontal: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  fetchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelText: {
    color: "red",
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LocationComponent;

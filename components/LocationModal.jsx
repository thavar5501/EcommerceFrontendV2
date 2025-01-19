import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Modal from 'react-native-modal'; // Fancy modal component
import { useDispatch } from 'react-redux';
import { updateLocation } from '../redux/actions/otherAction';

const LocationModal = ({ isVisible, onClose, onLocationAllow }) => {
  const [location, setLocation] = useState(null); // Store user's location (latitude and longitude)
  const [isLocationLoading, setLocationLoading] = useState(false); // Indicates if location is being fetched
  const [errorMessage, setErrorMessage] = useState(null); // Stores any error message encountered during location request
  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('Permission to access location was denied');
          return;
        }

        setLocationLoading(true);
        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        setLocation(url);
      } catch (error) {
        setErrorMessage('Error while fetching location');
      } finally {
        setLocationLoading(false);
      }
    };

    if (isVisible) {
      requestLocationPermission();
    }
  }, [isVisible]);

  const handleAllowLocation = useCallback(() => {
    if (location) {
      dispatch(updateLocation(location));
      onLocationAllow(location); // Call the passed callback to handle location allowance
    }
  }, [location, dispatch, onLocationAllow]);

  const handleCloseModal = () => {
    onClose(); // Close the modal when "Cancel" is pressed
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropColor="rgba(0, 0, 0, 0.7)"
      backdropOpacity={0.5}
      onBackdropPress={handleCloseModal}
      useNativeDriver={true}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          {errorMessage || 'Allow access to your location?'}
        </Text>

        <TouchableOpacity
          style={[styles.button, isLocationLoading && styles.buttonDisabled]}
          onPress={handleAllowLocation}
          disabled={isLocationLoading}
        >
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCloseModal}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {isLocationLoading && <Text style={styles.loadingText}>Loading location...</Text>}
      {errorMessage && !isLocationLoading && <Text style={styles.errorText}>{errorMessage}</Text>}
    </Modal>
  );
};

// Styles for the components (including a fancy modal)
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: 280,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default LocationModal;

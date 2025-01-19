import { View, Text, StyleSheet, Linking, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";

const OrderItem = ({
  id,
  price,
  address,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading = false,
  i = 0,
  customerName = null,
  mapAddress,
}) => {
  const [mapError, setMapError] = useState(false); // State to track if map URL is openable
  const isEvenIndex = i % 2 === 0; // Simplified conditional for color

  const openGoogleMaps = useCallback(() => {
    if (mapAddress) {
      Linking.openURL(mapAddress).catch((err) => {
        console.error("Failed to open URL:", err);
        setMapError(true);
      });
    } else {
      Alert.alert("Location not available", "Please fetch the location first.");
    }
  }, [mapAddress]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isEvenIndex ? colors.color2 : colors.color3 },
      ]}
    >
      <Text
        style={[
          styles.text,
          { backgroundColor: isEvenIndex ? colors.color3 : colors.color1 },
        ]}
      >
        ID - #{id}
      </Text>
      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderedOn} i={i} />
      <TextBox title={"Price"} value={price} i={i} />
      <TextBox title={"Status"} value={status} i={i} />
      <TextBox title={"Payment Method"} value={paymentMethod} i={i} />

      {admin && <TextBox title={"Ordered By"} value={customerName} i={i} />}

      {mapError && (
        <TextBox title={"Delivery Address"} value={mapAddress} i={i} />
      )}

      {admin && (
        <View style={styles.adminBtnBox}>
          <Button
            icon="map"
            mode="contained"
            textColor={isEvenIndex ? colors.color2 : colors.color3}
            style={[
              styles.button,
              {
                backgroundColor: isEvenIndex ? colors.color3 : colors.color2,
              },
            ]}
            onPress={openGoogleMaps}
          >
            Open Map
          </Button>

          <Button
            icon="update"
            mode="contained"
            textColor={isEvenIndex ? colors.color2 : colors.color3}
            style={[
              styles.button,
              {
                backgroundColor: isEvenIndex ? colors.color3 : colors.color2,
              },
            ]}
            onPress={() => updateHandler(id)}
            loading={loading}
            disabled={loading}
          >
            Update
          </Button>
        </View>
      )}
    </View>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? " ₹" : ""}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  adminBtnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 120,
    alignSelf: "center",
    marginTop: 10,
  },
  errorText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default OrderItem;

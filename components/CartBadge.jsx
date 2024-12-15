import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartBadge = ({ count }) => {
  if (count === 0) return null; // Don't show if the count is 0

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 20,
    height: 20,
    borderRadius:'100%',
    backgroundColor: 'red',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartBadge;

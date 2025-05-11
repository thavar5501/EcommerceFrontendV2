import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * CartBadge Component
 * -------------------
 * Displays a small red badge with the count of items in the cart.
 * This badge appears only if the count is a positive integer.
 *
 * @param {Object} props - Component props
 * @param {number} props.count - The number of items in the cart
 */
const CartBadge = ({ count }) => {
  // Only render the badge if count is a positive integer
  if (!count || typeof count !== 'number' || count <= 0) return null;

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

// Define prop types to catch bugs early during development
CartBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

// Styles for the CartBadge component
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',           // Positions badge relative to parent
    top: 8,                         // Distance from top
    right: 10,                      // Distance from right
    width: 20,                      // Fixed width
    height: 20,                     // Fixed height
    borderRadius: 10,              // Makes it circular (half of width/height)
    backgroundColor: 'red',        // Red background to indicate alert
    justifyContent: 'center',      // Center text vertically
    alignItems: 'center',          // Center text horizontally
    shadowColor: '#000',           // Shadow for elevation effect (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,                  // Shadow for Android
    zIndex: 999,                   // Ensures badge appears on top
  },
  badgeText: {
    color: '#fff',                 // White text for contrast
    fontSize: 12,                  // Small font
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartBadge;

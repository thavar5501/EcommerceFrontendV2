import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import mime from 'mime';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import ImageCard from '../../components/ImageCard';
import { colors, defaultStyle } from '../../styles/styles';
import { useMessageAndErrorOther } from '../../utils/hooks';
import { deleteProductImage, updateProductImage } from '../../redux/actions/otherAction';

/**
 * ProductImages Screen - Displays and manages product images (for admin use)
 * @param {object} navigation - React Navigation object
 * @param {object} route - Route object with product details and image
 */
const ProductImages = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // Destructure route parameters safely
  const { images = [], id: productId, image: routeImage } = route.params || {};

  // Local states
  const [image, setImage] = useState('');
  const [imageChanged, setImageChanged] = useState(false);

  // Show loading while uploading image
  const loading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  /**
   * Deletes a product image by ID
   * @param {string} id - Image ID to delete
   */
  const deleteHandler = useCallback((id) => {
    if (id && productId) {
      dispatch(deleteProductImage(productId, id));
    }
  }, [dispatch, productId]);

  /**
   * Submits a new or updated image to the backend
   */
  const submitHandler = useCallback(() => {
    if (!image || !productId) return;

    const newImage = {
      uri: image,
      name: image.split('/').pop(),
      type: mime.getType(image)
    };

    const formData = new FormData();
    formData.append('file', newImage);

    dispatch(updateProductImage(productId, formData));
  }, [dispatch, image, productId]);

  // Effect to update image from camera screen
  useEffect(() => {
    if (routeImage) {
      setImage(routeImage);
      setImageChanged(true);
    }
  }, [routeImage]);

  return (
    <View style={styles.container}>
      {/* Top Header with back button */}
      <Header back />

      {/* Heading */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Product Images</Text>
      </View>

      {/* Scrollable list of product images */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageListContainer}>
          {images.map((item) => (
            <ImageCard
              key={item._id}
              src={item.url}
              id={item._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom view: image preview, camera button, and add button */}
      <View style={styles.bottomContainer}>
        {/* Preview of selected image */}
        {image ? (
          <Image
            style={styles.previewImage}
            source={{ uri: image }}
          />
        ) : null}

        {/* Camera Icon to navigate to image picker */}
        <View style={styles.iconRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('camera', { updateProduct: true })
            }
          >
            <Avatar.Icon
              icon="camera"
              size={30}
              color={colors.color3}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Submit button for uploading image */}
        <Button
          textColor={colors.color2}
          style={styles.addButton}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged || loading}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

// ==========================
// Styles
// ==========================
const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
    backgroundColor: colors.color5
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 70
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20
  },
  scrollView: {
    marginBottom: 20
  },
  imageListContainer: {
    backgroundColor: colors.color2,
    padding: 40,
    minHeight: 400
  },
  bottomContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.color3
  },
  previewImage: {
    backgroundColor: colors.color2,
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  cameraIcon: {
    backgroundColor: colors.color2,
    margin: 10
  },
  addButton: {
    backgroundColor: colors.color1,
    padding: 5
  }
});

export default ProductImages;

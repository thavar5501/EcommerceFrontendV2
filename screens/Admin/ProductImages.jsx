import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { colors, defaultStyle } from '../../styles/styles';
import Header from '../../components/Header';
import ImageCard from '../../components/ImageCard';
import { Avatar, Button } from 'react-native-paper';
import { useMessageAndErrorOther } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import mime from 'mime';
import { deleteProductImage, updateProductImage } from '../../redux/actions/otherAction';

const ProductImages = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // Destructure route parameters
  const { images, id: productId, image: routeImage } = route.params;

  // State Management
  const [image, setImage] = useState(routeImage || ''); // Default to route image if available
  const [imageChanged, setImageChanged] = useState(!!routeImage); // Set true if an image exists

  // Custom Hook to handle loading and errors
  const loading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  // Handler to delete a product image
  const deleteHandler = useCallback(
    (imageId) => {
      dispatch(deleteProductImage(productId, imageId));
    },
    [dispatch, productId]
  );

  // Handler to upload a new product image
  const submitHandler = useCallback(() => {
    const myForm = new FormData();
    myForm.append('file', {
      uri: image,
      name: image.split('/').pop(),
      type: mime.getType(image),
    });
    dispatch(updateProductImage(productId, myForm));
  }, [dispatch, productId, image]);

  // Effect: Update the image if it changes in route.params
  useEffect(() => {
    if (routeImage) {
      setImage(routeImage);
      setImageChanged(true);
    }
  }, [routeImage]);

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header back={true} />

      {/* Page Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Product Images</Text>
      </View>

      {/* Scrollable Image List */}
      <ScrollView style={styles.scrollview}>
        <View style={styles.imageListContainer}>
          {/* Map through images and render ImageCard components */}
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

      {/* Bottom View for Image Upload */}
      <View style={styles.bottomView}>
        {/* Selected Image Preview */}
        {image ? (
          <Image style={styles.previewImage} source={{ uri: image }} />
        ) : (
          <Text style={styles.noImageText}>No Image Selected</Text>
        )}

        {/* Upload Icon */}
        <View style={styles.iconBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('camera', { updateProduct: true })}
          >
            <Avatar.Icon
              icon="camera"
              size={30}
              color={colors.color3}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Add Button */}
        <Button
          textColor={colors.color2}
          style={styles.addButton}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
    backgroundColor: colors.color5,
  },
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
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
  scrollview: {
    marginBottom: 20,
  },
  imageListContainer: {
    backgroundColor: colors.color2,
    padding: 40,
    minHeight: 400,
  },
  bottomView: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.color3,
    alignItems: 'center',
  },
  previewImage: {
    backgroundColor: colors.color2,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  noImageText: {
    color: colors.color2,
    fontSize: 14,
    marginBottom: 10,
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraIcon: {
    backgroundColor: colors.color2,
    margin: 10,
  },
  addButton: {
    backgroundColor: colors.color1,
    padding: 5,
    marginTop: 10,
  },
});

export default ProductImages;

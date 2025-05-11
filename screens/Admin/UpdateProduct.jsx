import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import SelectComponent from '../../components/SelectComponent';
import { getProductDetails } from '../../redux/actions/productAction';
import { updateProduct } from '../../redux/actions/otherAction';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';

const UpdateProduct = ({ navigation, route }) => {
  // Redux dispatch and screen focus state
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Visibility state for category selector modal
  const [visible, setVisible] = useState(false);

  // Extract product details from Redux
  const { product, loading } = useSelector((state) => state.product);

  // Extract product ID from navigation params
  const [id] = useState(route.params.id);

  // Product form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [categoryID, setCategoryID] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState('');

  // Hook to load categories
  useSetCategories(setCategories, isFocused);

  // Handle loader and error messages
  const loadingOther = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  /**
   * Handles form submission after validation.
   */
  const submitHandler = () => {
    // Basic form validation
    if (!name || !description || !price || !stock || category === 'Select Category') {
      return Alert.alert('Validation Error', 'Please fill all fields and select a category.');
    }

    // Dispatch updateProduct action
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  /**
   * Fetch product details on initial mount if ID is valid.
   */
  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [dispatch, id]);

  /**
   * Populate form fields when product data is fetched.
   */
  useEffect(() => {
    if (product?.data) {
      const { name, description, price, stock, category, images } = product.data;
      setName(name || '');
      setDescription(description || '');
      setPrice(price?.toString() || '');
      setStock(stock?.toString() || '');
      setImages(images || '');
      setCategory(category?.name || 'Select Category');
    }
  }, [product]);

  // Common input styling options
  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Back Header */}
        <Header back />

        {/* Title */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Update Product</Text>
        </View>

        {/* Main Form or Loader */}
        {loading ? (
          <Loader />
        ) : (
          <ScrollView style={styles.mainScrollview}>
            <View style={styles.mainView}>
              {/* Manage Images Button */}
              <Button
                onPress={() => navigation.navigate('productimages', { id, images })}
                textColor={colors.color1}
              >
                Manage Images
              </Button>

              {/* Input: Product Name */}
              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              {/* Input: Product Description */}
              <TextInput
                {...inputOptions}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />

              {/* Input: Product Price */}
              <TextInput
                {...inputOptions}
                placeholder="Price"
                value={price}
                onChangeText={(text) => {
                  if (!isNaN(text)) setPrice(text);
                }}
                keyboardType="numeric"
              />

              {/* Input: Product Stock */}
              <TextInput
                {...inputOptions}
                placeholder="Stock"
                value={stock}
                onChangeText={(text) => {
                  if (!isNaN(text)) setStock(text);
                }}
                keyboardType="numeric"
              />

              {/* Category Selector */}
              <Text
                style={styles.categoryText}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>

              {/* Submit Button */}
              <Button
                style={styles.finalBTN}
                textColor={colors.color2}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Category Selector Modal */}
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        categories={categories}
        setCategory={setCategory}
        setCategoryID={setCategoryID}
      />
    </>
  );
};

// Centralized styles for consistency and scalability
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
  mainScrollview: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },
  mainView: {
    justifyContent: 'center',
    minHeight: 650,
  },
  finalBTN: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },
  categoryText: {
    ...inputStyling,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    fontWeight: '900',
  },
});

export default UpdateProduct;

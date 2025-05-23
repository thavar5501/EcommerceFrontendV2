import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import mime from 'mime';

// Custom imports
import Header from '../../components/Header';
import SelectComponent from '../../components/SelectComponent';
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';
import { createProduct } from '../../redux/actions/otherAction';

const NewProduct = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Styles and behavior for text inputs
  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  // Form state hooks
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Choose a category');
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);

  // Custom hook to fetch categories on focus
  useSetCategories(setCategories, isFocused);

  // Track loading and error states from submission
  const loading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  // Form validation check
  const isFormInvalid = !name || !description || !price || !stock || !image;

  // Prepare form and dispatch createProduct action
  const submitHandler = useCallback(() => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('description', description);
    myForm.append('price', price);
    myForm.append('stock', stock);
    myForm.append('file', {
      uri: image,
      name: image.split('/').pop(),
      type: mime.getType(image),
    });
    if (categoryID) myForm.append('category', categoryID);

    dispatch(createProduct(myForm));
  }, [name, description, price, stock, image, categoryID, dispatch]);

  // Update image from camera screen
  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <>
      {/* Main container with default style */}
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Navigation Header */}
        <Header back={true} />

        {/* Heading section */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>New Product</Text>
        </View>

        {/* Scrollable form container */}
        <ScrollView style={styles.mainScrollview}>
          <View style={styles.mainView}>
            {/* Image preview and camera launcher */}
            <View style={styles.imageContainer}>
              <Avatar.Image
                size={80}
                style={{ backgroundColor: colors.color1 }}
                source={{ uri: image || undefined }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('camera', { newProduct: true })}
              >
                <Avatar.Icon
                  icon="camera"
                  size={30}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Input fields for product details */}
            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              {...inputOptions}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              {...inputOptions}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              {...inputOptions}
              placeholder="Stock"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />

            {/* Category dropdown trigger */}
            <Text
              style={styles.categoryPicker}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>

            {/* Create product button */}
            <Button
              style={styles.submitButton}
              textColor={colors.color2}
              onPress={submitHandler}
              loading={loading}
              disabled={isFormInvalid || loading}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </View>

      {/* Category selection modal */}
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

// Component styles
const styles = StyleSheet.create({
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
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: colors.color2,
  },
  categoryPicker: {
    ...inputStyling,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    fontWeight: '900',
  },
  submitButton: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },
});

export default NewProduct;

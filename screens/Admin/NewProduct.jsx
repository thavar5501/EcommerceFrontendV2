import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import { Avatar, Button, TextInput } from 'react-native-paper';
import SelectComponent from '../../components/SelectComponent';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';
import mime from 'mime';
import { createProduct } from '../../redux/actions/otherAction';

const NewProduct = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Input field styles for TextInput
  const inputOptions = {
    style: inputStyling,
    mode: 'outlined',
    activeOutlineColor: colors.color1,
  };

  // Local states for form inputs
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Choose a category');
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);

  // Hook to fetch and set categories when focused
  useSetCategories(setCategories, isFocused);

  // Condition to disable the Create button
  const isFormInvalid = !name || !description || !price || !stock || !image;

  // Form submission handler
  const submitHandler = () => {
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
  };

  // Handle image update from route params
  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  // Loading state for form submission
  const loading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  return (
    <>
      {/* Main Container */}
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Header */}
        <Header back={true} />

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>New Product</Text>
        </View>

        {/* Form Body */}
        <ScrollView style={styles.mainScrollview}>
          <View style={styles.mainView}>
            {/* Image Upload Section */}
            <View style={styles.imageContainer}>
              <Avatar.Image
                size={80}
                style={{ backgroundColor: colors.color1 }}
                source={{ uri: image || null }}
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

            {/* Input Fields */}
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

            {/* Category Picker */}
            <Text
              style={styles.categoryPicker}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>

            {/* Submit Button */}
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

      {/* Category Selection Modal */}
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

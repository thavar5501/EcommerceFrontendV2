import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import { Button, TextInput } from 'react-native-paper';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCategory, deleteCategory } from '../../redux/actions/otherAction';

const Categories = ({ navigation }) => {
  const isFocused = useIsFocused(); // Detect if the screen is focused
  const dispatch = useDispatch();

  // State to store the list of categories
  const [categories, setCategories] = useState([]);

  // Fetch categories whenever screen is focused
  useSetCategories(setCategories, isFocused);

  // State to handle the new category input
  const [category, setCategory] = useState("");

  // Custom input styling for TextInput component
  const inputOptions = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

  // Function to delete a category
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  // Function to add a new category
  const submitHandler = () => {
    if (category.trim()) {
      dispatch(addCategory(category.trim()));
      setCategory(""); // Clear input after submission
    }
  };

  // Loading state for message and error hooks
  const loading = useMessageAndErrorOther(navigation, dispatch, "adminpanel");

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      {/* Header */}
      <Header back={true} />

      {/* Categories Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Categories</Text>
      </View>

      {/* Scrollable List of Categories */}
      <ScrollView style={styles.categoryListContainer}>
        <View style={styles.categoryList}>
          {categories.length > 0 ? (
            categories.map((item) => (
              <CategoryCard
                key={item._id}
                id={item._id}
                name={item.name}
                deleteHandler={deleteHandler}
              />
            ))
          ) : (
            <Text style={styles.noCategoryText}>No Categories Available</Text>
          )}
        </View>
      </ScrollView>

      {/* Input and Add Category Button */}
      <View style={styles.addCategoryContainer}>
        {/* Text Input for Category Name */}
        <TextInput
          {...inputOptions}
          placeholder="Enter Category Name"
          value={category}
          onChangeText={setCategory}
        />

        {/* Add Button */}
        <Button
          textColor={colors.color2}
          style={styles.addCategoryButton}
          disabled={!category.trim()}
          onPress={submitHandler}
          loading={loading}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

// Styles for the Categories screen
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  categoryListContainer: {
    marginBottom: 20,
  },
  categoryList: {
    backgroundColor: colors.color2,
    padding: 20,
    minHeight: 400,
  },
  noCategoryText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.color3,
  },
  addCategoryContainer: {
    backgroundColor: colors.color3,
    padding: 20,
    elevation: 5,
    borderRadius: 10,
  },
  addCategoryButton: {
    backgroundColor: colors.color1,
    margin: 5,
    padding: 5,
  },
});

export default Categories;

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

// Custom styles and components
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';
import { addCategory, deleteCategory } from '../../redux/actions/otherAction';

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // Detect if the screen is currently focused

  // Local state for storing categories and input field value
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');

  // Hook to fetch and update categories when screen is focused
  useSetCategories(setCategories, isFocused);

  // Handle API errors and display messages
  const loading = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

  /**
   * Handler to delete a category
   * @param {string} id - ID of the category to delete
   */
  const deleteHandler = useCallback((id) => {
    if (id) dispatch(deleteCategory(id));
  }, [dispatch]);

  /**
   * Handler to submit a new category
   * Dispatches an action only if input is valid
   */
  const submitHandler = () => {
    const trimmed = categoryInput.trim();
    if (!trimmed) return;
    dispatch(addCategory(trimmed));
    setCategoryInput('');
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      {/* Header with Back button */}
      <Header back />

      {/* Page Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Categories</Text>
      </View>

      {/* Scrollable Category List */}
      <ScrollView style={styles.categoryListContainer}>
        <View style={styles.categoryList}>
          {categories?.length > 0 ? (
            categories.map(({ _id, name }) => (
              <CategoryCard
                key={_id}
                id={_id}
                name={name}
                deleteHandler={deleteHandler}
              />
            ))
          ) : (
            <Text style={styles.noCategoryText}>No Categories Available</Text>
          )}
        </View>
      </ScrollView>

      {/* Add New Category Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.addCategoryContainer}>
          {/* Text Input */}
          <TextInput
            {...{
              style: inputStyling,
              mode: 'outlined',
              activeOutlineColor: colors.color1,
            }}
            placeholder="Enter Category Name"
            value={categoryInput}
            onChangeText={setCategoryInput}
            returnKeyType="done"
          />

          {/* Add Category Button */}
          <Button
            textColor={colors.color2}
            style={styles.addCategoryButton}
            disabled={!categoryInput.trim()}
            onPress={submitHandler}
            loading={loading}
          >
            Add
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// ==========================
// 📦 Stylesheet Definitions
// ==========================
const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoryListContainer: {
    marginBottom: 20,
  },
  categoryList: {
    backgroundColor: colors.color2,
    padding: 20,
    borderRadius: 10,
    minHeight: 400,
  },
  noCategoryText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.color3,
    marginTop: 50,
  },
  addCategoryContainer: {
    backgroundColor: colors.color3,
    padding: 20,
    elevation: 5,
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  addCategoryButton: {
    backgroundColor: colors.color1,
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
});

export default Categories;

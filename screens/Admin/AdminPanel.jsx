import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import ProductListItem from '../../components/ProductListItem';
import Chart from '../../components/Chart';

import { deleteProduct } from '../../redux/actions/otherAction';
import { getAdminProducts } from '../../redux/actions/productAction';

import { colors, defaultStyle } from '../../styles/styles';
import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks';

/**
 * AdminPanel Component
 * Main administrative dashboard for managing products, orders, and categories.
 *
 * @param {object} navigation - React Navigation prop for screen navigation
 */
const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Fetches admin product data using a custom hook
  const { products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);

  // Handles error/success messages for product deletion and refetches data
  const loadingDelete = useMessageAndErrorOther(null, dispatch, null, getAdminProducts);

  /**
   * Handles navigation based on button label
   *
   * @param {string} text - The label of the button clicked
   */
  const navigationHandler = useCallback((text) => {
    const routes = {
      'Category': 'categories',
      'All Orders': 'adminorders',
      'Product': 'newproduct',
    };

    navigation.navigate(routes[text] || 'adminorders');
  }, [navigation]);

  /**
   * Dispatches an action to delete a product
   *
   * @param {string} id - Product ID to delete
   */
  const deleteProductHandler = useCallback((id) => {
    if (id) dispatch(deleteProduct(id));
  }, [dispatch]);

  return (
    <View style={defaultStyle}>
      {/* App Header with back navigation */}
      <Header back />

      {/* Title */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Admin Panel</Text>
      </View>

      {/* Loader while products are fetched */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Stock chart showing product inventory stats */}
          <View style={styles.chartContainer}>
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          {/* Action buttons for Product, Orders, and Categories */}
          <View style={styles.buttonContainer}>
            <ButtonBox icon="plus" text="Product" handler={navigationHandler} />
            <ButtonBox
              icon="format-list-bulleted-square"
              text="All Orders"
              handler={navigationHandler}
              reverse
            />
            <ButtonBox icon="plus" text="Category" handler={navigationHandler} />
          </View>

          {/* Table Header */}
          <ProductListHeading />

          {/* Scrollable Product List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productListContainer}
          >
            {!loadingDelete &&
              products.map((item, index) => (
                <ProductListItem
                  key={item._id}
                  navigate={navigation}
                  deleteHandler={deleteProductHandler}
                  i={index}
                  id={item._id}
                  price={item.price}
                  stock={item.stock}
                  name={item.name}
                  category={item.category?.name || 'Uncategorized'}
                  imgSrc={item.images?.[0]?.url || ''}
                />
              ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

// Component-specific styles
const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 65,
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: colors.color3,
    color: colors.color2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
  },
  chartContainer: {
    backgroundColor: colors.color3,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  productListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});

export default AdminPanel;

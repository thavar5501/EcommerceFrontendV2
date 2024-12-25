import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import ProductListItem from '../../components/ProductListItem';
import { useDispatch } from 'react-redux';
import Chart from '../../components/Chart';
import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import { deleteProduct } from '../../redux/actions/otherAction';
import { getAdminProducts } from '../../redux/actions/productAction';

const AdminPanel = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Custom hook to fetch admin products and stock details
  const { products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);

  /**
   * Handles navigation to different screens based on button text
   * @param {string} text - The button text to determine navigation
   */
  const navigationHandler = (text) => {
    switch (text) {
      case 'Category':
        navigation.navigate('categories');
        break;
      case 'All Orders':
        navigation.navigate('adminorders');
        break;
      case 'Product':
        navigation.navigate('newproduct');
        break;
      default:
        navigation.navigate('adminorders');
        break;
    }
  };

  /**
   * Deletes a product by dispatching the delete action
   * @param {string} id - The product ID to delete
   */
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Custom hook for handling delete loading state and error
  const loadingDelete = useMessageAndErrorOther(null, dispatch, null, getAdminProducts);

  return (
    <View style={defaultStyle}>
      {/* Header */}
      <Header back={true} />

      {/* Admin Panel Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Admin Panel</Text>
      </View>

      {/* Loader while fetching data */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Chart Component to show product stock status */}
          <View style={styles.chartContainer}>
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <ButtonBox icon={'plus'} text={'Product'} handler={navigationHandler} />
            <ButtonBox
              icon={'format-list-bulleted-square'}
              text={'All Orders'}
              handler={navigationHandler}
              reverse={true}
            />
            <ButtonBox icon={'plus'} text={'Category'} handler={navigationHandler} />
          </View>

          {/* Product List Table Heading */}
          <ProductListHeading />

          {/* Product List Items */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
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
                    category={item.category?.name}
                    imgSrc={item.images[0]?.url}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 65,
    marginBottom: 20,
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
  chartContainer: {
    backgroundColor: colors.color3,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
});

export default AdminPanel;

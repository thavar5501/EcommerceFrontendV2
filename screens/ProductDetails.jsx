import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
import Carousel from 'react-native-snap-carousel';
import { colors, defaultStyle } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/productAction';
import Loader from '../components/Loader';

const SLIDER_WIDTH = Dimensions.get('window').width;

const ProductDetails = ({ route: { params } }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { cart_Items } = useSelector((state) => state.cart);

  const { name, price, description, stock, images, _id } = product?.data || {};
  const loading = !product?.data;

  useEffect(() => {
    if (params?.id) dispatch(getProductDetails(params.id));
  }, [dispatch, params?.id]);

  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const incrementQty = () => {
    const existingCartItem = cart_Items.find(item => item.product === _id);
    const currentCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
    const potentialQuantity = quantity + 1;

    if (currentCartQuantity + potentialQuantity > stock) {
      Toast.show({ type: 'error', text1: 'Stock Limit Reached' });
    } else {
      setQuantity(potentialQuantity);
    }
  };

  const addToCartHandler = () => {
    if (stock === 0) {
      Toast.show({ type: 'error', text1: 'Out of Stock' });
      return;
    }

    const existingCartItem = cart_Items.find(item => item.product === _id);
    const newQuantity = existingCartItem ? existingCartItem.quantity + quantity : quantity;

    if (newQuantity > stock) {
      Toast.show({ type: 'error', text1: 'Stock Limit Exceeded' });
      return;
    }

    dispatch({
      type: 'addToCart',
      payload: { id: _id, product: _id, name, price, image: images[0]?.url, stock, quantity: newQuantity },
    });

    Toast.show({ type: 'success', text1: 'Added to Cart' });
  };

  const renderCarouselItem = React.useCallback(({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item?.url }} style={styles.image} />
    </View>
  ), []);

  return (
    loading ? <Loader /> : (
      <View style={styles.container}>
        <Header back />
        
        {/* Optimized Carousel */}
        <Carousel
          layout="default"
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          data={images || []}
          renderItem={renderCarouselItem}
          loop
          inactiveSlideScale={0.95} // Reduces the scale of inactive slides
          inactiveSlideOpacity={0.8} // Slightly reduces opacity of inactive slides
          removeClippedSubviews={true} // Unmounts offscreen components for better performance
        />
        
        {/* Product Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.productName} numberOfLines={2}>{name}</Text>
          <Text style={styles.productPrice}>₹{price}</Text>
          <Text style={styles.productDescription} numberOfLines={8}>{description}</Text>

          {/* Quantity Controls */}
          <View style={styles.quantityBox}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityButtonBox}>
              <TouchableOpacity onPress={decrementQty}>
                <Avatar.Icon icon="minus" size={25} style={styles.quantityButton} />
              </TouchableOpacity>
              <Text style={styles.stockBox}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQty}>
                <Avatar.Icon icon="plus" size={25} style={styles.quantityButton} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
            <Button style={styles.addToCartBtn} textColor={colors.color2} icon="cart">Add To Cart</Button>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
    padding: 0,
    backgroundColor: colors.color1,
  },
  carouselItem: {
    width: SLIDER_WIDTH,
    paddingVertical: 40,
    height: 380,
    backgroundColor: colors.color1,
  },
  image: {
    width: SLIDER_WIDTH,
    resizeMode: 'contain',
    height: 250,
  },
  descriptionBox: {
    backgroundColor: colors.color2,
    padding: 35,
    flex: 1,
    marginTop: -380,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  productName: {
    fontSize: 25,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 30,
  },
  productDescription: {
    letterSpacing: 1,
    lineHeight: 20,
    marginVertical: 15,
  },
  quantityBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  quantityButtonBox: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockBox: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  addToCartBtn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 25,
  },
  quantityButton: {
    borderRadius: 5,
    backgroundColor: colors.color5,
  },
  quantityLabel: {
    color: colors.color3,
    fontWeight: '300',
    fontSize: 15,
  },
});

export default ProductDetails;

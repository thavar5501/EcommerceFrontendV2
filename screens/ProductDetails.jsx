import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';

// Custom Components & Constants
import Header from '../components/Header';
import Loader from '../components/Loader';
import { getProductDetails } from '../redux/actions/productAction';
import { colors, defaultStyle } from '../styles/styles';

const SLIDER_WIDTH = Dimensions.get('window').width;

const ProductDetails = ({ route: { params } }) => {
  const dispatch = useDispatch();

  // Quantity state for add-to-cart
  const [quantity, setQuantity] = useState(1);

  // Redux states
  const { product } = useSelector((state) => state.product);
  const { cart_Items } = useSelector((state) => state.cart);

  // Destructure product details safely
  const { name, price, description, stock, images, _id } = product?.data || {};
  const loading = !product?.data;

  /**
   * Fetch product details on mount or when params.id changes
   */
  useEffect(() => {
    if (params?.id) {
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, params?.id]);

  /**
   * Retrieves an item from cart if it already exists
   * @param {string} productId
   * @returns {object} cart item
   */
  const getExistingCartItem = useCallback(
    (productId) => cart_Items.find((item) => item.product === productId) || {},
    [cart_Items]
  );

  /**
   * Decrease quantity but not below 1
   */
  const decrementQty = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };

  /**
   * Increase quantity with stock limit validation
   */
  const incrementQty = () => {
    const existingItem = getExistingCartItem(_id);
    const cartQty = existingItem.quantity || 0;
    const potentialQty = quantity + 1;

    if (cartQty + potentialQty > stock) {
      Toast.show({ type: 'error', text1: 'Stock Limit Reached' });
    } else {
      setQuantity(potentialQty);
    }
  };

  /**
   * Add current product to cart with stock validation
   */
  const addToCartHandler = () => {
    if (stock === 0) {
      Toast.show({ type: 'error', text1: 'Out of Stock' });
      return;
    }

    const existingItem = getExistingCartItem(_id);
    const finalQty = existingItem.quantity ? existingItem.quantity + quantity : quantity;

    if (finalQty > stock) {
      Toast.show({ type: 'error', text1: 'Stock Limit Exceeded' });
      return;
    }

    dispatch({
      type: 'addToCart',
      payload: {
        id: _id,
        product: _id,
        name,
        price,
        image: images?.[0]?.url || '',
        stock,
        quantity: finalQty,
      },
    });

    Toast.show({ type: 'success', text1: 'Added to Cart' });
  };

  /**
   * Carousel renderer for product images
   */
  const renderCarouselItem = useCallback(
    ({ item }) => (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item?.url }} style={styles.image} />
      </View>
    ),
    []
  );

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header back />
      </View>

      {/* Product Image Carousel */}
      <Carousel
        layout="default"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        data={images || []}
        renderItem={renderCarouselItem}
        loop
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.8}
        removeClippedSubviews
      />

      {/* Product Details Section */}
      <View style={styles.descriptionBox}>
        <Text style={styles.productName} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.productPrice}>₹{price}</Text>
        <Text style={styles.productDescription} numberOfLines={8}>
          {description}
        </Text>

        {/* Quantity Controller */}
        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityButtonBox}>
            <TouchableOpacity onPress={decrementQty} disabled={quantity === 1}>
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
          <Button
            style={styles.addToCartBtn}
            textColor={colors.color2}
            icon="cart"
          >
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styling constants
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
    fontWeight: '600',
    color: colors.color3,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 30,
    color: colors.color3,
  },
  productDescription: {
    letterSpacing: 1,
    lineHeight: 20,
    marginVertical: 15,
    color: '#333',
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
    color: '#000',
    fontSize: 14,
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
  addToCartBtn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 25,
  },
});

export default memo(ProductDetails);

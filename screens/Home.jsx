import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { useSetCategories } from "../utils/hooks";
import Toast from "react-native-toast-message";
import { useDebounce } from "use-debounce";

// Lazy load Footer component
const Footer = React.lazy(() => import('../components/Footer'));

const Home = () => {
  // State Management For Search
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);  // Debounced Search Query

  // State Management For Categories
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { products } = useSelector((state) => state.product);
  const { cart_Items } = useSelector((state) => state.cart);

  // Memoized category handler
  const categoryButtonHandler = useCallback((id) => {
    setCategory(id);
  }, []);

  // Memoized addToCartHandler
  const addToCartHandler = useCallback((id, name, price, image, stock) => {
    const existingCartItem = cart_Items.find(item => item.product === id);

    if (stock === 0) {
      return Toast.show({ type: 'error', text1: 'Out of Stock' });
    }

    if (existingCartItem && existingCartItem.quantity >= stock) {
      return Toast.show({ type: 'error', text1: 'Stock Limit Exceeded' });
    }

    dispatch({
      type: "addToCart",
      payload: {
        id,
        product: id,
        name,
        price,
        image,
        stock,
        quantity: existingCartItem ? existingCartItem.quantity + 1 : 1
      }
    });

    Toast.show({ type: 'success', text1: 'Added to Cart' });
  }, [cart_Items, dispatch]);

  useSetCategories(setCategories, isFocused);

  // Fetch products based on category and search query
  useEffect(() => {
    dispatch(getAllProducts(debouncedSearchQuery, category));
  }, [dispatch, debouncedSearchQuery, category, isFocused]);

  return (
    <>
      {/* Search Modal */}
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        {/* Header */}
        <Header back={true} />

        {/* Header Line Row */}
        <View style={styles.flexRow}>
          <Heading />
          {/* Search Bar */}
          <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
            <Avatar.Icon
              icon={"magnify"}
              color="gray"
              style={{ backgroundColor: colors.color2, elevation: 12 }}
              size={50}
            />
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <View style={styles.categoryList}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Button
                style={[
                  styles.categoryListButton,
                  category === item._id && styles.activeCategoryButton
                ]}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text style={[
                  styles.buttonText,
                  category === item._id && styles.activeButtonText
                ]}>{item.name}</Text>
              </Button>
            )}
          />
        </View>

        {/* Products */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0].url}
                addToCartHandler={addToCartHandler}
                id={item._id}
                index={index}
                navigate={navigation}
              />
            )}
          />
        </View>
      </View>

      {/* Footer */}
      <Suspense fallback={<Text>Loading Footer...</Text>}>
        <Footer activeRoute={"home"} />
      </Suspense>
    </>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryList: {
    paddingTop: 10,
    flexDirection: "row",
  },
  categoryListButton: {
    backgroundColor: colors.color5,
    margin: 5,
    borderRadius: 100
  },
  activeCategoryButton: {
    backgroundColor: colors.color1
  },
  buttonText: {
    fontSize: 13,
    color: "gray"
  },
  activeButtonText: {
    color: "white"
  }
});

export default Home;

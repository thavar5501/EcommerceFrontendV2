import React, { useEffect, useState, useCallback, Suspense } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDebounce } from "use-debounce";

// Styles and Components
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import LocationComponent from "../components/LocationComponent";
import { getAllProducts } from "../redux/actions/productAction";
import { useSetCategories } from "../utils/hooks";

// Lazy-load Footer component for performance
const Footer = React.lazy(() => import("../components/Footer"));

const Home = () => {
  // === Local State ===

  // Controls visibility of the Search Modal
  const [activeSearch, setActiveSearch] = useState(false);

  // Manages current search query and its debounced version
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  // Category selection and category list
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // === Hooks ===
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // === Redux State Selectors ===
  const { products = [] } = useSelector((state) => state.product);
  const { cart_Items = [] } = useSelector((state) => state.cart);

  /**
   * Handles category selection
   * @param {string} id - Category ID
   */
  const categoryButtonHandler = useCallback((id) => {
    setCategory(id);
  }, []);

  /**
   * Handles adding a product to the cart with stock validation
   * @param {string} id - Product ID
   * @param {string} name - Product name
   * @param {number} price - Product price
   * @param {string} image - Product image URL
   * @param {number} stock - Available stock
   */
  const addToCartHandler = useCallback(
    (id, name, price, image, stock) => {
      const existingItem = cart_Items.find((item) => item.product === id);

      if (stock === 0) {
        return Toast.show({ type: "error", text1: "Out of Stock" });
      }

      if (existingItem && existingItem.quantity >= stock) {
        return Toast.show({ type: "error", text1: "Stock Limit Exceeded" });
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
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      });

      Toast.show({ type: "success", text1: "Added to Cart" });
    },
    [cart_Items, dispatch]
  );

  // Sets categories from a custom hook when screen is focused
  useSetCategories(setCategories, isFocused);

  // Fetch products based on search term or selected category
  useEffect(() => {
    dispatch(getAllProducts(debouncedSearchQuery, category));
  }, [dispatch, debouncedSearchQuery, category, isFocused]);

  return (
    <>
      {/* === Search Modal === */}
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        {/* === App Header === */}
        <Header back={true} />

        {/* === Title and Search === */}
        <View style={styles.flexRow}>
          <Heading />
          <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
            <Avatar.Icon
              icon="magnify"
              color="gray"
              style={{
                backgroundColor: colors.color2,
                elevation: 12,
              }}
              size={50}
            />
          </TouchableOpacity>
        </View>

        {/* === Category Filter Buttons === */}
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
                  category === item._id && styles.activeCategoryButton,
                ]}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    category === item._id && styles.activeButtonText,
                  ]}
                >
                  {item.name}
                </Text>
              </Button>
            )}
          />
        </View>

        {/* === Product List === */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ padding: 20, textAlign: "center" }}>
                No products found.
              </Text>
            }
            renderItem={({ item, index }) => (
              <ProductCard
                key={item._id}
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item?.images?.[0]?.url || ""}
                addToCartHandler={addToCartHandler}
                id={item._id}
                index={index}
                navigate={navigation}
              />
            )}
          />
        </View>
      </View>

      {/* === Location Display === */}
      <LocationComponent />

      {/* === Footer with Lazy Loading === */}
      <Suspense fallback={<Text style={{ textAlign: "center" }}>Loading Footer...</Text>}>
        <Footer activeRoute={"home"} />
      </Suspense>
    </>
  );
};

// === Styles ===
const styles = StyleSheet.create({
  flexRow: {
    paddingTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryList: {
    paddingTop: 10,
    flexDirection: "row",
  },
  categoryListButton: {
    backgroundColor: colors.color5,
    margin: 5,
    borderRadius: 100,
  },
  activeCategoryButton: {
    backgroundColor: colors.color1,
  },
  buttonText: {
    fontSize: 13,
    color: "gray",
  },
  activeButtonText: {
    color: "white",
  },
});

export default Home;

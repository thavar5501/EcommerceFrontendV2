import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { useSetCategories } from "../utils/hooks";
import Toast from "react-native-toast-message";

const Home = () => {
  // State Management For Search
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

    // State Management For Categories
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { products } = useSelector((state)=>state.product);
  const {cart_Items} = useSelector((state)=>state.cart)
  
  // Function For Category Handler
  const categoryButtonHandler = (id) => {
    console.log(`Category selected: ${id}`);
    setCategory(id);
  };

  // Function For addToCartHandler
  const addToCartHandler = (id, name, price, image, stock) => {
    console.log(`Adding to the cart: ${id}, ${name}, ${price}, ${image}, ${stock}`);
  
    const existingCartItem = cart_Items.find(item => item.product === id);
  
    // Check if the item is out of stock
    if (stock === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Out of Stock',
      });
    }
  
    // Check if the existing item has reached the stock limit
    if (existingCartItem && existingCartItem.quantity >= stock) {
      return Toast.show({
        type: 'error',
        text1: 'Stock Limit Exceeded',
      });
    }
  
    // Dispatch the updated action to add the item to the cart
    dispatch({
      type: "addToCart", // Updated to match the action type in the reducer
      payload: {
        id,
        product: id,
        name,
        price,
        image,
        stock,
        quantity: existingCartItem ? existingCartItem.quantity + 1 : 1 // Increment quantity if item exists
      }
    });
  
    // Show success message
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
    });
  };
  

  useSetCategories(setCategories, isFocused);

  useEffect(()=>{
    const timeOutId = setTimeout(()=>{
      dispatch(getAllProducts(searchQuery, category))
    }, 500)
    return ()=> clearTimeout(timeOutId)
  },[dispatch, searchQuery, category, isFocused])

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
          {/* Heading */}
          <Heading />

          {/* Search Bar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                color="gray"
                style={{ backgroundColor: colors.color2, elevation: 12 }}
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories List */}
        <View style={styles.categoryList}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
            {categories.map((item, index) => (
              <Button
                key={item._id}
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
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
                <ProductCard
                  key={item._id}
                  stock={item.stock}
                  name={item.name}
                  price={item.price}
                  image={item.images[0].url}
                  addToCartHandler={addToCartHandler}
                  id={item._id}
                  index={index}
                  navigate={navigation}
                />
              ))}
          </ScrollView>
        </View>
      </View>

      {/* Footer */}
      <Footer activeRoute={"home"} />
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
    borderRadius:100
  },
  activeCategoryButton: {
    backgroundColor: colors.color1
  },
  buttonText:{
    fontSize:13,
    color:"gray"
  },
  activeButtonText:{
    color:"white"
  }
});

export default Home;

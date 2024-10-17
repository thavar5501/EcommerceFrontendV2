// // import React, { useEffect, useRef, useState } from 'react';
// // import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
// // import { Avatar, Button } from 'react-native-paper';
// // import Toast from 'react-native-toast-message';
// // import Header from '../components/Header';
// // import Carousel from 'react-native-snap-carousel';
// // import { colors, defaultStyle } from '../styles/styles';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getProductDetails } from '../redux/actions/productAction';
// // import { useIsFocused } from '@react-navigation/native';
// // import Loader from '../components/Loader'

// // const apple = require("../apple.png");

// // const SLIDER_WIDTH = Dimensions.get('window').width;
// // const ITEM_WIDTH = SLIDER_WIDTH;

// // const ProductDetails = ({ route: { params } }) => {
// //     const [quantity, setQuantity] = useState(1);
// //     const isCarousel = useRef(null);
// //     const dispatch = useDispatch();
// //     const isFocused = useIsFocused(); 
// //     let loading = true;
// //     const { product } = useSelector((state) => state.product);
// //     if(product?.data){
// //         loading = false
// //     }
// //     const { name, price, description, stock, images, _id } = product?.data || {};
// //     const {cart_Items} = useSelector((state)=>state.cart)

// //     useEffect(() => {
// //         let isMounted = true; // Track if the component is mounted

// //         if (params?.id) {
// //             dispatch(getProductDetails(params.id))
// //         }

// //         // Cleanup function
// //         return () => {
// //             isMounted = false;
// //             // Any additional cleanup logic can go here
// //         };
// //     }, [dispatch, params?.id, loading, isFocused]);

// //     const decrementQty = () => {
// //         setQuantity((prev) => Math.max(prev - 1, 1));
// //     };

// //     const incrementQty = () => {
// //         if (stock > quantity) {
// //             setQuantity((prev) => prev + 1);
// //         }
// //         else{
// //             Toast.show({
// //                 type: 'error',
// //                 text1: 'Reached Maximum Quantity',
// //               })
// //         }
// //     };

// //     const addToCartHandler = () => {
// //         console.log(`Adding to the cart: ${_id}, ${name}, ${price}, ${images[0]?.url}, ${stock}`);

// //         const existingCartItem = cart_Items.find(item => item.product === _id);

// //         if(stock === 0) return Toast.show({
// //             type: 'error',
// //             text1: 'Out of Stock',
// //           })

// //           if(existingCartItem && existingCartItem.quantity >= stock) {
// //             return Toast.show({
// //               type: 'error',
// //               text1: 'Stock Limit Exceeded',
// //             });
// //           }

// //           dispatch({
// //             type: "addToCart",
// //             payload:{
// //               id: _id,
// //               product : _id,
// //               name,
// //               price,
// //               image:images[0]?.url,
// //               stock,
// //               quantity : existingCartItem ? existingCartItem.quantity + quantity : quantity
// //             }
// //           });
// //           Toast.show({
// //             type:'success',
// //             text1: 'Added to Cart',
// //           })
// //     };

// //     return (
// //         <>
// //         {
// //             loading ? <Loader/> : (
// //                 <View style={styles.container}>
// //             <Header back={true} />
// //             <Carousel
// //                 layout="stack"
// //                 sliderWidth={SLIDER_WIDTH}
// //                 itemWidth={ITEM_WIDTH}
// //                 ref={isCarousel}
// //                 data={images || []}
// //                 renderItem={CarouselCardItem}
// //                 onSnapToItem={(index) => console.log('Current image index:', index)}
// //             />
// //             <View style={styles.descriptionBox}>
// //                 <Text style={styles.productName} numberOfLines={2}>{name}</Text>
// //                 <Text style={styles.productPrice}>₹{price}</Text>
// //                 <Text style={styles.productDescription} numberOfLines={8}>{description}</Text>
// //                 <View style={styles.quantityBox}>
// //                     <Text style={styles.quantityLabel}>Quantity</Text>
// //                     <View style={styles.quantityButtonBox}>
// //                         <TouchableOpacity onPress={decrementQty}>
// //                             <Avatar.Icon icon="minus" size={25} style={styles.quantityButton} />
// //                         </TouchableOpacity>
// //                         <Text style={styles.stockBox}>{quantity}</Text>
// //                         <TouchableOpacity onPress={incrementQty}>
// //                             <Avatar.Icon icon="plus" size={25} style={styles.quantityButton} />
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //                 <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
// //                     <Button style={styles.addToCartBtn} textColor={colors.color2} icon="cart">
// //                         Add To Cart
// //                     </Button>
// //                 </TouchableOpacity>
// //             </View>
// //         </View>
// //             ) 
// //         }
// //         </>
// //     );
// // };

// // const CarouselCardItem = ({ item }) => (
// //     <View style={styles.carouselItem}>
// //         <Image source={{ uri: item?.url || apple }} style={styles.image} />
// //     </View>
// // );

// // const styles = StyleSheet.create({
// //     container: {
// //         ...defaultStyle,
// //         padding: 0,
// //         backgroundColor: colors.color1,
// //     },
// //     carouselItem: {
// //         backgroundColor: colors.color1,
// //         width: ITEM_WIDTH,
// //         paddingVertical: 40,
// //         height: 380,
// //     },
// //     image: {
// //         width: ITEM_WIDTH,
// //         resizeMode: 'contain',
// //         height: 250,
// //     },
// //     descriptionBox: {
// //         backgroundColor: colors.color2,
// //         padding: 35,
// //         flex: 1,
// //         marginTop: -380,
// //         borderTopLeftRadius: 55,
// //         borderTopRightRadius: 55,
// //     },
// //     productName: {
// //         fontSize: 25,
// //     },
// //     productPrice: {
// //         fontSize: 18,
// //         fontWeight: '800',
// //         lineHeight: 30,
// //     },
// //     productDescription: {
// //         letterSpacing: 1,
// //         lineHeight: 20,
// //         marginVertical: 15,
// //     },
// //     quantityBox: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         paddingHorizontal: 5,
// //     },
// //     quantityButtonBox: {
// //         width: 80,
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //     },
// //     stockBox: {
// //         backgroundColor: colors.color4,
// //         height: 25,
// //         width: 25,
// //         textAlign: 'center',
// //         textAlignVertical: 'center',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         borderColor: colors.color5,
// //     },
// //     addToCartBtn: {
// //         backgroundColor: colors.color3,
// //         borderRadius: 100,
// //         padding: 5,
// //         marginVertical: 25,
// //     },
// //     quantityButton: {
// //         borderRadius: 5,
// //         backgroundColor: colors.color5,
// //     },
// //     quantityLabel: {
// //         color: colors.color3,
// //         fontWeight: '300',
// //         fontSize: 15,
// //     },
// // });

// // export default ProductDetails;

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
// import { Avatar, Button } from 'react-native-paper';
// import Toast from 'react-native-toast-message';
// import Header from '../components/Header';
// import Carousel from 'react-native-snap-carousel';
// import { colors, defaultStyle } from '../styles/styles';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductDetails } from '../redux/actions/productAction';
// import { useIsFocused } from '@react-navigation/native';
// import Loader from '../components/Loader';

// const apple = require("../apple.png");
// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = SLIDER_WIDTH;

// const ProductDetails = ({ route: { params } }) => {
//   const [quantity, setQuantity] = useState(1);
//   const isCarousel = useRef(null);
//   const dispatch = useDispatch();
//   const isFocused = useIsFocused();
  
//   const { product } = useSelector((state) => state.product);
//   const { cart_Items } = useSelector((state) => state.cart);
  
//   const { name, price, description, stock, images, _id } = product?.data || {};
//   const loading = !product?.data;

//   useEffect(() => {
//     if (params?.id) {
//       dispatch(getProductDetails(params.id));
//     }
//   }, [dispatch, params?.id, isFocused]);

//   const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

//   const incrementQty = () => {
//     // Calculate potential new quantity
//     const potentialQuantity = quantity + 1;
  
//     // Check if the potential quantity along with existing cart quantity exceeds stock
//     const existingCartItem = cart_Items.find(item => item.product === _id);
//     const existingCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
  
//     if (existingCartQuantity + potentialQuantity > stock) {
//       Toast.show({
//         type: 'error',
//         text1: 'Stock Limit Reached',
//       });
//     } else {
//       setQuantity(potentialQuantity);
//     }
//   };
  

//   const addToCartHandler = () => {
//     if (stock === 0) {
//       return Toast.show({
//         type: 'error',
//         text1: 'Out of Stock',
//       });
//     }

//     const existingCartItem = cart_Items.find(item => item.product === _id);

//     if (existingCartItem && existingCartItem.quantity >= stock) {
//       return Toast.show({
//         type: 'error',
//         text1: 'Stock Limit Exceeded',
//       });
//     }

//     dispatch({
//       type: "addToCart", // Updated action type
//       payload: {
//         id: _id,
//         product: _id,
//         name,
//         price,
//         image: images[0]?.url,
//         stock,
//         quantity: existingCartItem ? existingCartItem.quantity + quantity : quantity,
//       },
//     });

//     Toast.show({
//       type: 'success',
//       text1: 'Added to Cart',
//     });
//   };

//   return (
//     loading ? <Loader /> : (
//       <View style={styles.container}>
//         <Header back={true} />
//         <Carousel
//           layout="stack"
//           sliderWidth={SLIDER_WIDTH}
//           itemWidth={ITEM_WIDTH}
//           ref={isCarousel}
//           data={images || []}
//           renderItem={CarouselCardItem}
//         />
//         <View style={styles.descriptionBox}>
//           <Text style={styles.productName} numberOfLines={2}>{name}</Text>
//           <Text style={styles.productPrice}>₹{price}</Text>
//           <Text style={styles.productDescription} numberOfLines={8}>{description}</Text>

//           <View style={styles.quantityBox}>
//             <Text style={styles.quantityLabel}>Quantity</Text>
//             <View style={styles.quantityButtonBox}>
//               <TouchableOpacity onPress={decrementQty}>
//                 <Avatar.Icon icon="minus" size={25} style={styles.quantityButton} />
//               </TouchableOpacity>
//               <Text style={styles.stockBox}>{quantity}</Text>
//               <TouchableOpacity onPress={incrementQty}>
//                 <Avatar.Icon icon="plus" size={25} style={styles.quantityButton} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
//             <Button style={styles.addToCartBtn} textColor={colors.color2} icon="cart">
//               Add To Cart
//             </Button>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   );
// };

// const CarouselCardItem = ({ item }) => (
//   <View style={styles.carouselItem}>
//     <Image source={{ uri: item?.url || apple }} style={styles.image} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     ...defaultStyle,
//     padding: 0,
//     backgroundColor: colors.color1,
//   },
//   carouselItem: {
//     backgroundColor: colors.color1,
//     width: ITEM_WIDTH,
//     paddingVertical: 40,
//     height: 380,
//   },
//   image: {
//     width: ITEM_WIDTH,
//     resizeMode: 'contain',
//     height: 250,
//   },
//   descriptionBox: {
//     backgroundColor: colors.color2,
//     padding: 35,
//     flex: 1,
//     marginTop: -380,
//     borderTopLeftRadius: 55,
//     borderTopRightRadius: 55,
//   },
//   productName: {
//     fontSize: 25,
//   },
//   productPrice: {
//     fontSize: 18,
//     fontWeight: '800',
//     lineHeight: 30,
//   },
//   productDescription: {
//     letterSpacing: 1,
//     lineHeight: 20,
//     marginVertical: 15,
//   },
//   quantityBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 5,
//   },
//   quantityButtonBox: {
//     width: 80,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   stockBox: {
//     backgroundColor: colors.color4,
//     height: 25,
//     width: 25,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: colors.color5,
//   },
//   addToCartBtn: {
//     backgroundColor: colors.color3,
//     borderRadius: 100,
//     padding: 5,
//     marginVertical: 25,
//   },
//   quantityButton: {
//     borderRadius: 5,
//     backgroundColor: colors.color5,
//   },
//   quantityLabel: {
//     color: colors.color3,
//     fontWeight: '300',
//     fontSize: 15,
//   },
// });

// export default ProductDetails;

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Switch } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
import Carousel from 'react-native-snap-carousel';
import { colors, defaultStyle } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/productAction';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../components/Loader';

const apple = require("../apple.png");
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true); // New state for animation toggle
  const isCarousel = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { product } = useSelector((state) => state.product);
  const { cart_Items } = useSelector((state) => state.cart);

  const { name, price, description, stock, images, _id } = product?.data || {};
  const loading = !product?.data;

  useEffect(() => {
    if (params?.id) {
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, params?.id, isFocused]);

  useEffect(() => {
    if (images?.length > 0 && isAnimationEnabled) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        isCarousel.current?.snapToItem((currentImageIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [images, currentImageIndex, isAnimationEnabled]);

  const handleToggleAnimation = () => {
    setIsAnimationEnabled(!isAnimationEnabled);
  };

  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const incrementQty = () => {
    const potentialQuantity = quantity + 1;
    const existingCartItem = cart_Items.find(item => item.product === _id);
    const existingCartQuantity = existingCartItem ? existingCartItem.quantity : 0;

    if (existingCartQuantity + potentialQuantity > stock) {
      Toast.show({
        type: 'error',
        text1: 'Stock Limit Reached',
      });
    } else {
      setQuantity(potentialQuantity);
    }
  };

  const addToCartHandler = () => {
    if (stock === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Out of Stock',
      });
    }

    const existingCartItem = cart_Items.find(item => item.product === _id);

    if (existingCartItem && existingCartItem.quantity >= stock) {
      return Toast.show({
        type: 'error',
        text1: 'Stock Limit Exceeded',
      });
    }

    dispatch({
      type: "addToCart", // Updated action type
      payload: {
        id: _id,
        product: _id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity: existingCartItem ? existingCartItem.quantity + quantity : quantity,
      },
    });

    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
    });
  };

  return (
    loading ? <Loader /> : (
      <View style={styles.container}>
        <Header back={true} />
      
        <Carousel
          layout="stack"
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          ref={isCarousel}
          data={images || []}
          renderItem={CarouselCardItem}
          loop={true} // Enable looping
        />
        <View style={styles.descriptionBox}>
          <Text style={styles.productName} numberOfLines={2}>{name}</Text>
          <Text style={styles.productPrice}>₹{price}</Text>
          <Text style={styles.productDescription} numberOfLines={8}>{description}</Text>

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

          <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
            <Button style={styles.addToCartBtn} textColor={colors.color2} icon="cart">
              Add To Cart
            </Button>
          </TouchableOpacity>
        </View>

        {/* Switch for enabling/disabling animation */}
        <View style={styles.animationToggle}>
          <Switch 
            value={isAnimationEnabled} 
            onValueChange={handleToggleAnimation} 
          />
        </View>
      </View>
   
    )
  );
};

const CarouselCardItem = ({ item }) => (
  <View style={styles.carouselItem}>
    <Image source={{ uri: item?.url || apple }} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
    padding: 0,
    backgroundColor: colors.color1,
  },
  carouselItem: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
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
  animationToggle: {
    position: 'absolute',
    top: 380,
    right: 20,
    // backgroundColor: colors.color1,
    padding: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: colors.color2,
  },
});

export default ProductDetails;



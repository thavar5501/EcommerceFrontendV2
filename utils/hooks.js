import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import axios from "axios";
import {server} from "../redux/store"
import { getAdminProducts } from "../redux/actions/productAction";

export const useMessageAndErrorUser = (navigation,navigateTo="login", dispatch) => {
    // Function to handle messages and errors
    const {loading, error, message}  = useSelector((state)=>state.user);
    // UseEffect
    useEffect(()=>{
        if(error){
          Toast.show({
            type: "error",
            text1: error,
          })
          dispatch({
            type:"clearError"
          })
        }
        if(message){
          navigation.reset({
            index:0,
            routes: [{ name: navigateTo }],
          });
          Toast.show({
            type: "success",
            text1: message,
          })
          dispatch({
            type:"clearMessage"
          })
        }
      },[error,message,dispatch])

      return loading;
}

export const useMessageAndErrorOther = (navigation, dispatch, navigateTo, func) => {
  console.log("navigateTo is:", navigateTo);
  const { loading, error, message } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({
        type: "clearMessage",
      });
      console.log("navigating to " + navigateTo);

      // Dispatching func if it exists and is a function
      if (typeof func === 'function') {
        dispatch(func());
      }
    }
  }, [error, message, dispatch, navigation, navigateTo, func]);

  return loading;
};

export const useSetCategories = (setCategories, isFocused) => {
  useEffect(() => {
    axios.get(`${server}/product/categories`).then((response) => {
      setCategories(response.data.data);
    }).catch((error) => {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      })
    })
  }, [isFocused])
}

export const useSetOrders = (isFocused, isAdmin=false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/order/${isAdmin?"admin":"my"}`).then((response) => {
      isAdmin? setOrders(response.data.orders) : setOrders(response.data.data);
      setLoading(false)
    }).catch((error) => {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      })
      setLoading(false);
    })
  }, [isFocused])
  return { orders, loading };
}

export const useAdminProducts = (dispatch, isFocused) => {
  const {products, inStock, outOfStock, error, loading} = useSelector((state)=>state.product);
  useEffect(()=>{
    if(error){
      Toast.show({
        type: "error",
        text1: error,
      })
      dispatch({
        type:"clearError"
      })
    }
    dispatch(getAdminProducts())
  },[dispatch, isFocused,error])

  return { 
    products, 
    inStock, 
    outOfStock,
    loading
  };
}
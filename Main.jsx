import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Toast from 'react-native-toast-message';
import Cart from './screens/Cart';
import ConfirmOrder from './screens/ConfirmOrder';
import Payment from './screens/Payment';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Profile from "./screens/Profile"
import UpdateProfile from './screens/UpdateProfile';
import ChangePassword from './screens/ChangePassword';
import Orders from './screens/Orders';
import ForgetPassword from "./screens/ForgetPassword"
import Verify from './screens/Verify';
import AdminPanel from "./screens/Admin/AdminPanel"
import Categories from "./screens/Admin/Categories"
import AdminOrders from "./screens/Admin/AdminOrders"
import UpdateProduct from "./screens/Admin/UpdateProduct"
import NewProduct from "./screens/Admin/NewProduct"
import ProductImages from "./screens/Admin/ProductImages"
import CameraComponent from './screens/CameraComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
const Stack = createNativeStackNavigator();

const Main = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch]);

  const {user}  = useSelector(state=>state.user);
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName='Home' 
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Group>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='productdetails' component={ProductDetails}/>
                <Stack.Screen name='cart' component={Cart}/>
                <Stack.Screen name='confirmOrder' component={ConfirmOrder}/>
                <Stack.Screen name='payment' component={Payment}/>
                <Stack.Screen name='login' component={Login}/>
                <Stack.Screen name='signup' component={SignUp}/>
                <Stack.Screen name='profile' component={Profile}/>
                <Stack.Screen name='updateprofile' component={UpdateProfile}/>
                <Stack.Screen name='changepassword' component={ChangePassword}/>
                <Stack.Screen name='orders' component={Orders}/>
                <Stack.Screen name='forgetpassword' component={ForgetPassword}/>
                <Stack.Screen name='verify' component={Verify}/>

                {/* Admin Routes */}
                <Stack.Screen name="adminpanel" component={AdminPanel}/>
                <Stack.Screen name="categories" component={Categories}/>
                <Stack.Screen name="adminorders" component={AdminOrders}/>
                <Stack.Screen name="updateproduct" component={UpdateProduct}/>
                <Stack.Screen name="newproduct" component={NewProduct}/>
                <Stack.Screen name="productimages" component={ProductImages}/>
                <Stack.Screen name="camera" component={CameraComponent}/>
            </Stack.Group>
        </Stack.Navigator>
        <Toast position="top" topOffset={45}/>
    </NavigationContainer>
  )
}

export default Main
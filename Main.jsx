import React, { useEffect } from 'react'; // Importing necessary hooks
import { NavigationContainer } from '@react-navigation/native'; // Navigation container for handling routes
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator for navigation
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import Toast from 'react-native-toast-message'; // Toast notification for user feedback
import { enableScreens } from 'react-native-screens'; // Enables screens for optimized navigation performance

// Import screens for navigation
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import ConfirmOrder from './screens/ConfirmOrder';
import Payment from './screens/Payment';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import UpdateProfile from './screens/UpdateProfile';
import ChangePassword from './screens/ChangePassword';
import Orders from './screens/Orders';
import ForgetPassword from './screens/ForgetPassword';
import Verify from './screens/Verify';
import AdminPanel from './screens/Admin/AdminPanel';
import Categories from './screens/Admin/Categories';
import AdminOrders from './screens/Admin/AdminOrders';
import UpdateProduct from './screens/Admin/UpdateProduct';
import NewProduct from './screens/Admin/NewProduct';
import ProductImages from './screens/Admin/ProductImages';
import CameraComponent from './screens/CameraComponent';

// Redux actions
import { loadUser } from './redux/actions/userActions';

// Enable native screens for improved performance in navigation
enableScreens();

// Create the main stack navigator
const Stack = createNativeStackNavigator();

const Main = () => {
  
  const dispatch = useDispatch(); // Initialize dispatch from Redux
  
  // Load the current user when the component mounts
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]); // Only run once, on mount
  
  // Extract the user state from Redux store
  const { user } = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home' // Set the initial screen
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >
        <Stack.Group>
          {/* Home and other screens */}
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='productdetails' component={ProductDetails} />
          <Stack.Screen name='cart' component={Cart} />
          <Stack.Screen name='confirmOrder' component={ConfirmOrder} />
          <Stack.Screen name='payment' component={Payment} />
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='signup' component={SignUp} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='updateprofile' component={UpdateProfile} />
          <Stack.Screen name='changepassword' component={ChangePassword} />
          <Stack.Screen name='orders' component={Orders} />
          <Stack.Screen name='forgetpassword' component={ForgetPassword} />
          <Stack.Screen name='verify' component={Verify} />

          {/* Admin Routes */}
          <Stack.Screen name="adminpanel" component={AdminPanel} />
          <Stack.Screen name="categories" component={Categories} />
          <Stack.Screen name="adminorders" component={AdminOrders} />
          <Stack.Screen name="updateproduct" component={UpdateProduct} />
          <Stack.Screen name="newproduct" component={NewProduct} />
          <Stack.Screen name="productimages" component={ProductImages} />
          <Stack.Screen name="camera" component={CameraComponent} />
        </Stack.Group>
      </Stack.Navigator>

      {/* Toast notification at the top of the screen */}
      <Toast position="top" topOffset={45} />
    </NavigationContainer>
  );
}

export default Main;

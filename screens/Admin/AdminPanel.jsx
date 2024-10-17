import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { colors, defaultStyle } from '../../styles/styles'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import ButtonBox from '../../components/ButtonBox'
import ProductListHeading from '../../components/ProductListHeading'
import ProductListItem from '../../components/ProductListItem'
import { useDispatch, useSelector } from 'react-redux'
import Chart from '../../components/Chart'
import { useAdminProducts, useMessageAndErrorOther } from '../../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { deleteProduct } from '../../redux/actions/otherAction'
import { getAdminProducts } from '../../redux/actions/productAction'

const AdminPanel = ({navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);
    const navigationHandler = (text) => {
        switch (text) {
            case "Category":
                navigation.navigate("categories")
                break;
            case "All Orders":
                navigation.navigate("adminorders")
                break;
            case "Product":
                navigation.navigate("newproduct")
                break;    
            default:
                navigation.navigate("adminorders")
                break;
        }
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    } 

    const loadingDelete = useMessageAndErrorOther(null, dispatch, null, getAdminProducts);
  return (
    <View style={defaultStyle}>

      {/* Header */}
      <Header back={true}/>

      {/*Admin Panel Heading */}
      <View style={{paddingTop:65, marginBottom:20}}>
        <Text style={styles.heading}>Admin Panel</Text>
      </View>

      {/* Main Admin Panel Body */}

      {
        loading ? <Loader/>:(
            <>
            {/* Below View Is For React Native Chart */}
            <View style={styles.viewOne}>
                <Chart inStock={inStock} outOfStock={outOfStock}/>
            </View>
            <View style={styles.viewTwo}>
                <ButtonBox icon={"plus"} text={"Product"} handler={navigationHandler}/>
                <ButtonBox icon={"format-list-bulleted-square"} text={"All Orders"} handler={navigationHandler} reverse={true}/>
                <ButtonBox icon={"plus"} text={"Category"} handler={navigationHandler}/>
            </View>
            {/* Column Of Products Table */}
            <ProductListHeading/> 
            {/* Row Of Products Table */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {
                       !loadingDelete && products.map((item, index)=>(
                            <ProductListItem 
                            navigate = {navigation}
                            deleteHandler = {deleteProductHandler}
                            key={item._id}
                            i = {index}
                            id={item._id}
                            price = {item.price}
                            stock = {item.stock}
                            name = {item.name}
                            category = {item.category?.name}
                            imgSrc = {item.images[0].url}
                            />
                        ))
                    }
                </View>
            </ScrollView>
            </>
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize:25,
        textAlign:"center",
        fontWeight:"500",
        backgroundColor:colors.color3,
        color:colors.color2,
        padding:5,
        borderRadius:5,
        marginTop:20 
    },
    viewOne:{
        backgroundColor:colors.color3,
        borderRadius:20,
        alignItems:"center"
    },
    viewTwo:{
        flexDirection:"row",
        margin:10,
        justifyContent:"space-between"
    }
})

export default AdminPanel
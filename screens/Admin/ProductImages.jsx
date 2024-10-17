import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {colors, defaultStyle} from '../../styles/styles'
import Header from '../../components/Header'
import ImageCard from '../../components/ImageCard'
import { Avatar, Button } from 'react-native-paper'
import { useMessageAndErrorOther } from '../../utils/hooks'
import { useDispatch } from 'react-redux'
import mime from "mime";
import { deleteProductImage, updateProductImage } from '../../redux/actions/otherAction'

const ProductImages = ({navigation,route}) => {
  const dispatch = useDispatch();  
  console.log(route.params)
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState("");
  const [imageChanged, setImageChanged] = useState(false)

  const loading = useMessageAndErrorOther(navigation, dispatch, "adminpanel");

  const deleteHandler = (id)=>{
    dispatch(deleteProductImage(productId, id))
  }
  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("file", {
        uri: image,
        name: image.split("/").pop(),
        type: mime.getType(image)
    });
    dispatch(updateProductImage(productId, myForm));
  }

  useEffect(()=>{
    if(route.params?.image) 
    {
    setImage(route.params.image)
    setImageChanged(true)
    }
  }, [route.params])
  return (
    <View style={styles.container}>
        {/* Header */}
        <Header back={true}/>
        {/* Product Images Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
            <Text style={styles.heading}>Product Images</Text>
        </View>
        {/* Adding Scrollview */}
        <ScrollView style={styles.scrollview}>
            <View style={styles.viewInScrollview}>
                {/* Mapping to the images array */}
                {
                    images.map((item)=>(
                        <ImageCard
                        key={item._id}
                        src={item.url}
                        id={item._id}
                        deleteHandler={deleteHandler}
                        />
                    ))
                }
            </View>
        </ScrollView>
        <View style={styles.bottomView}>
            {/* Image */}
            <Image
            style={styles.imageInBottomView}
            source={{
                uri:image ? image : null
            }}
            />
            {/* Icon Box View */}
            <View style={styles.iconBox}>
                <TouchableOpacity
                activeOpacity={0.8} 
                onPress={()=>navigation.navigate("camera", {updateProduct:true})}>
                    <Avatar.Icon
                    icon={"camera"}
                    size={30}
                    color={colors.color3}
                    style={styles.cameraIcon}
                    />
                </TouchableOpacity>
            </View>
            {/* Add Button For Adding Images */}
            <Button
            textColor={colors.color2} 
            style={styles.addBtn}
            loading={loading}
            onPress={submitHandler}
            disabled={!imageChanged}
            >
                Add
            </Button>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        ...defaultStyle,
        backgroundColor:colors.color5
    },
    heading: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "500",
        backgroundColor: colors.color3,
        color: colors.color2,
        padding: 5,
        borderRadius: 5,
        marginTop: 20
    }, 
    scrollview:{
        marginBottom:20
    },
    viewInScrollview:{
        backgroundColor:colors.color2,
        padding:40,
        minHeight:400
    },
    bottomView:{
        padding:20,
        borderRadius:20,
        backgroundColor:colors.color3
    },
    imageInBottomView:{
        backgroundColor:colors.color2,
        width:100,
        height:100,
        alignSelf:"center",
        resizeMode:"contain"
    },
    iconBox:{
        flexDirection:"row",
        justifyContent:"center"
    },
    cameraIcon:{
        backgroundColor:colors.color2,
        margin:10
    },
    addBtn:{
        backgroundColor:colors.color1,
        padding:5
    }
})
export default ProductImages
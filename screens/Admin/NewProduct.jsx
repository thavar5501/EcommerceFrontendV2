import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, inputStyling } from '../../styles/styles'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { Avatar, Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks'
import mime from "mime";
import { createProduct } from '../../redux/actions/otherAction'

const NewProduct = ({ navigation, route }) => {
    const inputOptions = {
        style:inputStyling,
        mode:"outlined",
        activeOutlineColor:colors.color1
    }

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    //console.log(route.params)
    const [visible, setVisible] = useState(false);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose a category");
    const [categoryID, setCategoryID] = useState(undefined);
    const [categories, setCategories] = useState([]);
    
    useSetCategories(setCategories, isFocused);
    const condition =  !name || !description || !price || !stock || !image;


    const submitHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("description", description);
        myForm.append("price", price);
        myForm.append("stock", stock);
        myForm.append("file", {
            uri: image,
            name: image.split("/").pop(),
            type: mime.getType(image)
        });
        if(categoryID) myForm.append("category", categoryID);
        dispatch(createProduct(myForm));
    }

    const loading = useMessageAndErrorOther(navigation, dispatch, "adminpanel");

    useEffect(()=>{
        if(route.params?.image) setImage(route.params.image)
    }, [route.params])

    return (
        <>
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
            {/* Header*/}
            <Header back={true} />

            {/*Update Product Heading */}
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={styles.heading}>New Product</Text>
            </View>

            {/* Main Body Of Update Product */}
            {
                (
                    <ScrollView style={styles.mainScrollview}>
                        <View style={styles.mainView}>
                            
                            <View style={styles.profileView}>
                                <Avatar.Image
                                size={80}
                                style={{backgroundColor:colors.color1}}
                                source={{
                                    uri: image ? image : null
                                }}
                                />
                                <TouchableOpacity onPress={()=>navigation.navigate("camera",{newProduct:true})}>
                                    <Avatar.Icon icon={"camera"} size={30} style={{
                                        position:"absolute",
                                        bottom:0,
                                        left:10,
                                        backgroundColor:colors.color2
                                    }}/>
                                </TouchableOpacity>
                            </View>

                            {/*Input Fields To Update Product*/}
                            <TextInput
                                {...inputOptions}
                                placeholder='Name'
                                value={name}
                                onChangeText={setName}
                                keyboardType="default"
                            />
                            <TextInput
                                {...inputOptions}
                                placeholder='Description'
                                value={description}
                                onChangeText={setDescription}
                                keyboardType="default"
                            />
                            <TextInput
                                {...inputOptions}
                                placeholder='Price'
                                value={price}
                                onChangeText={setPrice}
                                keyboardType="numeric"
                            />
                            <TextInput
                                {...inputOptions}
                                placeholder='Stock'
                                value={stock}
                                onChangeText={setStock}
                                keyboardType="numeric"
                            />
                            <Text
                            style={{
                                ...inputStyling,
                                textAlign:"center",
                                textAlignVertical:"center",
                                borderRadius:5,
                                fontWeight:"900"
                            }}
                            onPress={()=>setVisible(true)}
                            >{category}</Text>

                            {/* Final Update Button To Update The Fields */}
                            <Button 
                            style={styles.finalBTN}
                            textColor={colors.color2}
                            onPress={submitHandler}
                            loading={loading}
                            disabled={condition || loading}
                            >Create</Button>
                        </View>
                    </ScrollView>
                )
            }
        </View>
        <SelectComponent
        visible={visible}
        setVisible={setVisible}
        categories={categories}
        setCategory={setCategory}
        setCategoryID={setCategoryID}
        />
        </>
    )
}

const styles = StyleSheet.create({
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
    mainScrollview: {
        padding: 20,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: colors.color3
    },
    mainView: {
        justifyContent: "center",
        minHeight: 650
    },
    finalBTN:{
        backgroundColor:colors.color1,
        margin:20,
        padding:6
    },
    profileView:{
        width:80,
        height:80,
        // backgroundColor:"orange",
        alignSelf:"center",
        marginBottom:20,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default NewProduct
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, inputStyling } from '../../styles/styles'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { Button, TextInput } from 'react-native-paper'
import SelectComponent from '../../components/SelectComponent'
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../redux/actions/productAction'
import { updateProduct } from '../../redux/actions/otherAction'

const UpdateProduct = ({ navigation, route }) => {
    const inputOptions = {
        style: inputStyling,
        mode: "outlined",
        activeOutlineColor: colors.color1
    }

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(false);

    // Fetch product details from Redux store
    const { product, loading } = useSelector((state) => state.product);

    // Product form state
    const [id] = useState(route.params.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Select Category");
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([]);

    // Fetch categories
    useSetCategories(setCategories, isFocused);

    // Handle form submission
    const submitHandler = () => {

        dispatch(updateProduct(id, name, description, price, stock, categoryID))
    }

    // Loading state for additional operations
    const loadingOther = useMessageAndErrorOther(navigation, dispatch, "adminpanel");

    const [images, setImages] = useState("");

    // Fetch product details on component mount
    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id]);

    // Update form fields when product data is available
    useEffect(() => {
        if (product && product.data) {
            setName(product.data.name || "");
            setDescription(product.data.description || "");
            setPrice(product.data.price ? product.data.price.toString() : "");
            setStock(product.data.stock ? product.data.stock.toString() : "");
            setImages(product.data.images ? product.data.images : "");
            setCategory(product.data.category ? product.data.category.name : "Select Category")
        }
    }, [product]);

    return (
        <>
            <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
                {/* Header */}
                <Header back={true} />

                {/* Update Product Heading */}
                <View style={{ marginBottom: 20, paddingTop: 70 }}>
                    <Text style={styles.heading}>Update Product</Text>
                </View>

                {/* Main Body of Update Product */}
                {loading ? (
                    <Loader />
                ) : (
                    <ScrollView style={styles.mainScrollview}>
                        <View style={styles.mainView}>
                            {/* Manage Images Button */}
                            <Button
                                onPress={() => navigation.navigate("productimages", { id, images })}
                                textColor={colors.color1}
                            >
                                Manage Images
                            </Button>

                            {/* Input Fields to Update Product */}
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
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    borderRadius: 5,
                                    fontWeight: "900"
                                }}
                                onPress={() => setVisible(true)}
                            >
                                {category}
                            </Text>

                            {/* Final Update Button */}
                            <Button
                                style={styles.finalBTN}
                                textColor={colors.color2}
                                onPress={submitHandler}
                                loading={loadingOther}
                                disabled={loadingOther}
                            >
                                Update
                            </Button>
                        </View>
                    </ScrollView>
                )}
            </View>

            {/* SelectComponent for Category Selection */}
            <SelectComponent
                visible={visible}
                setVisible={setVisible}
                categories={categories}
                setCategory={setCategory}
                setCategoryID={setCategoryID}
            />
        </>
    );
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
    finalBTN: {
        backgroundColor: colors.color1,
        margin: 20,
        padding: 6
    }
});

export default UpdateProduct;
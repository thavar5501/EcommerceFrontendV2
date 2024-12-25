import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { Button, TextInput } from 'react-native-paper';
import SelectComponent from '../../components/SelectComponent';
import { useMessageAndErrorOther, useSetCategories } from '../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/actions/productAction';
import { updateProduct } from '../../redux/actions/otherAction';

const UpdateProduct = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // State to handle form input
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('Select Category');
    const [categoryID, setCategoryID] = useState('');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [visible, setVisible] = useState(false);

    // Extract route parameters
    const productId = route.params.id;

    // Fetch product details and loading state from Redux
    const { product, loading } = useSelector((state) => state.product);
    const loadingOther = useMessageAndErrorOther(navigation, dispatch, 'adminpanel');

    // Fetch categories when the screen is focused
    useSetCategories(setCategories, isFocused);

    // Fetch product details on component mount
    useEffect(() => {
        if (productId) {
            dispatch(getProductDetails(productId));
        }
    }, [dispatch, productId]);

    // Update state when product details are loaded
    useEffect(() => {
        if (product?.data) {
            setName(product.data.name || '');
            setDescription(product.data.description || '');
            setPrice(product.data.price ? product.data.price.toString() : '');
            setStock(product.data.stock ? product.data.stock.toString() : '');
            setImages(product.data.images || '');
            setCategory(product.data.category?.name || 'Select Category');
            setCategoryID(product.data.category?._id || '');
        }
    }, [product]);

    // Track modifications to the form
    useEffect(() => {
        setIsModified(true);
    }, [name, description, price, stock, categoryID]);

    // Validate form and submit handler
    const submitHandler = () => {
        if (!name.trim() || !description.trim() || !price || !stock || !categoryID) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }

        if (isNaN(price) || isNaN(stock)) {
            Alert.alert('Validation Error', 'Price and Stock must be valid numbers.');
            return;
        }

        dispatch(updateProduct(productId, name, description, price, stock, categoryID));
    };

    // Render loader while product details are loading
    if (loading) return <Loader />;

    return (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
            {/* Header */}
            <Header back={true} />

            {/* Heading */}
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Update Product</Text>
            </View>

            {/* Main Form */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    {/* Manage Images Button */}
                    <Button
                        onPress={() => navigation.navigate('productimages', { id: productId, images })}
                        textColor={colors.color1}
                    >
                        Manage Images
                    </Button>

                    {/* Name Input */}
                    <TextInput
                        style={inputStyling}
                        mode="outlined"
                        activeOutlineColor={colors.color1}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Description Input */}
                    <TextInput
                        style={inputStyling}
                        mode="outlined"
                        activeOutlineColor={colors.color1}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    {/* Price Input */}
                    <TextInput
                        style={inputStyling}
                        mode="outlined"
                        activeOutlineColor={colors.color1}
                        placeholder="Price"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />

                    {/* Stock Input */}
                    <TextInput
                        style={inputStyling}
                        mode="outlined"
                        activeOutlineColor={colors.color1}
                        placeholder="Stock"
                        value={stock}
                        onChangeText={setStock}
                        keyboardType="numeric"
                    />

                    {/* Category Selection */}
                    <Text
                        style={styles.categorySelector}
                        onPress={() => setVisible(true)}
                    >
                        {category}
                    </Text>

                    {/* Submit Button */}
                    <Button
                        style={styles.submitButton}
                        textColor={colors.color2}
                        onPress={submitHandler}
                        loading={loadingOther}
                        disabled={!isModified || loadingOther}
                    >
                        Update
                    </Button>
                </View>
            </ScrollView>

            {/* Category Selector Component */}
            <SelectComponent
                visible={visible}
                setVisible={setVisible}
                categories={categories}
                setCategory={setCategory}
                setCategoryID={setCategoryID}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headingContainer: {
        marginBottom: 20,
        paddingTop: 70,
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: colors.color3,
        color: colors.color2,
        padding: 5,
        borderRadius: 5,
        marginTop: 20,
    },
    scrollView: {
        padding: 20,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: colors.color3,
    },
    formContainer: {
        justifyContent: 'center',
        minHeight: 650,
    },
    categorySelector: {
        ...inputStyling,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5,
        fontWeight: '900',
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: colors.color1,
        marginVertical: 20,
        padding: 6,
    },
});

export default UpdateProduct;

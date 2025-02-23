import axios from "axios"
import { server } from "../store"

export const updatePassword = (oldPassword, newPassword) => async(dispatch) => {
    try {
        dispatch({ type: "updatePasswordRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/user/changePassword`,
            { oldPassword, newPassword},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "updatePasswordSuccess",
            payload: data.message

         })
    } catch (error) {
        dispatch({ 
            type: "updatePasswordFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}


export const updateProfile = (phone, name, email, address, city, pinCode, country, location) => async(dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/user/updateProfile`,
            {phone, name, email, address, city, pinCode, country, location },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "updateProfileSuccess",
            payload: data.message

         })
    } catch (error) {
        dispatch({ 
            type: "updateProfileFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const updateLocation = (location) => async(dispatch) => {
    try {
        dispatch({ type: "updateLocationRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/user/updateLocation`,
            { location },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "updateLocationSuccess",
            payload: data.message
         })
    } catch (error) {
        dispatch({ 
            type: "updateLocationFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }
}


export const updatePic = (formData) => async (dispatch) =>{
    try {
        dispatch({ type: "updatePicRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/user/updatePicture`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }
        )
        
        dispatch({ type: "updatePicSuccess", payload: data.message })
    } catch (error) {
        dispatch({
            type:"updatePicFail",
            payload: error.response.data.message || "An error occurred"
        })
    }    
}


export const placeOrder = (shippingInfo,orderItems,paymentMethod,paymentInfo,itemsPrice,taxPrice,shippingCharges,totalAmount) => async(dispatch) => {
    console.log(
        "I am from placeOrder Action",
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
    )
    try {
        dispatch({ type: "placeOrderRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/order/new`,
            { 
                shippingInfo,
                orderItems,
                paymentMethod,
                paymentInfo,
                itemsPrice,
                taxPrice,
                shippingCharges,
                totalAmount
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "placeOrderSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "placeOrderFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const processOrder = (id) => async(dispatch) => {
    try {
        dispatch({ type: "processOrderRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/order/single/${id}`,
            {},
            {withCredentials: true}
        )
        dispatch({ 
            type: "processOrderSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "processOrderFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const addCategory = (name) => async(dispatch) => {
    try {
        dispatch({ type: "addCategoryRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/product/category`,
            {name},
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        dispatch({ 
            type: "addCategorySuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "addCategoryFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const deleteCategory = (id) => async(dispatch) => {
    try {
        dispatch({ type: "deleteCategoryRequest" })
        // Axios Here
        const {data} = await axios.delete(
            `${server}/product/category/${id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
        dispatch({ 
            type: "deleteCategorySuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "deleteCategoryFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const createProduct = (formData) => async(dispatch) => {

    try {
        dispatch({ type: "addProductRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/product/new`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "addProductSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "addProductFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const updateProduct = (id, name, description, price, stock, category) => async(dispatch) => {
    try {
        dispatch({ type: "updateProductRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/product/single/${id}`,
            { name, description, price, stock, category },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "updateProductSuccess",
            payload: data.message

         })
    } catch (error) {
        dispatch({ 
            type: "updateProductFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const updateProductImage = (id, formData) => async(dispatch) => {

    try {
        dispatch({ type: "updateProductImageRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/product/images/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "updateProductImageSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "updateProductImageFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const deleteProductImage = (productId, imageId) => async(dispatch) => {

    try {
        dispatch({ type: "deleteProductImageRequest" })
        // Axios Here
        const {data} = await axios.delete(
            `${server}/product/images/${productId}?id=${imageId}`,
            {withCredentials: true}
        )
        dispatch({ 
            type: "deleteProductImageSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "deleteProductImageFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const deleteProduct = (productId) => async(dispatch) => {

    try {
        dispatch({ type: "deleteProductRequest" })
        // Axios Here
        const {data} = await axios.delete(
            `${server}/product/single/${productId}`,
            {withCredentials: true}
        )
        dispatch({ 
            type: "deleteProductSuccess",
            payload: data.message

         })
    } catch (error) {
        console.log(error)
        dispatch({ 
            type: "deleteProductFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const forgetPassword = (email) => async(dispatch) => {
    try {
        dispatch({ type: "forgetPasswordRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/user/forgetPassword`,
            { email },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "forgetPasswordSuccess",
            payload: data.message

         })
    } catch (error) {
        dispatch({ 
            type: "forgetPasswordFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

export const resetPassword = (otp, password) => async(dispatch) => {
    try {
        dispatch({ type: "resetPasswordRequest" })
        // Axios Here
        const {data} = await axios.put(
            `${server}/user/resetPassword`,
            { otp, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        dispatch({ 
            type: "resetPasswordSuccess",
            payload: data.message

         })
    } catch (error) {
        dispatch({ 
            type: "resetPasswordFail", 
            payload: error.response.data.message || "An error occurred"
        })
    }

}

// Function to update address only
export const updateAddress = (address) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" });

        // Prepare the payload for address only
        const payload = { address };

        // Axios request to update only the address
        const { data } = await axios.put(
            `${server}/user/updateProfile`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: "updateProfileFail",
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};


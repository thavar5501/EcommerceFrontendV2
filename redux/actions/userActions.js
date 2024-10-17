import axios from "axios"
import { server } from "../store"

export const registerUser = (formData) => async (dispatch) =>{
    try {
        dispatch({ type: "registerRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/user/new`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },
        {withCredentials: true}
        )
        
        dispatch({ type: "registerSuccess", payload: data.message })
    } catch (error) {
        dispatch({
            type:"registerFail",
            payload: error.response.data.message || "An error occurred"
        })
    }    
}

export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({ type: "loginRequest" })
        // Axios Here
        const {data} = await axios.post(
            `${server}/user/login`, 
            { email: email,
            password: password},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            {withCredentials: true}
        )
        
        dispatch({ type: "loginSuccess", payload: data.message })
    } catch (error) {
        dispatch({
            type:"loginFailure",
            payload: error.response.data.message || "An error occurred"
        })
    }    
}

export const loadUser = () => async (dispatch) =>{
    try {
        dispatch({ type: "loadUserRequest" })
        // Axios Here
        const {data} = await axios.get(
            `${server}/user/myProfile`,
            {
                withCredentials: true,
            } 
        )
        dispatch({ type: "loadUserSuccess", payload: data.data })
    } catch (error) {
        dispatch({
            type:"loadUserFail",
            payload: error.response.data.message || "An error occurred"
        })
    }    
}

export const logout = () => async (dispatch) =>{
    try {
        dispatch({ type: "logoutRequest" })
        // Axios Here
        const {data} = await axios.get(
            `${server}/user/logout`,
            {
                withCredentials: true,
            } 
        )
        dispatch({ type: "logoutSuccess", payload: data.message })
    } catch (error) {
        dispatch({
            type:"logoutFail",
            payload: error.response.data.message || "An error occurred"
        })
    }    
}


// used in redux to update modify provide data to redux (createstore) or to reducer 

import * as api from "../api";
import { setCurrenUser } from "./currentUser.js";

export const signup =(authData, navigate)=> async (dispatch)=>{         // using in inside form and sending the authData to redux (expression for redux thunk)
    try {
        const { data } = await api.signup(authData)    //passing the data from user to the api
        dispatch({ type: "AUTH", data })               // data going to reducer
        dispatch(setCurrenUser(JSON.parse(localStorage.getItem("Profile"))))    // data going to reducer            
        navigate("/")               
    } catch (error) {
        console.log(error)
    }
}
export const login =(authData, navigate)=> async (dispatch)=>{           // using in inside form and sending the authData to redux
    try {
        const { data } = await api.login(authData)    //passing the data from user to the api
        dispatch({ type: "AUTH", data })                // data going to reducer
        dispatch(setCurrenUser(JSON.parse(localStorage.getItem("Profile"))))            
        navigate("/")               
    } catch (error) {
        console.log(error)
    }
}
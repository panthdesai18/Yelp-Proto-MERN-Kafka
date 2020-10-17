import {ADD_DISH, CUST_ORDERS, CUST_ORDER_DETAILS, CUST_POST_UPDATE, CUST_SIGNUP, REST_ORDERS, REST_ORDER_DETAILS, REST_REVIEWS} from '../constants/action-types'
import {CUST_LOGIN} from '../constants/action-types'
import {CUST_PROFILE} from '../constants/action-types'
import {CUST_GET_UPDATE} from '../constants/action-types'
import {CUST_LOGOUT} from '../constants/action-types'
import {REST_SIGNUP} from '../constants/action-types'
import {REST_LOGIN} from '../constants/action-types'
import {REST_PROFILE} from '../constants/action-types'
import {REST_GET_UPDATE} from '../constants/action-types'
import {REST_POST_UPDATE} from '../constants/action-types'
import {DISH_PROFILE} from '../constants/action-types'
import axios from 'axios';
import { connURL } from '../../Configure'
import { SizeContextProvider } from 'antd/lib/config-provider/SizeContext'

export function signUp(payload){
    console.log("Attempting User Creation!")
    let input = {}
    return(dispatch) =>{
        axios.defaults.withCredentials = true;
        
        axios.post(`${connURL}/signUp`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - SIGNUP!")
                    input = {
                        message : "User Created"
                    }
                }else{
                    
                }
                dispatch({type: CUST_SIGNUP,input})
            })
            .catch(err => {
                
        })
    }
}

export function login(payload){
    console.log("Attempting User Login")
    let input = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/login`,payload)
            .then(response => {
                console.log(response)
              if(response.status === 200)
              {
                console.log("HERE IN ACTIONS - LOGIN")
                console.log(response.data)
                window.sessionStorage.setItem("UserID", response.data)
                window.location.replace('/custProfile')
                input = {
                    message : "User Created",
                    userid: window.sessionStorage.getItem("UserID")
                }
              }
              else{

              }
              dispatch({type: CUST_LOGIN, input})
            })
            .catch(err => {

            })
    }
}

export function custProfile(payload){
    console.log("Gathering Cust Data!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getUserData`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING USER DATA!")
                    console.log(response.data)
                    console.log("firstname", response.data.firstname)
                    input ={
                        message : "User Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        firstname : response.data.firstname,
                        lastname : response.data.lastname,
                        email : response.data.email,
                        headline : response.data.headline,
                        city : response.data.city,
                        state : response.data.state,
                        country : response.data.country,
                        birthday : response.data.birthday,
                        address : response.data.address,
                        blog : response.data.blog,
                        zipcode : response.data.zipcode,
                        ilove: response.data.ilove,
                        nickname : response.data.nickname,
                        imageSrc : `${connURL}/profimages/`+response.data.profimage
                    }
                }else{
                }
                dispatch({type: CUST_PROFILE, input})
            })
            .catch(err => {
                
        })
    }
}

export function restProfile(payload){
    console.log("Gathering Cust Data!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getRestData`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING RESTAURANT DATA!")
                    console.log(response.data)
                    console.log("restname", response.data.restname)
                    input ={
                        message : "Restaurant Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        firstname : response.data.restname,
                        email : response.data.email,
                        zipcode : response.data.zipcode,
                        imageUrl : `${connURL}/profimages/`+response.data.restphoto
                    }
                }else{
                }
                dispatch({type: REST_PROFILE, input})
            })
            .catch(err => {
                
        })
    }
}

export function getProfile(payload){
    console.log("Gathering Cust Data!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getUserData`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING PROFILE DATA!")
                    console.log(response.data)
                    console.log("firstname", response.data.firstname)
                    Object.keys(response.data).forEach(function(key) {
                                            if(response.data[key] === null || response.data[key] === 'null'){
                                                console.log(key)
                                                response.data[key] = ''
                                            }
                                        });
                    input ={
                        message : "User Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        firstname : response.data.firstname,
                        lastname : response.data.lastname,
                        email : response.data.email,
                        headline : response.data.headline,
                        city : response.data.city,
                        state : response.data.state,
                        country : response.data.country,
                        birthday : response.data.birthday,
                        address : response.data.address,
                        blog : response.data.blog,
                        zipcode : response.data.zipcode,
                        ilove: response.data.ilove,
                        nickname : response.data.nickname,
                        imageSrc : `${connURL}/profimages/`+response.data.profimage
                    }
                }else{
                }
                dispatch({type: CUST_GET_UPDATE, input})
            })
            .catch(err => {
                
        })
    }
}

export function postProfile(payload){
    console.log("Updating Data!");
    let input = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${connURL}/updateCust`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    input ={
                        message : "User Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        firstname : payload.firstname,
                        lastname : payload.lastname,
                        email : payload.email,
                        headline : payload.headline,
                        city : payload.city,
                        state : payload.state,
                        country : payload.country,
                        birthday : payload.birthday,
                        address : payload.address,
                        blog : payload.blog,
                        zipcode : payload.zipcode,
                        ilove: payload.ilove,
                        nickname : payload.nickname,
                        //imageSrc : 'http://localhost:3001/profimages/'+payload.profimage
                    }
                    window.location.replace('/custProfile')
                }else{
                }
                dispatch({type: CUST_POST_UPDATE, input})
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })

    }
}

export function restsignUp(payload){
    console.log("Attempting User Creation!")
    let input = {}
    return(dispatch) =>{
        axios.defaults.withCredentials = true;
        
        axios.post(`${connURL}/restsignUp`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - REST SIGNUP!")
                    input = {
                        message : "Rest User Created"
                    }
                }else{
                    
                }
                dispatch({type: REST_SIGNUP,input})
            })
            .catch(err => {
                
        })
    }
}

export function restlogin(payload){
    console.log("Attempting User Login")
    let input = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/reslogin`,payload)
            .then(response => {
                console.log(response)
              if(response.status === 200)
              {
                console.log("HERE IN ACTIONS - LOGIN")
                console.log(response.data)
                window.sessionStorage.setItem("UserID", response.data)
                //window.location.replace('/custProfile')
                input = {
                    message : "User Created",
                    userid: window.sessionStorage.getItem("UserID")
                }
                window.location.replace('/restProfile')
              }
              else{

              }
              dispatch({type: REST_LOGIN, input})
            })
            .catch(err => {

            })
    }
}

export function getRestProfile(payload){
    console.log("Gathering Cust Data!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getRestData`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST PROFILE DATA!")
                    console.log(response.data)
                    console.log("restname", response.data.restname)
                    Object.keys(response.data).forEach(function(key) {
                                            if(response.data[key] === null || response.data[key] === 'null'){
                                                console.log(key)
                                                response.data[key] = ''
                                            }
                                        });
                    input ={
                        message : "User Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        restname : response.data.restname,
                        email: response.data.email,
                        address : response.data.address,
                        zipcode : response.data.zipcode,
                        description: response.data.description,
                        phno: response.data.phno
                    }
                }else{
                }
                dispatch({type: REST_GET_UPDATE, input})
            })
            .catch(err => {
                
        })
    }
}

export function postRestProfile(payload){
    console.log("Updating Data!");
    let input = {}
    return(dispatch) => {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${connURL}/updateRest`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    input ={
                        message : "User Data!",
                        userid: window.sessionStorage.getItem("UserID"),
                        restname : payload.restname,
                        email : payload.email,
                        address : payload.address,
                        zipcode : payload.zipcode,
                        description : payload.description,
                        phno: payload.phno
                        // imageSrc : 'http://localhost:3001/profimages/'+payload.profimage
                    }
                    window.location.href('/restProfile')
                }else{
                }
                dispatch({type: REST_POST_UPDATE, input})
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })

    }
}

export function addDish(payload){
    console.log("Attempting Dish Addition")
    let input = {}
    return(dispatch) =>{
        axios.defaults.withCredentials = true;
        
        axios.post(`${connURL}/addDish`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - ADD DISH!")
                    input = {
                        message : "Dish Added."
                    }
                    window.location.replace('/restProfile')
                }else{
                    
                }
                dispatch({type: ADD_DISH,input})
            })
            .catch(err => {
                
        })
    }
}

export function dishProfile(payload){
    console.log("Gathering Dish Data!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getDishData`,payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING DISH DATA!")
                    input ={
                        message : "Dishes Data!",
                        dishes : response.data 
                    }
                }else{
                }
                dispatch({type: DISH_PROFILE, input})
            })
            .catch(err => {
                
        })
    }
}

export function restReviews(payload){
    console.log("Gathering Restaurant Reviews!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getReview`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST REVIEWS!")
                    input ={
                        message: "Reviews Data!",
                        reviews: response.data
                    }
                }else{

                }
                dispatch({type: REST_REVIEWS, input})
            })
            .catch(err => {

            })
    }
}

export function custOrders(payload){
    console.log("Gathering Customer Orders!")
    let input = {}
    return(dispatch) => {
        axios.post(`${connURL}/getUserOrders`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING CUST ORDERS!")
                    input = {
                        message: "Cust Orders Data!",
                        orders: response.data
                    }
                }else{

                }
                dispatch({type: CUST_ORDERS, input})
            })
            .catch( err => {

            })
    }
}

export function custOrderDetails(payload){
    console.log("Gathering Customer Order Details!")
    let input = {}
    return (dispatch) => {
        axios.post(`${connURL}/getUserOrderDetails`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTION - GETTING CUSTOMER ORDER DETAILS!")
                    input = {
                        message: "Cust Order Details Data!",
                        orderdetails: response.data
                    }
                }else{

                }
                dispatch({type: CUST_ORDER_DETAILS, input})
            })
            .catch( err => {

            })
    }
}

export function restOrders(payload){
    console.log("Gathering Restaurant Order!")
    let input ={}
    return (dispatch) => {
        axios.post(`${connURL}/getRestOrders`,payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST ORDERS!")
                    input = {
                        message: "Rest Order Data!",
                        orders: response.data
                    }
                }else{

                }
                dispatch({type: REST_ORDERS, input})
            })
            .catch( err => {

            })
    }
}

export function restOrderDetails(payload){
    console.log("Gathering Restaurant Order Details!")
    let input = {}
    return (dispatch) => {
        axios.post(`${connURL}/getRestOrderDetails`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST ORDER DETAILS!")
                    input = {
                        message: "Rest Order Details Data!",
                        orderdetails: response.data
                    }
                }else{

                }
                dispatch({type: REST_ORDER_DETAILS, input})
            })
            .catch(err => {
                
            })
    }
}

export function logout(payload){
    console.log("Attempting User Creation!")
    let input = {}
    return(dispatch) =>{
        sessionStorage.removeItem("UserID")
        input = {
            message: "User Logged Out!"
        }
        dispatch({type: CUST_LOGOUT, input})
    }
}
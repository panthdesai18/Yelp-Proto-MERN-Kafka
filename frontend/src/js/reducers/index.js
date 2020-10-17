import {CUST_LOGIN, CUST_PROFILE, CUST_SIGNUP, CUST_GET_UPDATE, CUST_POST_UPDATE, CUST_LOGOUT, REST_SIGNUP, REST_LOGIN, REST_PROFILE, REST_GET_UPDATE, REST_POST_UPDATE, ADD_DISH, DISH_PROFILE, REST_REVIEWS, CUST_ORDERS, CUST_ORDER_DETAILS, REST_ORDERS, REST_ORDER_DETAILS} from '../constants/action-types'
const startState = {
    info:null
}

function defaultReducer(state = startState, action){
    if(action.type === CUST_SIGNUP){
        console.log("Signing Up!")
        return Object.assign({},state,{
            info: action.input.message
        })
    }
    else if(action.type === CUST_LOGIN){
        console.log("Logging User In!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid
        })
    }
    else if(action.type === CUST_PROFILE){
        console.log("Gathering User Data!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            firstname: action.input.firstname,
            lastname: action.input.lastname,
            imageURL: action.input.imageSrc,
            message : "User Data!",
            email : action.input.email,
            headline : action.input.headline,
            city : action.input.city,
            state : action.input.state,
            country : action.input.country,
            birthday : action.input.birthday,
            address : action.input.address,
            blog : action.input.blog,
            zipcode : action.input.zipcode,
            ilove: action.input.ilove,
            nickname : action.input.nickname,  
        })
    }
    else if(action.type === CUST_GET_UPDATE){
        console.log("Gathering User Data!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            firstname: action.input.firstname,
            lastname: action.input.lastname,
            imageURL: action.input.imageSrc,
            message : "User Data!",
            email : action.input.email,
            headline : action.input.headline,
            city : action.input.city,
            state : action.input.state,
            country : action.input.country,
            birthday : action.input.birthday,
            address : action.input.address,
            blog : action.input.blog,
            zipcode : action.input.zipcode,
            ilove: action.input.ilove,
            nickname : action.input.nickname,  
        })
    }
    else if(action.type === CUST_POST_UPDATE){
        console.log("Updating User Profile!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            firstname: action.input.firstname,
            lastname: action.input.lastname,
            imageURL: action.input.imageSrc,
            message : "User Data!",
            email : action.input.email,
            headline : action.input.headline,
            city : action.input.city,
            state : action.input.state,
            country : action.input.country,
            birthday : action.input.birthday,
            address : action.input.address,
            blog : action.input.blog,
            zipcode : action.input.zipcode,
            ilove: action.input.ilove,
            nickname : action.input.nickname,
        })
    }
    else if(action.type === CUST_LOGOUT){
        console.log("Logging User Out")
        return Object.assign({}, state, {
            message: action.input.message
        })
    }
    if(action.type === REST_SIGNUP){
        console.log("Signing Up!")
        return Object.assign({},state,{
            info: action.input.message
        })
    }
    else if(action.type === REST_LOGIN){
        console.log("Logging User In!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid
        })
    }
    else if(action.type === REST_PROFILE){
        console.log("Gathering Rest Data!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            imageURL: action.input.imageUrl,
            restname: action.input.firstname,
            message : "User Data!",
            email : action.input.email,
            zipcode : action.input.zipcode,

        })
    }
    else if(action.type === REST_GET_UPDATE){
        console.log("Gathering User Data!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            restname: action.input.restname,
            message : "User Data!",
            email : action.input.email,
            address : action.input.address,
            zipcode : action.input.zipcode,
            phno: action.input.phno
        })
    }
    else if(action.type === REST_POST_UPDATE){
        console.log("Updating User Profile!")
        return Object.assign({},state,{
            info: action.input.message,
            userid: action.input.userid,
            restname: action.input.restname,
            message : "User Data!",
            email : action.input.email,
            address : action.input.address,
            zipcode : action.input.zipcode,
            phno: action.input.phno
        })
    }
    else if(action.type === ADD_DISH){
        console.log("Adding Dish")
        return Object.assign({}, state, {
            message: action.input.message
        })
    }
    else if(action.type === DISH_PROFILE){
        console.log("Gathering Dish Data")
        return Object.assign({},state,{
            info: action.input.message,
            dishes: action.input.dishes
        })
    }
    else if(action.type === REST_REVIEWS){
        console.log("Gathering Restaurant Reviews")
        return Object.assign({},state,{
            info: action.input.message,
            reviews: action.input.reviews
        })
    }
    else if(action.type === CUST_ORDERS){
        console.log("Gathering Customers Orders")
        return Object.assign({}, state, {
            info: action.input.message,
            orders: action.input.orders
        })
    }
    else if(action.type === CUST_ORDER_DETAILS){
        console.log("Gathering Customer Order Details")
        return Object.assign({}, state, {
            info_orddets: action.input.message,
            orderdetails: action.input.orderdetails
        })
    }
    else if(action.type === REST_ORDERS){
        console.log("Gathering Rest Orders")
        return Object.assign({}, state, {
            info: action.input.message,
            orders: action.input.orders
        })
    }
    else if(action.type === REST_ORDER_DETAILS){
        console.log("Gathering Restaurant Order Details")
        return Object.assign({}, state, {
            info_orderdets: action.input.message,
            orderdetails: action.input.orderdetails
        })
    }
    return state;
}

export default defaultReducer;
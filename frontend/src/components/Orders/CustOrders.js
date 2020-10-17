import React, { Component } from 'react'
import axios from 'axios'
import HeaderBar from '../HeaderBar/HeaderBar'
import Checkbox from '@material-ui/core/Checkbox';
import { connURL } from '../../Configure';
import {connect} from 'react-redux';  
import { custOrderDetails, custOrders } from '../../js/actions';

class CustOrders extends Component {

    constructor(){
        super();
        this.state = { 
            custorder: [],
            custorderdetails: []
        }
    }

    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        this.props.custOrders(data);
        this.props.custOrderDetails(data);
        // axios.post(`${connURL}/getUserOrderDetails`,data)
        //     .then(response =>{
        //         console.log("Status Code : ", response.status);
        //         if(response.status === 200){
        //             console.log("HERE IN ACTION - GETTING USER ORDER DETAILS!")
        //             console.log(response.data);
        //             this.setState({
        //                 custorder: response.data
        //             })
        //             Object.keys(this.state.custorder).map(i => 
        //                 console.log(this.state.custorder[i])
        //             )
        //         }
        //         else{

        //         }
        //     })
        //     .catch(err =>{

        //     })
    }

    submitDelivered = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getCustDelivered`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        custorder: response.data[0],
                        custorderdetails: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    submitReceived = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getCustReceived`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        custorder: response.data[0],
                        custorderdetails: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    submitPreparing = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getCustPreparing`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        custorder: response.data[0],
                        custorderdetails: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    submitOutDelivery = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getCustOutDelivery`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        custorder: response.data[0],
                        custorderdetails: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    submitCancelled = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getCustCancelled`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        custorder: response.data[0],
                        custorderdetails: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    render() {
        let temp=null;

        if(this.props.orderdetails !== undefined){
            console.log("PROPS DETAILS", this.props.orderdetails)
            temp=this.props.orderdetails.map(i => {
                console.log("CUST ORDER",i.orderid, i.status)
                return (<div style ={{borderStyle:"solid", borderWidth:1 , width: 300, marginTop: 20, padding:10, borderRadius: 5, borderColor: "#cfcfcf"}}>
                            <p style={{fontWeight:"bold"}}>Order # {i.orderid}</p>
                            <p style={{fontWeight:"bold", color: "#d32323"}}>Restaurant #: {i.restid}</p>
                            <p style={{fontWeight:"bold"}}>Status : {i.status}</p>
                            {                            
                                this.props.orders.map(j => {
                                    if(j.orderid === i.orderid.toString()){
                                        return(
                                            <h4 style={{color: "#d32323"}}>{j.dishName}</h4>
                                        )
                                    }
                                })
                            }
                        </div>)
            })
        }

        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class = "column-left-update">
                        <div style={{marginLeft: 200, marginTop: 20}}>
                            <h3>Filter Your Orders</h3>
                                <Checkbox
                                    onClick={this.submitDelivered}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Delivered
                                <br></br>
                                <Checkbox
                                    onClick={this.submitReceived}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Just Received
                                <br></br>
                                <Checkbox
                                    onClick={this.submitPreparing}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Preparing
                                <br></br>
                                <Checkbox
                                    onClick={this.submitOutDelivery}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Out for Delivery
                                <br></br>
                                <Checkbox
                                    onClick={this.submitCancelled}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Cancelled
                                <br></br>
                        </div>
                    </div>
                    <div class = "column-right-update">
                        {temp}
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        custOrders: user => dispatch(custOrders(user)),
        custOrderDetails: user => dispatch(custOrderDetails(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        message2: store.info_orddets,
        orders: store.orders,
        orderdetails: store.orderdetails
    };
}

const CustomerOrders = connect(mapStateToProps, mapDispatchToProps)(CustOrders);
export default CustomerOrders;
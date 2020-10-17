import React, { Component } from 'react'
import axios from 'axios'
import HeaderBar from '../HeaderBar/HeaderBar'
import Checkbox from '@material-ui/core/Checkbox';
import { connURL } from '../../Configure';

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
        console.log(data)
        axios.post(`${connURL}/getUserOrders`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING User Orders!")
                    console.log(response.data);
                    this.setState(
                    {
                        custorderdetails: response.data
                    })
                    console.log("Order Details!"+this.state.custorderdetails);
                    Object.keys(this.state.custorderdetails).map(i => 
                        console.log(this.state.custorderdetails[i])
                    )
                }else{
                }
            })
            .catch(err => {
                
        })
        axios.post(`${connURL}/getUserOrderDetails`,data)
            .then(response =>{
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTION - GETTING USER ORDER DETAILS!")
                    console.log(response.data);
                    this.setState({
                        custorder: response.data
                    })
                    Object.keys(this.state.custorder).map(i => 
                        console.log(this.state.custorder[i])
                    )
                }
                else{

                }
            })
            .catch(err =>{

            })
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

        temp=this.state.custorder.map(i => {
            console.log("CUST ORDER",i.orderid, i.status)
            return (<div style ={{borderStyle:"solid", borderWidth:1 , width: 300, marginTop: 20, padding:10, borderRadius: 5, borderColor: "#cfcfcf"}}>
                        <p style={{fontWeight:"bold"}}>Order # {i.orderid}</p>
                        <p style={{fontWeight:"bold", color: "#d32323"}}>Restaurant #: {i.restid}</p>
                        <p style={{fontWeight:"bold"}}>Status : {i.status}</p>
                        
                        {                            
                            this.state.custorderdetails.map(j => {
                                if(j.orderid === i.orderid.toString()){
                                    return(
                                        <h4 style={{color: "#d32323"}}>{j.dishName}</h4>
                                    )
                                }
                            })
                        }
                    </div>)
        })

        console.log(this.state.custorderdetails)
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

export default CustOrders;
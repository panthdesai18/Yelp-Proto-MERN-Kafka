import React, { Component } from 'react'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import HeaderBar from '../HeaderBar/HeaderBar'
import Checkbox from '@material-ui/core/Checkbox';
import { Modal } from 'antd';
import { connURL } from '../../Configure'


class RestOrders extends Component {

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };


    constructor(){
        super();
        this.state = { 
            restorder: [],
            restorderdetails: [],
            status: "",
            userdetails: [],
            visible: false
        }
    }

    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        console.log(data)
        axios.post(`${connURL}/getRestOrders`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING Rest Orders!")
                    console.log(response.data);
                    this.setState(
                    {
                        restorder: response.data
                    })
                    Object.keys(this.state.restorder).map(i => 
                        console.log(this.state.restorder[i])
                    )
                }else{
                }
            })
            .catch(err => {
                
        })
        axios.post(`${connURL}/getRestOrderDetails`,data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTION - GETTING REST ORDER DETAILS!")
                    console.log(response.data);
                    this.setState({
                        restorderdetails: response.data
                    })
                    Object.keys(this.state.restorderdetails).map(i =>
                        console.log(this.state.restorderdetails[i])
                    )
                }else{

                }
            })
            .catch(err =>{

            })
    }

    changeStatusHandler = (event, {values}) =>{
        var a = document.getElementById("dropdown")
        console.log(a)
        console.log("DATA IS", event.target.textContent)
        this.setState({
            status: event.target.textContent
        })
        
    }

    submitChangeStatus = (orderid) => {
        // console.log(orderid)
        const data = {
            userid :  window.sessionStorage.getItem("UserID"),
            orderid : orderid,
            status : this.state.status
        }
        console.log(data)
        axios.post(`${connURL}/updateOrderStatus`,data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if(response.status === 200){
                    console.log("Order Status Updated!")
                    
                }else{

                }
            })
            .catch(err =>{

            })
    }

    submitDelivered = () =>{
        const data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getRestDelivered`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    console.log("DELIVERED ORDERS ARE:",response.data)
                    console.log("DATA ARRAY 0:",response.data[0])
                    console.log("DATA ARRAY 1:",response.data[1])

                    this.setState({
                        restorderdetails: response.data[0],
                        restorder: response.data[1]
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
        axios.post(`${connURL}/getRestReceived`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        restorderdetails: response.data[0],
                        restorder: response.data[1]
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
        axios.post(`${connURL}/getRestPreparing`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        restorderdetails: response.data[0],
                        restorder: response.data[1]
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
        axios.post(`${connURL}/getRestOutDelivery`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        restorderdetails: response.data[0],
                        restorder: response.data[1]
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
        axios.post(`${connURL}/getRestCancelled`,data)
            .then(response => {
                console.log("Status Code :", response.status);
                if( response.status === 200){
                    this.setState({
                        restorderdetails: response.data[0],
                        restorder: response.data[1]
                    })
                }
                else{
                }
            })
            .catch( err => {

            })
    }

    getUserDetails = (userid) => {
        this.setState({
            visible : true
        })
        console.log(userid)
        const data = {
            userid: userid
        }
        axios.post(`${connURL}/getUserData`,data)
            .then(response => {
                console.log(response.data);
                if( response.status === 200){
                    this.setState({
                        userdetails: response.data
                    })
                    console.log("STATE USER DETAILS:", this.state.userdetails)
                }
                else{

                }
            })
            .catch( err => {

            })
    }

    render() {

        let temp=null;
        const options = [
            { key: 1, text: 'Order Received', value: 1 },
            { key: 2, text: 'Preparing', value: 2 },
            { key: 3, text: 'Out for Delivery', value: 3 },
            { key: 4, text: 'Delivered', value: 4},
            { key: 5, text: 'Cancelled', value: 5}
        ]

        temp=this.state.restorderdetails.map(i => {
            return (<div style ={{borderStyle:"solid", borderWidth:1 , width: 300, marginTop: 20, padding:10, borderRadius: 5, borderColor: "#cfcfcf"}}>
                        <p style={{fontWeight:"bold"}}>Order #{i.orderid}</p>
                        <p style={{fontWeight:"bold", color:"#d32322"}} class="cust-link" onClick={ () => this.getUserDetails(i.userid)}>User #{i.userid}</p>
                        {Object.keys(this.state.userdetails).map(j =>
                            <Modal
                            title={this.state.userdetails.firstname}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            >
                            <p>{this.state.userdetails.email}</p>
                            <p>{this.state.userdetails.address}</p>
                            <p>{this.state.userdetails.city}</p>
                        </Modal>
                        )}
                        <Dropdown onChange={this.changeStatusHandler} id = 'dropdown' name = {i.orderid} placeholder={i.status} options={options} fluid selection />
                        <Button style={{marginTop:10, backgroundColor:"#d32323", color:"white", width:280}}onClick={ () => this.submitChangeStatus(i.orderid) }>Update Status</Button>
                        {                            
                            // eslint-disable-next-line array-callback-return
                            this.state.restorder.map(j => {
                                if(j.orderid === i.orderid.toString()){
                                    return(
                                        <h4>{j.dishid}</h4>
                                    )
                                }
                            })
                        }
                    </div>)
        })
        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class="column-left-update">
                        <div style={{marginLeft:200, marginTop: 20}}>
                            <h3 style={{fontWeight:"bold"}}>Filter Your Orders</h3>
                            <Checkbox
                                onClick={this.submitReceived}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> New Orders <br></br>
                            <Checkbox
                                onClick={this.submitOutDelivery}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Past Orders <br></br>
                            <Checkbox
                                onClick={this.submitCancelled}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Cancelled <br></br>
                        </div>
                    </div>
                    <div class="column-right-update">
                        {temp}
                    </div>
                </div>
            </div>
        )
    }
}

export default RestOrders;

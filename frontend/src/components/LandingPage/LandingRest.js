import React, { Component } from 'react'
import HeaderBar from '../HeaderBar/HeaderBar'
import ViewRest from '../Views/ViewRest'
import axios from 'axios'
import Maps from '../Maps/Maps'
import { connURL } from '../../Configure'


class LandingRest extends Component {
    constructor(props){
        super(props);
        this.state = {
            restraurants : [],
            temp : React.createRef()
        }
        
    }
    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getReviews`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log(response);
                }else{
                }
            })
            .catch(err => {
                
            })
        axios.post(`${connURL}/getRestData`, data)
            .then(response => {
                console.log("Status Code for REST DATA:", response.status);
                if(response.status === 200){
                    console.log(response.data)
                }
                else{
                    console.log("NO REST DATA!")
                }
            })
    }

    submitGetDelivery = (e) => {
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/getDelivRest`)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        restraurants : response.data
                    })
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
    }

    submitGetPickup = (e) => {
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/getPickup`)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        restraurants : response.data
                    })
                }
                else{

                }
            })
            .catch(err => {

            })
    }

    submitGetDineIn = (e) => {
        axios.defaults.withCredentials =true;
        axios.post(`${connURL}/getDineIn`)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        restraurants : response.data
                    })
                }
                else{

                }
            })
            .catch(err => {

            })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div>
                    <HeaderBar></HeaderBar>
                </div>
                <div>
                    <div class="cust-column-left-3" style={{marginLeft: 0}}>
                        <div style={{marginLeft: 125, marginTop:20, color: "#d32323"}}>
                        <h3> Filter Restaurant</h3>
                        <input style={{marginTop:10}} onClick={this.submitGetDelivery} type="checkbox"/>
                        <label style={{fontWeight: "bold", fontSize:16}}>Yelp Delivery</label><br></br>
                        <input style={{marginTop:20}} onClick={this.submitGetPickup} type="checkbox"/>
                        <label style={{fontWeight: "bold", fontSize:16}}>Curbside Pick-Up</label><br></br>
                        <input style={{marginTop:20}} onClick={this.submitGetDineIn} type="checkbox"/>
                        <label style={{fontWeight: "bold", fontSize:16}}>Dine-In</label><br></br>
                        </div>
                    </div>
                    <div class="cust-column-middle-3">
                        <div style={{marginLeft:30}}>
                            <ViewRest restraurants = {this.state.restraurants}/>
                        </div>
                    </div>
                    <div class="cust-column-right-3"style={{}}>
                        <Maps/>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default LandingRest;
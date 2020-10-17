import React, { Component } from 'react'
import axios from 'axios'
import {Card} from 'antd'
import HeaderBar from '../HeaderBar/HeaderBar'
import { connURL } from '../../Configure';

class RestReviews extends Component {

    constructor(){
        super();
        this.state = {  
            reviews: []
        }
    }

    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID"),
        }
        axios.post(`${connURL}/getReview`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        reviews : response.data
                    })
                    console.log(this.state.reviews)
                    
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
            
    }

    getUserDetails = (userid) => {
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
        
        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class = "column-left-update">
                        <div style={{color:"#d32323", marginLeft: 190, marginTop: 20}}>
                            <h3>Reviews are : </h3>
                        </div>
                        
                    </div>
                    <div class = "column-right-update">
                        {Object.keys(this.state.reviews).map(i => 
                            <div>
                                <Card title="Review!" bordered={true} style={{ width: 300, borderStyle:"solid", borderWidth:1, marginTop:10, borderColor:"#cfcfcf", borderRadius: 5, padding: 10, fontWeight: "bold"}}>
                                    <p style={{marginTop:10, color: "#d32323"}}>Rating : {this.state.reviews[i].reviewno}</p>
                                    <p>Review : {this.state.reviews[i].reviewdesc}</p>
                                    <p style = {{color: "#d32323"}}class = "cust-link" onClick={ () => this.getUserDetails(this.state.reviews[i].userid) }>User ID : {this.state.reviews[i].userid}</p>
                                </Card>
                            </div>
                            
                        )}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default RestReviews
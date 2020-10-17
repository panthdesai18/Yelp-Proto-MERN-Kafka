import React, { Component } from 'react'
import HeaderBar from '../HeaderBar/HeaderBar'
import { Rating } from '@material-ui/lab';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ViewDish from '../ViewDish';
import axios from 'axios';
import { connURL } from '../../Configure';

class CustRest extends Component {

    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getUserData`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log(response.data)
                    console.log("firstname", response.data.firstname)
                    this.setState({
                        firstname : response.data.firstname,   
                        lastname : response.data.lastname,
                        imageSrc : `${connURL}/profimages/`+response.data.profimage           
                    },() => {
                        console.log(this.state.imageSrc)
                    } );
                }else{
                }
            })
            .catch(err => {
                
            })
        axios.post(`${connURL}/getRestData`, data)
            .then(response => {
                console.log("Status Code:", response.status);
                if(response.status === 200){
                    console.log(response.data)
                }
            })
    }

    
    render() {
        return (
            <div>
                <div>
                    {/* <HeaderBar/> */}
                </div>
                <div>
                    <div class="row-rest">
                        <div class="column-rest">
                            <img src="https://s3-media0.fl.yelpcdn.com/bphoto/OYWghGi0PrbxBHf5O1Hsjw/l.jpg" style={{width:"100%",height:240}} alt=""></img>
                        </div>
                        <div class="column-rest">
                            <img src="https://s3-media0.fl.yelpcdn.com/bphoto/-A0ReLV_gR5c6DV1Z4y0hg/l.jpg" style={{width:"100%",height:240}} alt=""></img>

                        </div>
                        <div class="column-rest"> 
                            <img src="https://s3-media0.fl.yelpcdn.com/bphoto/QUQTgVuAFhTdkZFJD8xDAw/l.jpg" style={{width:"100%",height:240}} alt=""></img>

                        </div>
                        <div class="column-rest">
                            <img src="https://s3-media0.fl.yelpcdn.com/bphoto/O9lumTIdZL3D064aMR9GBQ/l.jpg" style={{width:"100%",height:240}} alt=""></img>

                        </div>
                    </div>
                </div>
                <div style={{borderBottomStyle:"solid",borderWidth:1,borderBottomColor:"#c7c7c7"}}>
                    <h1>Restaurant Name!</h1>
                    <Rating name="size-large" defaultValue={2} size="large"/><br></br>
                    <Button style={{backgroundColor:"#F43939", color:"white"}}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon>Write A Review</Button>
                    {/* <ViewDish></ViewDish> */}
                </div>
            </div>
        )
    }
}

export default CustRest;

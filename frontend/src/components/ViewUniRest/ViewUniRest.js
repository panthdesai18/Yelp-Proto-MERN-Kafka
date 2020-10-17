import React, { Component } from 'react'
import axios from 'axios'
import HeaderBar from '../HeaderBar/HeaderBar'
import { Rating } from '@material-ui/lab';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faDirections, faMailBulk, faPhone, faStar, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { connURL } from '../../Configure';


class ViewUniRest extends Component {

    constructor(){
        super();
        this.state = {  
            rest: [],
            nodishes: true.restid,
            dishes: []
        }
    }
    
    reviewnumber = (e) => {
        this.setState({
            reviewnumber : e.target.value
        })
    }

    reviewdesc = (e) => {
        this.setState({
            reviewdesc :e.target.value
        })
    }

    submitReviewAdd = (e) => {
        e.preventDefault();
        console.log("USERNAME IS:"+this.state.firstname)
        const data1 = {
            restid: this.props.match.params.restid,
            reviewnumber: this.state.reviewnumber,
            reviewdesc: this.state.reviewdesc, 
            userid:window.sessionStorage.getItem("UserID"),
            username: this.state.firstname
        }
        console.log(data1)
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/postReview`,data1)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
    }

    submitAddToCart = (dishid) => {
        const data = {
            restid: this.props.match.params.restid,
            userid:window.sessionStorage.getItem("UserID"),
            dishid: dishid,
            restname: this.state.rest.restname 
        }
        console.log(data)
        axios.defaults.withCredentials = true;
        axios.post(`${connURL}/addToCart`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
    }


    componentDidMount(){
        console.log("In UNIQ REST" +this.props.match.params.restid)    
        var data = {
            userid : this.props.match.params.restid
        }
        console.log(data)
        axios.post(`${connURL}/getRestData`,data)
            .then(response => {
                console.log("Status Code in View Dish : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST DATA!")
                    console.log(response.data);
                    this.setState(
                    {
                        rest : response.data,
                        nodishes: false
                    })
                    console.log("REST IS"+this.state.rest);
                    Object.keys(this.state.rest).map(i => 
                        console.log(this.state.rest[i])
                    )
                }else{
                }
            })
            .catch(err => {
                
        })
        axios.post(`${connURL}/getDishes`,data)
            .then(response =>{
                console.log("Status Code in Get Dishes:", response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTION -GETTING DISHES")
                    console.log(response.data);
                    this.setState({
                        dishes: response.data
                    })
                    console.log("DISHES IN THIS REST ARE"+ this.state.dishes);
                    Object.keys(this.state.dishes).map(i=>
                        console.log(this.state.dishes[i]))
                }
            })
    }



    render() {
        return (
            <div>
                <HeaderBar></HeaderBar>
                <div style={{height: 160}}>
                    <div class = "row">
                        <div class = "column-one-rest">
                            <img style={{height:140,width:340}}src = {`${connURL}/profimages/` + this.state.rest.restphoto} alt="Rest Photo1"/>
                        </div>
                        <div class = "column-two-rest">
                            <img style={{height:140,width:340}}src = {`${connURL}/profimages/` + this.state.rest.restphoto2} alt="Rest Photo1"/>
                        </div>
                        <div class = "column-three-rest">
                            <img style={{height:140,width:340}}src = {`${connURL}/profimages/` + this.state.rest.restphoto3} alt="Rest Photo1"/>
                        </div>
                        <div class = "column-four-rest">
                            <img style={{height:140,width:340}}src = {`${connURL}/profimages/` + this.state.rest.restphoto4} alt="Rest Photo1"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="column-left-rest" style={{}}>
                        <div class ="column-left-rest">
                            <h1>{this.state.rest.restname}</h1>
                            <Rating name="size-large" defaultValue={2} size="large"/> 46 Reviews
                            <br></br>
                            <h3 style={{color: "green"}}>Open</h3>
                            <h4 style={{color: "#8f8f8f"}}>Timings : 11:00 AM - 7 PM</h4>
                            
                        </div>
                        <div class= "column-right rest">
                        <h3> Enter Your Review</h3>
                            <input type="number" style={{height:30,width:200, borderRadius:5}} placeholder="Rating (Out of 5)" onChange = {this.reviewnumber}></input><br></br>
                            <input type="text" style={{height:30,width:200, borderRadius:5, marginTop:7}} placeholder="Description" onChange = {this.reviewdesc}></input><br></br>
                            <Button onClick={this.submitReviewAdd} style={{backgroundColor:"#F43939", color:"white", marginTop:9, width:200}}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon> &nbsp; Write A Review</Button>
                        </div>
                        <div style={{marginLeft:190}}>
                            <div style= {{marginTop: 50}}>
                                {
                                    Object.keys(this.state.dishes).map(i => 
                                        <Card style={{width:350,borderStyle:"solid",borderWidth:1, marginTop: 10, borderRadius: 3, padding: 5, borderColor: "#cfcfcf"}}>
                                        <CardImg top width="100%" height="250px"src = {`${connURL}/profimages/` + this.state.dishes[i].dishphoto} alt="Dish Image" />
                                        <CardBody>
                                        <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.state.dishes[i].dishname}</CardTitle>
                                        <CardSubtitle style={{fontSize:16,marginTop:10}}>{this.state.dishes[i].category}</CardSubtitle>
                                        <CardText style={{marginTop:10}}>{this.state.dishes[i].description}</CardText>
                                        <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>$ {this.state.dishes[i].price}</CardText>
                                        <Button style={{width:338, backgroundColor:"#d32323", color: "white", fontWeight: "bold"}}onClick = { () =>this.submitAddToCart(this.state.dishes[i].dishid)}>Add to Cart</Button>
                                        </CardBody>
                                        </Card>
                                    )
                                }
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="column-right-rest">
                        {/* <div style={{marginLeft: 100}}>
                        <div style={{height:141, width:380, padding: 30, borderStyle:"solid", borderRadius:3, borderWidth:1, borderColor:"#cfcfcf"}}>
                            <h3 style = {{marginLeft: 50}}>Mention Yelp for Specials</h3>
                            <Button style={{backgroundColor:"#d32323", color: "white", width:210, marginLeft: 50}}>Buy Now</Button>
                        </div>
                            <div>
                                <ul style={{listStyleType:"none"}}>
                                    <li>
                                        <div style={{height:42}}>
                                            <span><FontAwesomeIcon icon={faMailBulk}/></span>
                                            <span style ={{marginLeft:10}}>{this.state.rest.email}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div style={{height:42}}>
                                            <span><FontAwesomeIcon icon={faPhone}/></span>
                                            <span style ={{marginLeft:10}}>{this.state.rest.phno}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div style={{height:42}}>
                                            <span><FontAwesomeIcon icon={faDirections}/></span>
                                            <span style ={{marginLeft:10}}>Get Directions</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div style={{height:42}}>
                                            <span><FontAwesomeIcon icon={faUtensilSpoon}/></span>
                                            <span style ={{marginLeft:10}}>Full Menu</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div style={{height:42}}>
                                            <span><FontAwesomeIcon icon={faComment}/></span>
                                            <span style ={{marginLeft:10}} class="cust-link" onClick={this.submitOrders}>Message the Business</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div> 
                        
            </div>
        )
    }
}
export default  ViewUniRest;
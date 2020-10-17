import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import HeaderBar from '../HeaderBar/HeaderBar'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { connURL } from '../../Configure';

class ViewSearchRest extends Component {

    constructor(props){
        super(props)
        this.state ={
            locRest : [],
            dishRest : []

        }
    }

    componentDidMount(){
        console.log(this.props.match.params.searchLoc)
        const data = {
                searchLocation: this.props.match.params.searchLoc,
                userid:window.sessionStorage.getItem("UserID")
            }
            axios.defaults.withCredentials = true;
            axios.post(`${connURL}/searchLocation`,data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        console.log(response.data)
                        this.setState({
                            locRest : response.data
                        })
                    }else{
                    }
                })
                .catch(err => {
                    //document.getElementById("invalidLog").style.display='block';
                })
                axios.post(`${connURL}/searchDish`,data)
                    .then(response => {
                        console.log("Status Code : ",response.status);
                        if(response.status === 200){
                            console.log(response.data)
                            this.setState({
                                dishRest: response.data
                            })
                            console.log(this.state.dishRest)
                        }else{
                        }
                    })
                    .catch(err => {
                        // document.getElementById("invalidLog").style.display='block';
                    })
    }

    render() {
        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class = "column-left-update">
                        <div style={{marginLeft:100, color: "#d32323",marginTop: 40}}>
                            <h2>Searched <br></br>Restaurant <br></br>Result!</h2>
                        </div>
                    </div>
                    <div class = "column-right-update">
                        {Object.keys(this.state.locRest).map(i => 
                            <div>
                                <Card style={{width:375,borderStyle:"solid",borderWidth:1, padding: 5, borderColor:"#cfcfcf", borderRadius: 5}}>
                                    <CardImg top width="363" src={`${connURL}/profimages/` + this.state.locRest[i].restphoto} alt="Dish Image" />
                                    <CardBody>
                                    <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.state.locRest[i].restname}</CardTitle>
                                    <CardSubtitle style={{fontSize:16,marginTop:10}}>{this.state.locRest[i].email}</CardSubtitle>
                                    <CardText style={{marginTop:10}}>{this.state.locRest[i].description}</CardText>
                                    <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{this.state.locRest[i].zipcode}</CardText>
                                    <Link className='button' to={`/viewUniRest/${this.state.locRest[i].userid}`}>Visit</Link>
                                    </CardBody>
                                </Card>
                                <br></br>
                            </div>
                        )}
                        {Object.keys(this.state.dishRest).map(i => 
                            <div>
                                <Card style={{width:375,borderStyle:"solid",borderWidth:1, padding: 5, borderColor:"#cfcfcf", borderRadius: 5}}>
                                    <CardImg top width="50%" src={`${connURL}/profimages/` + this.state.dishRest[i].restphoto} alt="Dish Image" />
                                    <CardBody>
                                    <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.state.dishRest[i].restname}</CardTitle>
                                    <CardSubtitle style={{fontSize:16,marginTop:10}}>{this.state.dishRest[i].email}</CardSubtitle>
                                    <CardText style={{marginTop:10}}>{this.state.dishRest[i].description}</CardText>
                                    <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{this.state.dishRest[i].zipcode}</CardText>
                                    <Link className='button' to={`/viewUniRest/${this.state.dishRest[i].userid}`}>Visit</Link>
                                    </CardBody>
                                </Card>
                            <br></br>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSearchRest

import React, { Component } from 'react'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connURL } from '../../Configure';

class ViewRest extends Component {

    constructor(props){
        super(props);
        this.state = { 
            rest: []
        }
        console.log(props)
    }
    
    componentWillReceiveProps(){
        
        setTimeout(() => {
            console.log("PROPS are ", this.props.restraurants)
            this.setState({
                rest : this.props.restraurants
            })
        }, 0)
    }
    
    componentDidMount(){
        var data = {
            dishid :  window.sessionStorage.getItem("UserID")
        }
        axios.post(`${connURL}/getallRest`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING DISH DATA!")
                    console.log(response.data);
                    console.log("firstname", response.data.dishname)
                    this.setState(
                    {
                        rest : response.data
                    })
                    console.log("ASDAWDAWDSADAWDADAWDAWDA"+this.state.rest)
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    submitViewRestaurant = (restid) => {
        console.log(restid)
    };

    render() {
        return (
            Object.keys(this.state.rest).map(i => 
                <div style={{marginLeft:70}}>
                <Card style={{width:375,borderStyle:"solid",borderWidth:1, padding: 5, borderColor:"#cfcfcf", borderRadius: 5}}>
                    <CardImg top width="363" src = {`${connURL}/profimages/` + this.state.rest[i].restphoto} alt="Dish Image" />
                    <CardBody>
                    <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.state.rest[i].restname}</CardTitle>
                    <CardSubtitle style={{fontSize:16,marginTop:10}}>{this.state.rest[i].email}</CardSubtitle>
                    <CardText style={{marginTop:10}}>{this.state.rest[i].description}</CardText>
                    <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{this.state.rest[i].zipcode}</CardText>
                    <Link style={{fontWeight: "bold", fontSize: 17}} className='button' to={`/viewUniRest/${this.state.rest[i].userid}`}>Visit</Link>
                    </CardBody>
                </Card>
                <br></br>
            </div>
            )
            
            
        )
    }
}

export default ViewRest;

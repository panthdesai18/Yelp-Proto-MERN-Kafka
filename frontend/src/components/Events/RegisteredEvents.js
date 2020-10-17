import axios from 'axios'
import React, { Component } from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { connURL } from '../../Configure';
import HeaderBar from '../HeaderBar/HeaderBar'

class RegisteredEvents extends Component {

    constructor(){
        super();
        this.state = { 
            events: []
        }
    }

    componentDidMount(){
        const data ={
            userid:window.sessionStorage.getItem("UserID")
        }
        console.log(data)
        setTimeout( () => {
            axios.post(`${connURL}/getRegisteredEvents`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log(response.data)
                    this.setState({
                        events: response.data
                    })
                }else{
                }
            })
            .catch(err => {
            })
        },0 )
        
    }

    render() {
        return (
            <div>
                <HeaderBar/>
                <h3>You have Registered to the following Events!</h3>
                {
                    Object.keys(this.state.events).map(i => 
                        <Card style={{width:250,borderStyle:"solid",borderWidth:1,padding: 15, borderRadius: 4, borderColor: "#CFCFCF", marginTop:10}}>
                        <CardBody>
                        <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.state.events[i].eventname}</CardTitle>
                        <CardSubtitle style={{fontSize:16,marginTop:10}}>#{this.state.events[i].eventhash}</CardSubtitle>
                        <CardText style={{marginTop:10}}>{this.state.events[i].eventdesc}</CardText>
                        <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{this.state.events[i].eventlocation}</CardText>
                        <CardText style={{marginTop:10}}>{this.state.events[i].eventdate.substring(0,10)}</CardText>
                        </CardBody>
                    </Card>
                        // <Card style={{width:250,borderStyle:"solid",borderWidth:1, marginTop:10}}>
                        //         <CardBody>
                        //         <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>Name: {this.state.events[i].eventname}</CardTitle>
                        //         <CardSubtitle style={{fontSize:16,marginTop:10, fontWeight:"bold"}}>#{this.state.events[i].eventhash}</CardSubtitle>
                        //         <CardText style={{marginTop:10, fontWeight:"bold"}}>Description: {this.state.events[i].eventdesc}</CardText>
                        //         <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{this.state.events[i].eventlocation}</CardText>
                        //         <CardText style={{marginTop:10}}>{this.state.events[i].eventdate}</CardText>
                        //         </CardBody>
                        // </Card>
                    )
                }
            </div>
        )
    }
}

export default RegisteredEvents
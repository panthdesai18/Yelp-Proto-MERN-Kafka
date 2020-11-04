import React, { Component } from 'react'
import HeaderBar from '../HeaderBar/HeaderBar'
import { Input } from 'semantic-ui-react';
import { Button } from 'reactstrap';
import { getAllUsers } from '../../js/actions'
import { connect } from 'react-redux'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

class UserTab extends Component {

    componentDidMount(){
        const data = {
            userid:window.sessionStorage.getItem("UserID")
        }
        this.props.getAllUsers(data);
    }

    render() {

        let temp = null;
        if(this.props.users !== undefined){
            temp = this.props.users.map( i => {
                return(
                    <Card style={{width:250,borderStyle:"solid",borderWidth:1,padding: 15, borderRadius: 4, borderColor: "#CFCFCF", marginTop:10, fontWeight: "bold"}}>
                        <CardBody>
                            <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{i.firstname} {i.lastname}</CardTitle>
                            <CardSubtitle style={{fontSize:16,marginTop:10}}>Email: {i.email}</CardSubtitle>
                            <CardText style={{marginTop:10}}>Nickname: {i.nickname}</CardText>
                            <CardText style={{marginTop:10}}>I live in {i.city}, {i.country}</CardText>
                            <CardText style={{marginTop:10}}>I love: {i.ilove}</CardText>
                        </CardBody>
                    </Card>
                )
            })
        }

        return (
            <div>
                <HeaderBar/>
                <div>
                    <div className="column-left-update">
                        <h3 style={{color : "#d32323", marginLeft:45}}> Search Users </h3>
                        <Input onChange="" icon="" placeholder='User Name' style={{width:200, marginTop:10}}/>
                        <span><button onClick={this.submitEventSearch} style ={{marginLeft:-18}} class="ui icon button"><i class="search icon"></i></button></span>
                        <br></br>
                        <Button style={{marginTop:60, backgroundColor:"#d32323", color: "white", borderRadius:3, borderWidth:0.2, height:30, width:230, fontWeight: "bold"}} onClick={this.submitRegisteredEvents}>Following Users</Button>
                    </div>
                    <div className="column-right-update">
                        <h3 style={{color : "#d32323", marginLeft:45}}> List of All Users: </h3>
                        {temp}
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        getAllUsers: user => dispatch(getAllUsers(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        users: store.users
    };
}

const GetAllUsers = connect(mapStateToProps, mapDispatchToProps)(UserTab);
export default GetAllUsers;
import React, { Component } from 'react'
import axios from 'axios'
import {Card} from 'antd'
import { Modal } from 'antd';
import HeaderBar from '../HeaderBar/HeaderBar'
import {Link} from 'react-router-dom'
import { connURL } from '../../Configure';

class CreatedEvents extends Component {

    constructor(props){
        super(props)
        this.state = {  
            events: [],
            visible : false,
            user:[]
        }
    }

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

    componentDidMount(){
        var data = {
            userid :  window.sessionStorage.getItem("UserID"),
        }
        axios.post(`${connURL}/getCreatedEvents`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        events : response.data
                    })
                    console.log(this.state.events)
                    
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
    }

    getUserDetails = (eventid) => {
        this.setState({
            visible : true
        })
        console.log(eventid)
        const data = {
            eventid : eventid
        }
        axios.post(`${connURL}/getEventDetails`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log(response.data)
                if(response.status === 200){
                    this.setState({
                        user: response.data
                    })
                    console.log("USER IS ",this.state.user[0].email)
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })

    }



    render() {

        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class = "column-left-update">
                        <div style={{marginLeft:190, marginTop:20, color:"#d32323"}}>
                            <h3> Created Events are:</h3>
                        </div>
                    </div>
                    <div class = "column-right-update">
                    <div>
                        {Object.keys(this.state.events).map(i => 
                            <div>
                                <Card title = "Created Event" bordered={true} style={{ width: 300, borderStyle:"solid", borderWidth:1, marginTop:10, borderColor: "#cfcfcf", padding: 10, borderRadius: 5, fontWeight: "bold"}}>
                                    <p style={{marginTop: 10}}>Name : {this.state.events[i].eventname}</p>
                                    <p>Description : {this.state.events[i].eventdesc}</p>
                                    <p>Location : {this.state.events[i].eventlocation}</p>
                                    <p style ={{color:"#d32323"}}class = "cust-link" onClick={ () => {this.getUserDetails(this.state.events[i].eventid)} }>Show Registered Users</p>
                                    {Object.keys(this.state.user).map(j =>
                                        <Modal
                                        title={this.state.user[j].firstname}
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        onClick={() => this.showProfile(this.state.user[j].userid)}
                                        >
                                        <p>{this.state.user[j].email}</p>
                                        <p>{this.state.user[j].address}</p>
                                        <p>{this.state.user[j].city}</p>
                                        <Link style={{fontWeight: "bold", fontSize: 14}} className='button' to={`/userProfile/${this.state.user[j].userid}`}>Visit</Link>
                                    </Modal>
                                    )}
                                </Card>
                            </div>
                            
                        )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CreatedEvents;
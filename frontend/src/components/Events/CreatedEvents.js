import React, { Component } from 'react'
import {Card} from 'antd'
import { Modal } from 'antd';
import HeaderBar from '../HeaderBar/HeaderBar'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { createdEvents, getRegisteredUsers } from '../../js/actions';

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
        this.props.createdEvents(data)
    }

    getUserDetails = (eventid) => {
        this.setState({
            visible : true
        })
        console.log(eventid)
        const data = {
            eventid : eventid
        }
        this.props.getRegisteredUsers(data)
        // axios.post(`${connURL}/getEventDetails`,data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         console.log(response.data)
        //         if(response.status === 200){
        //             this.setState({
        //                 user: response.data
        //             })
        //         }else{
        //         }
        //     })
        //     .catch(err => {
        //         //document.getElementById("invalidLog").style.display='block';
        //     })

    }



    render() {

        let temp = null;
        let temp2 = null; 
        if(this.props.user !== undefined){
            temp2 = this.props.user.map( j => {
                return(
                    <Modal
                        title={j.firstname}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        onClick={() => this.showProfile(j.userid)}
                    >
                        <p>{j.email}</p>
                        <p>{j.address}</p>
                        <p>{j.city}</p>
                        <Link style={{fontWeight: "bold", fontSize: 14}} className='button' to={`/userProfile/${j.userid}`}>Visit</Link>
                    </Modal>
                )
            })
        }
        if( this.props.events !== undefined){
            temp = this.props.events.map( i => {
                return(
                    <div>
                        <Card title = "Created Event" bordered={true} style={{ width: 300, borderStyle:"solid", borderWidth:1, marginTop:10, borderColor: "#cfcfcf", padding: 10, borderRadius: 5, fontWeight: "bold"}}>
                            <p style={{marginTop: 10}}>Name : {i.eventname}</p>
                            <p>Description : {i.eventdesc}</p>
                            <p>Location : {i.eventlocation}</p>
                            <p style ={{color:"#d32323"}}class = "cust-link" onClick={ () => {this.getUserDetails(i.eventid)} }>Show Registered Users</p>
                            {temp2}
                        </Card>
                    </div>
                )
            })
        }

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
                        {temp}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        createdEvents: user => dispatch(createdEvents(user)),
        getRegisteredUsers: user => dispatch(getRegisteredUsers(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        events: store.events,
        user: store.users
    };
}

const RestCreatedEvents = connect(mapStateToProps, mapDispatchToProps)(CreatedEvents);
export default RestCreatedEvents;
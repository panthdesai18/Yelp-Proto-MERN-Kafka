import React, { Component } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios'
import EventRegister from './EventRegister';
import HeaderBar from '../HeaderBar/HeaderBar'
import { Input } from 'semantic-ui-react';
import { connURL } from '../../Configure';
import {connect} from 'react-redux'
import { restEvents } from '../../js/actions';

class ViewRestEvents extends Component {

    constructor(){
        super();
        this.state = {  
            events: [],
            noevents: true,
            searchEvent: ""
        }    
    }

    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                events : this.props.events,
                noevents : false
            })
        }, 1)
        
    }
    componentDidMount(){
        const data = {
            userid:window.sessionStorage.getItem("UserID")
        }
        this.props.restEvents(data);
    }

    submitRegisteredEvents(){
        window.location.replace('/registeredEvents')
    }

    searchEventHandler = (e) => {
        this.setState({
            searchEvent :e.target.value
        })
    }

    submitEventSearch = () => {
        const data ={
            searchEvent: this.state.searchEvent
        }
        axios.post(`${connURL}/searchEvent`,data)
                    .then(response => {
                        console.log("Status Code : ",response.status);
                        if(response.status === 200){
                            console.log(response.data)
                            this.setState({
                                events: response.data
                            })
                            console.log(this.state.events)
                        }else{
                        }
                    })
                    .catch(err => {
                        // document.getElementById("invalidLog").style.display='block';
                    })
    }


    

    render() {
        console.log(this.state)

        if( this.state.noevents === true){
            return(<div>
                <p></p>
            </div>
            )
        }
        
        else {
            return(
                <div>
                    <HeaderBar/>
                    <div class="row">
                        <div class="column-left-update">
                            <div style={{marginLeft:60}}>
                                <h3 style={{color : "#d32323", marginLeft:45}}> Search Events</h3>
                                <Input onChange={this.searchEventHandler} icon="" placeholder='Event Name' style={{width:200}}/>
                                <span><button onClick={this.submitEventSearch} style ={{marginLeft:-18}} class="ui icon button"><i class="search icon"></i></button></span>
                                <br></br>
                                <Button style={{marginTop:60, backgroundColor:"#d32323", color: "white", borderRadius:3, borderWidth:0.2, height:30, width:230, fontWeight: "bold"}} onClick={this.submitRegisteredEvents}>Registered Events</Button>
                            </div>
                        </div>
                        <div class="column-right-update">
                            {this.state.events.map(i => {
                                console.log("event is ", i)
                                return(
                                    <EventRegister event = {i} />
                                )
                            })}
                        </div>
                    </div>
                    
                    <br></br>
                    
                </div>
            )
        }
    }
}

function mapDispatchToProps(dispatch){
    return{
        restEvents: user => dispatch(restEvents(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        events: store.events
    };
}

const RestaurantEvents = connect(mapStateToProps, mapDispatchToProps)(ViewRestEvents);
export default RestaurantEvents;

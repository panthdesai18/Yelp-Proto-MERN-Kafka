import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { connURL } from '../../Configure';

const mapStyles = {
    width: '25%',
    height: '100%'
};


class Maps extends Component {

    constructor(){
        super();
        this.state = {  
            coords: [],
        }
    }

    componentDidMount(){
        axios.post(`${connURL}/getCoordinates`)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){ 
                console.log(response.data) 
                this.setState({
                    coords: response.data,
                })
                console.log("COORDINATES ARE : ", this.state.coords)           
            }
            else
            {
            }
        })
        .catch(err => {
        })
    }

    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={
                    {
                        lat: 37.334450,
                        lng: -121.907950
                    }
                    }
                >
                {Object.keys(this.state.coords).map(i => 
                        <Marker
                        title={this.state.coords[i].restname}
                        name={'SOMA'}
                        position={{lat: this.state.coords[i].lat, lng: this.state.coords[i].lng}}
                        icon={<FontAwesomeIcon icon={faMapPin}/>}
                        />
                )}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB5f3E2sHlB_ppiVsOTX1oVaSsI9WJktss'
})(Maps);
import React, { Component } from 'react'
import axios from 'axios'
import HeaderBar from '../HeaderBar/HeaderBar'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { connURL } from '../../Configure';
import {connect} from 'react-redux'
import { cart } from '../../js/actions';

class Cart extends Component {

    constructor(props){
        super(props)
        this.state={
            cart: [],
            restname: "",
            restid: ""
        }
    }

    submitPlaceOrder = (e) => {
        e.preventDefault();
        console.log(this.state.cart)
        const data = {
            cart : this.state.cart
        }
        axios.post(`${connURL}/placeOrder`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("Order Placed!")
                }else{
                }
            })
            .catch(err => {
                //document.getElementById("invalidLog").style.display='block';
            })
        window.location.reload(false);
        
    }

    componentDidMount(){
        
        this.props.cart()
        // axios.defaults.withCredentials = true;
        // axios.get(`${connURL}/getCart`,)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             console.log(response.data)
        //             this.setState ({
        //                 cart: response.data
        //             })
        //         }else{
        //         }
        //     })
        //     .catch(err => {
        //         //document.getElementById("invalidLog").style.display='block';
        //     })
    }

    render() {
        console.log("PROPS ARE:", this.props.cart1)
        const options = [
            { key: 1, text: 'Pick Up', value: 1 },
            { key: 2, text: 'Delivery', value: 2 }
        ]

        let temp = null;
        if(this.props.cart1 !== undefined){
            temp = this.props.cart1.map(i =>{
                return(
                    <div>
                        <Card style={{width:350,borderStyle:"solid",borderWidth:1, marginTop: 10, borderRadius: 3, padding: 5, borderColor: "#cfcfcf"}}>
                            <CardImg top width="100%" src = {`${connURL}/profimages/` + i.dishphoto} alt="Dish Image" />
                            <CardBody>
                                <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{i.restname}</CardTitle>
                                <CardSubtitle style={{fontSize:16,marginTop:10, color: "#d32323",fontWeight:"bold"}}>{i.dishName}</CardSubtitle>
                            </CardBody>
                        </Card>
                        <br></br>
                    </div>
                )
            })
        }

        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div class = "column-left-update">
                        <div style = {{marginLeft:190, marginTop:20, color: "#d32323"}}>
                            <h3>Confirm your Order</h3>
                        </div>
                    </div>
                    <div class = "column-right-update">
                        {temp}
                        <Dropdown style={{width:250}} onChange={this.changeStatusHandler} placeholder= "Delivery" id = 'dropdown' options={options} fluid selection />
                        <Button style={{backgroundColor:"#d32323", color: "white", fontWeight: "bold", width: 250, marginTop:20}} onClick={this.submitPlaceOrder}>Place Order!</Button>
                    </div>
                </div>
                </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        cart: user => dispatch(cart(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        cart1: store.cart
    };
}

const RestaurantEvents = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default RestaurantEvents;

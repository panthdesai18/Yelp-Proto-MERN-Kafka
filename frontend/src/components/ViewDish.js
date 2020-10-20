import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {connect} from 'react-redux';  
import { dishProfile } from '../js/actions';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { connURL } from '../Configure';


class ViewDish extends Component {

    constructor(){
        super();
        this.state = {  
            dishes: [],
            nodishes: true
        }
    }

    componentDidMount(){
        var data = {
            dishid :  window.sessionStorage.getItem("UserID")
        }
        this.props.dishProfile(data);
        axios.post(`${connURL}/getDishData`,data)
            .then(response => {
                console.log("Status Code in View Dish : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST DATA!")
                    console.log(response.data);
                    this.setState(
                    {
                        dishes : response.data,
                        nodishes: false
                    })
                    console.log("DISHES IN VIEW DISH ARE"+this.state.dishes);
                    Object.keys(this.state.dishes).map(i => 
                        console.log(this.state.dishes[i])
                    )
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    submitEditDish = (dishid) => {
        console.log(dishid)
        window.location.replace('/editDish')
        
    };
    

    render() {
        console.log("STATE IS:"+this.state)

        if(this.state.nodishes === true){
            return(
                <p></p>
            )
        }

        else{
            return (
                Object.keys(this.props.dishes).map(i => 
                    <div>
                    <Card style={{width:250,borderStyle:"solid",borderWidth:1, padding: 9, borderColor: "#cfcfcf", borderRadius: 4}}>
                        <CardImg top width="100%" height="250px" src = {`${connURL}/profimages/` + this.props.dishes[i].dishphoto} alt="Dish Image" />
                        <CardBody>
                        <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{this.props.dishes[i].dishname}</CardTitle>
                        <CardSubtitle style={{fontSize:16,marginTop:10}}>{this.props.dishes[i].category}</CardSubtitle>
                        <CardText style={{marginTop:10}}>{this.props.dishes[i].description}</CardText>
                        <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>$ &nbsp; {this.props.dishes[i].price}</CardText>
                        <Link style={{fontWeight: "bold", fontSize: 17}} className='button' to={`/editDish/${this.props.dishes[i].dishid}`}>Add Photo</Link>
                        </CardBody>
                    </Card>
                    <br></br>
                </div>
                )
            )
        }
    }
}

function mapDispatchToProps(dispatch){
    return{
        dishProfile: user => dispatch(dishProfile(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        dishes: store.dishes
    };
}

const DishProfile = connect(mapStateToProps, mapDispatchToProps)(ViewDish);
export default DishProfile;
import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connURL } from '../../Configure';
import { connect } from 'react-redux'
import { getRestaurants } from '../../js/actions';

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
        this.props.getRestaurants(data)
    }

    render() {
        let temp = null;
        if(this.props.restaurants !== undefined){
            temp = this.props.restaurants.map(i => {
                return(
                    <div style={{marginLeft:70}}>
                        <Card style={{width:375,borderStyle:"solid",borderWidth:1, padding: 5, borderColor:"#cfcfcf", borderRadius: 5}}>
                            <CardImg top width="363" src = {`${connURL}/profimages/` + i.restphoto} alt="Dish Image" />
                            <CardBody>
                            <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{i.restname}</CardTitle>
                            <CardSubtitle style={{fontSize:16,marginTop:10}}>{i.email}</CardSubtitle>
                            <CardText style={{marginTop:10}}>{i.description}</CardText>
                            <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>{i.zipcode}</CardText>
                            <Link style={{fontWeight: "bold", fontSize: 17}} className='button' to={`/viewUniRest/${i.userid}`}>Visit</Link>
                            </CardBody>
                        </Card>
                        <br></br>
                    </div>
                )
            })
        }
        return (
                <div>
                    {temp}
                </div>
            )
    }
}

function mapDispatchToProps(dispatch){
    return{
        getRestaurants: user => dispatch(getRestaurants(user))
    };
}

function mapStateToProps(store){
    console.log(store);
    return{
        message: store.info,
        restaurants: store.restaurants
    };
}

const ViewRestaurants = connect(mapStateToProps, mapDispatchToProps)(ViewRest);
export default ViewRestaurants;

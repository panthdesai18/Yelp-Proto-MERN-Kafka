import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {connect} from 'react-redux';  
import { dishProfile } from '../js/actions';
import {Link} from 'react-router-dom'
import { connURL } from '../Configure';


class ViewDish extends Component {

    constructor(){
        super();
        this.state = {  
            dishes: []
        }
    }

    componentDidMount(){
        var data = {
            dishid :  window.sessionStorage.getItem("UserID")
        }
        this.props.dishProfile(data);
    }

    submitEditDish = (dishid) => {
        console.log(dishid)
        window.location.replace('/editDish')
        
    };
    

    render() {
        let temp = null; 
        if(this.props.dishes !== undefined){
            temp = this.props.dishes.map(i => {
                return(
                    <div>
                        <Card style={{width:250,borderStyle:"solid",borderWidth:1, padding: 9, borderColor: "#cfcfcf", borderRadius: 4}}>
                            <CardImg top width="100%" height="250px" src = {`${connURL}/profimages/` + i.dishphoto} alt="Dish Image" />
                            <CardBody>
                            <CardTitle style={{color:"#D32323", fontWeight:"bold",fontSize:18}}>{i.dishname}</CardTitle>
                            <CardSubtitle style={{fontSize:16,marginTop:10}}>{i.category}</CardSubtitle>
                            <CardText style={{marginTop:10}}>{i.description}</CardText>
                            <CardText style={{color:"#D32323", fontWeight:"bold",fontSize:16}}>$ &nbsp; {i.price}</CardText>
                            <Link style={{fontWeight: "bold", fontSize: 17}} className='button' to={`/editDish/${i.dishid}`}>Add Photo</Link>
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
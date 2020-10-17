import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { connURL } from '../../Configure';

class EditDish extends Component {

    constructor(props){
        super(props);
        this.state = { 
            dishid: ""
        }
        console.log(props)
    }

    // componentDidMount(){
    //     this.setState({
    //         dishid: this.props.match.params.dishid
    //     })
    //     // axios.post('http://localhost:3001/updateDishPhoto',data)
    //     //     .then(response => {
    //     //         console.log("Status Code in View Dish : ",response.status);
    //     //         if(response.status === 200){
    //     //             console.log("HERE IN ACTIONS - GETTING REST DATA!")
    //     //             console.log(response.data);
    //     //             this.setState(
    //     //             {
    //     //                 dishes : response.data,
    //     //                 nodishes: false
    //     //             })
    //     //             console.log("DISHES IN VIEW DISH ARE"+this.state.dishes);
    //     //             Object.keys(this.state.dishes).map(i => 
    //     //                 console.log(this.state.dishes[i])
    //     //             )
    //     //         }else{
    //     //         }
    //     //     })
    //     //     .catch(err => {
                
    //     // })
    // }

    photoChange = (event) => {
        console.log(event.target.files[0].name);
        console.log(this.props.match.params.dishid)
        const formData = new FormData();
        formData.append('dishphoto', event.target.files[0], event.target.files[0].name);
        formData.append('dishid', this.props.match.params.dishid);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(`${connURL}/updateDishPhoto`,formData, config)
                .then(response => {
                    console.log("Image Updated!")  
                    window.location.replace('/restProfile')  
                })
                .catch(error => {
                    console.log("Error!")
                })
    }
    
    render() {
        return (
            <div>
                <div>
                    <div style={{marginLeft:205, width:936}}>
                    <span> Restaurant </span> &nbsp;&nbsp; <span><FontAwesomeIcon icon={faAngleRight}/></span> &nbsp;&nbsp; <span>Dish Photo</span>
                    <h3 style ={{color: "#D32323"}}>Add photo</h3>
                    
                    <div style={{borderStyle: "dashed",borderRadius:10}}>
                        <h2 style={{marginLeft:300,marginTop:60}}>Drag and Drop your photos here</h2>
                        <div><legend style = {{marginLeft:480}}>OR</legend><br></br></div>
                        <input type='file' onChange={this.photoChange} style={{color:"white", backgroundColor:"#D32323", width:125, height:36,marginLeft:430,marginBottom:60}}></input>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDish;
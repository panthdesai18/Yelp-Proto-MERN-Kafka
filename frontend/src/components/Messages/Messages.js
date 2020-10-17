import React, { Component } from 'react'
import HeaderBar from '../HeaderBar/HeaderBar'
import { Image } from 'semantic-ui-react'


class Messages extends Component {
    render() {
        return (
            <div>
                <HeaderBar/>
                <div class = "row">
                    <div>
                        <div class = "column-left-update">
                            <div style={{marginTop:20,marginLeft:20,fontWeight: "bold" }}>
                                <h2>Messages</h2>
                            </div>
                        </div>
                    </div>
                    <div class = "column-right-update">
                        <div style={{height:80, borderBottomStyle:"solid",borderWidth:0.5,borderColor:"#cfcfcf"}}>
                            <div class = "row">
                                <div class = "column-left-update-message">
                                    <Image src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png" size='mini' />
                                </div>
                                <div class = "column-right-update-message">
                                    <h3>Panth D.</h3>
                                    San Jose, CA
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign:"center",color:"#666666"}}>
                            10/13/2020, 3:47 PM
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages
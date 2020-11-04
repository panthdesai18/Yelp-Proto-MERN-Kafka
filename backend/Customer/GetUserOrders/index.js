const { KafkaClient } = require('kafka-node')
const kafka = require('../../kafka/client')

exports.getUserOrders =  (req,res) => {
    kafka.make_request('get_user_orders', req.body, function(err, result){
        console.log("In User Orders!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            console.log(result)
            res.end(JSON.stringify(result))
        }
    })    
    // console.log("Getting User Orders!")
    // console.log(req.body)
    // var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where userid ='"+req.body.userid+"'); "
    // pool.query(user, (err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0)
    //     {
    //         
    //     }
    // })
}


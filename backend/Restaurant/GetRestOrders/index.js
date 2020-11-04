const kafka = require('../../kafka/client')

exports.getRestaurantOrders = (req,res) =>{
    kafka.make_request('get_rest_orders', req.body, function(err, results){
        console.log("In Rest Orders!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
    // console.log("Getting Rest Orders!")
    // console.log(req.body)
    // var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where restid ='"+req.body.userid+"'); ";
    // pool.query(user, (err, result) => {
    //     if(result.length > 0)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type' : "application/json"
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    //     else{
    //         res.writeHead(400,{
    //             'Content-Type' : "application.json"
    //         })
    //     }
    // })
}
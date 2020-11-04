const kafka = require('../../kafka/client')

exports.updateOrderStatus = (req,res) =>{
    kafka.make_request('update_order_status', req.body, function(err, result){
        console.log("Updating Order Status!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Order Updated!")
        }
    })
    // console.log("Updating Order Status!")
    // console.log(req.body)
    // var user = "UPDATE yelp_proto.order SET status = '"+req.body.status+"' WHERE orderid = " +req.body.orderid+";"
    // pool.query(user, (err, result) => {
    //     if(err) throw err;
    //     if(result.length > 0){
    //         res.writeHead(200, {
    //             'Content-Type': "application/json"
    //         })
    //     }
    // })

}
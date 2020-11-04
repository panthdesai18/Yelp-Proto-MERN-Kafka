const kafka = require('../../kafka/client')

exports.getCustOutDeliveryOrd = (req,res) => {

    kafka.make_request('get_cust_out_delivery', req.body, function(err, result){
        console.log("In Cust Out Delivery Orders!")
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
    // var resultfinal=[];
    // console.log("Getting Out for Delivery Orders!")
    // console.log(req.body)
    // var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Out for Delivery'";
    // console.log(user)
    // pool.query(user, (err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0)
    //     {
    //         resultfinal.push(result)
    //         console.log("ARRAY IS:", resultfinal)
    //         for( var i = 0; i<result.length; i++){
    //         var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[i].orderid+"";
    //         pool.query(user2, (err, result2) => {
    //             if(err) throw err;
    //             if(result2.length > 0)
    //             {   
    //                 resultfinal.push(result2)
    //                 console.log(JSON.stringify(resultfinal))
    //                 res.end(JSON.stringify(resultfinal))

    //             }
    //         })
    //     }

    //     }
    //     else{
    //         res.writeHead(400,{
    //         })
    //     }
    // })
}
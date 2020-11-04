const kafka = require('../../kafka/client')

exports.getRestOutDeliveryOrd = (req,res) => {

    kafka.make_request('get_rest_out_delivery', req.body, function(err, results){
        console.log("Getting All Out for Delivery Orders")
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
    // var resultfinal=[];
    // console.log("Getting Out for Delivery Orders!")
    // console.log(req.body)
    // var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Out for Delivery'";
    // console.log(user)
    // pool.query(user, (err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0)
    //     {
    //         resultfinal.push(result)
    //         console.log("ARRAY IS:", resultfinal)
    //         // res.end(JSON.stringify(result))
    //         var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
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
    //     else{
    //         res.writeHead(400,{
    //         })
    //     }
    // })
}
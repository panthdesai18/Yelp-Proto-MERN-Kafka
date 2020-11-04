const kafka = require('../../kafka/client')

exports.getCustReceivedOrd = (req,res) => {

    kafka.make_request('get_cust_received', req.body, function(err, result){
        console.log("In Cust Received Orders!")
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
    // console.log("Getting Just Received Orders!")
    // console.log(req.body)
    // var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Order Received'";
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
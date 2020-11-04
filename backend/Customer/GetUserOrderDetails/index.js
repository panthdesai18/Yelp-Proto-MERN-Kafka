const kafka = require('../../kafka/client')

exports.getUserOrderDetails = (req,res) => {
    kafka.make_request('get_user_order_details', req.body, function(err, results){
        console.log("In User Orders Details!")
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
    // console.log("Getting User Orders!")
    // console.log(req.body)
    // var user = "SELECT * FROM yelp_proto.order where userid ='"+req.body.userid+"'; "
    // pool.query(user, (err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type' : "application/json"
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    // })
}
const pool = require('../../Config')

exports.getRestOutDeliveryOrd = (req,res) => {

    var resultfinal=[];
    console.log("Getting Out for Delivery Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Out for Delivery'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
}
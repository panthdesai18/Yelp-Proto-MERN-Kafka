const pool = require('../../Config')

exports.getRestaurantOrders = (req,res) =>{
    console.log("Getting Rest Orders!")
    console.log(req.body)
    var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where restid ='"+req.body.userid+"'); ";
    pool.query(user, (err, result) => {
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
        else{
            res.writeHead(400,{
                'Content-Type' : "application.json"
            })
        }
    })
}
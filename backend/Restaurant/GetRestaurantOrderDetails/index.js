const pool = require('../../Config')

exports.getRestaurantOrderDetails = (req,res) => {
    console.log("Getting Rest Order Details")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.order WHERE restid = "+req.body.userid+"";
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}
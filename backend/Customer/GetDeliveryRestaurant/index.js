const pool = require('../../Config')

exports.getDeliveryRestaurant = (req, res) => {
    console.log("GATHERING DELIVERY RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant where typedeliv = '1'";
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}
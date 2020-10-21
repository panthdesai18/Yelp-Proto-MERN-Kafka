const pool = require('../../Config')

exports.getPickupRestaurant = (req, res) =>{
    console.log("GATHERING CURBSIDE RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant where typepickup = '1'";
    pool.query(user, (err, result) => {
        if (err) throw err;
        if( result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type': "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}
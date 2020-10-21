const pool = require('../../Config')

exports.getDineInRestaurants = (req,res) => {
    console.log("GATHERING DINE IN RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.restaurant where typedinein = '1'";
    pool.query( user, (err, result) => {
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
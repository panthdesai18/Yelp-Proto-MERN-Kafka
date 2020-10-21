const pool = require('../../Config')

exports.searchDish = (req,res) =>{
    console.log("Searching Dish!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant WHERE userid in (SELECT restid from yelp_proto.dishes WHERE dishname LIKE '%"+req.body.searchLocation+"%')";
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
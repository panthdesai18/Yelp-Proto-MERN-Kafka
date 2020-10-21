const pool = require('../../Config')

exports.getAllRestaurants = (req, res) => {
    console.log("GATHERING ALL REST!")
    console.log(req.body)
    var user = "SELECT * from restaurant";
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
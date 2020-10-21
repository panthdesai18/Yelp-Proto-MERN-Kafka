const pool = require('../../Config')

exports.getUserOrderDetails = (req,res) => {
    console.log("Getting User Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ='"+req.body.userid+"'; "
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
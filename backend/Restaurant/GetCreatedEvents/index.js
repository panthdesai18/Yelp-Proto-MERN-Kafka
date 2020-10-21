const pool = require('../../Config')

exports.getCreatedEvents = (req, res) => {
    
    console.log("Getting EVENTS")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.events WHERE restid='"+req.body.userid+"'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            console.log(result)
            res.end(JSON.stringify(result))
        }
    })
}
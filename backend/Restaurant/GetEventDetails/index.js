const pool = require('../../Config')

exports.getEventDetails = (req,res) => {

    var resultfinal=[];
    console.log("Getting User Details")
    console.log(req.body)
    // var user = "SELECT userid from yelp_proto.eventreg WHERE eventid="+req.body.eventid+"";
    var user = "SELECT * FROM user WHERE userid IN (SELECT userid from yelp_proto.eventreg WHERE eventid='"+req.body.eventid+"')"
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result)
        {
            console.log(result)
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}
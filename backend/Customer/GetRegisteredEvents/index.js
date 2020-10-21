const pool = require('../../Config')

exports.getRegisteredEvents = (req,res) =>{
    console.log("GATHERING REGISTERED EVENTS!")
    console.log(req.body)
    var user = "SELECT * FROM events WHERE eventid in (SELECT eventid from eventreg WHERE userid = "+req.body.userid+")";
    pool.query(user,(err,result) =>{
        if(err) throw err;
        if(result.length > 0)
        {
            console.log(result)
            res.writeHead(200,{
                'Content-Type' : "application/json"        
            })
            res.end(JSON.stringify(result))
        }
    })
}
const kafka = require('../../kafka/client')

exports.getRegisteredEvents = (req,res) =>{

    kafka.make_request('get_registered_events', req.body, function(err, results){
        console.log("Getting Registered Events")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
    // console.log("GATHERING REGISTERED EVENTS!")
    // console.log(req.body)
    // var user = "SELECT * FROM events WHERE eventid in (SELECT eventid from eventreg WHERE userid = "+req.body.userid+")";
    // pool.query(user,(err,result) =>{
    //     if(err) throw err;
    //     if(result.length > 0)
    //     {
    //         console.log(result)
    //         res.writeHead(200,{
    //             'Content-Type' : "application/json"        
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    // })
}
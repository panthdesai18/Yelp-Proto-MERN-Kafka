const kafka = require("../../kafka/client")

exports.getEventRegisteredUsers = (req, res) => {
    
    kafka.make_request('get_registered_users_details', req.body, function(err, results){
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
    // var restId = 1;
    // var query = "SELECT eventid FROM yelp_proto.events WHERE restid = '"+ restId +"'";
    // pool.query(query, (err, result) => {
    //     if(err) throw err;
    //     if(result)
    //     {   var users = []
    //         result.map(i => {
    //             var userQuery = "SELECT userid FROM yelp_proto.eventreg WHERE eventid = '"+ i.eventid +"'";
    //             pool.query(userQuery, (err, finalResult) => {
    //                 if(err) throw err;
    //                 if(finalResult)
    //                 {
    //                     console.log(finalResult)
    //                     finalResult.map(j => {
    //                         users.push(j)
    //                     })
    //                     // users.push(finalResult[0]);
    //                 }
    //             })
    //         })
    //         console.log(users)
    //         res.end(JSON.stringify(users))
    //     }
    // })
}
const kafka = require("../../kafka/client")

exports.getEventDetails = (req,res) => {

    kafka.make_request('get_registered_users', req.body, function(err, results){
        console.log("Getting Registered Users")
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
    // var resultfinal=[];
    // console.log("Getting User Details")
    // console.log(req.body)
    // // var user = "SELECT userid from yelp_proto.eventreg WHERE eventid="+req.body.eventid+"";
    // var user = "SELECT * FROM user WHERE userid IN (SELECT userid from yelp_proto.eventreg WHERE eventid='"+req.body.eventid+"')"
    // pool.query(user, (err, result) => {
    //     if(err) throw err;
    //     if(result)
    //     {
    //         console.log(result)
    //         res.writeHead(200, {
    //             "Content-Type" : "application/json"
    //         })

    //         res.end(JSON.stringify(result))
    //     }
    // })
}
const kafka = require('../../kafka/client')

exports.getEvents = (req, res) => {

    kafka.make_request('get_events', req.body, function(err, results){
        console.log("Getting All Events")
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
    // console.log("GATHERING Rest Events!")
    // console.log(req.body)
    // var user = "SELECT * from events ORDER BY eventdate ASC";
    // pool.query(user, (err, result) => {
    //     if (err) throw err;
    //     if(result.length > 0)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type' : "application/json"
    //         })
    //         res.end(JSON.stringify(result))
    //     }

    // })
}
const kafka = require('../../kafka/client')


exports.addEvent = (req,res) => {
    kafka.make_request('add_event', req.body, function(err, result){
        console.log("Adding New Event!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Event Added!")
        }
    })
    // console.log("Posting Event!")
    // console.log(req.body)
    // var sql = "INSERT INTO events (eventname,eventdesc,eventhash,eventlocation,restid, eventdate) VALUES ?";
    // var values = [[req.body.eventname,req.body.eventdesc,req.body.eventhash,req.body.eventlocation,req.body.userid,req.body.eventdate]]
    // pool.query(sql,[values], function (err, result, fields) {
    //     if(err) throw err;
    //     console.log(result)
    //     if (err) {
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //     }else{
    //     console.log("no error")
    //     res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     })
    //     // res.end({
    //     //     message: 'Table Data',
    //     //     Total_record:result.length,result:result
    //     // });
    //     res.end("Event Posted!")
    // }
    // });
    
}
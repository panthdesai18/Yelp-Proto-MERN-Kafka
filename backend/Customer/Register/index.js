const kafka = require('../../kafka/client')

exports.register = (req,res) =>{
    kafka.make_request('register_event', req.body, function(err, results){
        console.log("Inside Event Registeration")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Registered To Event")
        }
    })
    // // console.log("Registering to Event!")
    // // console.log(req.body)
    // var user = "INSERT INTO eventreg (userid,eventid) VALUES ?";
    // var values = [[req.body.userid,req.body.eventid]];
    // pool.query(user,[values], function (err, result, fields) {
    //     // if(err) throw err;
    //     // console.log(result)
    //     if (err) {
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //     }else{
    //     // console.log("no error")
    //     res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     })
    //     res.end("Event registered!")
    // }
    // });
}
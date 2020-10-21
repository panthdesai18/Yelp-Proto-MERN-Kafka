const pool = require('../../Config')

exports.register = (req,res) =>{
    // console.log("Registering to Event!")
    // console.log(req.body)
    var user = "INSERT INTO eventreg (userid,eventid) VALUES ?";
    var values = [[req.body.userid,req.body.eventid]];
    pool.query(user,[values], function (err, result, fields) {
        // if(err) throw err;
        // console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        // console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end("Event registered!")
    }
    });
}
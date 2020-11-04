const kafka = require('../../kafka/client')

exports.searchLocation = (req,res) =>{
    kafka.make_request('search_location', req.body, function(err, results){
        console.log("Searching Location")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
    // console.log("Searching Restaurant!")
    // console.log(req.body)
    // var user = "SELECT * from restaurant WHERE restname LIKE '%"+req.body.searchLocation+"%'";
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
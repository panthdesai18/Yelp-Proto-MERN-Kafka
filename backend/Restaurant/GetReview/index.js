const kafka = require('../../kafka/client')

exports.getReview = (req, res) => {

    kafka.make_request('get_reviews', req.body, function(err, results){
        console.log("In Rest Reviews!")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside Else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            console.log(results)
            res.end(JSON.stringify(results))
        }
    })
    // // console.log("GATHERING Rest Reviews!")
    // // console.log(req.body)
    // var user = "SELECT * from reviews WHERE restid = '"+ req.body.userid +"' ";
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
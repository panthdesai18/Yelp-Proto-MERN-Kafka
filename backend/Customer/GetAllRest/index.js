const kafka = require('../../kafka/client')

exports.getAllRestaurants = (req, res) => {
    kafka.make_request('get_all_rest', req.body, function(err, results){
        console.log("Getting All Restaurants")
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
    // console.log("GATHERING ALL REST!")
    // console.log(req.body)
    // var user = "SELECT * from restaurant";
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
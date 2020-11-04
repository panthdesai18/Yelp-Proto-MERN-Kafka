const kafka = require('../../kafka/client')
exports.searchDish = (req,res) =>{
    kafka.make_request('search_dish', req.body, function(err, results){
        console.log("Searching Dish")
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
    // console.log("Searching Dish!")
    // console.log(req.body)
    // var user = "SELECT * FROM yelp_proto.restaurant WHERE userid in (SELECT restid from yelp_proto.dishes WHERE dishname LIKE '%"+req.body.searchLocation+"%')";
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

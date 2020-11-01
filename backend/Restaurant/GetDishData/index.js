const kafka = require('../../kafka/client')

exports.getDishData = (req, res) => {
    kafka.make_request('get_dish_data', req.body, function(err, results){
        console.log("Getting Restaurant Dishes")
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
    // console.log("GATHERING DISH DATA!")
    // console.log(req.body)
    // var user = "SELECT * from dishes WHERE restid = '"+ req.body.dishid +"' ";
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
const kafka = require('../../kafka/client')

exports.getDineInRestaurants = (req,res) => {
    kafka.make_request('get_dinein_rest', req.body, function(err, results){
        console.log("Getting All Delivery Restaurants")
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
    // console.log("GATHERING DINE IN RESTAURANTS!")
    // console.log(req.body)
    // var user = "SELECT * from yelp_proto.restaurant where typedinein = '1'";
    // pool.query( user, (err, result) => {
    //     if (err) throw err;
    //     if( result.length > 0)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type': "application/json"
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    // })
}
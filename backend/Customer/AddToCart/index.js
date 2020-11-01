const kafka = require('../../kafka/client')

exports.addToCart = (req,res) =>{

    kafka.make_request('add_to_cart', req.body, function(err, results){
        console.log("Inside Add Dish to Cart")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Added to Cart")
        }
    }) 
    // console.log("Adding to Cart!")
    // console.log(req.body)
    // var user = "INSERT INTO cart (userid,restid,dishid) VALUES ?";
    // var values = [[req.body.userid,req.body.restid,req.body.dishid]];
    // pool.query(user,[values], function (err, result, fields) {
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
    //     res.end("Added to Cart!")
    // }
    // });

}
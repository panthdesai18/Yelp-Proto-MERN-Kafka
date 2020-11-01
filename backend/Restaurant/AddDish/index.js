const kafka = require('../../kafka/client')

exports.addDish = function(req,res){
    kafka.make_request('add_dish', req.body, function(err, results){
        console.log("Inside Add Dish")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Dish Inserted")
        }
    })    
    // console.log("Here!")
    // console.log(req.body);
    // var sql = "INSERT INTO dishes (dishname,mainingre,price,category,description,restid) VALUES ?";
    // var values = [[req.body.dishname,req.body.mainingre,req.body.dishPrice,req.body.category,req.body.dishdescription,req.body.userid]]
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
    //     res.end("Dish Inserted!")
    // }
    // });
}
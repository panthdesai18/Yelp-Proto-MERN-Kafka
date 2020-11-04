const kafka = require('../../kafka/client')

exports.updateRestaurant = function(req,res){
    kafka.make_request('update_restaurant', req.body, function(err, results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.end();
            }
    })
    // console.log("Updating Restaurant!")
    // console.log(req.body);
    //     var sql = "UPDATE restaurant SET restname = '"+ req.body.restname +"' , description = '"+ req.body.description +"',  address = '" + req.body.address + "',  phno = '" + req.body.phno +"', email = '" + req.body.email +  "' WHERE userid = '"+ req.body.userid +"' ";

    //     pool.query(sql, function (err, result) {
    //         if (err) throw err;
    //         res.send({
    //             message: 'Table Data',
    //             Total_record:result.length,result:result
    //         });
    //     }); 
}
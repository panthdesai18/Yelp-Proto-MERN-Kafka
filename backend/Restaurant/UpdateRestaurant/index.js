const pool = require('../../Config')

exports.updateRestaurant = function(req,res){
    console.log("Updating Restaurant!")
    console.log(req.body);
        var sql = "UPDATE restaurant SET restname = '"+ req.body.restname +"' , description = '"+ req.body.description +"',  address = '" + req.body.address + "',  phno = '" + req.body.phno +"', email = '" + req.body.email +  "' WHERE userid = '"+ req.body.userid +"' ";

        pool.query(sql, function (err, result) {
            if (err) throw err;
            res.send({
                message: 'Table Data',
                Total_record:result.length,result:result
            });
        }); 
}
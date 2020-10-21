const pool = require('../../Config')

exports.updateCustomer = function(req,res){
    console.log("Updating Customer!")
    console.log(req.body);
        var sql = "UPDATE user SET firstname = '"+ req.body.firstname +"' , lastname = '"+ req.body.lastname +"', nickname = '"+ req.body.nickname +"', headline = '"+ req.body.headline +"', ilove = '"+ req.body.ilove +"', blog = '"+ req.body.blog +"', city = '"+ req.body.city +"', state = '"+ req.body.state +"', country = '"+ req.body.country +"' , address = '" + req.body.address + "' WHERE userid = '"+ req.body.userid +"' ";

        pool.query(sql, function (err, result) {
            if (err) throw err;
            res.send({
                message: 'Table Data',
                Total_record:result.length,result:result
            });
        }); 
}
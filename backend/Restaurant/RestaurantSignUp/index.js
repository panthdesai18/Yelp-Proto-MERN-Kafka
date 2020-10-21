const bcrypt = require('bcrypt');
const pool = require('../../Config')

exports.restaurantSignup = function(req,res){
    console.log("Here!")
    const password = req.body.password;
    console.log(password);
    console.log(req.body)
    bcrypt.hash(password,10, function(err, hash) {
        var sql = "INSERT INTO restaurant (restname,email,password,zipcode) VALUES ?";
        var values = [[req.body.restname,req.body.username,hash,req.body.location]]
        pool.query(sql,[values], function (err, result, fields) {
            console.log(result)
            if (err) {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
            }else{
            console.log("no error")
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("User Inserted")
        }
        });
    })
}
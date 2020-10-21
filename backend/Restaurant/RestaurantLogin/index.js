const bcrypt = require('bcrypt');
const pool = require('../../Config')

exports.restaurantLogin = function(req, res) {
    
    console.log("Rest Login Attempt!")
    console.log(req.body)
    let email = req.body.username;
    let password = req.body.password;
    pool.query("SELECT * FROM restaurant WHERE email = ? ", [email], function(error, results, fields) {
        if(results[0]){
            bcrypt.compare(req.body.password, results[0].password).then((result)=>{
                if(result){
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/custProfile'});
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(results[0].userid))
                } else {
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                }
              })
              .catch((err)=>console.error(err))
        }
    });
}
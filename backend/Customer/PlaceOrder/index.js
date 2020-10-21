const pool = require('../../Config')

exports.placeOrder = (req,res) =>{
    console.log("Placing Order!")
    console.log(req.body.cart.length)
    
        var user = "INSERT INTO yelp_proto.order (userid,restid) VALUES ?";
        var values = [[req.body.cart[0].userid,req.body.cart[0].restid]];
        pool.query(user,[values], function (err, result, fields) {
            if(err) throw err;
            console.log(result)
            if (err) {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
            }else{
            console.log(result)
            for( var i =0 ; i<req.body.cart.length; i++){
                var user = "INSERT INTO yelp_proto.orderdetails (orderid,dishid,quantity) VALUES ?";
                var values = [[result.insertId,req.body.cart[i].dishid,req.body.cart[i].quantity]]
                pool.query(user,[values], function (err, result, fields){
                    if(err) throw err;
                    console.log(result)
                    if(err) {
                        res.writeHead(400, {
                            'Content-Type' : 'text/plain'
                        })
                    }
                    else{
                        console.log(result)
                    }
                })
            }
        }
        });
        var user2= "DELETE FROM `yelp_proto`.`cart`";
        pool.query(user2, function (err, result, fields){
            if(err) throw err;
            console.log(result)
            if(err) {
                res.writeHead(400, {
                    'Content-Type' : 'text/plain'
                })
            }
            else{
                console.log("CART EMPTIED!")
            }
        })
    

}
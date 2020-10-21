const pool = require('../../Config')

exports.addToCart = (req,res) =>{
    console.log("Adding to Cart!")
    console.log(req.body)
    var user = "INSERT INTO cart (userid,restid,dishid) VALUES ?";
    var values = [[req.body.userid,req.body.restid,req.body.dishid]];
    pool.query(user,[values], function (err, result, fields) {
        if(err) throw err;
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
        res.end("Added to Cart!")
    }
    });

}
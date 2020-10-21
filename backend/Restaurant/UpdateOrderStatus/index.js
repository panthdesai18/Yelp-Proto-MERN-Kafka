const pool = require('../../Config')

exports.updateOrderStatus = (req,res) =>{
    console.log("Updating Order Status!")
    console.log(req.body)
    var user = "UPDATE yelp_proto.order SET status = '"+req.body.status+"' WHERE orderid = " +req.body.orderid+";"
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
        }
    })

}
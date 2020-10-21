const pool = require('../../Config')

exports.getUserOrders =  (req,res) => {
    console.log("Getting User Orders!")
    console.log(req.body)
    var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where userid ='"+req.body.userid+"'); "
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            var finalResult = []
            var len = result.length;
            var count = 0;
            result.map(cart => {
                console.log(cart)
                var dish = "SELECT * from dishes WHERE dishid = '"+ cart.dishid +"' ";
                pool.query(dish, (err, dishData) => {
                    if(err) throw err;
                    if(dishData)
                    {
                        cart["dishName"] = dishData[0].dishname
                        cart["dishphoto"] = dishData[0].dishphoto
                        console.log("Cart is", cart)
                        finalResult.push(cart)
                        count++
                    }
                    if(count === len)
                    {
                        console.log("Sending")
                        res.writeHead(200,{
                            'Content-Type' : "application/json"
                        })
                        console.log(finalResult)
                        res.end(JSON.stringify(finalResult))
                    }
                })
            })
        }
    })
}
const pool = require('../../Config')

exports.getDishes = (req, res) => {
    console.log("GATHERING DISH DATA!")
    console.log(req.body)
    var user = "SELECT * from dishes WHERE restid = '"+ req.body.userid +"' ";
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}
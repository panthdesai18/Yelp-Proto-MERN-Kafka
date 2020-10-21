const pool = require('../../Config')

exports.getCustomerData = (req, res) => {
    console.log(req.body)
    var user = "SELECT * from user WHERE userid = '"+ req.body.userid +"' ";
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result[0]))
        }
    })
}
const pool = require('../../Config')

exports.getReview = (req, res) => {
    // console.log("GATHERING Rest Reviews!")
    // console.log(req.body)
    var user = "SELECT * from reviews WHERE restid = '"+ req.body.userid +"' ";
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
const pool = require('../../Config')

exports.searchEvent = (req,res) =>{
    // console.log("Searching Restaurant!")
    // console.log(req.body)
    var user = "SELECT * from events WHERE eventname LIKE '%"+req.body.searchEvent+"%'";
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
const pool = require('../../Config')

exports.getEvents = (req, res) => {
    console.log("GATHERING Rest Events!")
    console.log(req.body)
    var user = "SELECT * from events ORDER BY eventdate ASC";
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
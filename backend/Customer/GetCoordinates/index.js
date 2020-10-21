const pool = require('../../Config')

exports.getCoordinates = (req,res) =>{
    var user = "SELECT lat,lng,restname from restaurant";
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
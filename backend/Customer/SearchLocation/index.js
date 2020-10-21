const { register } = require("../Register");

const pool = require('../../Config')

exports.searchLocation = (req,res) =>{
    console.log("Searching Restaurant!")
    console.log(req.body)
    var user = "SELECT * from restaurant WHERE restname LIKE '%"+req.body.searchLocation+"%'";
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
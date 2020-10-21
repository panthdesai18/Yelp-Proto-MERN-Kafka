const pool = require('../../Config')

exports.postReview = function(req,res){
    console.log("Here in POSTING REVIEW!")
    console.log(req.body)
    var sql = "INSERT INTO reviews (reviewno,reviewdesc,restid,userid,username) VALUES ?";
    var values = [[req.body.reviewnumber,req.body.reviewdesc,req.body.restid,req.body.userid, req.body.username]]
    pool.query(sql,[values], function (err, result, fields) {
        console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }
        else
        {
            console.log("no error")
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("Review Added")
        }
    });
}
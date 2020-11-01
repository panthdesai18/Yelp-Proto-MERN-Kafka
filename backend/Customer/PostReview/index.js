const kafka = require('../../kafka/client')

exports.postReview = function(req,res){
    kafka.make_request('add_review', req.body, function(err, results){
        console.log("Inside Review Posting")
        console.log(req.body)
        if(err) throw err;
        else{
            console.log("Inside else")
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
            res.end("Review Added!")
        }
    })
    // console.log("Here in POSTING REVIEW!")
    // console.log(req.body)
    // var sql = "INSERT INTO reviews (reviewno,reviewdesc,restid,userid,username) VALUES ?";
    // var values = [[req.body.reviewnumber,req.body.reviewdesc,req.body.restid,req.body.userid, req.body.username]]
    // pool.query(sql,[values], function (err, result, fields) {
    //     console.log(result)
    //     if (err) {
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //     }
    //     else
    //     {
    //         console.log("no error")
    //         res.writeHead(200,{
    //             'Content-Type' : 'application/json'
    //         })
    //         res.end("Review Added")
    //     }
    // });
}
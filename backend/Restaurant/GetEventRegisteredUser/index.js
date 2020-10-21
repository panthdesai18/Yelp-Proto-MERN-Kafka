const pool = require('../../Config')

exports.getEventRegisteredUsers = (req, res) => {
    var restId = 1;
    var query = "SELECT eventid FROM yelp_proto.events WHERE restid = '"+ restId +"'";
    pool.query(query, (err, result) => {
        if(err) throw err;
        if(result)
        {   var users = []
            result.map(i => {
                var userQuery = "SELECT userid FROM yelp_proto.eventreg WHERE eventid = '"+ i.eventid +"'";
                pool.query(userQuery, (err, finalResult) => {
                    if(err) throw err;
                    if(finalResult)
                    {
                        console.log(finalResult)
                        finalResult.map(j => {
                            users.push(j)
                        })
                        // users.push(finalResult[0]);
                    }
                })
            })
            console.log(users)
            res.end(JSON.stringify(users))
        }
    })
}
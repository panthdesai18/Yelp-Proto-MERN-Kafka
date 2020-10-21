var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '18january',
    database : 'yelp_proto'
});

pool.getConnection(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

module.exports = pool
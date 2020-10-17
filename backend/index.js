var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var multer = require('multer');
var path = require('path');
const e = require('express');
module.exports = app;
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

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
        // console.log("Error connecting database ... nn");
    }
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post("/signUp", function(req,res){
    console.log("Here!")
    const password = req.body.password;
    // console.log(password);
    // console.log(req.body)
    bcrypt.hash(password,10, function(err, hash) {
        var sql = "INSERT INTO yelp_proto.user (firstname,lastname,email,password,zipcode) VALUES ?";
        var values = [[req.body.firstname,req.body.lastname,req.body.username,hash,req.body.location]]
        pool.query(sql,[values], function (err, result, fields) {
            console.log(result)
            if (err) {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
            }else{
            console.log("no error")
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("User Inserted")
        }
        });
    })
});

app.post("/restsignup", function(req,res){
    console.log("Here!")
    const password = req.body.password;
    console.log(password);
    console.log(req.body)
    bcrypt.hash(password,10, function(err, hash) {
        var sql = "INSERT INTO restaurant (restname,email,password,zipcode) VALUES ?";
        var values = [[req.body.restname,req.body.username,hash,req.body.location]]
        pool.query(sql,[values], function (err, result, fields) {
            console.log(result)
            if (err) {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
            }else{
            console.log("no error")
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("User Inserted")
        }
        });
    })
});


app.post('/login', function(req, res) {
    
    // console.log("Login Attempt!")
    // console.log(req.body)
    let email = req.body.username;
    let password = req.body.password;
    // var query = "SELECT * from user WHERE email = '"+ req.body.username +"'"
    pool.query("SELECT * FROM yelp_proto.user WHERE email = ? ", [email], function(error, results, fields) {
        // console.log("inside query");
        // console.log(results[0])
        if(results[0]){
            // console.log("inside compare!")
            bcrypt.compare(req.body.password, results[0].password).then((result)=>{
                // console.log('Result is =====', result)
                // console.log("Resultsss areeee==============: ", results)
                if(result){
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/custProfile'});
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(results[0].userid))
                    // console.log("authentication successful")
                } else {
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    // console.log("authentication failed. Password doesn't match")
                }
              })
              .catch((err)=>console.error(err))
        }
    });
});

app.post('/reslogin', function(req, res) {
    
    console.log("Rest Login Attempt!")
    console.log(req.body)
    let email = req.body.username;
    let password = req.body.password;
    // var query = "SELECT * from user WHERE email = '"+ req.body.username +"'"
    pool.query("SELECT * FROM restaurant WHERE email = ? ", [email], function(error, results, fields) {
        console.log("inside query");
        console.log(results[0])
        if(results[0]){
            console.log("inside compare!")
            bcrypt.compare(req.body.password, results[0].password).then((result)=>{
                console.log('Result is =====', result)
                console.log("Resultsss areeee==============: ", results)
                if(result){
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/custProfile'});
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(results[0].userid))
                    console.log("authentication successful")
                } else {
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log("authentication failed. Password doesn't match")
                }
              })
              .catch((err)=>console.error(err))
        }
    });
});


app.post("/updateCust", function(req,res){
    console.log("Updating Customer!")
    console.log(req.body);
        var sql = "UPDATE user SET firstname = '"+ req.body.firstname +"' , lastname = '"+ req.body.lastname +"', nickname = '"+ req.body.nickname +"', headline = '"+ req.body.headline +"', ilove = '"+ req.body.ilove +"', blog = '"+ req.body.blog +"', city = '"+ req.body.city +"', state = '"+ req.body.state +"', country = '"+ req.body.country +"' , address = '" + req.body.address + "' WHERE userid = '"+ req.body.userid +"' ";

        pool.query(sql, function (err, result) {
            if (err) throw err;
            res.send({
                message: 'Table Data',
                Total_record:result.length,result:result
            });
        }); 
});


const storage = multer.diskStorage({
    destination: './public/profimages/',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '_' + Date.now() + path.extname(file.originalname)
      )
    }
})


app.post('/updateProfPhoto',function(req,res){
    upload(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.userid)
          filename = req.file.filename;
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
          sql = `update user set profimage='${filename}' where userid='`+ req.body.userid+`'`;
          //sql="Select name,email from " + radio + " where password="' + password + '";
          console.log("SQL: " + sql);
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});

app.post('/updateRestPhoto',function(req,res){
    console.log("Uploading Rest Photo")
    uploadrest(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.userid)
    
          //id = req.body.id;
          filename = req.file.filename;
    
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
    
          sql = `update yelp_proto.restaurant set restphoto='${filename}' where userid='`+ req.body.userid+`'`;
          //sql="Select name,email from " + radio + " where password="' + password + '";
          console.log("SQL: " + sql);
          
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
         
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});

app.post('/updateRestPhotoTwo',function(req,res){
    console.log("Uploading Rest Photo")
    uploadrest(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.userid)
    
          //id = req.body.id;
          filename = req.file.filename;
    
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
    
          sql = `update yelp_proto.restaurant set restphoto2='${filename}' where userid='`+ req.body.userid+`'`;
          //sql="Select name,email from " + radio + " where password="' + password + '";
          console.log("SQL: " + sql);
          
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
         
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});

app.post('/updateRestPhotoThree',function(req,res){
    console.log("Uploading Rest Photo")
    uploadrest(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.userid)
    
          //id = req.body.id;
          filename = req.file.filename;
    
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
    
          sql = `update yelp_proto.restaurant set restphoto3='${filename}' where userid='`+ req.body.userid+`'`;
          //sql="Select name,email from " + radio + " where password="' + password + '";
          console.log("SQL: " + sql);
          
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
         
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});

app.post('/updateRestPhotoFour',function(req,res){
    console.log("Uploading Rest Photo")
    uploadrest(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.userid)
    
          //id = req.body.id;
          filename = req.file.filename;
    
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
    
          sql = `update yelp_proto.restaurant set restphoto4='${filename}' where userid='`+ req.body.userid+`'`;
          //sql="Select name,email from " + radio + " where password="' + password + '";
          console.log("SQL: " + sql);
          
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
         
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});



app.post('/updateDishPhoto',function(req,res){
    console.log("Uploading Dish Photo")
    uploaddish(req, res, err => {
        if (err) {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end('Issue with uploading')
        } else {
          console.log('Inside upload post call')
          console.log(req.file)
          console.log(req.body.dishid)
    
          //id = req.body.id;
          filename = req.file.filename;
    
          console.log("Filename : " + req.file.filename)
          console.log(req.file)
    
          sql = `update yelp_proto.dishes set dishphoto='${filename}' where dishid='`+ req.body.dishid+`'`;
          console.log("SQL: " + sql);
          
            pool.query(sql, (err, result) => {
              if (err) {
                console.log("Error occured : " + err);
              } else {
                console.log("Image updated in database")
              }
            });
         
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(req.file))
        }
      })
});


const upload = multer({
    storage: storage
}).single('profImage')

const uploadrest = multer({
    storage: storage
}).single('restphoto')

const uploaddish = multer({
    storage: storage
}).single('dishphoto')

app.post("/delete", function(req, res) {
    console.log(req.body)
    var flag1 = true;
    for(var i = 0; i < books.length; i++)
    {   
        console.log("In delete loop")
        if(books[i].BookID != req.body.BookID)
        {
            console.log("Doesnot Exists!")
            flag1 = false;
        }
        else{
            flag1 = true;
            books.splice(i, 1);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Success!");  
        }
    }
    if(!flag1)
    {
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
        res.end("Failure!");
    }
   console.log("Books Deleted!", books)
   
})

app.post("/getUserData", (req, res) => {
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
})

app.post("/getRestData", (req, res) => {
    console.log("IN HERE!")
    console.log(req.body)
    var user = "SELECT * from restaurant WHERE userid = '"+ req.body.userid +"' ";
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
})

app.post("/getDishData", (req, res) => {
    console.log("GATHERING DISH DATA!")
    console.log(req.body)
    var user = "SELECT * from dishes WHERE restid = '"+ req.body.dishid +"' ";
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
})

app.post("/getDishes", (req, res) => {
    console.log("GATHERING DISH DATA!")
    console.log(req.body)
    var user = "SELECT * from dishes WHERE restid = '"+ req.body.userid +"' ";
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
})


app.post("/getSearch", (req,res) =>{
    console.log("GATHERING ALL DATA!")
    console.log(req.boy)
    var user= "SELECT * from dishes WHERE dishname LIKE '"+req.body+"' ";
    pool.query(user,(err,result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/getallRest", (req, res) => {
    console.log("GATHERING ALL REST!")
    console.log(req.body)
    var user = "SELECT * from restaurant";
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
})

app.post("/getDelivRest", (req, res) => {
    console.log("GATHERING DELIVERY RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant where typedeliv = '1'";
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
})

app.post("/getPickup", (req, res) =>{
    console.log("GATHERING CURBSIDE RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant where typepickup = '1'";
    pool.query(user, (err, result) => {
        if (err) throw err;
        if( result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type': "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/getDineIn", (req,res) => {
    console.log("GATHERING DINE IN RESTAURANTS!")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.restaurant where typedinein = '1'";
    pool.query( user, (err, result) => {
        if (err) throw err;
        if( result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type': "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/addDish", function(req,res){
    console.log("Here!")
    console.log(req.body);
    var sql = "INSERT INTO dishes (dishname,mainingre,price,category,description,restid) VALUES ?";
    var values = [[req.body.dishname,req.body.mainingre,req.body.dishPrice,req.body.category,req.body.dishdescription,req.body.userid]]
    pool.query(sql,[values], function (err, result, fields) {
        if(err) throw err;
        console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        // res.end({
        //     message: 'Table Data',
        //     Total_record:result.length,result:result
        // });
        res.end("Dish Inserted!")
    }
    });
});


app.post("/updateRest", function(req,res){
    console.log("Updating Restaurant!")
    console.log(req.body);
        var sql = "UPDATE restaurant SET restname = '"+ req.body.restname +"' , description = '"+ req.body.description +"',  address = '" + req.body.address + "',  phno = '" + req.body.phno +"', email = '" + req.body.email +  "' WHERE userid = '"+ req.body.userid +"' ";

        pool.query(sql, function (err, result) {
            if (err) throw err;
            res.send({
                message: 'Table Data',
                Total_record:result.length,result:result
            });
        }); 
});

app.post("/postReview", function(req,res){
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
});

app.post("/getReview", (req, res) => {
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
})

app.post("/addEvent", (req,res) =>{
    console.log("Posting Event!")
    console.log(req.body)
    var sql = "INSERT INTO events (eventname,eventdesc,eventhash,eventlocation,restid, eventdate) VALUES ?";
    var values = [[req.body.eventname,req.body.eventdesc,req.body.eventhash,req.body.eventlocation,req.body.userid,req.body.eventdate]]
    pool.query(sql,[values], function (err, result, fields) {
        if(err) throw err;
        console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        // res.end({
        //     message: 'Table Data',
        //     Total_record:result.length,result:result
        // });
        res.end("Event Posted!")
    }
    });
    
})

app.post("/getEvents", (req, res) => {
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
})

app.post("/getRegisteredEvents", (req,res) =>{
    console.log("GATHERING REGISTERED EVENTS!")
    console.log(req.body)
    var user = "SELECT * FROM events WHERE eventid in (SELECT eventid from eventreg WHERE userid = "+req.body.userid+")";
    pool.query(user,(err,result) =>{
        if(err) throw err;
        if(result.length > 0)
        {
            console.log(result)
            res.writeHead(200,{
                'Content-Type' : "application/json"        
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/updateCoordinates", (req,res) => {
    console.log("UPDATING COORDINATES!")
    console.log(req.body.coord)
    var user = "UPDATE yelp_proto.restaurant SET lat = '"+req.body.coord.lat+"', lng = '"+ req.body.coord.lng+"' WHERE userid = '"+req.body.userid+"'";
    pool.query(user, function(err,result, fields){
        if(err) throw err;
        console.log(result)
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }
        else{
            console.log("no error")
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end("Event registered!")
        }
    })
})

app.post("/register", (req,res) =>{
    // console.log("Registering to Event!")
    // console.log(req.body)
    var user = "INSERT INTO eventreg (userid,eventid) VALUES ?";
    var values = [[req.body.userid,req.body.eventid]];
    pool.query(user,[values], function (err, result, fields) {
        // if(err) throw err;
        // console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        // console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end("Event registered!")
    }
    });
})

app.post("/searchLocation", (req,res) =>{
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
})

app.post("/searchEvent", (req,res) =>{
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
})


app.post("/getCoordinates", (req,res) =>{
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
})

app.post("/searchDish", (req,res) =>{
    console.log("Searching Dish!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.restaurant WHERE userid in (SELECT restid from yelp_proto.dishes WHERE dishname LIKE '%"+req.body.searchLocation+"%')";
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
})

app.post("/addToCart", (req,res) =>{
    console.log("Adding to Cart!")
    console.log(req.body)
    var user = "INSERT INTO cart (userid,restid,dishid) VALUES ?";
    var values = [[req.body.userid,req.body.restid,req.body.dishid]];
    pool.query(user,[values], function (err, result, fields) {
        if(err) throw err;
        console.log(result)
        if (err) {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
        }else{
        console.log("no error")
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end("Added to Cart!")
    }
    });

})

app.post("/getdishname", (req,res) => {
    console.log("Getting dish image")
    console.log(req.body)
    var user = "SELECT dishname, dishphoto from dishes WHERE dishid = "+req.body.dishid+"";
    pool.query(user, function (err, result, fields){
        if (err) {
            res.writeHead(404,{
                'Content-Type' : "text/plain"
            })
            res.end("Error")
        }
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.get("/getCart", (req,res) =>{
    console.log("Getting Cart Data!")
    console.log(req.body)
    var user = "SELECT * from cart";
    pool.query(user, (err, result) => {
        if (err) {
            res.writeHead(404,{
                'Content-Type' : "text/plain"
            })
            res.end("Error")
        }
        if(result.length > 0)
        {
            var finalResult = []
            var len = result.length;
            var count = 0;
            result.map(cart => {
                console.log(cart)
                var dish = "SELECT * from dishes WHERE dishid = '"+ cart.dishid +"' ";
                pool.query(dish, (err, dishData) => {
                    if(err) throw err;
                    if(dishData)
                    {
                        cart["dishName"] = dishData[0].dishname
                        cart["dishphoto"] = dishData[0].dishphoto
                        console.log("Cart is", cart)
                        finalResult.push(cart)
                        count++
                    }
                    if(count === len)
                    {
                        console.log("Sending")
                        res.writeHead(200,{
                            'Content-Type' : "application/json"
                        })
                        console.log(finalResult)
                        res.end(JSON.stringify(finalResult))
                    }
                })
            })
            console.log(count)
            console.log(len)    
        }
    })
})

app.post("/placeOrder", (req,res) =>{
    console.log("Placing Order!")
    console.log(req.body.cart.length)
    
        var user = "INSERT INTO yelp_proto.order (userid,restid) VALUES ?";
        var values = [[req.body.cart[0].userid,req.body.cart[0].restid]];
        pool.query(user,[values], function (err, result, fields) {
            if(err) throw err;
            console.log(result)
            if (err) {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
            }else{
            console.log(result)
            for( var i =0 ; i<req.body.cart.length; i++){
                var user = "INSERT INTO yelp_proto.orderdetails (orderid,dishid,quantity) VALUES ?";
                var values = [[result.insertId,req.body.cart[i].dishid,req.body.cart[i].quantity]]
                pool.query(user,[values], function (err, result, fields){
                    if(err) throw err;
                    console.log(result)
                    if(err) {
                        res.writeHead(400, {
                            'Content-Type' : 'text/plain'
                        })
                    }
                    else{
                        console.log(result)
                    }
                })
            }
        }
        });
        var user2= "DELETE FROM `yelp_proto`.`cart`";
        pool.query(user2, function (err, result, fields){
            if(err) throw err;
            console.log(result)
            if(err) {
                res.writeHead(400, {
                    'Content-Type' : 'text/plain'
                })
            }
            else{
                console.log("CART EMPTIED!")
            }
        })
    

})

app.post("/getrestname", (req,res) =>{
    console.log("Getting Rest Name!")
    console.log(req.body)
    var user = "SELECT restname from restaurant WHERE userid='"+req.body.restid+"'";
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
})

app.post("/getRestOrders", (req,res) =>{
    console.log("Getting Rest Orders!")
    console.log(req.body)
    var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where restid ='"+req.body.userid+"'); ";
    pool.query(user, (err, result) => {
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
        else{
            res.writeHead(400,{
                'Content-Type' : "application.json"
            })
        }
    })
})

app.post("/getRestOrderDetails", (req,res) => {
    console.log("Getting Rest Order Details")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.order WHERE restid = "+req.body.userid+"";
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/getUserOrders", (req,res) => {
    console.log("Getting User Orders!")
    console.log(req.body)
    var user = "SELECT orderid,dishid,quantity from yelp_proto.orderdetails where orderid in (SELECT orderid FROM yelp_proto.order where userid ='"+req.body.userid+"'); "
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            var finalResult = []
            var len = result.length;
            var count = 0;
            result.map(cart => {
                console.log(cart)
                var dish = "SELECT * from dishes WHERE dishid = '"+ cart.dishid +"' ";
                pool.query(dish, (err, dishData) => {
                    if(err) throw err;
                    if(dishData)
                    {
                        cart["dishName"] = dishData[0].dishname
                        cart["dishphoto"] = dishData[0].dishphoto
                        console.log("Cart is", cart)
                        finalResult.push(cart)
                        count++
                    }
                    if(count === len)
                    {
                        console.log("Sending")
                        res.writeHead(200,{
                            'Content-Type' : "application/json"
                        })
                        console.log(finalResult)
                        res.end(JSON.stringify(finalResult))
                    }
                })
            })
        }
    })
})

app.post("/getUserOrderDetails", (req,res) => {
    console.log("Getting User Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ='"+req.body.userid+"'; "
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
})

app.post("/updateOrderStatus", (req,res) =>{
    console.log("Updating Order Status!")
    console.log(req.body)
    var user = "UPDATE yelp_proto.order SET status = '"+req.body.status+"' WHERE orderid = " +req.body.orderid+";"
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.writeHead(200, {
                'Content-Type': "application/json"
            })
        }
    })

})

app.post("/getRestDelivered", (req,res) => {

    var resultfinal=[];
    console.log("Getting Delivered Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Delivered'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCustDelivered", (req,res) => {

    var resultfinal=[];
    console.log("Getting Delivered Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Delivered'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})


app.post("/getRestReceived", (req,res) => {

    var resultfinal=[];
    console.log("Getting Just Received Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Order Received'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCustReceived", (req,res) => {

    var resultfinal=[];
    console.log("Getting Just Received Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Order Received'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})


app.post("/getRestPreparing", (req,res) => {

    var resultfinal=[];
    console.log("Getting Preparing Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Preparing'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCustPreparing", (req,res) => {

    var resultfinal=[];
    console.log("Getting Preparing Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Preparing'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})


app.post("/getRestOutDelivery", (req,res) => {

    var resultfinal=[];
    console.log("Getting Out for Delivery Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Out for Delivery'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCustOutDelivery", (req,res) => {

    var resultfinal=[];
    console.log("Getting Out for Delivery Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Out for Delivery'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            for( var i = 0; i<result.length; i++){
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[i].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })
        }

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getRestCancelled", (req,res) => {

    var resultfinal=[];
    console.log("Getting Delivered Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where restid ="+req.body.userid+" AND status = 'Cancelled'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            // res.end(JSON.stringify(result))
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCustCancelled", (req,res) => {

    var resultfinal=[];
    console.log("Getting Delivered Orders!")
    console.log(req.body)
    var user = "SELECT * FROM yelp_proto.order where userid ="+req.body.userid+" AND status = 'Cancelled'";
    console.log(user)
    pool.query(user, (err, result) => {
        if(result.length > 0)
        {
            resultfinal.push(result)
            console.log("ARRAY IS:", resultfinal)
            for( var i = 0; i < result.length; i++){
            var user2 = "SELECT * FROM yelp_proto.orderdetails where orderid = "+result[0].orderid+"";
            pool.query(user2, (err, result2) => {
                if(err) throw err;
                if(result2.length > 0)
                {   
                    resultfinal.push(result2)
                    console.log(JSON.stringify(resultfinal))
                    res.end(JSON.stringify(resultfinal))

                }
            })
        }

        }
        else{
            res.writeHead(400,{
            })
        }
    })
})

app.post("/getCreatedEvents", (req, res) => {
    
    console.log("Getting EVENTS")
    console.log(req.body)
    var user = "SELECT * from yelp_proto.events WHERE restid='"+req.body.userid+"'";
    console.log(user)
    pool.query(user, (err, result) => {
        if (err) throw err;
        if(result.length > 0)
        {
            res.writeHead(200,{
                'Content-Type' : "application/json"
            })
            console.log(result)
            res.end(JSON.stringify(result))
        }
    })
})

app.post("/getEventDetails", (req,res) => {

    var resultfinal=[];
    console.log("Getting User Details")
    console.log(req.body)
    // var user = "SELECT userid from yelp_proto.eventreg WHERE eventid="+req.body.eventid+"";
    var user = "SELECT * FROM user WHERE userid IN (SELECT userid from yelp_proto.eventreg WHERE eventid='"+req.body.eventid+"')"
    pool.query(user, (err, result) => {
        if(err) throw err;
        if(result)
        {
            console.log(result)
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
    // pool.query(user,(err, result) => {
    //     if(err) throw err;
    //     if(result.length>0)
    //     {
    //         console.log(result[0].userid)
    //         for( var i=0;i<result.length;i++){
    //             var user2 = "SELECT * from user WHERE userid="+result[i].userid+"";
    //             pool.query(user2, (err,result2) => {
    //                 if(err) throw err;
    //                 if(result2.length>0)
    //                 {
    //                     resultfinal.push(result2)
    //                     console.log(resultfinal)
    //                     res.writeHead(200,{
    //                         'Content-Type' : "application/json"
    //                     })
    //                 }
    //             })
    //         }
    //         // res.end(JSON.stringify(resultfinal))
    //     }

    // })
})

app.post("/getEventRegisteredUser", (req, res) => {
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
            console.log("Hiii")
            console.log(users)
            res.end(JSON.stringify(users))
        }
    })
})

app.listen(3001);
console.log("Server Listening on port 3001");


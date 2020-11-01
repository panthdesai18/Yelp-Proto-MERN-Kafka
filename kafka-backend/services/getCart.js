var Cart = require('../models/Cart');
var Dishes = require('../models/Dishes')
const Restaurant = require('../models/Restaurant');

function handle_request(msg, callback){
    console.log(msg)
    console.log("Getting Cart Data!")

    Cart.find({}, function(err,result, fields){
        if(err) throw err;
        console.log("RESULTS ARE",result)
        Restaurant.find({_id: result[0].restid}, function(err,result1, fields){
            if(err) throw err;
            console.log("REST NAME IS", result1[0].restname)
        })
        let cart_data = result
        cart_data.forEach(element => {
            Dishes.find({_id:element.dishid}, function(err,result2,fields){
                if(err) throw err;
                console.log("DISH NAME IS", result2[0].dishname)
            })
        })
        // console.log(result)

        // callback(null, result)
        // console.log("After Callback!")
    })
}

exports.handle_request = handle_request;
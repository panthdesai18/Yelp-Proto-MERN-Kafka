var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
var user_signup = require('./services/userSignup')
var rest_signup = require('./services/restSignup')
var rest_login = require('./services/restLogin');
var user_login = require('./services/userLogin')
var get_rest_data = require('./services/getRestData')
var add_dish = require('./services/addDish')
var get_dishes = require('./services/getDishes')
var get_dish_data = require('./services/getDishData')
var add_event = require('./services/addEvent')
var view_created_events = require('./services/viewCreatedEvents')
var get_cust_data = require('./services/getCustData')
var get_all_rest = require('./services/getAllRest')
var add_review = require('./services/addReview')
var get_reviews = require('./services/getReviews')
var add_to_cart = require('./services/addToCart')
var get_cart = require('./services/getCart')

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("user_signup",user_signup)
handleTopicRequest("rest_signup",rest_signup)
handleTopicRequest("rest_login",rest_login)
handleTopicRequest("user_login",user_login)
handleTopicRequest("get_rest_data",get_rest_data)
handleTopicRequest("add_dish", add_dish)
handleTopicRequest("get_dishes",get_dishes)
handleTopicRequest("get_dish_data", get_dish_data)
handleTopicRequest("add_event", add_event)
handleTopicRequest("view_created_events", view_created_events)
handleTopicRequest("get_cust_data", get_cust_data)
handleTopicRequest("get_all_rest", get_all_rest)
handleTopicRequest("add_review", add_review)
handleTopicRequest("get_reviews", get_reviews)
handleTopicRequest("add_to_cart", add_to_cart)
handleTopicRequest("get_cart", get_cart)
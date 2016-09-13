var express = require('express');
var FB = require('fb');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// Facebook AccessToken
FB.setAccessToken('607442856100225|1PKH0ji8fyGRDC96ZGWkuQw8YHk');
console.log('Facebook AccessToken Success');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



console.log('Server Start');


var fb_data;
var comments_list = [];

//FB.api('hyubamboo/feed', function (res) {
//    if(!res || res.error) {
//        console.log(!res ? 'error occurred' : res.error);
//        return;
//    }
//    fb_data = res;
//    for(var i = 0; i < fb_data.data.length; i++){
//        var post_id = fb_data.data[i].id;
//        console.log(post_id);
//        
//        FB.api(post_id+'/comments', function(res){
//            console.log(res);
//            comments_list.push(res);
//        });   
//        
//        
//    }
//    
////    console.log('Post Id: ' + res.data[0].message);
//});



var post_id_list = [];
    
FB.api('hyubamboo/feed', function(res){
    // error
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    fb_data = res;
    //make id list
    for(var i = 0; i < fb_data.data.length; i++){
         post_id_list.push(fb_data.data[i].id);
    }

    function loop(post_id_list, current, end){
        //page response
        if(current == end) return;
        console.log(post_id_list[current]);

        return FB.api(post_id_list[current]+'/comments', function(res){
            console.log(res);
            comments_list.push(res);
            return loop(post_id_list, current+1, end);
        })
    }

    loop(post_id_list, 0, post_id_list.length);

})

    
app.get("/hyubamboo", function(req, res) {
//    var page_res = res;    
    res.send({'post_data':fb_data, 'comment_data':comments_list});
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

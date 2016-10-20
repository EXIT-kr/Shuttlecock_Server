var express = require('express');
// Need to send requst to webBrowser
var request = require('request');
// HTML Node js parser
var cheerio = require('cheerio');
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
var post_id_list = [];
    
//FB.api('ericadaesin/feed', function(res){
//    // error
//    comments_list = [];
//    post_id_list = [];
//    
//    if(!res || res.error) {
//        console.log(!res ? 'error occurred' : res.error);
//        return;
//    }
//
//    fb_data = res;
//    //make id list
//    for(var i = 0; i < fb_data.data.length; i++){
//         post_id_list.push(fb_data.data[i].id);
//    }
//
//    function loop(post_id_list, current, end){
//        //page response
//        if(current == end) return;
//        console.log(post_id_list[current]);
//
//        return FB.api(post_id_list[current]+'/comments', function(res){
//            console.log(res);
//            comments_list.push(res);
//            return loop(post_id_list, current+1, end);
//        })
//    }
//
//    loop(post_id_list, 0, post_id_list.length);
//
//})


// Weather API
app.get('/weather', function(req, res){
    var options = {
        url: 'http://apis.skplanetx.com/weather/forecast/3hours?lon=126.8112500000&village=&county=&lat=37.3048100000&city=&version=1',
        headers: {
            'x-skpop-userId' : 'kbk9288@gmail.com',
            'Accept': 'application/json',
            'appKey': '7d604ba2-e3d2-3fb5-b516-505ee8db19f2'
        }
    };
    request.get(options, function(err, weather_res, next){
        if(err) console.log(err);
        else{
            console.log(weather_res.body);
            res.send(weather_res.body);
        }
    })
});



// 안산시 페달로

app.get('/pedalro', function(req, res){
    var url = 'http://www.pedalro.kr/station/station.do?method=stationState&menuIdx=st_01';
    request.get(url, function(err, pedalro_res, next){
        if(err) console.log(err);
        else{
            var $ = cheerio.load(pedalro_res.body);
            var test = $('td.style1 > a').eq(20).text();
            var test2 = $('td.style1').eq(68).text().trim();
            var test3 = $('td.style1').eq(69).text().trim();
            var test4 = $('td.style1').eq(70).text().trim();
            
            console.log($('td.style1').eq(215).text().trim());
            console.log($('td.style1').eq(216).text().trim());
            console.log($('td.style1').eq(217).text().trim());
//            for(var name in test.text()){
//                console.log(name);
//            }
            console.log(test);
            console.log(test2);
            console.log(test3);
            console.log(test4);
//            console.log(test5);
            
            var data = [{
                            rocation: $('td.style1').eq(68).text().trim(),
                            max_val: $('td.style1').eq(69).text().trim(),
                            val: $('td.style1').eq(70).text().trim()
                        },
                        {
                            rocation: $('td.style1').eq(215).text().trim(),
                            max_val: $('td.style1').eq(216).text().trim(),
                            val: $('td.style1').eq(217).text().trim()
                        }
                       ]
            res.send(data);
        }
    })
})


// Facebook Graph API
var url = '?fields=comments{from,message,like_count},likes,full_picture,message,attachments,updated_time'
//var url = '?fields=attachments'

var info = '?fields=fan_count,about,name'
//대나무숲    
app.get("/hyubamboo", function(req, res) {
    FB.api('hyubamboo/feed'+url, function(fb_res){
        FB.api('hyubamboo'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})
//한양대 에리카 대신 전해드립니다
app.get("/daesin", function(req, res) {
    FB.api('ericadaesin/feed'+url, function(fb_res){
        FB.api('ericadaesin'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})

//한에사피
app.get("/love", function(req, res) {
    FB.api('EricaLoveMaker/feed'+url, function(fb_res){
        FB.api('EricaLoveMaker'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})

//총학생회
app.get("/student", function(req, res) {
    FB.api('hanyangericagsa/feed'+url, function(fb_res){
        FB.api('hanyangericagsa'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})

//동아리 연합회
app.get("/ca", function(req, res) {
    FB.api('HYUnivCA/feed'+url, function(fb_res){
        FB.api('HYUnivCA'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})


//기숙사 자치회
app.get("/dorm", function(req, res) {
    FB.api('ericadormitory/feed'+url, function(fb_res){
        FB.api('ericadormitory'+info, function(page_info){
            console.log(fb_res);
            res.send({'page_info': page_info, 'page_data': fb_res});
        })
    })
})


app.get('/boring', function(req, res){
    res.render('boring');
});

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

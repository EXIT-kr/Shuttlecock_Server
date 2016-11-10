var express = require('express');
// Need to send requst to webBrowser
var request = require('request');
// HTML Node js parser
var cheerio = require('cheerio');
// XML to Json Parser
//var xmlParser = require('xml2json');

// XML to js Parser
var xml2js = require('xml2js').parseString;

var async = require('async');

// Firebase
var firebase = require('firebase');

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

// Firebase Access




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



console.log('Server Start!');


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
//app.get('/weather', function(req, res){
//    var options = {
//        url: 'http://apis.skplanetx.com/weather/forecast/3hours?lon=126.8112500000&village=&county=&lat=37.3048100000&city=&version=1',
//        headers: {
//            'x-skpop-userId' : 'kbk9288@gmail.com',
//            'Accept': 'application/json',
//            'appKey': '7d604ba2-e3d2-3fb5-b516-505ee8db19f2'
//        }
//    };
//    request.get(options, function(err, weather_res, next){
//        if(err) console.log(err);
//        else{
//            console.log(weather_res.body);
//            res.send(weather_res.body);
//        }
//    })
//});

// Kakaotalk Yellow ID API

//Kakaotalk Normal Message API
function kakaotalkSendMsg(res, msg){
    res.send({
        "message":{
            "text": msg
        }
    })
}

//Kakaotalk Button Message API
function kakaotalkSendBtn(res, btns){
    res.send({
        "message": {
            "text": "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!",
            "message_button": {
              "label": "주유 쿠폰받기",
              "url": "https://coupon/url"
            }
          },
          "keyboard": {
            "type": "buttons",
            "buttons": btns
          }
    });
}

function kakaotalkSendWeather(res){
    request.get('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4127153500', function(err, weather_res, next){
        xml2js(weather_res.body, function(err, parseResult){
            console.log(parseResult.rss.channel[0].item[0].description[0]);
            var parseData = parseResult.rss.channel[0].item[0].description[0].body[0].data;
            var timeRelease = parseResult.rss.channel[0].item[0].description[0].header[0].tm[0];
            timeRelease = timeRelease.slice(0,4) + '-' +timeRelease.slice(4,6) + '-' + timeRelease.slice(6,8) + ' ' +timeRelease.slice(8,10) + ':' + timeRelease.slice(10,12);
            kakaotalkSendMsg(res, "현재 시각 " + timeRelease + " 기준으로\n안산날씨는 " + parseData[0].temp + " °C 이며 날씨 상태는 " + parseData[0].wfKor + "입니다.");
        });   
    });
}

app.get('/keyboard', function(req, res){
    res.send({
        "type" : "buttons",
        "buttons" : ["시간표", "날씨"]
    })
})

app.post('/message', function(req, res){
    var content = req.body.content;
    console.log(req.body);
    console.log(content);
    
    if(content == "시간표"){
        kakaotalkSendMsg(res, "시간표는 아직 미정입니다.");
    }
    else if(content == "도움말"){
        kakaotalkSendBtn(res, ["시간표", "날씨"])
    }
    else if(content == "날씨"){
        kakaotalkSendWeather(res);
    }
    else{
        res.send({
            "message":{
                "text" : "축하합니다!" + content
            }
        })    
    }
    
})


app.post('/friend', function(req, res){
    res.send({
        "http status code" : 200,
        "code" : 0,
        "message" : "SUCCESS",
        "comment" : "정상 응답"
    })
})


app.delete('/friend', function(req, res){
    res.send({
        "http status code" : 200,
        "code" : 0,
        "message" : "SUCCESS",
        "comment" : "정상 응답"
    })
})

app.get('/test', function(req, res){
    res.render('test');
})


// Weather API
app.get('/weather', function(req, res){
    request.get('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4127153500', function(err, weather_res, next){
        if(err) console.log(err);
        else{
            var parseOptions = {
                object: true,
                reversible: false,
                coerce: false,
                sanitize: true,
                trim: true,
                arrayNotation: false
            };
            
            
            xml2js(weather_res.body, function(err, parseResult){
                
                console.log(parseResult.rss.channel[0].item[0].description[0]);
                
                var parseData = parseResult.rss.channel[0].item[0].description[0].body[0].data;
                var timeRelease = parseResult.rss.channel[0].item[0].description[0].header[0].tm[0];
                console.log(timeRelease);
                res.send({time : timeRelease, data : parseData});
            });   
        } 
    }); 
});


// 공지사항
app.get('/notice', function(req, res){
    res.render('notice');
})

// 한양대학교 학식 페이지 이동
app.get('/food_view', function(req, res){
    res.render('food');
})


// 한양대학교 학식 크롤링
app.get('/food',function(req, page_res){
    
    var d = new Date();
    var month = d.getMonth();
    var date = d.getDate();
    var year = d.getFullYear();
    console.log(year);
    var place = 255;
    
    console.log(req.query);
    
    var place = req.query.placeCode;
    var year = req.query.year;
    var month = req.query.month;
    var date = req.query.date;
    
    console.log(place);
    var url = 'http://www.hanyang.ac.kr/web/www/-'+place+'?p_p_id=foodView_WAR_foodportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=2&_foodView_WAR_foodportlet_sFoodDateDay='+date+'&_foodView_WAR_foodportlet_sFoodDateYear='+year+'&_foodView_WAR_foodportlet_action=view&_foodView_WAR_foodportlet_sFoodDateMonth='+month;
    
    console.log(url);
    
    var sendData = {};
    request.get(url, function(err, res, next){
        if(err) console.log(err);
        else{

            var $ = cheerio.load(res.body);
            var place = $('.sub-head').children('h3').text();
            var list = $('.d-title2');
            var type = $('.thumbnails');
            var day = $('.day-selc');
            day = day.text().replace(/\t/gi,'').replace(/\r/gi,'').split('\n');
            day = day[2]+' '+day[3];
            console.log(day);
            console.log(place);
            
            sendData.place = place;
            sendData.day = day;
            sendData.data = [];

            for(var i = 0; i < type.length; i++){
                var title = $(list[i]).text();

                sendData.data.push({});
                var currentData = sendData.data[i];
                currentData.type = title;
                currentData.menus = [];

                var element = $(type[i]).children('.span3').children('.thumbnail');;
                for(var j = 0; j < element.length; j++){

                    var set = {};
                    var temp = $(element[j])
                    var menu = temp.children('h3').text();
                    var price = temp.children('.price').text();
                    set.menu = menu;
                    set.price = price;
                    console.log(set);
                    currentData.menus.push(set);
                }  
            }

        }
        console.log(sendData);
        page_res.send(sendData);
    })
})



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

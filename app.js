var express = require('express');
// Need to send requst to webBrowser
var request = require('request');
// HTML Node js parser
var cheerio = require('cheerio');

// XML to Json Parser
// You can't use xml2json module on Azure Web Service
//var xmlParser = require('xml2json');

// XML to js Parser
var xml2js = require('xml2js').parseString;


var async = require('async');

// Firebase
var firebase = require('firebase');

// Facebook
var FB = require('fb');

// FileSystem
// You can't use FileSystem module on Azure Web Service
//var fs = require('fs');

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
firebase.initializeApp({
  serviceAccount: {
      "type": "service_account",
      "project_id": "shuttlecock-62d97",
      "private_key_id": "738aa0ee00e28813070f5e9d4fa5bb79249001bf",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMOkNoAIe+6HWU\nklk/GlwktiwX9PKyc8XOrqQkcDZ/cvqQl1vFSBMKpD339j35VTRcbd+S0Y1bs3Ax\nJhqYPS/cVheAwe6Gz68R2IWB0/FJ/1QDkQre0yOOqETKdg4/rLbV+2ihgHajq1iT\nHq3pzZO6I7Ir29Uupfs7rifrEt1kLzi5iHgjRK4PiWs3RH8J9qiUmiqOxjJUBYM5\np7Q4CUmSl55Mlthj/PSPTMnW205W1fnoaYURn6rgK3IXDuDY2/HYdn4bEeBXDeGz\nk96w7jMT62d6QhQbe6J1MCoTVyP3kZYpLgwJTT9Bcn8y6sesd9X8qIQIk1BEYZO5\nvFPi9esvAgMBAAECggEAMjr2T0MqIAteuA8SwlGCbkkcKTxG4RtWgJI1rvymesxV\n0nBX0vr6K/jfgPhgn82UFlOz1JGT2gUVSBFeIymRdvj5yOJp/2BfZ91AYQE27INP\nL51h9hIqQbEjUkSdFo4tXg362xYUmAbRv0WhcsrsVbDn5p+oHFQYqcIY8VlveG8w\nJn7LCogerpwGFDzPnRGipwZq32TWRyf/l3QnTC3yWPz81nTxwzxtDmjOtSeW2YUY\n6MqJ0gp5wkFMDSSz2bYrOpP1652tM7MOkGplxMCo2gC/yJrawxa6GcuTwoMXtJhB\nt1FdBruquZYpA5j34sQa0IUYgHbvPCHJtQM5rz5U0QKBgQDz/29gIT9dwp49ERQc\n/xsLYmQaqhT/i3hp24WlMJbTBav6b/bfjrOtID06ktSNYxcMnDbkikT18R7L2OvI\n2UrWpfe1kOhoIF//+cED0d+NODhiDjTtRc4apc6jPoqbnPg2UccyTw93JqdgUitf\nITTgG8OPJKtoWhoTSZGYiHImdwKBgQDWRgStUvvogDS343iRh/iqmxgQFj+NiFYa\nqa/raqhHRWo4rxAwm4FGHkWWgireeY0tltny5hnVHWA/KY7eRuhs/jF2Y7PV3PFH\nvlnAshKsGupfd3nnrGCQXLP6AVWGuRjOPjxUSVN4EmTMzeFbLPiTj0txKDT4NXrJ\nbzcPnYk3CQKBgQCxScGgZKgJNXcKwhUOOKJq9DPuV/Tn9Wwp5pLGA3cjn3RlhOMp\nbyPIwKscm0GL9hryU7Ni/cC7v1Z0IYq5JoHFU1SYfdEQj62RbeS8JMu9bcMyJEZ6\nvQTTwfRSEwhdp4GG3obRXDbNia2GRE41Ugh8ak/++1L8gLN/ni4HWeUvYwKBgBLK\nMxDL7SE3VOgnP2Rrqwey8ApBGTOdGAfgh3e6c6VEVgtAdsf8avquHuYS5hV6TUIJ\nL3WYbf19RPpk941QZINiSw4ZsiR36oSjEZXPR8nl1lWm0X7aY+Fk77dltI1K3/z+\nAiZWA8bMviAjkbaAHBA8iZ4Tq4l0jx7o7MgmxWiZAoGBALiFGKOsMyM2/IQ7iynW\nXB6U6bsWBXdCE5OikRi4ZTMG1p647bKyTaucBc3iL5HqnPpOJH7rMP5DxHt0R55m\nSQa0Cnjb2sGb8LWZiAEhF8ueRJWGQ/TP9K2iPPnSGoYmrkPsQcnH2OZyAqjqRvZh\nq0ObbByHFS82jT5lnlJOqoDo\n-----END PRIVATE KEY-----\n",
      "client_email": "shuttlecock@shuttlecock-62d97.iam.gserviceaccount.com",
      "client_id": "115501589204278721689",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/shuttlecock%40shuttlecock-62d97.iam.gserviceaccount.com"
  },
  databaseURL: "https://shuttlecock-62d97.firebaseio.com/"
});

console.log('Firebase Login Success')

var db = firebase.database();
var ref = db.ref('/Bot/ChatLogs');



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
    

// Get TimeStamp to String
function getTimeStamp(){
    var today = new Date();

    var yyyy = today.getFullYear();
    var dd = today.getDate();
    var MM = today.getMonth()+1; //January is 0!


    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();

    if(dd < 10) dd = '0' + dd;
    if(MM < 10) MM = '0' + MM;

    if(hh < 10) hh = '0' + hh;
    if(mm < 10) mm = '0' + mm;
    if(ss < 10) ss = '0' + ss;


    var today = yyyy+'-'+MM+'-'+dd+' ';
    var curtime = hh+':'+mm+':'+ss;

    return today+curtime;
}


// Kakaotalk Yellow ID API

//Kakaotalk Normal Message API
function kakaotalkSendMsg(res, msg){
    res.send({
        "message":{
            "text": msg
        }
    })
}

//Kakaotalk Button Message with Label API
function kakaotalkSendBtnWithLabel(res, msg, btns){
    res.send({
        "message": {
            "text": msg,
            "message_button": {
              "label": "셔틀콕 웹 버전으로 이동하기",
              "url": "http://셔틀콕.kr"
            }
          },
          "keyboard": {
            "type": "buttons",
            "buttons": btns
          }
    });
}

//Kakaotalk Button Message API
function kakaotalkSendBtn(res, msg, btns){
    res.send({
        "message": {
            "text": msg
          },
          "keyboard": {
            "type": "buttons",
            "buttons": btns
          }
    });
}

//Kakaotalk Label Message API
function kakaotalkSendLabelMsg(res, msg, label_msg, label_url){
    res.send({
        "message": {
            "text": msg,
            "message_button": {
              "label": label_msg,
              "url": label_url
            }
        }
    })
}




// Microsoft Congitive API

function analyzeText(res, text){
    var analyzeKey = "e76904075f934781bafe5fdc37e51450";
    var post_option = {
        method: 'post',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
        headers:{
            "Content-Type": 'application/json',
            "Ocp-Apim-Subscription-Key": analyzeKey
        },
        json: true,
        body:{
            "documents": [
                {
                  "language": "en",
                  "id": "string",
                  "text": text
                }
              ]
        }
    }
    request.post(post_option, function(err, analyze_res, next){
        console.log(analyze_res.body);
        console.log(analyze_res.body.documents[0].keyPhrases);
        var keywords = analyze_res.body.documents[0].keyPhrases;
        translateText(res, keywords)
    })
}





function translateText(res, text){
    var translateKey = "131784c1d38c4a0ca28dc5e59c42d088";
    
    var post_option = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key='+translateKey, 
        body : ""
    }
    
    // Obtain Microsoft translate Auth key
    // Because Microsoft translate Auth is refreshed every 10 minutes, so you must obtain new Auth key
    
    request.post(post_option, function(err, Auth_res, next){
        
        var AuthKey = Auth_res.body
        var url = 'https://api.microsofttranslator.com/v2/http.svc/Translate?appid=Bearer '+AuthKey+"&text="+text+"&from=en&to=ko"
        
        var get_option = {
            url: url,
            headers:{'Accept': 'application/xml'}
        }
        
        request.get(get_option, function(err, translate_res, next){
            
            // XML to Json Parser
            // The translation result is XML type
            
            xml2js(translate_res.body, function(err, parse_res){
                var translateResultList = parse_res.string._.split(', ');
                console.log(parse_res.string._);
                console.log(translateResultList);
                
                var sampleKeyword = '시간'
                var flag = false;
                for(var i = 0; i < translateResultList.length; i++){
                    flag = translateResultList[i].includes(sampleKeyword)
                    console.log(translateResultList[i].includes(sampleKeyword));
                    if(flag) break;
                }
                
                kakaotalkSendMsg(res, flag);
            })
        })
    })
}

function translate(res, text){
    var translateKey = "131784c1d38c4a0ca28dc5e59c42d088";
    var post_option = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key='+translateKey, 
        body : ""
    }
    
    // Obtain Microsoft translate Auth key
    // Because Microsoft translate Auth is refreshed every 10 minutes, so you must obtain new Auth key
    
    request.post(post_option, function(err, Auth_res, next){
        var msg = info.text;
        var confidence = info.confidence;
        
        var AuthKey = Auth_res.body
        var url = 'https://api.microsofttranslator.com/v2/http.svc/Translate?appid=Bearer '+AuthKey+"&text="+encodeURIComponent(text)+"&from=ko&to=en"
        
        var get_option = {
            url: url,
            headers:{'Accept': 'application/xml'}
        }
        
        request.get(get_option, function(err, translate_res, next){
            
            xml2js(translate_res.body, function(err, parse_res){
                console.log(parse_res.string._);
                analyzeText(res, parse_res.string._);
                
            })
        })
    })
}


//var sampleText = "The API returns a numeric score between 0 and 1. Scores close to 1 indicate positive sentiment and scores close to 0 indicate negative sentiment. Sentiment score is generated using classification techniques. The input features of the classifier include n-grams, features generated from part-of-speech tags, and word embeddings. English, French, Spanish and Portuguese text are supported."
//
//analyzeText(sampleText);



// Kakaotalk Send Translated Message by Microsoft Translate API
function translateSend(res, info){
    var translateKey = "131784c1d38c4a0ca28dc5e59c42d088";
    
    var post_option = {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key='+translateKey, 
        body : ""
    }
    
    // Obtain Microsoft translate Auth key
    // Because Microsoft translate Auth is refreshed every 10 minutes, so you must obtain new Auth key
    request.post(post_option, function(err, Auth_res, next){
        var msg = info.text;
        var confidence = info.confidence;
        
        var AuthKey = Auth_res.body
        var url = 'https://api.microsofttranslator.com/v2/http.svc/Translate?appid=Bearer '+AuthKey+"&text="+msg+"&from=en&to=ko"
        
        var get_option = {
            url: url,
            headers:{'Accept': 'application/xml'}
        }
        
        request.get(get_option, function(err, translate_res, next){
//            console.log(translate_res.body);
            xml2js(translate_res.body, function(err, parse_res){
                console.log(parse_res.string._);
                var transText = parse_res.string._;
                var send_msg = "";
                confidence = parseFloat(confidence).toFixed(2)*100;
                if(confidence < 50){
                    send_msg += "흠... 정확하진 않지만 "
                }
                else{
                    send_msg += "이번에는 맞출 수 있을 것같아요! "
                }
                send_msg += confidence +"% 의 확률로 이 사진은\n"
                send_msg += transText +'\n사진 같아요 제가 맞나요?'
                
                kakaotalkSendMsg(res, send_msg);
            })
        })
    })
}



// Kakaotalk Analyze Photo API with Microsoft Cognitive Computer Vision API
function kakaotalkAnalyzePhoto(res, img_url){
    request.post({
        method: "POST",
        url: 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Description,Faces&language=en',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : 'c8a88151c9c84934aef42a17c161eb5f'
        },
        json: true,
        body:{
            "url" : img_url
        }
    }, function(err, analyzation_res, next){
        console.log(analyzation_res);
        var faces = analyzation_res.body.faces;
        console.log(faces);
        var msg = analyzation_res.body.description.captions[0].text;
        var confidence = analyzation_res.body.description.captions[0].confidence;
        
        var info ={
            text: msg,
            confidence: confidence,
            faces: faces
        }
        
        // Detect Selfie Photo
        if(faces.length == 1){
            var age = parseInt(faces[0].age)-1;
            var gender = faces[0].gender;
            
            var send_msg = "" 
            var rand = Math.floor(Math.random() * 5);
            if(rand == 0) send_msg += "오 매우 잘나온 셀카 사진이네요"
            else if(rand == 1) send_msg += "저에게 지금 셀카를 보내는 거에요? 어디 한번 볼까요?"
            else if(rand == 2) send_msg += "와 진짜 잘나왔어요, 본인 맞아요?"
            else if(rand == 3) send_msg += "저보고 나이 맞춰보라고요? 저 잘할 자신있어요"
            else if(rand == 4) send_msg += "제가 관상은 못 봐도 나이는 좀 볼 줄 알아요"
            
            
            send_msg += "\n음.. 제가 보기에는\n한 " + age + "살 같아보여요"
            if(rand % 5 == 1){
                if(gender == "Male") send_msg += "\n상당한 미남이시네요!"
                else send_msg += "\n상당한 미인이시네요! 누구라도 보면 반할 것같아요"    
            }
            send_msg += "\n또 다른 사진은 없나요?";
            
            kakaotalkSendMsg(res, send_msg);
            
            
        }
        // Other default Photo 
        else translateSend(res, info);
        
    })
}



// Kakaotalk Send Food information
function kakaotalkSendFood(res, placeCode){
    
    var d = new Date();
    var month = d.getMonth();
    var date = d.getDate();
    var year = d.getFullYear();

    var place = placeCode;

    var url = 'http://www.hanyang.ac.kr/web/www/-'+place+'?p_p_id=foodView_WAR_foodportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=2&_foodView_WAR_foodportlet_sFoodDateDay='+date+'&_foodView_WAR_foodportlet_sFoodDateYear='+year+'&_foodView_WAR_foodportlet_action=view&_foodView_WAR_foodportlet_sFoodDateMonth='+month;
    
    
    var sendData = {};
    request.get(url, function(err, parse_res, next){
        if(err) console.log(err);
        else{

            var $ = cheerio.load(parse_res.body);
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

                    currentData.menus.push(set);
                }  
            }

        }
        console.log(sendData);
        var send_msg = "배가 고프시군요!!\n제가 식단을 알려드릴게요\n\n";
        send_msg += sendData.day + '\n';
        send_msg += sendData.place + '\n';
        for(var i = 0; i < sendData.data.length; i++){
            send_msg += '\n[' + sendData.data[i].type + ']\n';
            for(var j = 0; j < sendData.data[i].menus.length; j++){
                send_msg += sendData.data[i].menus[j].menu.trim()+'\n';
                send_msg += sendData.data[i].menus[j].price.trim()+'\n\n';   
            }    
        }
        
        send_msg += "어때요, 오늘 식단 마음에 드나요?"
        kakaotalkSendMsg(res, send_msg);
        
    })
}

// Kakaotalk Send Ansan city Weather information
function kakaotalkSendWeather(res){
    request.get('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4127153500', function(err, weather_res, next){
        xml2js(weather_res.body, function(err, parseResult){
            console.log(parseResult.rss.channel[0].item[0].description[0]);
            var parseData = parseResult.rss.channel[0].item[0].description[0].body[0].data;
            var timeRelease = parseResult.rss.channel[0].item[0].description[0].header[0].tm[0];
            timeRelease = timeRelease.slice(0,4) + '-' +timeRelease.slice(4,6) + '-' + timeRelease.slice(6,8) + ' ' +timeRelease.slice(8,10) + ':' + timeRelease.slice(10,12);
            kakaotalkSendMsg(res, "대한민국 기상청 시각\n" + timeRelease + " 기준으로\n안산 현재 온도는 " + parseData[0].temp + " °C 이며 날씨 상태는 " + parseData[0].wfKor + " 입니다.");
        });   
    });
}

// Kakaotalk Send Ansan public bicycle information 
function kakaotalkSendPedalro(res){
    var url = 'http://www.pedalro.kr/station/station.do?method=stationState&menuIdx=st_01';
    request.get(url, function(err, pedalro_res, next){
        if(err) console.log(err);
        else{
            var $ = cheerio.load(pedalro_res.body);
            var test = $('td.style1 > a').eq(20).text();
            var test2 = $('td.style1').eq(68).text().trim();
            var test3 = $('td.style1').eq(69).text().trim();
            var test4 = $('td.style1').eq(70).text().trim();
            
            
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
            
            var send_msg = "안산시 페달로 정거장 현황을 실시간으로 알려드릴게요!!\n\n";
            for(var i = 0; i < data.length; i++){
                send_msg += '[' + data[i].rocation + ']\n';
                send_msg += '현재 ' + data[i].val + ' 대 남았습니다.\n\n'
            }

            send_msg += '가끔은 택시나 버스보단 페달로를 이용해보는 것은 어떨까요?\n건강에 많은 도움이 될거에요!!'
            kakaotalkSendMsg(res, send_msg);
            
        }
    })
}

app.get('/keyboard', function(req, res){
    res.send({
        "type" : "buttons",
        "buttons" : ["시간표", "날씨", "식단", "페달로"]
    })
})

app.post('/message', function(req, res){
    var content = req.body.content;
    var user_key = req.body.user_key;
    var type = req.body.type;
    
    
    console.log(req.body);
    console.log(content);
    
    
    if(type == "photo"){
        kakaotalkAnalyzePhoto(res, content);
    }
    else if(type == "text"){
//        console.log(content.includes("셔틀"));
        // Time Table
        if(content.includes("셔틀") || content.includes("버스")){

            ref.child('Success/ShuttleBus').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });

            kakaotalkSendLabelMsg(res, "현재는 시간표 기능은 아직 구현되지 않았어요...\n빠른 시일내에 구현하도록 하겠습니다.\n\n구현되기 전까지 셔틀콕 웹 버전을 이용하는 것은 어떨까요?", "셔틀콕 웹 버전으로 이동하기", "http://셔틀콕.kr");


        }
        // Help
        else if(content.includes("도움") || content.includes("사용법")){
            ref.child('Success/Help').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });
            kakaotalkSendBtnWithLabel(res, "무엇을 원하나요? 더욱 많은 기능을 원하신다면 셔틀콕 웹 버전을 이용해주세요", ["시간표", "날씨", "식단", "페달로"])

        }
        // Weather
        else if(content.includes("날씨")){
            ref.child('Success/Weather').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });
            kakaotalkSendWeather(res);
        }
        else if(content.includes("페달로") || content.includes("자전거")){
            ref.child('Success/Pedalro').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });
            kakaotalkSendPedalro(res);

        }
        // Food
        else if(content.includes("식단") || content.includes("밥") || content.includes("배고")){
            ref.child('Success/Food').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });
            kakaotalkSendBtn(res, "식당을 선택해주세요.", ["교직원식당", "학생식당", "창의인재원식당", "푸드코트", "창업보육센터"])

        }
        else if(content == "교직원식당"){
            kakaotalkSendFood(res, 254);
        }
        else if(content == "학생식당"){
            kakaotalkSendFood(res, 255);
        }
        else if(content == "창의인재원식당"){
            kakaotalkSendFood(res, 256);
        }
        else if(content == "푸드코트"){
            kakaotalkSendFood(res, 257);
        }
        else if(content == "창업보육센터"){
            kakaotalkSendFood(res, 258);
        }
        else if(content == "야" || content == "야!"){
            ref.child('Success/Hey').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()
            });
            var rand = Math.floor(Math.random() * 5);
            if(rand == 0) kakaotalkSendMsg(res, "네?");
            else if(rand == 1) kakaotalkSendMsg(res, "부르셨나요?");
            else if(rand == 2) kakaotalkSendMsg(res, "무슨 일이라도..");
            else if(rand == 3) kakaotalkSendMsg(res, "호");
            else if(rand == 4) kakaotalkSendMsg(res, "뭐");

        }
        else if(content == "싫어"){
            kakaotalkSendMsg(res, "제가 싫으신가요?ㅠ");
        }
        else if(content == "셔틀콕"){
            kakaotalkSendMsg(res, "넵!! 제가 바로 그 셔틀콕입니다.");
        }
        else{
            ref.child('Fail').push().set({
               'user_key' : user_key,
                'text': content,
                'timeStamp': getTimeStamp()

            });
            kakaotalkSendMsg(res, "아직 제가 모르는 말이에요... \n제 도움이 필요하시면 '도움말' 이라고 입력해주세요!");
//            translate(res, content);

        }
        
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

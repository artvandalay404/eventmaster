var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var twitter = require('./js/twitter.js');
var facebook = require('./js/facebook.js');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(twitter.getData(33.777220,-84.3962800,1, function (tweets) {
    console.log (tweets);
  }));
  console.log(facebook.getData(33.777220,-84.3962800,1000,"", function (events) {
    console.log (events);
  }));

})

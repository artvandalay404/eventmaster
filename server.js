var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var twitter = require('./server/twitter.js');
var facebook = require('./server/facebook.js');
var routes = require('./routes/index');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));


app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  twitter.getData(33.777220,-84.3962800,1, function (tweets) {
    // console.log (tweets);
  });
})

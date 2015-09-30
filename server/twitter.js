var Twit = require('twit')

exports.getData = function (latitude, longitude, range, callback) {
  var T = new Twit({
    consumer_key: '',
    consumer_secret: '',
    app_only_auth: true
  })
  var geocodeString = latitude + "," + longitude + "," + range + "mi";
  T.get('search/tweets', {q: "", geocode: geocodeString, count: "15"}, function(err, data, response) {
    callback (data);
  })
}

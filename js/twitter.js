var Twit = require('twit')

exports.getData = function (latitude, longitude, range, callback) {
  var T = new Twit({
    consumer_key: 'SBaf2q9o4CZeZIZ67UDflCbgb',
    consumer_secret: 'GOy85nawC5U0R6YtbwPlgSyifytXrTjfVFZHDzJRqTpZaS0oLF',
    app_only_auth: true
  })
  var geocodeString = latitude + "," + longitude + "," + range + "mi";
  T.get('search/tweets', {q: "", geocode: geocodeString, count: "15"}, function(err, data, response) {
    callback (data);
  })
}

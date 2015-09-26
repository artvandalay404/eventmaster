var Twit = require('twit')

exports.getData = function () {
  var T = new Twit({
    consumer_key: 'SBaf2q9o4CZeZIZ67UDflCbgb',
    consumer_secret: 'GOy85nawC5U0R6YtbwPlgSyifytXrTjfVFZHDzJRqTpZaS0oLF',
    app_only_auth: true
  })
  T.get('search/tweets', { q: 'pizza', count: 10 }, function(err, data, response) {
    console.log(data)
  })

}

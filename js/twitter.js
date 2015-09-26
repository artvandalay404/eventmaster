var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'SBaf2q9o4CZeZIZ67UDflCbgb',
  consumer_secret: 'GOy85nawC5U0R6YtbwPlgSyifytXrTjfVFZHDzJRqTpZaS0oLF'
});
client.get('search/tweets', {query: 'pizza'}, function(error, tweets, response){
  if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
});

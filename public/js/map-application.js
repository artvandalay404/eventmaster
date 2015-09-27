var moment = require('moment');
module.exports = function MapApp() {
  var map = L.map('map').setView([33.777220,-84.3962800], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'michaellin.cif0wpatz19s2sxlv8x48i66b',
      accessToken: 'pk.eyJ1IjoibWljaGFlbGxpbiIsImEiOiJjaWYwd3BjMGkxOTFtc2FsdXA1aThhMmtvIn0.mdvxgPl2QX1hGygZgQjIlg'
  }).addTo(map);
  L.control.locate().addTo(map);
  var data = $.ajax({
    url: "/events",
    data: {"lat" : 33.777220,
          "lng": -84.3962800,
          "distance": 2000},
    success: function (data) {
      console.log(data);
      for (event in data.events) {
        if (data.events[event].venueLocation) {
          var marker = L.marker([data.events[event].venueLocation.latitude,data.events[event].venueLocation.longitude]).addTo(map);
          var time = moment(data.events[event].eventStarttime);
          var timeString = time.format("dddd, MMMM Do YYYY, h:mm:ss a");
          marker.bindPopup("<div>" + data.events[event].eventName + "</div>" + timeString);

        }
      }
    },
    dataType: "json"
  });
}

var moment = require('moment');
module.exports = function MapApp() {
  var map = L.map('map').setView([33.777220,-84.3962800], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'michaellin.cif0wpatz19s2sxlv8x48i66b',
      accessToken: 'pk.eyJ1IjoibWljaGFlbGxpbiIsImEiOiJjaWYwd3BjMGkxOTFtc2FsdXA1aThhMmtvIn0.mdvxgPl2QX1hGygZgQjIlg'
  }).addTo(map);
  var lc = L.control.locate().addTo(map);
  function test () {

  }
  var search = new L.Control.Search({
    url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    circleLocation: false,
    markerLocation: false,
    autoType: false,
    autoCollapse: true,
    minLength: 2,
    zoom:10,
  }).on('search_locationfound', function(event) {
    addMarkers(event.latlng.lat, event.latlng.lng, 2000);
  });
  search.addTo(map);
  var markers = new L.FeatureGroup();
  map.on('locationfound', function (event) {
    addMarkers(event.latlng.lat, event.latlng.lng, 2000)
  });
  lc.start();
  function addMarkers(lat, lng, distance) {
    var data = $.ajax({
      url: "/events",
      data: {"lat" : lat,
            "lng": lng,
            "distance": distance},
      success: function (data) {
        for (event in data.events) {
          if (data.events[event].venueLocation) {
            var marker = L.marker([data.events[event].venueLocation.latitude,data.events[event].venueLocation.longitude]).addTo(markers);
            var time = moment(data.events[event].eventStarttime);
            var timeString = time.format("dddd, MMMM Do YYYY, h:mm:ss a");
            marker.bindPopup("<div><h1><a href=http://www.facebook.com/events/" + data.events[event].eventId + ">" + data.events[event].eventName + "</a></h1></div>" + timeString);
          }
        }
        markers.addTo(map);
      },
      dataType: "json"
    });
  }
}

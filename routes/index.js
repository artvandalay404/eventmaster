var express = require('express');
var router = express.Router();
var facebook = require('../js/facebook');
router.get('/events', function(req, res, next) {
  if (!req.query.lat || !req.query.lng || !req.query.distance) {
    res.status(500).send({error: "Please specify the lat, lng, distance, parameters"});
  } else {
    facebook.getData(req.query.lat, req.query.lng, req.query.distance, "", function (data) {
      res.send(data);
    });
  }
});
module.exports = router;

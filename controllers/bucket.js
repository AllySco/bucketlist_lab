var express = require('express');
var app = express();
var bucketRouter = express.Router();

var Activity = require('../client/src/models/activity.js');

var BucketQuery = require('../db/bucket_query.js');
var query  = new BucketQuery();

// index
bucketRouter.get('/', function(req, res) {
  query.all( function(docs) {
    res.json(docs);
  })
})

// add new activity
bucketRouter.post('/', function(req, res) {
  var newActivity = new Activity( {
    country: req.body.country,
    activityText: req.body.activityText
  });
  query.add( newActivity, function(docs) {
    res.json(docs);
  });
});

module.exports = bucketRouter;

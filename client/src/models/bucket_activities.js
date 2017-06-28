var Activity = require("./activity.js")

var BucketActivities = function() {};

BucketActivities.prototype = {
  makeRequest: function(url, onRequestComplete) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      if(request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    })
    request.send();
  },
  all: function(onActivitiesReady) {
      this.makeRequest("http://localhost:3000/bucket", function(allActivities) {
        onActivitiesReady(allActivities);
      });
  },
  makePostRequest: function(url, onRequestComplete, payload) {
      var request = new XMLHttpRequest();
      request.open( 'POST', url);
      request.setRequestHeader( "Content-Type", "application/json");
      request.addEventListener( 'load', function() {
        var jsonString = request.responseText;
        var updatedActivities = JSON.parse(jsonString);
        onRequestComplete(updatedActivities);
      })
      request.send(payload);
  },
  add: function(newActivity, callback) {
    var jsonString = JSON.stringify(newActivity);
    this.makePostRequest('http://localhost:3000/bucket', callback, jsonString);
  }

}




module.exports = BucketActivities;

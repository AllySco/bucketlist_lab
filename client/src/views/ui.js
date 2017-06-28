var BucketActivities = require("../models/bucket_activities.js");

var UI = function(){
  var bucketActivities = new BucketActivities();
  bucketActivities.all( function(allActivities) {
    this.render(allActivities);
  }.bind(this));
}

UI.prototype = {
  render: function(allActivities) {
      var container = document.querySelector("#bucket-list");
      var ul = document.createElement("ul");

      for(activity of allActivities) {
        var li = document.createElement("li");
        li.innerText = "Country: " +  activity.country + " - Activity: " + activity.activityText;
        ul.appendChild(li);
      }
      container.appendChild(ul);
  }
}


module.exports = UI;

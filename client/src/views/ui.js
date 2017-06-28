var BucketActivities = require("../models/bucket_activities.js");

var UI = function(){
  var bucketActivities = new BucketActivities();
  bucketActivities.all( function(allActivities) {
    this.render(allActivities);
  }.bind(this));
  this.attachFormOnSubmit();
}

UI.prototype = {
  render: function(allActivities) {
      var container = document.querySelector("#bucket-list");
      container.innerHTML = '';
      var ul = document.createElement("ul");

      for(activity of allActivities) {
        var li = document.createElement("li");
        li.innerText = "Country: " +  activity.country + " - Activity: " + activity.activityText;
        ul.appendChild(li);
      }
      container.appendChild(ul);
  },
  attachFormOnSubmit: function() {
    var form = document.getElementById('activity-input-form')
    form.addEventListener('submit', function(event){
      event.preventDefault();
      var country = document.getElementById('select').value;
      var activityText = form['activity-field'].value;

      var activityToAdd = {
        country: country,
        activityText: activityText
      }

      var bucketActivites = new BucketActivities();
      bucketActivites.add(activityToAdd, function(newData) {
        this.render(newData);
      }.bind(this))
    }.bind(this))
  }
}


module.exports = UI;

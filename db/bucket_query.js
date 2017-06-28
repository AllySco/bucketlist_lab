var MongoClient = require("mongodb").MongoClient;
var BucketQuery = function() {
  this.url = "mongodb://localhost:27017/bucket"
}

BucketQuery.prototype = {
  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if(db) {
        var collection = db.collection("activities");
        collection.find().toArray( function(err, docs) {
          if (docs) {
            onQueryFinished(docs);
          }
        })
      }
    })
  },
  

}











module.exports = BucketQuery;

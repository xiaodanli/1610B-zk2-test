var mongo = require('mongodb');

var mongodbClient = mongo.MongoClient;

var url = 'mongodb://localhost:27017';

var objectId = mongo.ObjectID;

function createObjectId(id){
  if(id && typeof id === 'string'){
    return objectId(id);
  }
}

function connect(fn){
  mongodbClient.connect(url, { useNewUrlParser: true },function(err,db){
    if(err){
      fn && fn(err);
      return 
    }
    var dbo = db.db('zk2-test');
    var collection = dbo.collection('list');
    fn && fn(null,collection,db);
  })
}

module.exports = {
  connect:connect,
  createObjectId:createObjectId
};


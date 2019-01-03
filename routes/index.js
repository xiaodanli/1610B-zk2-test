var express = require('express');
var router = express.Router();

var mongo = require('../mongo');

/* GET home page. */
router.get('/api/get/list', function(req, res, next) {
  var params = req.query,
      page = params.page,
      page_size = params.page_size*1,
      type = params.type*1;

  mongo.connect(function(err,cols,db){
    if(err){
      res.json({code:0,msg:err})
    }else{
      var skipNum = (page-1)*page_size;  //10
      cols.find({type:type}).skip(skipNum).limit(page_size).toArray(function(error,results){
        db.close();
        if(error){
          res.json({code:0,msg:error})
        }else{
          res.json({code:1,data:results})
        }
      })
    }
  })
});

module.exports = router;

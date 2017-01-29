var router = require('express').Router()
var mongoClient = require('mongodb').MongoClient

var months = ['January','February','March','April','May','June']

var d = new Date()
var year = d.getYear().toString()
var date = d.getDate().toString()
var month = months[d.getMonth()].toLowerCase()

router.post('/todays_report',function(req,res){
  mongoClient.connect("mongodb://127.0.0.1:27017/data",function(err,db){
    if(!err){
      db.listCollections().toArray(function(err,list){
        list.forEach(function(item){
          var coll_name = item.name
          if( coll_name != "admin"){
            var collection = db.collection(coll_name)
            console.log(year + month + date)
            collection.findOne({"_id":year + month + date },function(err,item){
              res.render('today_data',{machines:[item]})
            })
          }
          })
        })
    } else {
      console.log(err)
    }
  })
})

router.post('/forward',function(req,res){
  mongoClient.connect('mongodb://127.0.0.1:27017/data',function(err,db){
    db.collection('superadmin').update({'_id':month},{$push:{'unchecked':date}})

  })
})

router.post('/new_machine',function(req,res){
  res.render('new_machine_registration',{message:"New  Machine Registration"})
})

module.exports = router

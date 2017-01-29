var router=require('express').Router()
var mongoClient = require('mongodb').MongoClient

var months = ['January','February','March','April','May','June']
var d = new Date()
var date = d.getDate()
var month=months[d.getMonth()].toLowerCase()
var year = d.getYear()

router.post('/:machine_name',function(req,res){
  console.log("Trying to connect to Mongo")
  mongoClient.connect('mongodb://127.0.0.1:27017/data',function(err,db){
    if(!err){
      console.log("Edit connected")
      var collection = db.collection(req.params.machine_name)
      collection.findOne({'_id': year.toString()+month + date.toString()},function(err,item){
        console.log(item)
        res.render('edit',{machine: item})
      })
    } else if(err){
      console.log(err)
    }
  })
})

router.post('/:machine_name/submit',function(req,res){
  mongoClient.connect('mongodb://127.0.0.1:27017/data',function(err,db){
    if(!err){
      console.log(req.body)
      var collection = db.collection(req.params.machine_name)
      collection.update({'_id':year.toString()+month + date.toString()},req.body)
    }
  })
})

module.exports = router

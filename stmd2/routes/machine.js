var router = require('express').Router()
var mongoClient = require('mongodb').MongoClient
var cookie = require('cookie')

var months = ['January','February','March','April','May','June']
var d = new Date()
var date = d.getDate()
var month=months[d.getMonth()]
var year = d.getYear()

router.post('/todays_data',function(req,res){
  var cookies = cookie.parse(req.headers.cookie || '')
  res.render('form',{ name:cookies.name,month_name:month})

})

router.post('/post_data',function(req,res){
  var cookies = cookie.parse(req.headers.cookie || '')
  req.body.machine_name = cookies.name
  req.body._id = year.toString() + month.toLowerCase() + date.toString()
  mongoClient.connect("mongodb://127.0.0.1:27017/data",function(err,db){
    if(!err){
      console.log("Connected to the MongoDb machines")
      console.log(req.body)
    var collection = db.collection(cookies.name)
    collection.insert(req.body)
    console.log("Document Added")
  } else {
    console.log(err)
  }
})
})
module.exports = router

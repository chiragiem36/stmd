var router = require('express').Router()
var mongoClient = require('mongodb').MongoClient
var cookie=require('cookie')

router.post('/',function(req,res){
  console.log(req.body)
  var user_name = req.body.userName
  var pass_word = req.body.passWord

  mongoClient.connect("mongodb://127.0.0.1:27017/data",function(err,db){
    if(!err){
      console.log("Connected to the MongoDb Authentication")
      var collection = db.collection(user_name)
      collection.findOne({"document_type":"metadata"},function(err,item){
        switch(item.account_type){
          case 'machine':
          if(item.password == pass_word){
            res.setHeader('Set-Cookie',cookie.serialize('name',user_name),{httpOnly:true})
            res.render('home',{title:user_name ,menus: [{name:"Today's Data",url:"/machine/todays_data"},{name:"History",url:"/machine/history"},{name:"Stats",url:"/machine/stats"}]})
            break
          } else {
            res.render('index',{message:"Invalid Login"})
          }

          case 'admin':
          if(item.password == pass_word){
            res.setHeader('Set-Cookie',cookie.serialize('name',user_name),{httpOnly:true})
            res.render('home',{title:user_name ,menus: [{name:"Today's Report",url:"/admin/todays_report"},{name:"History",url:"/admin/history"},{name:"Stats",url:"/admin/stats"},{name:"Add New Machine",url:"/admin/new_machine"}]})
            break
          } else {
            res.render('index',{message:"Invalid Login"})
          }

          case 'superadmin':
          if(item.password == pass_word){
            res.setHeader('Set-Cookie',cookie.serialize('name',user_name),{httpOnly:true})
            res.render('home',{title:user_name ,menus: [{name:"Notifications",url:"/superadmin/notifications"},{name:"History",url:"/superadmin/history"}]})
            break
          } else {
            res.render('index',{message:"Invalid Login"})
          }

          default:
            res.render('index',{message:"Invalid Login"})
        }
      })
    } else {
      console.log(err)
    }
  })
})

module.exports = router

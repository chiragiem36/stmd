//importing modules
var router = require('express').Router()
var mongo = require('mongodb').MongoClient
var cookie = require('cookie')
var jwt = require('jsonwebtoken')

//router logic
router.post('/',function(req,res){
  console.log(req.body)
  var username = req.body.username
  var password = req.body.password
  mongo.connect('mongodb://localhost:27018/data',function(err,db){
    if(err){
      console.log(err)
      db.close()
    } else {
      console.log("connected to mongodb for authentication")
      db.collection("faculty").findOne({_id:username},function(err,item){
        if(err){
          console.log(err)
          db.close()
        } else {
          if(item == null || item == undefined){
            res.send("invalid login")
            db.close()
          } else {
            console.log(item)
            if(item.password == req.body.password){
              res.setHeader('Set-cookie',cookie.serialize('user',jwt.sign({name:username},'uit attendance login')),{expiresIn: '1hr',httpOnly:true})
              res.render('home',{title:""})
              db.close()
            } else {
              res.send("invalid login")
              db.close()
            }
          }
        }
      })

    }
  })
})

module.exports = router

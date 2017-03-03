//importing modules//
var router = require('express').Router()
var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var mongo = require('mongodb').MongoClient

//main logic of the route//
router.get('/',function(req,res){
  var cookies = cookie.parse(req.headers.cookie || '')
  if(!cookies){
    res.render('index',{message:""})
    db.close()
  } else {
    jwt.verify(cookies.user,'uit attendance login',function(err,decoded){
      if(err){
        res.render('index',{message:""})
      } else {
        console.log("JWT decoded:" + decoded)
        mongo.connect("mongodb://localhost:27018/uit",function(err,db){
          if(err){
            console.log(err)
            res.render('index',{message:""})
            db.close()
          } else {
            console.log("connected to mongodb for authentication using JWT")
            db.collection(decoded.name).findOne({_id:"metadata"},function(err,item){
              if(err){
                res.render('index',{message:""})
                db.close()
              } else {
                res.render('home',{title:""})
                db.close()
              }
            })
          }
        })
      }
      })

  }
})

module.exports = router

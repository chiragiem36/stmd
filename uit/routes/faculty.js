var router = require('express').Router()
var cookie = require('cookie')
var jwt = require('jsonwebtoken')
var mongo = require('mongodb').MongoClient

var months = ["january","february","march"]
var d = new Date()

router.get('/requestClassData',function(req,res){
  var cookies = cookie.parse(req.headers.cookie || '')
  if(!cookies){
    console.log(err)
    db.close()
  } else {
    jwt.verify(cookies.user,'uit attendance login',function(err,decoded){
      if(err){
        console.log(err)
        db.close()
      } else {
        mongo.connect('mongodb://localhost:27018/data',function(err,db){
          if(err){
            console.log(err)
            db.close()
          } else {
            db.collection("batch14").findOne({_id:"EC-A"},function(err,item){
              var students = item.students
              students.forEach(function(student,i){
                db.collection("batch14").update({_id:"EC-A"},{$push:{"attendance.IE":{"name":student.name,"enroll_number":student.enroll_number}}})
              })
            })
          }
        })
      }
    })
  }
})

router.get('/getStudentList/:class',function(req,res){
  var cookies = cookie.parse(req.headers.cookie || '')
  if(!cookies){
    console.log(err)
    db.close()
  } else {
    jwt.verify(cookies.user,'uit attendance login',function(err,decoded){
      if(err){
        console.log(err)
        db.close()
      } else {
        mongo.connect('mongodb://localhost:27018/data',function(err,db){
          if(err){
            console.log(err)
            db.close()
          } else {
            db.collection("batch14").findOne({_id:req.params.class},function(err,item){
              if(err){
                console.log(err)
                db.close()
              } else {
                res.json(item.students)
                db.close()
              }
            })
          }
        })
      }
    })
  }
})

router.post('/submitData',function(req,res){
  console.log(req.body)
  var cookies = cookie.parse(req.headers.cookie || '')
  if(!cookies){
    console.log(err)
    db.close()
  } else {
    jwt.verify(cookies.user,'uit attendance login',function(err,decoded){
      if(err){
        console.log(err)
        db.close()
      } else {
        mongo.connect('mongodb://localhost:27018/data',function(err,db){
          if(err){
            console.log(err)
            db.close()
          } else {
              data = req.body
              console.log(data)
              data.students.forEach(function(name,x){
                console.log(name)
                var query = {}
                query._id = "ec-a"
                var x = "attendance." + req.body.subject + ".name"
                query[x] = name
                var final = {}
                var y = "attendance." + req.body.subject + ".$." + months[req.body.month]
                final[y] = req.body.date
                console.log(query)
                console.log(final)
                db.collection("batch14").update(query,{$addToSet:final})
              })
            }
          })
        }
    })
  }
})

module.exports = router

//to upload student names

/*
var std = []
fs.readFile("student_list.txt",function(err,data){
  data = data.toString()
  var list = data.split("\n")
  console.log(list)
  for(var i=0;i<list.length;i=i+2){
    var obj = {}
    obj.enroll_number = list[i].replace("\r","")
    obj.name = list[i+1].replace("\r","")
    std.push(obj)
  }
  db.collection("batch14").update({_id:"ec-a"},{$set:{"students":std}})
  console.log(std)
})
*/

//to include students to the attendance element

/*

  db.collection("batch14").findOne({_id:"ec-a"},function(err,item){
    var students = item.students
    students.forEach(function(student,i){
      db.collection("batch14").update({_id:"ec-a"},{$push:{"attendance.IE":{"name":student.name}}})
    })
  })
*/

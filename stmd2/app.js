var express = require('express')
var app = express()
var bp = require('body-parser')

var authentication = require('./routes/authentication.js')
var machine = require('./routes/machine.js')
var admin = require('./routes/admin.js')
var edit = require('./routes/edit.js')

 app.set('views','./views')
 app.set('view engine','ejs')

 app.get('/',function(req,res){
	 res.render('index',{message:""})
 })

 app.use('/user',bp.urlencoded({extended:true}),authentication)
 app.use('/machine',bp.urlencoded({extended:true}),machine)
 app.use('/admin',admin)
 app.use('/edit',bp.urlencoded({extended:true}),edit)

 app.use(express.static('public'))
 app.use('/machine',express.static('public'))
 app.use('/admin',express.static('public'))
 app.use('/edit',express.static('public'))

 app.listen(3000)

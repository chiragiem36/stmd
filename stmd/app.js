var express = require('express')
var app = express()
var BP = require('body-parser')
var qs = require('qs')

var machine_id = ['CSM924','DVO8081','DVO8103','T-EXP3969','UNI8291','UNI8268','BCM','BCM','DGS367','DGS402','DGS433','BRM12','BRM-R-31','FRM1892','UTV006','UTV054','ATRT']

var authenticating = require('./modules/authentication').authenticating
var getting_data = require('./modules/authentication').getting_data
var sending_form = require('./modules/authentication').sending_form

var posting_machine_data = require('./modules/machine_data').posting_machine_data
var writing_machine_data = require('./modules/machine_data').writing_machine_data

var daily_data = require('./modules/admin_panel').daily
var weekly_data = require('./modules/admin_panel').weekly
var monthly_data = require('./modules/admin_panel').monthly

var date = new Date()
var Hours = date.getHours()
var Minutes = date.getMinutes()


app.set('views','./views')
app.set('view engine','ejs')

app.get('/',function(req,res){
	res.render('index',{message:" "})
})

app.use(express.static('public_html'))

app.post('/user',BP.urlencoded({extended: true}),authenticating,sending_form)

app.post('/machine_data',BP.urlencoded({extended: true}),posting_machine_data)

app.post('/daily',daily_data)
app.post('/weekly',function(req,res){
	console.log(machine_id)
	res.render('machines_list',{ 'machine_names' : machine_id})
})

app.get('*',function(req, res) {
    res.render("server_issue",{message: "404 ..... Resource not found", req_image:"images/resource_not_found.jpg"})
});

app.listen(4000)

 

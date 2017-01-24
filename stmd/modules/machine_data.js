var fs = require('fs')
var join = require('path').join
var bp = require('body-parser')

var name = require('../modules/authentication').machine_name

var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
var d = new Date()
var date = d.getDate()
var month = months[d.getMonth()].toUpperCase()

exports.posting_machine_data = function (req,res,next){
		req.body.submit_time = d
		var the_name = name(5).toLowerCase()
		console.log(req.body.machine_name)
		console.log(req.body)
		req.body.month_name = month
		if(req.body.machine_name == undefined || req.body.machine_name == null || req.body.machine_name == ""){
			req.body.machine_name = the_name
		} else {
			
		}
		console.log(req.body.machine_name)
				fs.stat(join("data",month),function(err,stats){
					if(err){
						if(err.code=="ENOENT"){
								console.log("Start of the New Month - Creating new Month Directory: ", month)
								fs.mkdir(join("data",month),function(err){
									if(err){
										console.log("Internal server Error, while creating New Month Directory: ", month)
										internal_server_error(res)
									} else {
										console.log("New Month Directory Created: ", month)
										month_directory_exist(req,res)
									}
								})
						} else {
							console.log("Internal server Error")
							internal_server_error(res)
						}
					} else {
						month_directory_exist(req,res)
					}
	})
	
}

function month_directory_exist(req,res){
	
	
				fs.stat(join("data",month,date.toString()),function(err,stats){
					if(err){
						if(err.code=="ENOENT"){
								console.log("Creating new Date Directory: ", date)
								fs.mkdir(join("data",month,date.toString()),function(err){
								if(err){
										console.log("Internal server Error, while creating New Date Directory")
										internal_server_error(res)
									} else {
										console.log("New Date Directory Created: ", date)
										date_directory_exist(req,res)
									}
							})
						}else {
							console.log("Internal server Error")
						internal_server_error(res) }
					} else{
						date_directory_exist(req,res)
					}
				})
}

function date_directory_exist(req,res){
				fs.writeFile(join("data",month,date.toString(),req.body.machine_name + '.txt'),JSON.stringify(req.body),function(err){
					if(err) throw err
				})
				res.render('server_issue',{ message: "You will be redirected back to HOME in 5 seconds", req_image: "images/done.png"})
}

function internal_server_error(res){
	res.render('server_issue',{ message : "Internal Server Error", req_image: "images/server_error.gif"})
}
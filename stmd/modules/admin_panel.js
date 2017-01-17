var	months = ['January','February','March','April','May','June','July','August','September','October','November','December']
var fs = require('fs')
var join = require('path').join

var machine_names = ['CSM924','DVO8081','DVO8103','T-EXP3969','UNI8291','UNI8268','BCM','BCM','DGS367','DGS402','DGS433','BRM12','BRM-R-31','FRM1892','UTV006','UTV054','ATRT']

var d = new Date()
var date = d.getDate()
var Hours = d.getHours()
var Minutes = d.getMinutes()
var month = months[d.getMonth()].toUpperCase()
var day = d.getDay()


exports.daily = function(req,res){
			var machine_object1
			var data_object = {
	machines:[]
}
			fs.stat(join('data',month,date.toString()),function(err,stats){
				if(err){
					res.render('server_issue',{message: "Data Not Found for Today", req_image:"images/server_error.gif"})
				} else {
					var files = fs.readdirSync(join('data',month,date.toString()))
					for(var i=0; i<files.length;i++){
							var data = fs.readFileSync(join('data',month,date.toString(),files[i]))
							var obj = JSON.parse(data)
							console.log(obj)
							data_object.machines.push(obj)
						}	
					
					}
					console.log(data_object)
				rendering_daily_data(data_object,res)
			})
}

exports.edit = function(req,res){

}


function rendering_daily_data(data_object,res){
			res.render('daily',data_object)
}

function rendering_weekly_data(data_object,res){
			res.render('weekly',data_object)
}


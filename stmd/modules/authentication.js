
var machine_id = ['CSM924','DVO8081','DVO8103','T-EXP3969','UNI8291','UNI8268','BCM','BCM','DGS367','DGS402','DGS433','BRM12','BRM-R-31','FRM1892','UTV006','UTV054','ATRT']
var machine_password = ['stdm','usdm']

var admin = "admin"
var admin_password = "admin"

var	months = ['January','February','March','April','May','June','July','August','September','October','November','December']

var date = new Date()
var Hours = date.getHours()
var Minutes = date.getMinutes()
var month = months[date.getMonth()]

exports.authenticating = function (req,res,next){
			user_name = req.body.userName
			pass_word = req.body.passWord
			console.log(req.body)
			console.log(user_name, ':',pass_word)
			var index = machine_id.indexOf(user_name)
			
			if(user_name.length>0 && pass_word.length>0){
				if( index >=0 ){
					if(machine_password[index] == pass_word){
						if( Hours<21){
							next()
						}else {
							res.render('server_issue',{message:"Timed Out",req_image:"images/late.jpg"})}
						} else { 
							res.render('index',{message:"invalid username or password"}) } 
							} else if( index<0 && user_name == admin ){
								if( pass_word == admin_password){
									admin_home(req,res)
									} else {
							res.render('index',{message:"Are you sure You work here??"}) }
						
					} else {
				res.render('index',{message:"Are you sure You work here??"}) }
				} else {
				res.render('index',{message:"Login is not possible without username and password"}) }
}

exports.sending_form = function (req,res){
	machine_name = req.body.userName
	data_object = {
		'month_name' : month,
		'machine_name' : machine_name
	}
	
	res.render('private', data_object)
}

exports.machine_name = function(x){
			return user_name
}

function admin_home(req,res){
			res.render('admin_home',{option2:"Weekly Report",option1:"Today's Report" ,option3:"Monthly Rep."})
}
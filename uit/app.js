//  imporitng core node modules
var express=require('express')
var app = express()
var bp = require('body-parser')

//importing routes
var authentication = require('./routes/authentication.js')
var login = require('./routes/login')
var faculty = require('./routes/faculty')

app.set('views','./views')
app.set('view engine','ejs')

app.use(authentication)
app.use('/login',bp.urlencoded({extended:true}),login)
app.use('/faculty',bp.json(),faculty)

app.use(express.static('public'))
app.use('/login',express.static('public'))

app.listen(process.env.PORT || 3000 )

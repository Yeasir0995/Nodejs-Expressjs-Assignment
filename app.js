//declaration
var express = require('express');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var signup = require('./controllers/signup');
var admin = require('./controllers/admin/admin');
//var user = require('./controllers/user');
var exUpload 	= require('express-fileupload');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
const toastr = require('express-toastr');
//configuration
app.set('view engine', 'ejs');


//middleware 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(exUpload());
app.use('/public', express.static(process.cwd() + '/public'));

//app.use(bodyParser());
app.use('/login', login);
app.use('/signup', signup);
app.use('/admin', admin);
//app.use('/user', user);

app.use('/logout', logout);

//routes
app.get('/', function (req, res) {
	res.render('welcome/index');
});
/*app.get('/fileupload', function(req, res){
	res.render("fileupload/index");
});

app.post('/fileupload', function(req, res){
	var file = req.files.myfile;
	
	console.log(file);

	file.mv('./assets/'+file.name, function(error){
		
		if(error == null){
			res.send('success');
		}else{
			res.send('error');
		}
	});
});
*/

//server startup
app.listen(3000, function () {
	console.log('node server started at 3000!');
});
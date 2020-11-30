var express = require('express');
var router = express.Router();

var adminModel = require.main.require('./models/admin-model');
router.get('/', function (req, res) {
	res.render('login/index');
});

router.post('/', function (req, res) {
	if (req.body.usertype == "Admin") {
		var user = {
			username: req.body.uname,
			password: req.body.password
		};
		adminModel.validate(user, function (status) {
			if (status) {
				res.cookie('uname', req.body.uname);
				res.redirect('/admin');
			} else {
				res.render('login/error');
			}
		});
	} else if (req.body.usertype == "user") {
		var user = {
			username: req.body.uname,
			password: req.body.password
		};
		managerModel.validate(user, function (status) {
			if (status) {
				res.cookie('uname', req.body.uname);
				res.redirect('/doctor');
			} else {
				res.render('login/error');
			}
		});
	}  else {
		res.send('invalid username/password');
	}
});

module.exports = router;
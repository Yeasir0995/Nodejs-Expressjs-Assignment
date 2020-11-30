var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var signupModel = require.main.require('./models/signup-model');
const {check, validationResult}= require('express-validator');
var urlencodedParser = bodyParser.urlencoded({
	extended: true
});
router.get('/', function (req, res) {
	var user = {
		id:null,
		fname: null,
		lname: null,
		username: null,
		password: null,
		email: null,
    	phone: null,
		bloodgroup: null,
		type: null,
		cpassword: null
	};
	var error = user;
	res.render('signup/index', {
		user: user,
		error: error
	});
});

router.post('/', urlencodedParser, [
	check('fname', 'First Name must be in upperCase').isUppercase(),
	check('lname', 'Last Name must be in upperCase').isUppercase(),
	check('username', 'Last Name must be in lowerCase').isLowercase(),
	check('email', 'Email must be in ex:something@example.com').isEmail(),
	check('usertype', 'must select').not().isEmpty(),
	check('phonenumber', 'Length must be 11').isLength({
		min: 11,
	}),
	
	check('password', 'password must be at least 8 chars long').isLength({
		min: 8
	}).custom((value, {
		req,
		loc,
		path
	}) => {
		if (value !== req.body.cpassword) {
			throw new Error("Passwords don't match");
		} else {
			return value;
		}
	}),
], function (req, res) {
	const error = validationResult(req);
	var user = {
		id: req.body.id,
		fname: req.body.fname,
		lname: req.body.lname,
		username: req.body.username,
		usertype: req.body.usertype,
		password: req.body.password,
		email: req.body.email,
	
		phonenumber: req.body.phone,
		bloodgroup: req.body.bloodgroup,
		type: req.body.type,
		cpassword: req.body.cpassword,
		
	};
	if (error.isEmpty()) {
		signupModel.insert(user, function (status) {
			if (status) {
				res.render('signup/success');
			} else {
				res.render('signup/index', {
					user: user,
					error: error.mapped()
				});

			}
		});
	} else {
		res.render('signup/index', {
			user: user,
			titile: "sigup details",
			error: error.mapped()
		});
	}

});
module.exports = router;
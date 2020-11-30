var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	var data ={
		name: '',
		id: '',
		data:{
			version: 2
		}
	};	
	res.render('home/index', data);
});

module.exports = router;
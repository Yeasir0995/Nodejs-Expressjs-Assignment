var express = require('express');
var router = express.Router();
var adminModel = require.main.require('./models/admin-model');
var bookListModel = require.main.require('./models/bookListModel');

router.get('*', function (req, res, next) {
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});
router.get('/', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/index', {
			user: result
		});
	});
});

router.get('/profile', function (req, res) {
	adminModel.getByUname(req.cookies['uname'], function (result) {
		res.render('admin/profile', {
			user: result
		});
	});

});

router.post('/profile', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			name: req.body.name,
			username: req.body.uname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
		};

		adminModel.updateProfile(user, function (status) {
			if (status) {
				res.redirect('/admin');
			} else {
				res.redirect('/admin/profile');
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/addBook', function (req, res) {
	var user = {
	     	id: '',
			bookName:'',
		
			
		   price: '',
		  category: '',
		
	};
	res.render('admin/addBook', {
		user: user
	});

});
router.post('/addBook', function (req, res) {
	if (req.body.password == req.body.cpassword) {
		var user = {
			id: req.body.id,
			bookName: req.body.bookName,
	
		   price: req.body. price,
		   category: req.body.category,
			//password: req.body.password,
	
		};
		adminModel.insert(user, function (status) {
			if (status) {
				res.redirect('/admin/view_BookList');
			} else {
				res.render('admin/addBook', {
					user: user
				});
			}
		});
	} else {
		res.send('password mismatch');
	}
});
router.get('/updateBook', function (req, res) {
	var user = {
	     	id: '',
			bookName:'',
		
			
		   price: '',
		  category: '',
		
	};
	res.render('admin/updateBook', {
		user: user
	});

});
router.post('/updateBook', function (req, res) {
	var user = {
	     	id: req.body.id,
			 bookName: req.body.bookName,
		
			
		   price: req.body.price,
		  category: req.body.category,
		
	};
	adminModel.updateBookList(user, function (status) {
		if (status) {
			res.redirect('/admin/view_BookList');
		} else {
			res.render('admin/updateBook');
		}
	});
	res.render('admin/updateBook', {
		user: user
	});

});

router.get('/view_BookList', function (req, res) {
	adminModel.getAllBook(function (results) {
		if (results.length > 0) {
			res.render('admin/view_BookList', {
				userlist: results
			});
		} else {
			res.render('admin/view_BookList', {
				userlist: results
			});
		}
	});

});

router.get('/view_Member', function (req, res) {
	adminModel.getAllMember(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Member', {
				userlist: results
			});
		} else {
			res.render('admin/view_Member', {
				userlist: results
			});
		}
	});

});


router.get('/view_BookList/:username', function (req, res) {
	adminModel.getAllBook(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'booklist'
		});
	});

});

router.get('/view_Member/:username', function (req, res) {
	adminModel.getMemberProfile(req.params.username, function (result) {
		res.render('admin/getProfile', {
			user: result,
			table: 'member'
		});
	});

});
/*router.get('/booklist/:id', function (req, res) {
	adminModel.getDoctorProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		adminModel.doctorStatus(user, function (status) {
			if (status) {
				adminModel.getDoctorProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'doctorinfo'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
*/

router.get('/member/:username', function (req, res) {
	adminModel.getMemberProfile(req.params.username, function (result) {
		if (result.status == "block") {
			var user = {
				username: req.params.username,
				status: 'unblock'
			};
		} else {
			var user = {
				username: req.params.username,
				status: 'block'
			};
		}
		adminModel.MemberStatus(user, function (status) {
			if (status) {
				adminModel.getMemberProfile(req.params.username, function (result) {
					res.render('admin/getProfile', {
						user: result,
						table: 'member'
					});
				});
			} else {
				res.send('error');
			}
		});

	});
});
router.get('/view_Available', function (req, res) {
	adminModel.getAllAvailableSlot(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Available', {
				userlist: results
			});
		} else {
			res.render('admin/view_Available', {
				userlist: results
			});
		}
	});

});
router.get('/view_Order', function (req, res) {
	adminModel.getAllOrder(function (results) {
		if (results.length > 0) {
			res.render('admin/view_Order', {
				userlist: results
			});
		} else {
			res.render('admin/view_Order', {
				userlist: results
			});
		}
	});

});
router.post('/view_Order', function (req, res) {
	adminModel.getAllOrder(function (results) {
		if (results.length > 0) {
			res.redirect('admin/view_Order', {
				userlist: results
			});
		} else {
			res.render('admin/', {
				userlist: results
			});
		}
	});

});


router.get('/changeBookList', function (req, res) {
	res.render('admin/changeBookList');

});
router.get('/view_Booked', function (req, res) {
	res.render('admin/view_Booked');

});

router.get('/notice', function (req, res) {
	var user= {
		id: '',
		date: '',
		statement: '',
		
	};
	res.render('admin/notice', {
		 user:user
	});

});
router.post('/notice',function(req,res){
	var user= {

		id:req.body.id,
		date:req.body.date,
		statement:req.body.statement,

	};
adminModel.addNotice(user,function (status) {
	if (status) {
		res.redirect('/admin');
	} else {
		res.render('admin/notice', {
			user:user
		});
	}
});
});
router.get('/fileupload', function(req, res){
	res.render("admin/fileupload");
});
router.post('/fileupload', function(req, res){
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
router.get('/delete/:id', (req, res)=>{
	var user ={
		id: req.params.id,
		bookName: req.body.bookName,
		
		price:req.body.price,
		category:req.body.category,
	};

	res.render('admin/delete',{
	user:user
});
});

router.post('/delete/:id', (req, res)=>{
	var user ={
		id: req.params.id,
		bookName: req.body.bookName,
		
		price:req.body.price,
		category:req.body.category,
	};
	bookListModel.delete(user,function (status) {
		if (status) {
			res.redirect('/admin/view_BookList');
		} else {
			res.render('admin/delete', {
				user:user
			});
		}
	});
	
});
router.get('/addBook', (req, res)=>{
	bookListModel.getAll(function(results){
	 
	 res.render('admin/addBook', {userlist: results});
	 });
	 
 });
 
 
 router.post('/addBook', (req, res)=>{
	 
	 var user = {
 
		    id :req.params.id, 
			bookName: req.body.bookName,
			price:req.body.price, 
			 category:req.body.category, 
			
		 
	 };
	 console.log(user);
	 
	  bookListModel.insert(user,function(status){
		 if(status){
			 console.log("inside insertion");
			 bookListModel.getAll(function(results){
			 
			 res.redirect('/admin/view_Book', {userlist: results});
			 });
			 console.log("did not insert");
			
			 res.render('admin/addBook');
		 }
	 });
		 
	 
 });
		


module.exports = router;
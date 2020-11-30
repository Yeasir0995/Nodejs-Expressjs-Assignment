var db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from booklist where bookName=? and id=?"; 
		db.getResults(sql, [user.bookName, user. id], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getsearch: function(id,callback){
		var sql= "select * from booklist where bookName=? like %?%'";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},

	getById: function(id,callback){
		var sql= "select * from booklist where id=? ";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	},
	
	getByname: function(name,callback){
		var sql= "select * from booklist where  bookName=? ";
		db.getResults(sql, [name], function(results){
			callback(results);
		});
	},

	
	
	getAll: function(callback){
		var sql = "select * from booklist";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "insert into booklist VALUES (?, ?, ?, ?,?)";

		db.execute(sql, ['', user.id,user.bookName, user.price, user.category], function(status){
			callback(status);
		});
	},
	update: function(user,callback){
        var sql = "UPDATE booklist SET  id= ?,bookName = ?, price =?, category= ?, WHERE id = ? ";

		db.execute(sql, [user.id,user.bookName, user.price, user.category], function(status){
			callback(status);
		});
	},
	delete: function(user,callback){ // check if i am sending an object in user or a single value
        var sql = "DELETE FROM booklist WHERE id= ? ";

		db.execute(sql, [ user.id], function(status){
			callback(status);
        
	    });
    }
}
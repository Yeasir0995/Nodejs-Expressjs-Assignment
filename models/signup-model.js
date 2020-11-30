var db = require('./db');

module.exports = {
	insert: function (user, callback) {
		if (user.usertype == "") {
			var sql = "insert into admin values(?,?,?,?,?,?)";
			db.execute(sql, [user.id,user.username, user.password, user.email, user.phon,user.address,], function (status) {
				if (status) {
					callback(true);
				} else {
					callback(false);
				}
			});
		} else if (user.usertype == "member") {
			var sql = "insert into member values(?,?,?,?,?,?)";
			db.execute(sql, [user.id,user.fname,user.username, user.password, user.email, user.phone,], function (status) {
				if (status) {
					callback(true);
				} else {
					callback(false);
				}
			});
		} else {
			console.log("select type");
		}
	}
}
const db = require('./db');

module.exports = {

    getCart: function(id, callback) {
        var sql = "select * from carts JOIN booklist on carts.cart_Id =booklist.id where carts.u_Id= '" + id + "'";;
        db.getResults(sql, function(results) {
            callback(results);
        });

    },
    addCart: function(id1, id2, callback) {
        var sql = "insert into carts VALUES ('', '" + id1 + "' , '" + id2 + "')";

        db.execute(sql, function(status) {
            callback(status);
        });
    },
}
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM ambassador;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(coupon_code, callback) {
    var query = 'SELECT * FROM ambassador WHERE coupon_code = ?';
    var queryData = [coupon_code];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO ambassador (coupon_code, instagram_name, email, fname, lname, city, state) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.coupon_code, params.instagram_name, params.email, params.fname, params.lname, params.city, params.state];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.update = function(params, callback) {
    var query = 'UPDATE ambassador SET instagram_name = ?, email = ?, fname = ?, lname = ?, city = ?, state = ? WHERE coupon_code = ?';
    var queryData = [params.instagram_name, params.email, params.fname, params.lname, params.city, params.state, params.coupon_code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(coupon_code, callback) {
    var query = 'DELETE FROM ambassador WHERE coupon_code = ?';
    var queryData = [coupon_code];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};


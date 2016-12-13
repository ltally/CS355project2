var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM customer;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(customer_id, callback) {
    var query = 'SELECT email, fname, lname, ifambassador FROM customer WHERE customer_id = ?';
    var queryData = [customer_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO customer (customer_id, email, fname, lname, ifambassador) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.customer_id, params.email, params.fname, params.lname, params.ifambassador];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.update = function(params, callback) {
    var query = 'UPDATE customer SET email = ?, fname = ?, lname = ?, ifambassador = ? WHERE customer_id = ?';
    var queryData = [params.email, params.fname, params.lname, params.ifambassador, params.customer_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(customer_id, callback) {
    var query = 'DELETE FROM customer WHERE customer_id = ?';
    var queryData = [customer_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

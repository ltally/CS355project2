var express = require('express');
var router = express.Router();
var customer_dal = require('../model/customer_dal');


// View All customers
router.get('/all', function(req, res) {
    customer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('customer/customerViewAll', { 'result':result });
        }
    });

});

// View the customer for the given id
router.get('/', function(req, res){
    if(req.query.customer_id == null) {
        res.send('customer_id is null');
    }
    else {
        customer_dal.getById(req.query.customer_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('customer/customerViewById', {'result': result});
            }
        });
    }
});

// Return the add a new customer form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    customer_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAdd', {'customer': result});
        }
    });
});

// insert an customer record
router.get('/insert', function(req, res){
    //simple validation
    if(req.query.email == null) {
        res.send('Email must be provided.');
    }
    else if(req.query.fname == null){
        res.send('A first name must be selected');
    }
    else if(req.query.lname == null){
        res.send('A last name must be selected');
    }
    else if(req.query.ifambassador == null){
        res.send('You must select whether or not this customer is an ambassador');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        customer_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/customer/all');
            }
        });
    }
});

// Delete an customer for the given customer_id
router.get ('/delete', function(req, res){
    if(req.query.customer_id == null) {
        res.send('customer_id is null');
    }
    else {
        customer_dal.delete(req.query.customer_id, function(err,result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/customer/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    customer_dal.update(req.query, function (err, result) {
        res.redirect(302, '/customer/all');
    });
});

module.exports = router;

router.get('/edit2', function(req, res){
    if(req.query.customer_id == null) {
        res.send('A coupon code is required');
    }
    else {
        customer_dal.getById(req.query.customer_id, function(err, result){
            res.render('customer/customerUpdate', {'result': result});
        });
    }
});

module.exports = router;

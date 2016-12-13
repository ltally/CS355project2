var express = require('express');
var router = express.Router();
var ambassador_dal = require('../model/ambassador_dal');


// View All ambassadors
router.get('/all', function(req, res) {
    ambassador_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('ambassador/ambassadorViewAll', { 'result':result });
        }
    });

});

// View the ambassador for the given id
router.get('/', function(req, res){
    if(req.query.coupon_code == null) {
        res.send('coupon_code is null');
    }
    else {
        ambassador_dal.getById(req.query.coupon_code, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('ambassador/ambassadorViewById', {'result': result});
            }
        });
    }
});

// Return the add a new ambassador form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    ambassador_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('ambassador/ambassadorAdd', {'ambassador': result});
        }
    });
});

// insert an ambassador record
router.get('/insert', function(req, res){
    //simple validation
    if (req.query.coupon_code == null){
        res.send('Coupon Code must be entered.');
    }
    else if(req.query.instagram_name == null) {
        res.send('Instagram name must be provided.');
    }
    else if(req.query.fname == null){
        res.send('A first name must be selected');
    }
    else if(req.query.lname == null){
        res.send('A last name must be selected');
    }
    else if(req.query.email == null){
        res.send('An email must be selected');
    }
    else if(req.query.city == null) {
        res.send('A city must be selected');
    }
    else if(req.query.state == null) {
        res.send('A state must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        ambassador_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/ambassador/all');
            }
        });
    }
});

// Delete an ambassador for the given coupon_code
router.get ('/delete', function(req, res){
    if(req.query.coupon_code == null) {
        res.send('coupon_code is null');
    }
    else {
        ambassador_dal.delete(req.query.coupon_code, function(err,result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/ambassador/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    ambassador_dal.update(req.query, function (err, result) {
        res.redirect(302, '/ambassador/all');
    });
});

module.exports = router;

router.get('/edit2', function(req, res){
    if(req.query.coupon_code == null) {
        res.send('A coupon code is required');
    }
    else {
        ambassador_dal.getById(req.query.coupon_code, function(err, result){
            res.render('ambassador/ambassadorUpdate', {'result': result});
        });
    }
});

module.exports = router;
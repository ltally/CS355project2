var express = require('express');
var router = express.Router();
var about_dal = require('../model/about_dal');


// View About Page
router.get('/all', function(req, res) {
    res.render('about/aboutViewAll');


});

module.exports = router;


var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

router.get('/', function(req, res, next) {
	connection.query('select * from category', function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.get('/:id', function(req, res, next) {
	connection.query('select * from category where category_id=?', [req.params.id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.post('/', function(req, res, next) {

	req.checkBody('name', 'Invalid name').notEmpty();

	var errors = req.validationErrors();

	if(!errors) {
	 	connection.query('insert into category(name) values(?)', 
	 		[req.body.name], function (err, rows, fields) {

			if (err) 
				throw err
		  
		  	res.json(rows);
		});
	 } else {
	 	res.status(500).send('Invalid data');
	 }
});

router.patch('/:id', function(req, res, next) {
 	connection.query('update category set name = ? ' +
 		'where category_id = ?', 
 		[req.body.name, req.params.id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});


module.exports = router;

var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

router.get('/', function(req, res, next) {
	connection.query('select * from product', function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.get('/:id', function(req, res, next) {
	connection.query('select * from product where product_id=?', [req.params.id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.post('/', function(req, res, next) {
 	connection.query('insert into product(name, description, price, image, category_id) values(?, ?, ?, ?, ?)', 
 		[req.body.name, req.body.description, req.body.price, 
 			req.body.image, req.body.category_id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.delete('/:id', function(req, res, next) {
 	connection.query('delete from product where product_id = ?', 
 		[req.params.id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

router.patch('/:id', function(req, res, next) {
 	connection.query('update product set name = ?, ' + 
 		'description = ?, price = ?, image = ?, category_id = ? ' +
 		'where product_id = ?', 
 		[req.body.name, req.body.description, req.body.price, 
 		req.body.image, req.body.category_id, req.params.id], function (err, rows, fields) {

		if (err) 
			throw err
	  
	  	res.json(rows);
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

router.get('/', function(req, res, next) {
	connection.query('select p.product_id, p.name, p.description, p.price, p.image, ' + 
		'p.category_id, c.name as category_name from product p join category c on p.category_id = c.category_id', 
		function (err, rows, fields) {

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

	req.checkBody('name', 'Invalid name').notEmpty();
	req.checkBody('description', 'Invalid description').notEmpty();
	req.checkBody('price', 'Invalid price').isFloat();
	req.checkBody('image', 'Invalid image').notEmpty();
	req.checkBody('category_id', 'Invalid name').isInt();

	var errors = req.validationErrors();

	if(!errors) {
	 	connection.query('insert into product(name, description, price, image, category_id) values(?, ?, ?, ?, ?)', 
	 		[req.body.name, req.body.description, req.body.price, 
	 			req.body.image, req.body.category_id], function (err, rows, fields) {

			if (err) 
				throw err;
		  
		  	res.json(rows);
		});
	} else {
		res.status(500).send('Invalid data');
	}

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

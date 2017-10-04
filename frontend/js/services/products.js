angular
	.module('ngStore')
	.factory('productsService', function($http) {
	    
	    function getProducts() {
	        return $http.get('http://localhost:3000/api/products');
	    }

	    function getCategories() {
	        return $http.get('http://localhost:3000/api/categories');
	    }

	    function saveProduct(product) {
	        return $http.post('http://localhost:3000/api/products', product);
	    }

		function deleteProduct(product) {
	        return $http.delete('http://localhost:3000/api/products/' + product);
	    }	    

		function editProduct(product) {
	        return $http.patch('http://localhost:3000/api/products/' + product.product_id, product);
	    }	    

	    return {
	        getProducts: getProducts,
	        getCategories: getCategories,
	        saveProduct: saveProduct,
	        deleteProduct: deleteProduct,
	        editProduct: editProduct
	    };
	});

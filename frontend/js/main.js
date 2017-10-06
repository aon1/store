var app = angular
	.module('ngStore', ['ngMaterial', 'ui.router', 'ngMessages'])
	.config(function($stateProvider) {
		$stateProvider
			.state('products', {
			      url: '/products',
			      templateUrl: 'product/index.html',
			      controller: 'productController as vm'
			})
			.state('categories', {
			      url: '/categories',
			      templateUrl: 'category/index.html',
			      controller: 'categoryController as vm'
			})
			;
	});







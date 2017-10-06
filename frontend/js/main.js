var app = angular
	.module('ngStore', ['ngMaterial', 'ui.router', 'ngMessages'])
	.config(function($stateProvider, $urlServiceProvider, $urlRouterProvider) {
		
		//prevent error when trailing slash is present
		$urlServiceProvider.config.strictMode(false);

		$urlRouterProvider.otherwise('/products');

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
			});
			
	});







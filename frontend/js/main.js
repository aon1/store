var app = angular
	.module('ngStore', ['ngMaterial', 'ui.router'])
	.config(function($stateProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('docs-dark', 'default')
			.primaryPalette('yellow')
			.dark();

		$stateProvider
			.state('products', {
				url: '/products',
				templateUrl: 'product/index.html',
				controller: 'productController as vm'
			})
			.state('products.create', {
				url: '/create',
				templateUrl: 'product/new2.html',
				controller: 'createProductController as vm'
			})
			.state('products.edit', {
				url: '/edit/:id',
				templateUrl: 'product/edit.html',
				controller: 'editProductController as vm',
				params: {
					product: null
				}
			})
			.state('products.remove', {
				url: '/remove/:id',
				templateUrl: '',
				controller: 'removeProductController as vm',
				params: {
					product: null
				}
			});
	});







angular
	.module('ngStore')
	.controller('removeProductController', function($scope, $state, productsService) {

    var vm = this;

    vm.remove = remove;
    vm.product = $state.params.product;

    function remove(product) {
    	console.log(product);
        if(product) {
            productsService.deleteProduct(product.product_id).then(function(data) {
                $state.go('products');
            });    
        }
    }
});
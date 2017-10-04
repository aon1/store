angular
	.module('ngStore')
	.controller('createProductController', function($scope, $state, productsService) {

    var vm = this;

    vm.categories;
    vm.create = create;
    vm.cancel = cancel;

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function create(product) {
        if(product) {
            productsService.saveProduct(product).then(function(data) {
                $state.go('products');
            });    
        }
    }

    function cancel() {
        $state.go('products');
    }
});
angular
	.module('ngStore')
	.controller('editProductController', function($scope, $state, productsService) {

    var vm = this;

    vm.categories;
    vm.edit = edit;
    vm.cancel = cancel;
    vm.product = $state.params.product;

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function edit(product) {
        if(product) {
            productsService.editProduct(product).then(function(data) {
                $state.go('products', {}, { reload: true });
            });    
        }
    }

    function cancel() {
        $state.go('products');
    }
});
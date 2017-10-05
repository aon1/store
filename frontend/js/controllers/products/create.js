angular
	.module('ngStore')
	.controller('createProductController', function($scope, $location, $state, productsService) {

    var vm = this;

    vm.categories;
    vm.create = create;
    vm.cancel = cancel;

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function create(product) {
        console.log(product);
        if(product) {
            productsService.saveProduct(product).then(function(data) {
                $state.go('products', {}, { reload: true });
            });    
        }
    }

    function cancel() {
        $state.go('products');
    }
});
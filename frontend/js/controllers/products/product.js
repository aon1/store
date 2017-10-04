angular
	.module('ngStore')
	.controller('productController', function($scope, $state, productsService, $mdDialog, $mdToast) {

    var vm = this;

    vm.create = create;
    vm.edit = edit;
    vm.remove = remove;
    
    vm.products;
    vm.categories;

    productsService.getProducts().then(function(data) {
        vm.products = data.data;
    });

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function create() {
        $state.go('products.create');
    }

    function edit(product) {
        $state.go('products.edit', {
            id: product.product_id,
            product: product
        });
    }

    function remove(event, product) {
        var confirm = $mdDialog.confirm()
            .title("Are you sure?")
            .ok("Yes")
            .cancel("No")
            .targetEvent(event);

        $mdDialog.show(confirm).then(function() {
            productsService.deleteProduct(product.product_id).then(function(data) {
                showToast("Classified deleted");
            });
            
        }, function() {

        });
    }

    function showToast(message) {
        $mdToast.show($mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000));
    }
});
angular
	.module('ngStore')
	.controller('productController', function($scope, $rootScope, $state, productsService, $mdDialog, $mdToast) {

    var vm = this;

    vm.create = create;
    vm.edit = edit;
    vm.remove = remove;
    vm.createProductDialog = createProductDialog;
    vm.editDialog = editDialog;
    
    vm.products;
    vm.categories;

    productsService.getProducts().then(function(data) {
        vm.products = data.data;
    });

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function create(event) {
        $state.go('products.create');
    }

    // function edit(product) {
    //     $state.go('products.edit', {
    //         id: product.product_id,
    //         product: product
    //     });
    // }

    function editDialog(event, product) {
        $mdDialog.show({
            controller: edit,
            controllerAs: 'vm',
            templateUrl: 'product/edit2.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: {
                product: product
            }
        });
    }

    function edit($scope, $mdDialog, locals) {
        $scope.product = locals.product;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(product) {
            $mdDialog.hide(product);
            productsService.editProduct(product).then(function(data) {
                $state.go('products', {}, { reload: true });
            });    
            
        };
    }

    function remove(event, product) {
        var confirm = $mdDialog.confirm()
            .title("Are you sure?")
            .ok("Yes")
            .cancel("No")
            .targetEvent(event);

        $mdDialog.show(confirm).then(function() {
            productsService.deleteProduct(product.product_id).then(function(data) {
                $state.go('products', {}, { reload: true });
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

    function createProductDialog(event) {
        $mdDialog.show({
            controller: saveProduct,
            templateUrl: 'product/new2.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };

    function saveProduct($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(product) {
            $mdDialog.hide(product);
            productsService.saveProduct(product).then(function(data) {
                $state.go('products', {}, { reload: true });
            });
        };
    }
});
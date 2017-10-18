angular
	.module('ngStore')
	.controller('productController', ['$scope', '$rootScope', '$state', 
        'productsService', 'categoriesService', '$mdDialog', '$mdToast', function($scope, $rootScope, $state, 
        productsService, categoriesService, $mdDialog, $mdToast) {

    var vm = this;

    vm.editProduct = editProduct;
    vm.remove = remove;
    vm.createDialog = createDialog;
    vm.editDialog = editDialog;
    vm.showFilters = showFilters;
    
    vm.products;
    vm.categories;
    vm.filterDiv = false;

    productsService.getProducts().then(function(data) {
        vm.products = data.data;
    });

    categoriesService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function editDialog(event, product) {
        $mdDialog.show({
            controller: editProduct,
            controllerAs: 'vm',
            templateUrl: 'product/edit.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: {
                product: product,
                categories: vm.categories
            }
        });
    }

    function editProduct($scope, $mdDialog, locals) {
        $scope.product = locals.product;
        $scope.categories = locals.categories;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(product) {
            $mdDialog.hide(product);
            productsService.editProduct($scope.product).then(function(data) {
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
                showToast("Product deleted");
            });
            
        }, function() {

        });
    }

    function showFilters() {
        vm.filterDiv = vm.filterDiv ? false : true;
    }

    function showToast(message) {
        $mdToast.show($mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000));
    }

    function createDialog(event) {
        $mdDialog.show({
            controller: createProduct,
            templateUrl: 'product/create.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: {
                categories: vm.categories
            }
        });
    };

    function createProduct($scope, $mdDialog, locals) {
        $scope.categories = locals.categories;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(product) {
            productsService.saveProduct(product).then(function(data) {
                $mdDialog.hide(product);
                $state.go('products', {}, { reload: true });
            });
        };
    }
}]);
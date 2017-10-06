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

    // function create(product) {
    //     if(product) {
    //         productsService.saveProduct(product).then(function(data) {
    //             $state.go('products', {}, { reload: true });
    //         });    
    //     }
    // }

    function create(event) {
        $mdDialog.show({
            controller: saveProduct,
            templateUrl: '1',
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
         console.log(product);
         $mdDialog.hide(product);
         productsService.saveProduct(product).then(function(data) {
             console.log(data);
         });
        };
    }

    function cancel() {
        $state.go('products');
    }
});
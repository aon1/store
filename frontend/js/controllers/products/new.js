angular
	.module('ngStore')
	.controller('newProductController', function($scope, $state, productsService, $mdSidenav, $mdDialog) {

    var vm = this;

    vm.categories;
    vm.new = save;
    vm.cancel = cancel;

    productsService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function save(product) {
        if(product) {
            productsService.saveProduct(product).then(function(data) {
                $state.go('products');
            });    
        }
    }

    function cancel() {
        $state.go('products');
    }

   //  function newProduct(event) {
   //      $mdDialog.show({
            // controller: saveProduct,
            // templateUrl: '1',
            // // parent: angular.element(document.body),
            // targetEvent: event,
            // clickOutsideToClose: true
   //      });
   //  };

    // function saveProduct($scope, $mdDialog) {
    //     $scope.hide = function() {
    //     	$mdDialog.hide();
    //     };

    //     $scope.cancel = function() {
    //     	$mdDialog.cancel();
    //     };

    //     $scope.save = function(product) {
    //     	console.log(product);
    //     	$mdDialog.hide(product);
    //     	productsService.saveProduct(product).then(function(data) {
    //     	    console.log(data);
    //     	});
    //     };
    // }
})
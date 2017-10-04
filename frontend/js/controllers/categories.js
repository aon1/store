angular
	.module('ngStore')
	.controller('categoryController', function($scope, $http, categoriesService) {
    
    categoriesService.getCategories().then(function(data) {
        $scope.categories = data.data;
    });

   //  $scope.newProductDialog = function(event) {
   //      $mdDialog.show({
			// controller: saveProduct,
			// templateUrl: 'product/new.html',
			// parent: angular.element(document.body),
			// targetEvent: event,
			// clickOutsideToClose: true,
   //        	fullscreen: true
   //      });
   //  };

   //  function saveProduct($scope, $mdDialog) {
   //      $scope.hide = function() {
   //      	$mdDialog.hide();
   //      };

   //      $scope.cancel = function() {
   //      	$mdDialog.cancel();
   //      };

   //      $scope.save = function(product) {
   //      	console.log(product);
   //      	$mdDialog.hide(product);
   //      	productsService.saveProduct(product).then(function(data) {
   //      	    console.log(data);
   //      	});
   //      };
   //    }
})
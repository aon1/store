angular
	.module('ngStore')
	.controller('categoryController', function($scope, $rootScope, $state, 
        categoriesService, $mdDialog, $mdToast) {

    var vm = this;

    vm.createDialog = createDialog;
    vm.editDialog = editDialog;
    vm.showFilters = showFilters;
    
    vm.categories;
    vm.filterDiv = false;

    categoriesService.getCategories().then(function(data) {
        vm.categories = data.data;
    });

    function showFilters() {
        vm.filterDiv = vm.filterDiv ? false : true;
    }

    function createDialog(event) {
        $mdDialog.show({
            controller: createCategory,
            templateUrl: 'category/create.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
        });
    };

    function createCategory($scope, $mdDialog) {

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(category) {
            categoriesService.saveCategory(category).then(function(data) {
                $mdDialog.hide(category);
                $state.go('categories', {}, { reload: true });
            });
        };
    }

    function editDialog(event, category) {
        $mdDialog.show({
            controller: editCategory,
            controllerAs: 'vm',
            templateUrl: 'category/edit.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            locals: {
                category: category
            }
        });
    }

    function editCategory($scope, $mdDialog, locals) {
        $scope.category = locals.category;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function(category) {
            $mdDialog.hide(category);
            categoriesService.editCategory($scope.category).then(function(data) {
                $state.go('categories', {}, { reload: true });
            });    
            
        };
    }
});
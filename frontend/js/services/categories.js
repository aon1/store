angular
	.module('ngStore')
	.factory('categoriesService', function($http) {

	    function getCategories() {
	        return $http.get('http://localhost:3000/api/categories');
	    }

	    function saveCategory(category) {
	        return $http.post('http://localhost:3000/api/categories', category);
	    }

	    return {
	        getCategories: getCategories,
	        saveCategory: saveCategory
	    };
	});

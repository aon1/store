angular
	.module('ngStore')
	.factory('categoriesService', function($http) {

	    function getCategories() {
	        return $http.get('http://localhost:3000/api/categories');
	    }

	    function saveCategory(category) {
	        return $http.post('http://localhost:3000/api/categories/' + category.category_id, category);
	    }

	    function editCategory(category) {
	        return $http.patch('http://localhost:3000/api/categories/' + category.category_id, category);
	    }

	    return {
	        getCategories: getCategories,
	        saveCategory: saveCategory,
	        editCategory: editCategory
	    };
	});

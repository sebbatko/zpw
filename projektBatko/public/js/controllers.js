var appControllers = angular.module('appControllers',['ui.bootstrap']);

appControllers.controller('RestaurantCtrl', ['$scope', 'filterFilter', 'RestaurantService', function($scope, filterFilter, RestaurantService) {

	$scope.search = {};
	RestaurantService.getMeals()
		.then(getMealsSuccess)
		.catch(getMealsError);

	function getMealsSuccess(response){
		$scope.meals = response.data;
		$scope.currentPage = 1;
		$scope.totalItems = $scope.meals.length;
		$scope.entryLimit = 10;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
	}

	function getMealsError(){
		console.log('Nie udało się pobrać potraw');
	}

	RestaurantService.getMealCategories()
		.then(getMealCategoriesSuccess)
		.catch(getMealCategoriesError);

	function getMealCategoriesSuccess(response){
		$scope.mealCategories = response.data;
	}

	function getMealCategoriesError(){
		console.log('Nie udało się pobrać kategorii potraw');
	}

	$scope.$watch('search', function (newVal, oldVal) {
		if(!angular.isUndefined($scope.meals)){
			$scope.filtered = filterFilter($scope.meals, newVal);
			$scope.totalItems = $scope.filtered.length;
			console.log('$scope.filtered:');
			console.log($scope.filtered);
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			$scope.currentPage = 1;
		}
	}, true);

}]);
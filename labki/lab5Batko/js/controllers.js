var appControllers = angular.module('appControllers',['ui.bootstrap']);

appControllers.controller('ShopCtrl', ['$scope', 'filterFilter', 'BasketService', 'ShopService', function($scope, filterFilter, BasketService, ShopService) {

	const SHOP_VIEW = 'SHOP_VIEW';
	const ADD_ARTICLE_VIEW = 'ADD_ARTICLE_VIEW';
	const BASKET_VIEW = 'BASKET_VIEW';
	const FORM_VIEW = 'FORM_VIEW';
	$scope.setActualView = setActualView;
	$scope.addArticle = addArticle;
	$scope.addToBasket = addToBasket;
	$scope.actualView = SHOP_VIEW;
	$scope.actualDate = new Date();
	$scope.addedArticleText = '';
	ShopService.query().$promise.then(function(data) {
		$scope.items = data;
		$scope.currentPage = 1;
		$scope.totalItems = $scope.items.length;
		$scope.entryLimit = 3;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
	}, function(error) {
		alert('Błąd przy pobieraniu danych');
	});
		// [
		// 	{nazwa: 'chleb', cena: 1.80, kategoria: 'Pieczywo'},
		// 	{nazwa: 'masło', cena: 4.30, kategoria: 'Nabiał'},
		// 	{nazwa: 'mleko', cena: 3.10, kategoria: 'Nabiał'},
		// 	{nazwa: 'czekolada', cena: 2.50, kategoria: 'Słodycze'},
		// 	{nazwa: 'bułka', cena: 0.60, kategoria: 'Pieczywo'},
		// 	{nazwa: 'baton', cena: 1.99, kategoria: 'Słodycze'},
		// 	{nazwa: 'pepsi', cena: 3.99, kategoria: 'Napoje'},
		// 	{nazwa: 'szynka', cena: 4.80, kategoria: 'Wędliny'},
		// 	{nazwa: 'lays', cena: 2.50, kategoria: 'Chipsy'},
		// 	{nazwa: 'majeranek', cena: 1.19, kategoria: 'Przyprawy'}
		// ];

	$scope.categories = ['Pieczywo', 'Nabiał', 'Słodycze', 'Napoje', 'Przyprawy'];

	$scope.getFewDaysLaterDate = function(days){
		var resultDate = new Date();
		resultDate.setDate(resultDate.getDate() + days);
		return resultDate;
	};

	$scope.search = {};

	$scope.resetFilters = function () {
		$scope.search = {};
	};



	$scope.$watch('search', function (newVal, oldVal) {
		if(!angular.isUndefined($scope.items)){
			$scope.filtered = filterFilter($scope.items, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			$scope.currentPage = 1;
		}
	}, true);


	function addArticle(articleNameToAdd, articlePriceToAdd, articleCategoryToAdd){
		if(!angular.isUndefined(articleNameToAdd) && !angular.isUndefined(articlePriceToAdd) && articleNameToAdd !== '' && articlePriceToAdd !== ''){
			$scope.items.push({nazwa: articleNameToAdd, cena: articlePriceToAdd, kategoria: articleCategoryToAdd});
			$scope.addedArticleText = 'Dodano artykuł: ' + articleNameToAdd;
		}else{
			$scope.addedArticleText = 'Wypełnij wszystkie pola!';
		}
	}

	function setActualView(selectedView){
		$scope.actualView = selectedView;
	}

	function addToBasket(article) {
		BasketService.addArticleToBacket(article);
	}

}]);

appControllers.controller('BasketCtrl', ['$scope', '$http', 'BasketService', function($scope, $http, BasketService) {
	$scope.articlesInBasket = BasketService.getArticlesInBasket();
}]);
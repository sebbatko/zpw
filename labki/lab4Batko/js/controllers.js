var appControllers = angular.module('appControllers',[]);

appControllers.controller('GalleryDetailCtrl', ['$scope', '$routeParams', 'Gallery', function($scope, $routeParams, Gallery) {
	$scope.galleryId = $routeParams.galleryId;

	$scope.selectedGallery = Gallery.get(
		{galleryId: $scope.galleryId}, function (response) {
			$scope.setImage(response.photos[0].photoUrl);
			console.log(response);
			return response;
		}
	);

	$scope.setImage = function (imageUrl) {
		$scope.mainImageUrl = imageUrl;
		console.log(imageUrl);
	}



	// $http
	// 	.get("json/" + $scope.galleryId + ".json")
	// 	.then(function(response){
	// 		$scope.selectedGallery = response.data;
    //
	// 		$scope.mainImageUrl = $scope.selectedGallery.photos[0].photoUrl;
	// 		$scope.setImage = function(imageUrl) {
	// 			console.log(imageUrl);
	// 			$scope.mainImageUrl = imageUrl.photoUrl;
	// 		}
	// 	})

}]);

appControllers.controller('GalleryListCtrl', ['$scope',
	'$http', 'Gallery',function($scope, $http, Gallery){
		$scope.galleries = Gallery.query();
	// $http.get('json/galleries.json').then(
	// 	function(response){
	// 		$scope.galleries=response.data;
	// 	},
	// 	function(errResponse){
	// 		console.log('Something goes wrong: ', errResponse);
	// 	}
	// );

	$http.get('json/sorting.json').then(
		function(response){
			$scope.sortList=response.data;
			$scope.orderProp = $scope.sortList[1];
		},
		function(errResponse){
			console.log('Something goes wrong: ', errResponse);
		}
	);

	$scope.sectionTitle = 'Moje podróże';
}])

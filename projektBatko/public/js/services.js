var appServices = angular.module('appServices',['ngResource']);
appServices.factory('RestaurantService', RestaurantService);

RestaurantService.$inject = ['$http'];
function RestaurantService($http){
    var service = {
        getMeals: getMeals,
        getMealCategories: getMealCategories,
        getMealCommentsByMealId: getMealCommentsByMealId,
        getMealPhotosByMealId: getMealPhotosByMealId
    }

    return service;

    function getMeals(){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/meals'
        });
    }

    function getMealCategories(){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/meal_categories'
        });
    }

    function getMealCommentsByMealId(mealId){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/meal_comments?meal_id=' + mealId
        })
    }

    function getMealPhotosByMealId(mealId){
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/api/meal_photos?meal_id=' + mealId
        })
    }

}
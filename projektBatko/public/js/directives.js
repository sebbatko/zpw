/**
 * Created by Sebastian on 01.12.2016.
 */

var appDirectives = angular.module('appDirectives', []);


appDirectives.directive('dishDetails', function(){
    return {
        restrict: 'E',
        templateUrl: '/views/dish_details.html'
    };
});
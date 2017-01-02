/**
 * Created by Sebastian on 01.12.2016.
 */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('yWidget', function(){
    return {
        restrict: 'E',
        template: 'Hello Angular'
    };
});

appDirectives.directive('myDirectiveFour', function(){
    return {
        restrict: 'E',
        scope: {
            myWidget: '='
        },
        template: "{{myWidget}}"
    };
});

appDirectives.directive('ngRepeats', function () {
    return {
        restrict: 'E',
        link: function(scope, elem, attr){
            var resultToShow = '';
            for(var i = 0; i < attr.howMany; i++) {
                resultToShow += elem[0].innerHTML;
            }
            elem[0].innerHTML = resultToShow;
        }
    };
});

appDirectives.directive('addArticle', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/add_product.html'
    };
});

appDirectives.directive('basket', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/basket.html'
    };
});

appDirectives.directive('addressForm', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/address_form.html'
    };
});
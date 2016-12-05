var appServices = angular.module('appServices',['ngResource']);

appServices.factory('BasketService', ['$resource', function($resource){

    var articlesInBasket = [];

    var service = {
        getArticlesInBasket: getArticlesInBasket,
        addArticleToBacket: addArticleToBacket
    }

    return service

    function getArticlesInBasket(){
        return articlesInBasket;
    }


    function addArticleToBacket(article){
        articlesInBasket.push(article);
    }


}
]);

appServices.factory('ShopService', ['$resource', function($resource){
    return $resource('http://localhost:5500/products', {}, {
        query: {
            method:'GET',
            params:{},
            isArray:true
        }
    });
}
]);
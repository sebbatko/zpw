/**
 * Created by Sebastian on 13.11.2016.
 */
var appFilters = angular.module('appFilters', []);

appFilters.filter('weekDay', function() {
    return function(fullDate) {
        var dayNames = [
            'Niedziela',
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota'
        ];
        var weekDayNumber = fullDate.getDay();
        return dayNames[weekDayNumber];
    };
});

appFilters.filter('palindrome', function() {
    return function(text) {
        var resultText = '';
        for(var i = text.length; i >= 0; i--){
            resultText += text.charAt(i);
        }
        return resultText;
    };
});

appFilters.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

appFilters.filter('productName', function () {
    return function (allData, text) {
        if(angular.isUndefined(text) || text === '' || text === null){
            return allData;
        }else{
            var resultArray = [];
            for(var i = 0; i < allData.length; i++){
                if((allData[i].nazwa).includes(text)){
                    resultArray.push(allData[i]);
                }
            }
            return resultArray;
        }
    };
});

appFilters.filter('productPrice', function () {
    return function(allData, priceBottom, priceTop) {
        var resultArray = [];
        if(angular.isUndefined(priceBottom) && angular.isUndefined(priceTop)){
            return allData;
        }else if(!angular.isUndefined(priceBottom) && !angular.isUndefined(priceTop)){
            for(var i = 0; i < allData.length; i++){
                if(allData[i].cena >= priceBottom && allData[i].cena <= priceTop){
                    resultArray.push(allData[i]);
                }
            }
            return resultArray;
        }else if(!angular.isUndefined(priceBottom)){
            for(var i = 0; i < allData.length; i++){
                if(allData[i].cena >= priceBottom){
                    resultArray.push(allData[i]);
                }
            }
            return resultArray;
        }else if(!angular.isUndefined(priceTop)){
            for(var i = 0; i < allData.length; i++){
                if(allData[i].cena <= priceTop){
                    resultArray.push(allData[i]);
                }
            }
            return resultArray;
        }

    };
});
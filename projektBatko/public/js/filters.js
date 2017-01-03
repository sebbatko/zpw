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

appFilters.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
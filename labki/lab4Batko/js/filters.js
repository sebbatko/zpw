/**
 * Created by Sebastian on 13.11.2016.
 */
angular.module('appFilters', [])
    .filter('monthDayName', function() {
        return function(fullDateString) {
            var monthNames = [
                'Styczeń',
                'Luty',
                'Marzec',
                'Kwiecień',
                'Maj',
                'Czerwiec',
                'Lipiec',
                'Sierpień',
                'Wrzesień',
                'Październik',
                'Listopad',
                'Grudzień'
            ];

            var dayNames = [
                'Niedziela',
                'Poniedziałek',
                'Wtorek',
                'Środa',
                'Czwartek',
                'Piątek',
                'Sobota'
            ];

            var fullYear = fullDateString.split('-')[2];
            var monthNumber = fullDateString.split('-')[1];
            var dayNumber = fullDateString.split('-')[0];
            var realDate = new Date(fullDateString);
            var weekDayNumber = realDate.getDay();

            console.log(fullDateString + ' ' + weekDayNumber);

            return  dayNames[weekDayNumber] + ', ' + dayNumber + ' ' + monthNames[monthNumber - 1] + ' ' + fullYear;
        };
        }
    );
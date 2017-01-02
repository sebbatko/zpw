var myApp = angular.module('myApp',['ui.bootstrap']);

myApp.controller('GreetingController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
    $scope.addItem = addItem;
    $scope.activeProductCount = activeProductCount;
    $scope.getArticles = getArticles;
    $scope.allArticleShow = false;
    $scope.data =
        [
            {name: 'Sebastian1', articleName: 'Playstation 4 PRO', addDate: new Date(2016, 11, 23, 15, 34, 15, 0), archived: true},
            {name: 'Adam2', articleName: 'Xbox 360', addDate: new Date(2016, 10, 15, 11, 16, 32, 0), archived: false},
            {name: 'Patrycja3', articleName: 'Iphone 6s', addDate: new Date(2016, 11, 25, 17, 0, 3, 0), archived: true},
            {name: 'Piotr4', articleName: 'Samsung Note 4', addDate: new Date(2016, 8, 6, 7, 53, 37, 0), archived: false},
            {name: 'Sebastian5', articleName: 'Playstation 4 PRO', addDate: new Date(2016, 11, 23, 15, 34, 15, 0), archived: true},
            {name: 'Adam6', articleName: 'Xbox 360', addDate: new Date(2016, 10, 15, 11, 16, 32, 0), archived: false},
            {name: 'Patrycja7', articleName: 'Iphone 6s', addDate: new Date(2016, 11, 25, 17, 0, 3, 0), archived: false},
            {name: 'Piotr8', articleName: 'Samsung Note 4', addDate: new Date(2016, 8, 6, 7, 53, 37, 0), archived: false},
            {name: 'Sebastian9', articleName: 'Playstation 4 PRO', addDate: new Date(2016, 11, 23, 15, 34, 15, 0), archived: true},
            {name: 'Adam10', articleName: 'Xbox 360', addDate: new Date(2016, 10, 15, 11, 16, 32, 0), archived: false},
            {name: 'Patrycja11', articleName: 'Iphone 6s', addDate: new Date(2016, 11, 25, 17, 0, 3, 0), archived: false},
            {name: 'Piotr12', articleName: 'Samsung Note 4', addDate: new Date(2016, 8, 6, 7, 53, 37, 0), archived: false},
            {name: 'Sebastian13', articleName: 'Playstation 4 PRO', addDate: new Date(2016, 11, 23, 15, 34, 15, 0), archived: true},
            {name: 'Adam14', articleName: 'Xbox 360', addDate: new Date(2016, 10, 15, 11, 16, 32, 0), archived: false},
            {name: 'Patrycja15', articleName: 'Iphone 6s', addDate: new Date(2016, 11, 25, 17, 0, 3, 0), archived: true},
            {name: 'Sebastian16', articleName: 'Playstation 4 PRO', addDate: new Date(2016, 11, 23, 15, 34, 15, 0), archived: true},
            {name: 'Adam17', articleName: 'Xbox 360', addDate: new Date(2016, 10, 15, 11, 16, 32, 0), archived: false}
        ];
    $scope.activeData = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 8;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
    };

    function addItem(name, articleName){
        $scope.data.push({name: name, articleName: articleName, addDate: new Date(), archived: false});
    }

    function activeProductCount(){
        var count = 0;
        for(var i = 0; i < $scope.data.length; i++){
            if(!$scope.data[i].archived){
                count += 1;
            }
        }
        return count;
    }

    function getArticles(){
        if($scope.allArticleShow){
            $scope.totalItems = $scope.data.length;
            return $scope.data.slice(($scope.currentPage-1)*$scope.itemsPerPage, ($scope.currentPage-1)*$scope.itemsPerPage + $scope.itemsPerPage);
        }else{
            $scope.activeData = [];
            for(var i = 0; i < $scope.data.length; i++){
                if(!$scope.data[i].archived){
                    $scope.activeData.push($scope.data[i]);
                }
            }
            $scope.totalItems = $scope.activeData.length;
            return $scope.activeData.slice(($scope.currentPage-1)*$scope.itemsPerPage, ($scope.currentPage-1)*$scope.itemsPerPage + $scope.itemsPerPage);;
        }
    }



    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}]);

myApp.filter("myfilter", function() {
    return function(allData, dateFrom, dateTo) {
        if(angular.isUndefined(dateFrom) || angular.isUndefined(dateTo) || dateFrom === null || dateTo === null){
            return allData;
        }else{
            var resultArray = [];
            for(var i = 0; i < allData.length; i++){
                if(allData[i].addDate >= dateFrom && allData[i].addDate <= dateTo){
                    resultArray.push(allData[i]);
                }
            }
            return resultArray;
        }

    };
});
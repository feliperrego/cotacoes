(function () {

    angular
        .module('app.currency', [])
        .directive("currencyValue", [currencyValue]);

    currencyValue.$inject = [];
    function currencyValue() {
        // Usage: <currency-value></currency-value>
        return {
            templateUrl: "app/shared/currency/currency.html",
            restrict: "E",
            scope: {
                name: '@',
                sub: '@',
                symbol: '@',
                class: '@',
                currencyCode: '@',
                img: '@',
                decimals: '@'
            },
            controllerAs: 'vm',
            controller: currencyValueCtrl

        }
    }

    currencyValueCtrl.$inject = ['$scope', '$locale', '$timeout', 'currencyService'];
    function currencyValueCtrl($scope, $locale, $timeout, currencyService) {
        var vm = this;

        vm.currency = 1;
        vm.variation = 0;
        vm.real = vm.currency * vm.variation;
        vm.currencyClass = $scope.class;
        vm.decimals = $scope.decimals ? $scope.decimals : 2;
        $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
        $locale.NUMBER_FORMATS.GROUP_SEP = '.';


        vm.calculate = function (inverse) {
            if (inverse) {
                vm.currency = vm.real / vm.variation;
            } else {
                vm.real = vm.currency * vm.variation;
            }
        };

        vm.reset = function () {
            vm.currency = 1;
            vm.calculate();
        };

        vm.getCurrency = function () {
            var currencyCode = $scope.currencyCode;
            currencyService.getCurrency(currencyCode, 'BRL').then(function success(data) {
                $timeout(function(){
                    vm.variation = data;
                    vm.calculate();
                    vm.currencyClass += " complete";
                }, 200);
            }, function reject(err) {
                console.log("Error:", err);
            })
        };

        vm.getCurrency();
    }

})();
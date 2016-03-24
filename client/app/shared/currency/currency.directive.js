(function () {

    angular
        .module('app.widget.currency', [])
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
                class: '@'
            },
            controllerAs: 'vm',
            controller: currencyValueCtrl

        }
    }

    currencyValueCtrl.$inject = ['$scope', '$locale'];
    function currencyValueCtrl($scope, $locale) {
        var vm = this;

        vm.currency = 1;
        vm.variation = 3.6;
        vm.real = vm.currency * vm.variation;
        vm.currencyClass = $scope.class;
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
    }

})();
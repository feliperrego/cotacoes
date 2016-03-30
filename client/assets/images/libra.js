angular.module('libra', [])

    //Route config
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/libra', {
            templateUrl: './app/libra/libra.html'
        });
    }])

    //Dolar controller
    .controller('LibraCtrl', ['$scope', 'currencyFactory', 'blockUI', '$timeout', '$locale', function ($scope, currencyFactory, blockUI, $timeout, $locale) {
        var vm = this;

        vm.dolar = 1;
        vm.variacao = null;
        vm.real = vm.dolar * vm.variacao;
        vm.currencyClass = "libra-container";
        $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
        $locale.NUMBER_FORMATS.GROUP_SEP = '.';

        vm.calcular = function (el) {
            if (el=='real') {
                vm.dolar = vm.real / vm.variacao;
            } else {
                vm.real = vm.dolar * vm.variacao;
            }
        };

        vm.reset = function () {
            vm.dolar = 1;
            vm.calcular();
        };

        vm.getDolar = function () {
            blockUI.start();
            currencyFactory.getCurrency("GBP", "BRL").then(function success(data) {
                $timeout(function(){
                    vm.currencyClass += " justBlurComplete";
                    vm.variacao = data.query.results.row.col0;
                    vm.calcular();
                    blockUI.stop();
                }, 200);
            }, function reject(err) {
                console.log(err);
            })
        };

        vm.getDolar();

    }]);
// Factory to get the cotation of dollar
angular
    .module('app.currency')
    .service('currencyService', ['$http', '$q', function ($http, $q) {

        this.getCurrency = function (from_Currency, to_Currency) {
            var serviceBase = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D" + from_Currency + to_Currency + "%3DX%26f%3Dl1'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            var deferred = $q.defer();

            _getStoredCurrency(from_Currency).then(function (response) {
                console.log('Querying stored currency.');
                if (response && _diffHours(new Date(), new Date(response.date)) <= 4) {
                    console.log('Currency stored found.');
                    deferred.resolve(response.value);
                } else {
                    console.log('Querying Yahoo Finance API.');
                    $http.get(serviceBase).success(function (response) {
                        var newCurrency = response.query.results.row.col0;
                        _storeCurrency(from_Currency, newCurrency);
                        deferred.resolve(newCurrency);
                    }).error(function (err, status) {
                        deferred.reject(err);
                    });
                }
            });

            return deferred.promise;
        };

        function _getStoredCurrency(from_Currency) {
            var deferred = $q.defer();
            $http.get('/api/currency/' + from_Currency).then(function success(response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        function _storeCurrency(currencyCode, currencyValue) {
            $http.post('/api/currency/', {
                code: currencyCode,
                date: new Date(),
                value: currencyValue
            }).then(function(response){ console.log(response.data)});
        }

        function _diffHours(iDate, tDate) {
            return Math.trunc((iDate.getTime() - tDate.getTime()) / (60 * 60 * 1000));
        }

    }]);
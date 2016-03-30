// Factory to get the cotation of dollar
angular
    .module('app.currency')
    .factory('currencyService', ['$http', '$q', function ($http, $q) {

        var currencyFactory = {};

        currencyFactory.getCurrency = function (from_Currency, to_Currency) {
            var serviceBase = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D" + from_Currency + to_Currency +"%3DX%26f%3Dl1'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            var deferred = $q.defer();

            $http.get(serviceBase, {}).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return currencyFactory;

    }]);
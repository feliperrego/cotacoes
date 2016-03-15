(function () {

    angular
        .module('app.widget.menu', [])
        .directive("menuWidget", [menuWidget]);

    menuWidget.$inject = ['$rootScope'];
    function menuWidget($rootScope) {
        // Usage: <menu-widget></menu-widget>
        return {
            templateUrl: "app/shared/menu/menu.view.html",
            restrict: "E",
            controller: function ($rootScope) {
                $rootScope.$on('$routeChangeSuccess',
                    function (event, current, previous) {
                        $rootScope.pageTitle = current.$$route.title;
                    }
                )
            }
        }
    }

})();
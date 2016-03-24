(function () {

    angular
        .module('app.widget.menu', [])
        .directive("menuWidget", [menuWidget]);

    menuWidget.$inject = ['$rootScope'];
    function menuWidget() {
        // Usage: <menu-widget></menu-widget>
        return {
            templateUrl: "app/shared/menu/menu.view.html",
            restrict: "E",
            controller: menuWidgetCtrl
        }
    }

    menuWidgetCtrl.$inject = ['$rootScope'];
    function menuWidgetCtrl($rootScope) {
        $rootScope.$on('$routeChangeSuccess',
            function (event, current, previous) {
                if (current && current.$$route) {
                    $rootScope.pageTitle = current.$$route.title;
                }
            }
        )
    }

})();
angular
    .module('app.widget.menu', [])
    .directive("menuWidget", [menuWidget]);

function menuWidget() {
    return {
        templateUrl: "app/shared/menu/menu.view.html",
        restrict: "E",
        controller: function(){
            console.log();
        }
    }
}
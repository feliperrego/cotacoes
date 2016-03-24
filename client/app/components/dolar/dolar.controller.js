(function () {

    angular
        .module('app.about', [])
        .controller("aboutCtrl", aboutCtrl);

    function aboutCtrl() {
        console.log('aboutCtrl!')
    }

})();
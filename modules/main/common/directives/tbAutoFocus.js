(function (module) {

    var autoFocus = function ($timeout) {
        return {
            restrict: 'AC',
            link: function (scope, element) {
                $timeout(function () {
                    element[0].focus();
                }, 500);
            }
        };
    };

    module.directive('autoFocus', ['$timeout', autoFocus]);

}(angular.module('common')));

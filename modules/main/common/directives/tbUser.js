(function (module) {

    var tbUser = function () {
        return {
            priority: 3,
            replace: true,
            restrict: 'E',
            scope: true,
            templateUrl: 'modules/main/common/templates/tbUser.html'
        };
    };

    module.directive('tbUser', tbUser);

}(angular.module('common')));

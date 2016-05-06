(function (module) {

    'use strict';
    var tbNavBar = function (currentUser) {

        return {
            template: '<ul class="nav navbar-nav navbar-right" ng-transclude></ul>',
            replace: true,
            restrict: 'E',
            transclude: true,
            //priority: 1,
            controller: 'LoginController',
            link: function (scope) {
                scope.islogin = currentUser.profile.loggedIn ? true : false;
                scope.$watch(function () {
                    return currentUser.profile.loggedIn ? true : false;
                }, function (newVal, oldVal) {
                    scope.islogin = newVal;
                    scope.username = currentUser.profile.username;
                });

                scope.username = currentUser.profile.username;
            }
        };
    };

    module.directive('tbNavBar', ['currentUser', tbNavBar]);

}(angular.module('common')));

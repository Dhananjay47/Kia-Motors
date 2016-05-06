(function (module) {
    'use strict';

    var tbAccount = function () {

        return {
            restrict: 'E',
            scope: true,
            controller: ['$scope', function ($scope) {
                this.account = $scope.account;
            }]
        };
    };

    module.directive('tbAccount', tbAccount);

}(angular.module('account')));

(function (module) {

    'use strict';
    var tbNewAccount = function (newAccount) {

        var templateHtml = '<li ng-if="islogin"><a ng-click="createAccount()">' +
            '<i class="glyphicon glyphicon-plus"></i></a></li>';
        return {
            //priority: 9,
            template: templateHtml,
            replace: true,
            restrict: 'E',
            controller: ['$scope', function ($scope) {
                $scope.createAccount = function () {
                    newAccount.showForm().then(newAccount.submit);
                };
            }]
        };
    };

    module.directive('tbNewAccount', ['newAccount', tbNewAccount]);

}(angular.module('account')));

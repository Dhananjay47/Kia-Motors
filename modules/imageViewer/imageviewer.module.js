(function () {

    'use strict';

    var app = angular.module('imageViewer', ['transactions']);

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/transactions/search');

            $stateProvider.state('transactionSearch', {
                url: '/transactions/:withsearch',
                params: {
                    transactions: null
                },
                templateUrl: 'modules/imageViewer/transactions/transactions.html',
                controller: 'TransactionController as vm',
                data: {
                    permission: {
                        Resource: 'transactionsearch',
                        Action: 'get'
                    }
                }
            });
        }
    ]);

    app.controller('MainController', ['$scope', 'idle', function ($scope, idle) {
        idle.check($scope);
    }]);

}());

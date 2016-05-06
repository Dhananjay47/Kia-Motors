(function (module) {
    'use strict';

    var accountSearch = function ($translate, $state) {
        return {
            priority: 2,
            templateUrl: 'modules/main/common/templates/accountSearch.html',
            replace: true,
            restrict: 'E',
            scope: true,
            controller: ['$scope', function ($scope) {
                $scope.accountSearchOptions = [
                    {
                        name: 'PlateNumber',
                        type: 'vehicle'
                    },
                    {
                        name: 'Transponder',
                        type: 'vehicle'
                    },
                    {
                        name: 'Transaction',
                        type: 'account'
                    },
                    {
                        name: 'AccountNumber',
                        type: 'account'
                    },
                    {
                        name: 'LegacyIdentifier',
                        type: 'account'
                    },
                    {
                        name: 'MovilCash',
                        type: 'account'
                    },
                    {
                        name: 'CardNumber',
                        type: 'account'
                    },
                    {
                        name: 'Address',
                        type: 'account'
                    },
                    {
                        name: 'Phone',
                        type: 'account'
                    },
                    {
                        name: 'Email',
                        type: 'account'
                    },
                    {
                        name: 'AccountName',
                        type: 'account'
                    },
                    {
                        name: 'AlternateTransponder',
                        type: 'vehicle'
                    }
                ];
                $scope.searchOption = $scope.accountSearchOptions[0];
            }],
            link: function (scope, element, attribute) {
                scope.search = function (selectedOption, queryString) {
                    var state = selectedOption.type + 'Search';
                    var params = {
                        queryMethod: selectedOption.name,
                        queryString: queryString
                    };
                    $state.go(state, params);
                };
            }
        };
    };

    module.directive('accountSearch', ['$translate', '$state', accountSearch]);

}(angular.module('common')));

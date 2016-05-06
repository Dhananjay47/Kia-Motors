(function (module) {
    'use strict';

    var tbAccountInfo = function (AccountResource, $state, alerting) {

        return {
            templateUrl: 'modules/main/account/accountTab/tbAccountInfo.html',
            restrict: 'E',
            replace: true,
            scope: {
                label: '@infoLabel',
                columnName: '@infoField',
                value: '@infoValue'
            },
            require: '^tbAccount',
            transclude: true,
            controller: ['$scope', 'AccountResource', function ($scope, AccountResource) {
                $scope.isedit = false;

                $scope.save = function (id, key, value) {
                    var params = {
                        accountId: id
                    };
                    params[key] = value;

                    var partialAccount = new AccountResource(params);

                    partialAccount.$update(params)
                        .then(function () {
                            alerting.addSuccess('UpdatedAccount');
                            $state.reload();
                        })
                        .catch(alerting.errorHandler('Could not update account'));
                };
            }],
            controllerAs: 'vm',
            link: function (scope, element, attrs, detailsCtrl) {
                var accountCopy = detailsCtrl.account;
                scope.original = angular.copy(accountCopy);

                // toggle read/edit view by setting/unsetting isedit flag
                var editBtn = element.find('button');
                editBtn.bind('click', function () {
                    scope.isedit = !scope.isedit;
                    scope.$apply();
                });

                scope.submit = function () {
                    // partial update of 1 field at a time
                    var columnName = scope.columnName;
                    var partialAccount = {};
                    partialAccount[columnName] = accountCopy[columnName];

                    scope.save(accountCopy['ID'], columnName, accountCopy[columnName]);
                };
                scope.cancel = function () {
                    angular.copy(scope.original, accountCopy);
                };
            }
        };
    };

    module.directive('tbAccountInfo', ['AccountResource', '$state', 'alerting', tbAccountInfo]);

}(angular.module('account')));

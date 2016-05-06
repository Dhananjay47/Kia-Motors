(function (module) {
    "use strict";

    var AccountDetailsController = function AccountDetailsController(account, currentBalance, aliases,
        currentUser, alerting, $scope,
        $state, $http, CONFIG,
        optionValues, selectPaymentMethod
        //$modalInstance
    ) {
        var vm = this;

        vm.message = 'Account!';
        vm.account = account;
        if (currentBalance) {
            vm.currentBalance = currentBalance.balance;
        }
        vm.aliases = aliases;

        vm.hasPermission = currentUser.hasPermission;
        vm.accountTypes = optionValues.getOptions("Account_Types");

        if (vm.account && vm.account.Name) {
            vm.title = vm.account.Name;
            if (vm.account.Number) {
                vm.title += ' (' + vm.account.Number + ')';
            }
        } else {
            vm.title = "New Account";
        }

        vm.replenish = function () {
            var replenishAccount = {
                ReloadThresholdAmount: vm.account.ReloadThresholdAmount,
                ReloadAmount: vm.account.ReloadAmount
            };

            $http({
                    method: 'PATCH',
                    url: CONFIG.apiUrl + '/api/account/patch/' + vm.account.ID,
                    data: angular.toJson(replenishAccount)
                })
                .success(function (data, status) {
                    alerting.addSuccess("UpdatedAccount");
                    $state.go('^', {}, {
                        reload: true
                    });
                })
                .error(function (data, status) {
                    alerting.errorHandler("Could not update account");
                });
        };
        vm.contact = function () {
            var contacts = {
                Name: vm.account.Name,
                EmailAddress: vm.account.EmailAddress,
                PhoneNumber: vm.account.PhoneNumber,
                AccountType: vm.account.AccountType
            };

            $http({
                    method: 'PATCH',
                    url: CONFIG.apiUrl + '/api/account/patch/' + vm.account.ID,
                    data: angular.toJson(contacts)
                })
                .success(function (data, status) {
                    alerting.addSuccess("UpdatedAccount");
                    $state.go('^', {}, {
                        reload: true
                    });
                })
                .error(function (data, status) {
                    alerting.errorHandler("Could not update account");
                });
        };

        vm.cancel = function () {
            $state.go('^', {}, {
                reload: true
            });
        };

        // create a new account
        vm.submit = function () {
            if (vm.account.ID) {
                vm.account.$update({
                        id: vm.account.ID
                    })
                    .then(function () {
                        alerting.addSuccess("UpdatedAccount");
                        //$scope.$close(true);
                    })
                    .catch(alerting.errorHandler("Could not update account"));
            } else {
                vm.account.$save()
                    .then(function () {
                        alerting.addSuccess("Created a new account!");
                        //$scope.$close(true);
                    })
                    .catch(alerting.errorHandler("Could not create account"));
            }
        };

        vm.dismiss = function () {
            $modalInstance.dismiss();
        };

        vm.selectShoppingCargPaymentMethod = function () {
            $scope.shoppingCartFlag = true;
            vm.account.shoppingCartFlag = true;
            selectPaymentMethod.showMethods(vm.account).then(selectPaymentMethod.selectMethod);
        };
        vm.selectPaymentMethod = function () {
            selectPaymentMethod.showMethods(vm.account).then(selectPaymentMethod.selectMethod);
        };

        //vm.listPendingPayments();

    };

    module.controller("AccountDetailsController", ["account", "currentBalance", "aliases",
                       "currentUser", "alerting", "$scope",
                       "$state", "$http", "CONFIG",
                       "optionValues", "selectPaymentMethod",
                                                   //"$modalInstance",
                       AccountDetailsController]);

}(angular.module("account")));

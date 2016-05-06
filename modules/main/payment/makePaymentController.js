(function (module) {
    'use strict';

    var MakePaymentController = function MakePaymentController(payment,
        paymentMethod, PaymentResource, $state, alerting, CONFIG,
        optionValues, $http, $modalInstance) {
        var vm = this;

        vm.accountTypes = optionValues.getOptions('Account_Types');

        vm.submit = function (newPayment) {

            $http({
                    method: 'POST',
                    url: CONFIG.apiUrl + '/api/account',
                    data: angular.toJson(vm.account)
                })
                .success(function (data, status) {
                    alerting.addSuccess('UpdatedAccount');
                    $state.go('accountDetails.account', {
                        accountId: data.ID
                    }, {
                        reload: true
                    });
                })
                .error(function (data, status) {
                    alerting.errorHandler('Could not update account');
                });
            $modalInstance.close();
        };

        vm.dismiss = function () {
            $modalInstance.dismiss();
        };
    };

    module.controller('MakePaymentController', ['payment', 'PaymentResource', '$state',
                                                '$modalInstance', 'alerting', 'CONFIG',
                                                'optionValues', '$http', '$modalInstance',
                                                MakePaymentController]);

}(angular.module('payment')));

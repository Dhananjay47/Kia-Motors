(function (module) {
    'use strict';

    var SelectPaymentMethodController = function SelectPaymentMethodCtrl(PaymentResource, account) {
        var pm = this;
        pm.paymentMethods = PaymentResource.getPaymentMethods({
            accountId: account.ID
        });

        //pm.paymentMethods = paymentMethods;
    };

    module.controller('SelectPaymentMethodController',
                      ['PaymentResource', 'account', SelectPaymentMethodController]);

}(angular.module('payment')));

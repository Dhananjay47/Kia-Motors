(function (module) {
    'use strict';

    var PaymentController = function PaymentController(paymentMethods) {
        var vm = this;

        vm.paymentMethods = paymentMethods;

        vm.message = 'Payments';
    };

    module.controller('PaymentController', PaymentController);

}(angular.module('payment')));

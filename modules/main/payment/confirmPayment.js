(function (module) {

    'use strict';
    var confirmPayment = function ($modal) {
        return function (payment) {

            var options = {
                templateUrl: 'modules/main/payment/confirmPayment.html',
                controller: function () {
                    this.payment = payment;
                    if (!this.payment.Amount) {
                        var chargeAmount = 0;
                        var feeAmount = 0;
                        if (payment.charge instanceof String) {
                            try {
                                chargeAmount = Number(payment.charge.replace(/\,/g, ''));
                            } catch (e) {}
                        } else {
                            try {
                                if (payment.charge) {
                                    chargeAmount = payment.charge;
                                }
                            } catch (e) {}
                        }
                        if (payment.fee instanceof String) {
                            try {
                                feeAmount = Number(payment.fee.replace(/\,/g, ''));
                            } catch (e) {}
                        } else {
                            try {
                                if (payment.fee) {
                                    feeAmount = payment.fee;
                                }
                            } catch (e) {}
                        }
                        this.payment.Amount = chargeAmount + feeAmount;
                    }
                    this.currentDateTime = new Date();
                },
                controllerAs: 'model'
            };

            return $modal.open(options).result;
        };
    };

    module.factory('confirmPayment', ['$modal', confirmPayment]);

}(angular.module('payment')));

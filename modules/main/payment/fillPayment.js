(function (module) {

    'use strict';
    var fillPayment = function ($modal) {
        return function (payment) {

            var options = {
                templateUrl: 'modules/main/payment/payment.html',
                controller: function () {

                    this.payment = payment;
                    this.currentDateTime = new Date();
                    //this.paymentType = payment.paymentType;
                },
                controllerAs: 'model'
            };

            return $modal.open(options).result;
        };
    };

    module.factory('fillPayment', ['$modal', fillPayment]);

}(angular.module('payment')));

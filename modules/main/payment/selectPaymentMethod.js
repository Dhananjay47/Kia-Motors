(function (module) {

    'use strict';
    var selectPaymentMethod = function ($modal, PaymentResource, confirmPayment) {

        var accountId;
        var clientId;

        var showMethods = function (account) {

            accountId = account.ID;
            clientId = account.ClientID;

            var paymentMethods = PaymentResource.getPaymentMethods({
                accountId: account.ID
            });

            var options = {
                templateUrl: 'modules/main/payment/selectPaymentMethod.html',
                size: 'lg',
                controller: ['paymentMethods', function (paymentMethods) {
                    this.PaymentMethods = paymentMethods;
                    this.account = account;
                    // this.submit = function (paymentMethod) {
                    //     console.log(paymentMethod);
                    // }
                }],
                controllerAs: 'pm',
                resolve: {
                    paymentMethods: function () {
                        return paymentMethods.$promise;
                    }
                }
            };

            return $modal.open(options).result;
        };

        var fillForm = function (payment) {
            var paymentMethod = payment.PaymentMethod;

            var options = {
                templateUrl: 'modules/main/payment/payment.html',
                size: 'lg',
                controller: ['$scope', function ($scope) {
                    $scope.payment = payment;
                    $scope.payment.charge = payment.charge;
                    //TODO: Restore charge a fee after degraded mode period
                    $scope.payment.fee = 0; //payment.fee;
                    $scope.payment.isFeeWaived = true; //payment.isFeeWaived;
                    $scope.isShoppingCart = true;
                    this.currentDateTime = new Date();
                    $scope.paymentType = paymentMethod.MasterCodeID === 45000 ?
                        'creditCard' : 'ach';
                    $scope.PaymentResource = 'PaymentResource';
                }]
            };

            return $modal.open(options).result;
        };

        var selectMethod = function (payment) {
            var paymentMethod = payment.PaymentMethod;

            console.log(paymentMethod);

            if (paymentMethod.PaymentMethodID) {
                var postPayment = function () {
                    var request = {
                        Payment: payment
                    };
                    PaymentResource.postPayment(request);
                };
                return confirmPayment(payment).then(postPayment);
            } else {
                if (paymentMethod.MasterCodeID === 45002) {
                    return redirectEvertec(payment);
                } else {
                    return fillForm(payment);
                }
            }
        };

        var redirectEvertec = function (payment) {

            var param = {
                'Payment': {
                    'Amount': payment.charge,
                    'AccountID': payment.AccountID,
                    'TenderDate': new Date(),
                    'PaymentMethod': {
                        'PaymentTypeID': 6044,
                        'MasterCodeID': 45002,
                        'PaymentMethodStatusID': 33000,
                        'AccountID': payment.AccountID,
                        'SaveForReuse': false,
                        'SortOrder': 1
                    }
                }
            };

            var evertecArgs = 'customerName=' + 'Enter Customer Name' + '&' +
                'descriptionBuy=AutoExpresoReplenishment' + '&' +
                'total=' + payment.charge + '&' +
                'customerEmail=test@email.com' + '&' +
                'language=en' + '&';

            PaymentResource.postPayment(param).$promise.then(function (data) {

                evertecArgs = evertecArgs + 'customerId=' +
                    data.LastSuccessfulThirdPartyReferenceNumber;

                //var site = 'https://mmpay.evertecinc.com/webservicev2/wscheckoutpayment.asmx?op=MakePayment&';
                //var site = 'http://localhost:61380/Default.aspx?'

                var site = 'http://www.muniserv.com/test_EvertecService/Default.aspx?';

                var targetUrl = site + evertecArgs;
                var win = window.open(targetUrl, '_blank');
                win.focus();

                //vm.resetForm();
                //vm.displayMessage('green', vm.spForPmtProcSuccess);

            }, function (err) {
                //vm.displayMessage('red', vm.spForPmtError);
            });

            // $close();

        };

        return {
            showMethods: showMethods,
            selectMethod: selectMethod,
            fillForm: fillForm,
            redirectEvertec: redirectEvertec
        };
    };

    module.factory('selectPaymentMethod', ['$modal', 'PaymentResource',
                                           'confirmPayment', selectPaymentMethod]);

}(angular.module('payment')));

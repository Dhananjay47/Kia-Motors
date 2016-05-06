(function (module) {

    var paymentAch = function (confirmPayment, PaymentResource, $state, alerting) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/payment/paymentAch.html',
            controller: ['$scope', function ($scope) {
                $scope.paymentType = 'ACH';

                if ($scope.payment) {
                    $scope.$parent.charge = $scope.payment.charge;
                    //TODO: Restore charge a fee after degraded mode period
                    //$scope.$parent.fee = $scope.payment.fee;
                    $scope.$parent.fee = '';
                }

                $scope.resetFee = function (isFeeWaived) {
                    if (isFeeWaived) {
                        $scope.fee = '';
                    }
                };

                var postPayment = function () {
                    var request = {
                        Payment: $scope.payment
                    };
                    console.log($scope.payment);
                    if ($scope.$parent.isShoppingCart) {
                        PaymentResource.postPayment(request).$promise.then(function (data) {
                            $scope.$parent.$close();
                            alerting.addSuccess('Payment successful');
                            return data;
                        }, function (err) {
                            alerting.addDanger('Payment failed');
                        });
                    } else {
                        PaymentResource.save(request).$promise.then(function (data) {
                            try {
                                $scope.$parent.$close();
                            } catch (err) {
                                $state.reload();
                            }
                            alerting.addSuccess('Payment successful');
                            return data;
                        }, function (err) {
                            alerting.addDanger('Payment failed');
                        });
                    }
                };

                $scope.$parent.submit = function () {

                    $scope.payment.PaymentMethod.AccountTypeCode =
                        Number($scope.payment.PaymentMethod.AccountTypeCode);
                    $scope.payment.charge = Number($scope.$parent.charge.replace(/\,/g, ''));
                    //TODO: Restore charge a fee after degraded mode period
                    //$scope.payment.fee = Number($scope.$parent.fee);
                    $scope.payment.fee = 0;
                    $scope.payment.Amount = $scope.payment.charge + $scope.payment.fee;
                    $scope.payment.PaymentMethod.PaymentTypeID = 6016;
                    $scope.payment.PaymentMethod.MasterCodeID = 45001;
                    $scope.payment.PaymentMethod.PaymentMethodStatusID = 33000;

                    //TODO: Hard coded values for testing
                    $scope.payment.PaymentMethod.State = 'PR';
                    $scope.payment.PaymentMethod.ZipCode = '79703';
                    $scope.payment.PaymentMethod.Address = 'General address 1';
                    $scope.payment.PaymentMethod.Address2 = 'General address 1';
                    $scope.payment.PaymentMethod.City = 'Texas';
                    //End of code block to be removed

                    // only if account id is not set, find and set it
                    if (!$scope.payment.AccountID) {
                        $scope.payment.AccountID = $scope.vm.account.ID;
                        $scope.payment.PaymentMethod.AccountID = $scope.vm.account.ID;
                    }
                    if ($scope.payment.charge) {
                        confirmPayment($scope.payment).then(postPayment);
                    }
                };
            }]
        };
    };

    module.directive('paymentAch', ['confirmPayment', 'PaymentResource', '$state',
                                    'alerting', paymentAch]);

    var paymentCreditCard = function (confirmPayment, PaymentResource, alerting) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/payment/paymentCreditCard.html',
            controller: ['$scope', function ($scope) {
                $scope.months = new Array(12);
                $scope.years = new Array(20);
                $scope.thisYear = new Date().getFullYear();
                $scope.paymentType = 'CreditCard';

                if ($scope.payment) {
                    $scope.$parent.charge = $scope.payment.charge;
                    //TODO: Restore charge a fee after degraded mode period
                    //$scope.$parent.fee = $scope.payment.fee;
                    $scope.$parent.fee = 0;
                    if (!$scope.$parent.fee) {
                        $scope.$parent.fee = 0;
                    }
                }

                $scope.resetFee = function (isFeeWaived) {
                    if (isFeeWaived) {
                        $scope.fee = '';
                    }
                };

                var postPayment = function () {
                    if ($scope.payment.fee) {
                        $scope.payment.isFeeWaived = false;
                        try {
                            $scope.payment.charge = Number($scope.payment.charge.replace(/\,/g, ''));
                        } catch (err) {}
                    }
                    var request = {
                        Payment: $scope.payment
                    };
                    PaymentResource.postPayment(request).$promise.then(function (data) {
                        $scope.$parent.$close();
                        alerting.addSuccess('Payment successful');
                        return data;
                    }, function (err) {
                        alerting.addDanger('Payment failed');
                    });
                };

                $scope.$parent.submit = function () {

                    $scope.payment.PaymentMethod.AccountTypeCode =
                        Number($scope.payment.PaymentMethod.AccountTypeCode);
                    try {
                        $scope.payment.Amount = Number($scope.charge.replace(/\,/g, '')) + Number($scope.fee);
                    } catch (e) {
                        try {
                            //TODO: Restore charge a fee after degraded mode period
                            //$scope.payment.fee = $scope.paymentForm.feeAmount.$viewValue;
                            //$scope.payment.isFeeWaived = $scope.paymentForm.isFeeWaived.$viewValue;
                            $scope.payment.fee = 0;
                            $scope.payment.isFeeWaived = true;
                            $scope.payment.Amount = $scope.payment.charge + $scope.payment.fee;
                        } catch (e) {}
                    }
                    if ($scope.payment.PaymentMethod.PaymentTypeID !== 6041) {
                        $scope.payment.PaymentMethod.PaymentTypeID = 6037;
                    }
                    $scope.payment.PaymentMethod.MasterCodeID = 45000;
                    $scope.payment.PaymentMethod.PaymentMethodStatusID = 33000;
                    $scope.payment.PaymentMethod.NameOnCard =
                        $scope.payment.PaymentMethod.FirstName + ' ' +
                        $scope.payment.PaymentMethod.LastName;

                    // address
                    if ($scope.address['Address1'] !== undefined) {
                        $scope.payment.PaymentMethod.Address = $scope.address['Address1'];
                    }
                    if ($scope.address['Address2'] !== undefined) {
                        $scope.payment.PaymentMethod.Address2 = $scope.address['Address2'];
                    }
                    if ($scope.address['Address3'] !== undefined) {
                        $scope.payment.PaymentMethod.Address3 = $scope.address['Address3'];
                    }
                    if ($scope.address['City'] !== undefined) {
                        $scope.payment.PaymentMethod.City = $scope.address['City'];
                    }
                    if ($scope.address['State'] !== undefined) {
                        $scope.payment.PaymentMethod.State = $scope.address['State'];
                    }
                    if ($scope.address['ZipCode'] !== undefined) {
                        $scope.payment.PaymentMethod.ZipCode = $scope.address['ZipCode'];
                    }

                    // only if account id is not set, find and set it
                    if (!$scope.payment.AccountID) {
                        $scope.payment.AccountID = $scope.vm.account.ID;
                        $scope.payment.PaymentMethod.AccountID = $scope.vm.account.ID;
                    }

                    $scope.payment.PaymentMethod.CardExpirationDate =
                        ($scope.expMonth > 9 ? $scope.expMonth : '0' +
                         $scope.expMonth) + '/' + $scope.expYear;

                    if ($scope.payment.Amount) {
                        confirmPayment($scope.payment).then(postPayment);
                    }
                };
            }]
        };
    };

    module.directive('paymentCreditCard', ['confirmPayment', 'PaymentResource', 'alerting',
                                           paymentCreditCard]);

}(angular.module('payment')));

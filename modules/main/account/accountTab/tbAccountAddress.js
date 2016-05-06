(function (module) {

    var tbAccountAddress = function (optionValues) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/account/accountTab/tbAccountAddress.html',
            scope: {
                type: '@',
                address: '=data'
            },
            require: '^tbAccount',
            controller: 'AddressEditController',
            controllerAs: 'vm',
            link: function (scope, element, attrs, detailsCtrl) {
                var modAddress = attrs.type === 'billing' ?
                    detailsCtrl.account['BillingAddress'] : detailsCtrl.account['ShippingAddress'];

                scope.original = angular.copy(modAddress);

                // toggle read/edit view by setting/unsetting isedit flag
                var editBtn = element.find('button');
                editBtn.bind('click', function () {
                    scope.isedit = !scope.isedit;
                    scope.$apply();
                });

                scope.submit = function () {
                    if (scope.address.ID) {
                        scope.update(scope.address);
                    } else {
                        scope.create(scope.address, detailsCtrl.account.ID, attrs.type);
                    }
                };

                scope.cancel = function () {

                    scope.reset(modAddress);
                };
            }
        };
    };

    module.directive('tbAccountAddress', ['optionValues', tbAccountAddress]);

}(angular.module('account')));

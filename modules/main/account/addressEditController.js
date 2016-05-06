(function (module) {
    'use strict';

    var AddressEditController = function AddressEditController($scope, $state, $stateParams,
        alerting, AddressResource, optionValues) {

        $scope.states = optionValues.getOptions('States');

        $scope.reset = function (target) {
            angular.copy($scope.original, target);
        };

        $scope.create = function (address, accountId, type) {

            var addressObj = new AddressResource(address);
            addressObj.$save({
                    id: accountId,
                    type: type
                })
                .then(function () {
                    alerting.addSuccess('Created a new address!');
                    $state.reload();
                })
                .catch(alerting.errorHandler('Could not create address'));
        };

        $scope.update = function (address) {
            var addressObj = new AddressResource(address);

            addressObj.$update({
                    id: address.ID
                })
                .then(function () {
                    alerting.addSuccess('UpdatedAddress');
                    $state.reload();
                })
                .catch(alerting.errorHandler('Could not update address'));
        };
    };

    module.controller('AddressEditController', ['$scope', '$state',
                        '$stateParams', 'alerting', 'AddressResource', 'optionValues',
                        AddressEditController]);

}(angular.module('account')));

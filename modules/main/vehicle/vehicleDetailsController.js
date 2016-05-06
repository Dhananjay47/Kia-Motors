(function (module) {
    'use strict';

    var VehicleDetailsController = function VehicleDetailsController(vehicle, $state, $stateParams,
        alerting, optionValues, VehicleResource, $scope) {
        var vm = this;

        vm.vehicle = vehicle;
        vm.states = optionValues.getOptions('States');

        var clientId = $scope.$parent.vm.account.ClientID;

        vm.checkIsActive = function () {
            try {
                if (vm.vehicle.IsActive === undefined) {
                    vm.vehicle.IsActive = true;
                }
            } catch (e) {}
        };

        VehicleResource.getOptions({
                clientId: clientId
            }).$promise
            .then(function (optionDictionary) {

                for (var i = optionDictionary.length - 1; i >= 0; i--) {
                    var option = {
                        Name: optionDictionary[i].Name,
                        Options: optionDictionary[i].Options
                    };
                    optionValues.addOptions(option);
                    vm.vehicleTypes = optionValues.getOptions('Vehicle_Class');
                }
            }).catch(alerting.errorHandler('Could not get vehicle options'));

        if (vm.vehicle && vm.vehicle.ID) {
            vm.title = vehicle.PlateState + ': ' + vehicle.PlateNumber;
        } else {
            vm.title = 'New Vehicle';
        }

        // read-only when data exists
        vm.transponderReadonly = vehicle.TransponderNumber;
        vm.plateNumberReadonly = vehicle.PlateNumber;
        vm.vehicleClassReadonly = vehicle.ClassID;

        // owners
        if (vehicle.ID) {
            VehicleResource.listOwners({
                id: vehicle.ID
            }).$promise.then(function (data) {
                vm.owners = data;
            }).catch(function (err) {
                alerting.errorHandler('Cannot load vehicle owners');
                vm.owners = [];
            });
        }

        vm.submit = function () {
            if (vm.vehicle.ID) {
                vm.vehicle.$update({
                        id: vm.vehicle.ID
                    })
                    .then(function () {
                        alerting.addSuccess('UpdatedVehicle');
                        $state.go('vehicles');
                    })
                    .catch(alerting.errorHandler('Could not update vehicle'));
            } else {
                vm.vehicle.AccountID = $stateParams.accountId;
                vm.vehicle.$save()
                    .then(function () {
                        alerting.addSuccess('Created a new vehicle!');
                        $state.go('vehicles');
                    })
                    .catch(alerting.errorHandler('Could not create vehicle'));
            }
        };

        vm.cancel = function () {
            $state.go('vehicles');
        };
    };

    module.controller('VehicleDetailsController', ['vehicle',
        '$state',
        '$stateParams',
        'alerting',
        'optionValues',
        'VehicleResource',
        '$scope',
        VehicleDetailsController
    ]);

}(angular.module('vehicle')));

(function (module) {

    var tbVehicle = function (optionValues, VehicleResource, alerting) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/vehicle/tbVehicle.html',
            controller: ['$scope', function ($scope) {
                $scope.states = optionValues.getOptions('States');
                $scope.isFirstLoad = true;
            }],
            link: function (scope, element, attributes) {
                scope.createVehicle = function (vehicle) {
                    console.log(element);

                    vehicle.AccountID = scope.vm.accountId;
                    vehicle.IsActive = true;
                    var newVehicle = new VehicleResource(vehicle);

                    newVehicle.$save()
                        .then(function (data) {
                            scope.vm.ReturnValue = data.ID;
                            scope.vm.vehicles.push(data);
                            scope.vm.vehicleCreated = true;
                        })
                        .catch(alerting.errorHandler('Could not create vehicle'));
                };
            }
        };
    };

    module.directive('tbVehicle', ['optionValues', 'VehicleResource', 'alerting', tbVehicle]);

}(angular.module('vehicle')));

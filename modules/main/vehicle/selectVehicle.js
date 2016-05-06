(function (module) {

    'use strict';
    var selectVehicle = function (VehicleResource) {

        var accountId, clientId;

        var setParameters = function (aId, cId) {
            accountId = aId;
            clientId = cId;
        };

        var getAccountId = function () {
            return accountId;
        };
        var getClientId = function () {
            return clientId;
        };

        var showVehicles = function () {

            var vehicles = VehicleResource.queryNoTransponder({
                accountId: accountId
            });

            return vehicles.$promise;
        };

        return {
            showVehicles: showVehicles,
            setParameters: setParameters,
            getAccountId: getAccountId,
            getClientId: getClientId
        };
    };

    module.factory('selectVehicle', ['VehicleResource', selectVehicle]);

}(angular.module('vehicle')));

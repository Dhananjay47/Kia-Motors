(function (module) {
    'use strict';

    var VehicleListController = function VehicleListController(vehicles) {
        var vm = this;

        vm.title = 'Vehicles';
        vm.vehicles = vehicles;
    };

    module.controller('VehicleListController', ['vehicles', VehicleListController]);

}(angular.module('vehicle')));

(function () {
    angular
        .module('vehicle')
        .controller('VehicleController', VehicleController);

    function VehicleController() {
        var vm = this;

        vm.message = 'Vehicle!';
    }
}());

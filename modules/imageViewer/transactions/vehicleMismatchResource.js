(function(module) {
    angular
        .module('transactions')
        .factory('VehicleMismatchResource', ['$resource', 'CONFIG', VehicleMismatchResource]);

    function VehicleMismatchResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl, {}, {
            manualReviewLogInsert: {
                method: 'POST',
                url: CONFIG.apiVehicleMismatchUrl + '/ManualReviewLog/Insert'
            }
        });
    };
}());
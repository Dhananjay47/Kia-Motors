(function () {
    angular
        .module("pos")
        .factory("laneResource", ["$resource", "CONFIG", laneResource]);

    function laneResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/lane/GetRoads/:ClientID', {}, {
            queryRoad: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/lane/GetRoads'
            },
            queryPlaza: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/lane/GetPlazas'
            },
            queryLane: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/lane/GetLanes'
            }
        });
    }

}());

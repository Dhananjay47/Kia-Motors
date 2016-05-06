(function () {
    angular
        .module('vehicle')
        .factory('VehicleResource', ['$resource', 'CONFIG', VehicleResource]);

    function VehicleResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/vehicle/:id', {}, {
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/vehicle/search/:queryMethod/:queryString/'
            },
            queryExact: {
                method: 'GET',
                url: CONFIG.apiUrl + '/api/vehicle/searchExact/:queryMethod/:queryString/'
            },
            queryExactList: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/vehicle/searchExact/:queryMethod/:queryString/',
                transformResponse: function (data) {
                    if (data == 'null') {
                        return [];
                    } else {
                        return [angular.fromJson(data)];
                    }
                }
            },
            queryNoTransponder: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/vehicle/GetVehiclesWithoutTransponder/:accountId'
            },
            update: {
                method: 'PUT'
            },
            getOptions: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/vehicle/GetOptionsValues/:clientId'
            },
            listOwners: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/vehicle/ListOwners/:id'
            }
        });
    }

}());

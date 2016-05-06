(function () {
    angular
    .module('common')
    .factory('clientResource', ['$resource', 'CONFIG', clientResource]);

    function clientResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/tbapi/QueryClients');
    }
} ());

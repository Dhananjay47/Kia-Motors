(function () {
    angular
        .module('activity')
        .factory('statementResource', ['$resource', 'CONFIG', statementResource]);

    function statementResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/activity/:id', {}, {
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/activity/search/:queryMethod/:queryString'
            },
            update: {
                method: 'PUT'
            }
        });
    }
}());

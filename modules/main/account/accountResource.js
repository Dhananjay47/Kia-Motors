(function () {
    angular
        .module('account')
        .factory('AccountResource', ['$resource', 'CONFIG', AccountResource]);

    function AccountResource($resource, CONFIG) {
        //var webApiUrl = 'https://localhost:44301';
        return $resource(CONFIG.apiUrl + '/api/account/:accountId', {}, {
            query: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/account/search/:queryMethod/:queryString/'
            },
            getCurrentBalance: {
                method: 'GET',
                url: CONFIG.apiUrl + '/api/account/getcurrentbalance/:accountId'
            },
            update: {
                method: 'PATCH',
                url: CONFIG.apiUrl + '/api/account/:accountId'
            }
        });
    }

}());

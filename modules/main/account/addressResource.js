(function () {
    angular
        .module('account')
        .factory('AddressResource', ['$resource', 'CONFIG', AddressResource]);

    function AddressResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/account/getaddress/:id', {}, {
            update: {
                method: 'PUT',
                url: CONFIG.apiUrl + '/api/account/updateaddress/:id'
            },
            save: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/account/addaddress/:id/:type'
            }
        });
    }

}());

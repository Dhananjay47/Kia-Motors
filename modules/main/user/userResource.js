(function () {
    angular
        .module('user')
        .factory('UserResource', ['$resource', 'CONFIG', UserResource]);

    function UserResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/user/:id', {}, {
            register: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/user/register'
            },
            confirmEmail: {
                method: 'GET',
                url: CONFIG.apiUrl + '/api/user/confirmEmail'
            }
        });
    }
}());

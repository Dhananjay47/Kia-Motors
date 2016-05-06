(function () {
    angular
        .module('security')
        .factory('AuthorizationResource', ['$resource', 'CONFIG', AuthorizationResource]);

    function AuthorizationResource($resource, CONFIG) {
        return $resource(CONFIG.authorizationApiUrl, {}, {
            login: {
                method: 'POST',
                url: CONFIG.authorizationApiUrl + '/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            getPermissions: {
                method: 'GET',
                isArray: true,
                url: CONFIG.authorizationApiUrl + '/getpermissions'
            },
            logout: {
                method: 'POST',
                url: CONFIG.authorizationApiUrl + '/logout',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
    }

}());

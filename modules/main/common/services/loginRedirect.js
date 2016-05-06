(function (module) {
    'use strict';

    var loginRedirect = function ($q, $location, $injector) {
        var lastPath = '/';

        var redirectPostLogin = function () {
            $location.path(lastPath);
            lastPath = '/';
        };

        var requestError = function (request) {
            return $q.reject(request);
        };

        var responseError = function (response) {
            if (response.status === 401) {
                var currentPath = $location.path();
                if (currentPath !== '/login') {
                    lastPath = $location.path();
                }

                var oauth = $injector.get('oauth');
                oauth.uiLogout();

                $location.path('/login');
            }
            return $q.reject(response);
        };

        return {
            responseError: responseError,
            redirectPostLogin: redirectPostLogin
        };
    };

    module.factory('loginRedirect', ['$q', '$location', '$injector', loginRedirect]);
    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('loginRedirect');
    }]);
}(angular.module('security')));

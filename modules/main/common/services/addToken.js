(function (module) {

    'use strict';
    var addToken = function (currentUser, $q) {
        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
                // 9 mins or 540 seconds
                config.timeout = 540000;
            }
            return $q.when(config);
        };

        return {
            request: request
        };
    };

    module.factory('addToken', ['currentUser', '$q', addToken]);

    module.config(['$httpProvider', '$resourceProvider',
                   function ($httpProvider, $resourceProvider) {
        // enable cookies
        //$httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('addToken');
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

}(angular.module('security')));

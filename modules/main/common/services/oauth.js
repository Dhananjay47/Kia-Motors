(function () {

    angular
      .module('security')
      .factory('oauth', ['AuthorizationResource', 'formEncode', 'currentUser', 'CONFIG', 'Idle', oauth]);

    function oauth(AuthorizationResource, formEncode, currentUser, CONFIG, Idle) {

        var login = function (username, password) {
            // access_token
            var atData = formEncode({
                username: username,
                password: password,
                grant_type: 'password',
                client_id: 'prToll'
            });

            var result = AuthorizationResource.login(atData);

            return result.$promise.then(function (response) {
                Idle.watch();
                currentUser.setProfile(username,
                    response.access_token,
                    response.refresh_token);
                AuthorizationResource.getPermissions(function (permissions) {
                    currentUser.addPermissions(permissions);
                });
            });
        };

        var resetProfile = function () {
            currentUser.resetProfile();
            Idle.unwatch();
        };

        var logout = function () {
            return AuthorizationResource.logout().$promise.finally(resetProfile);
        };

        var uiLogout = function () {
            resetProfile();
        };

        var refresh = function () {
            // refresh_token
            var rtData = formEncode({
                client_id: 'prToll',
                grant_type: 'refresh_token',
                refresh_token: currentUser.profile.refresh
            });

            return AuthorizationResource.login(rtData).$promise
                .then(function (response) {
                    var username = currentUser.profile.username;
                    currentUser.setProfile(username,
                        response.access_token,
                        response.refresh_token);
                });
        };

        return {
            login: login,
            logout: logout,
            refresh: refresh,
            uiLogout: uiLogout
        };
    }
})();

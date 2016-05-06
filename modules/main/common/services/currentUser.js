(function (module) {

    var currentUser = function (localStorage) {

        var USERKEY = 'tbToken';
        var PERMISSIONSKEY = 'tbAuth';

        var setProfile = function (username, token, refresh) {
            profile.username = username;
            profile.token = token;
            profile.refresh = refresh;
            localStorage.add(USERKEY, {
                token: profile.token,
                refresh: profile.refresh,
                username: profile.username
            });
        };

        var resetProfile = function () {
            profile.username = '';
            profile.token = '';
            profile.refresh = '';
            localStorage.remove(USERKEY);
            localStorage.remove(PERMISSIONSKEY);
        };

        var addPermissions = function (permissions) {
            profile.permissions = permissions;
            localStorage.add(PERMISSIONSKEY, permissions);
        };

        var initialize = function () {
            var user = {
                username: '',
                token: '',
                refresh: '',
                permissions: {},
                get loggedIn() {
                    return !!this.token;
                }
            };

            var localUser = localStorage.get(USERKEY);
            var localAuth = localStorage.get(PERMISSIONSKEY);

            if (localUser) {
                user.username = localUser.username;
                user.token = localUser.token;
            }
            if (localAuth) {
                user.permissions = localAuth;
            }
            return user;
        };

        var profile = initialize();

        var hasPermission = function (permission) {
            if (!profile.permissions) {
                return false;
            }

            for (var i = 0; i < profile.permissions.length; i++) {
                if (profile.permissions[i].Resource === permission.Resource &&
                    profile.permissions[i].Action === permission.Action) {
                    return true;
                }
            }
            return false;
        };

        return {
            setProfile: setProfile,
            resetProfile: resetProfile,
            profile: profile,
            addPermissions: addPermissions,
            hasPermission: hasPermission
        };
    };

    module.factory('currentUser', ['localStorage', currentUser]);

}(angular.module('security')));

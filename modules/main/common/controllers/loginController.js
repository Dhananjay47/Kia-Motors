(function (module) {
    'use strict';

    var LoginController = function (oauth, currentUser, loginRedirect, alerting, $state, $scope) {

        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.user = currentUser.profile;

        $scope.loggedIn = currentUser.profile.loggedIn ? true : false;
        $scope.islogin = currentUser.profile.loggedIn ? true : false;

        vm.login = function (form) {
            if (form.$valid) {
                if (oauth.login(vm.username, vm.password)) {
                    loginRedirect.redirectPostLogin();
                }
            } else {
                alerting.errorHandler('Could not login');
            }
            vm.password = '';
            form.$setUntouched();

        };

        vm.logout = function () {
            oauth.logout()
                .then(function () {
                    $state.go('login', {}, {
                        reload: true
                    });
                })
                .catch(alerting.errorHandler('Could not logout'));
        };

        this.loggedIn = $scope.loggedIn;
        this.islogin = $scope.islogin;
        $scope.logout = vm.logout;
        $scope.hasPermission = currentUser.hasPermission;

        if ($scope.islogin) {
            $scope.username = currentUser.profile.username;
        }

    };

    module.controller('LoginController', ['oauth', 'currentUser', 'loginRedirect', 'alerting', '$state', '$scope', LoginController]);

}(angular.module('security')));

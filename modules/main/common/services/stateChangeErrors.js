(function (module) {
    module.run(['$rootScope', 'alerting', '$location', 'currentUser', '$state',
        function ($rootScope, alerting, $location, currentUser, $state) {

            $rootScope.$on('$stateChangeError', function (event, toState, toParams,
                fromState, fromParams, error) {
                // non-security related
                if (error.status !== 401) {
                    alerting.addDanger('Could not load ' + toState.name);
                }
            });

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var permission;

                // check permission for authorization
                if (toState && toState.data && toState.data.permission) {
                    permission = toState.data.permission;
                    if (!currentUser.hasPermission(permission) && toState.name !== 'login') {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            });
        }
    ]);
}(angular.module('common')));

(function(module) {

    'use strict';
    var idle = function(Idle, oauth, $location, $modal) {
        var check = function(scope) {
            var closeModals = function closeModals() {
                if (scope.warning) {
                    scope.warning.close();
                    scope.warning = null;
                }
                if (scope.timedout) {
                    scope.timedout.close();
                    scope.timedout = null;
                }
            };

            scope.events = [];

            scope.$on('IdleStart', function() {
                // the user appears to have gone idle
                closeModals();
                scope.$apply(function() {
                    scope.warning = $modal.open({
                        templateUrl: 'modules/main/common/templates/idle/warning-dialog.html',
                        windowClass: 'modal-warning'
                    });
                });
            });

            scope.$on('IdleWarn', function(e, countdown) {
                // follows after the IdleStart event, but includes a countdown until the user is considered timed out
                // the countdown arg is the number of seconds remaining until then.
                // you can change the title or display a warning dialog from here.
                // you can let them resume their session by calling Idle.watch()
            });

            scope.$on('IdleTimeout', function() {
                // the user has timed out (meaning idleDuration + timeout has passed without any activity)
                // this is where you'd log them
                oauth.logout();
                closeModals();
                scope.$apply(function() {
                    $location.path('/login');
                    scope.timedout = $modal.open({
                        templateUrl: 'modules/main/common/templates/idle/timedout-dialog.html',
                        windowClass: 'modal-danger'
                    });
                });
            });

            scope.$on('IdleEnd', function() {
                // the user has come back from AFK and is doing stuff.
                // if you are warning them, you can use this to hide the dialog
                closeModals();
            });

            scope.$on('Keepalive', function() {
                // refresh_token
                oauth.refresh()
                    .then(function() {
                        // authorizationResource.getPermissions();
                    })
                    .catch(function() {
                        $location.path('/login');
                        oauth.uiLogout();
                    });
            });

        };

        return {
            check: check
        };
    };

    module.factory('idle', ['Idle', 'oauth', '$location', '$modal', idle]);

}(angular.module('security')));

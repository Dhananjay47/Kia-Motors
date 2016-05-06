(function () {
    'use strict';

    angular
        .module('security', ['common', 'ngIdle', 'authorizationResourceMock'])
        .config(['IdleProvider', 'KeepaliveProvider', function (IdleProvider, KeepaliveProvider) {
            // idle - all in seconds
            IdleProvider.idle(900); // 870 (900 / 15 mins); 30 testing
            IdleProvider.timeout(20);
            KeepaliveProvider.interval(900); // 890 (log in every 15 mins); 59 testing
        }]);
}());

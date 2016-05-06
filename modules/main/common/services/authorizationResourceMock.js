(function () {
    'use strict';

    angular
        .module('authorizationResourceMock', ['ngMockE2E', 'common'])
        .run(['$httpBackend', 'CONFIG', AuthorizationResourceMock]);

    function AuthorizationResourceMock($httpBackend, CONFIG) {
        var tokenResponse, permissions, tokenUrl, permissionUrl, logoutUrl;

        tokenResponse = {
            username: 'alex.agent@gilacorp.com',
            access_token: 'lbpJA2IvXMkKSTB_o2_5FZ3qVqIMalV0ltAYY7xzpBWvzsonCQlJOokRJ_fpNCyerWDYz_89p4toG7BmdovCWSg-7OVJi5vGitUtEsiAjaBDnj2kgD-hf3g' +
                '-FSEv39mCOuawTgCw5NGBAzhwAZZggCpJxf2lpdmNvJ3w7NXR9FVdVnlLDtZ3FYVl5qcbbik9J-' +
                'nmwjqEJ_WXAyEzgvqLJDLRjpbavGtx7pTNv7hPCToFqv1v92WhuRt86KWAuVhfW6fduzSmtWqt6hm5KYSJqeXE4SynKKN65-yUaV0FyC5_KMJkteb7SIJ2htrTYiZGKyf_G-N-2y_rilc' +
                '-rtYpKosfTvlSV2oy2JkBqJgYGBy8M5Pl2wT7L1pc08QPmbx_JcKoCprNxHgpuNsAzGF135ArCKpTvQn6St6kuvGbeiI8mZLYXYQb7A3m6I' +
                '-_Z0R6nVsSjIIRDsWFzCvZ7Gc9hgAv3idrpqUUrMViZfV9cBebkxuxtjeITDDS6vnD_E9K_dPlG-Dfk1LoedaE4FZoSie3utJlxHKJitc0o5e78STAE2_z9ObqOBoSmgDo0Ejqjfru-g',
            refresh_token: '244ba0f6133b4802809ded148db394a3',
        };

        permissions = [{
            'Resource': 'user',
            'Action': 'getpermissions'
        }, {
            'Resource': 'account',
            'Action': 'search'
        }, {
            'Resource': 'vehicle',
            'Action': 'all'
        }, {
            'Resource': 'transactionsearch',
            'Action': 'get'
        }, {
            'Resource': 'report',
            'Action': 'all'
        }, {
            'Resource': 'vehiclemismatch',
            'Action': 'edit'
        }];

        tokenUrl = '/token';
        $httpBackend.whenPOST(CONFIG.authorizationApiUrl + tokenUrl).respond(function (method, url) {
            return [200, angular.fromJson(tokenResponse)];
        });

        permissionUrl = '/getpermissions';
        $httpBackend.whenGET(CONFIG.authorizationApiUrl + permissionUrl).respond(permissions);

        logoutUrl = '/logout';
        $httpBackend.whenPOST(CONFIG.authorizationApiUrl + logoutUrl).respond(function (method, url) {
            return [200, {}];
        });

        // dont mock everything else, specify pass through to avoid error.
        $httpBackend.whenGET(/^\w+.*/).passThrough();

        //$httpBackend.whenGET(/(module|build|i18n)\/.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    }
})();

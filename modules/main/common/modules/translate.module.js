(function () {
    'use strict';

    angular
        .module('translate', ['pascalprecht.translate', 'ngCookies', 'common'])
        .config(['$translateProvider', function ($translateProvider) {

            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/locale-',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');
            $translateProvider.fallbackLanguage('en');
            $translateProvider.useLocalStorage();
            $translateProvider.useLoaderCache('$templateCache');
            $translateProvider.useSanitizeValueStrategy('escape');
        }]);
}());

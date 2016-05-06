(function () {
    'use strict';

    angular
        .module('ui', ['ui.bootstrap', 'ngAnimate'])
        .config(['$modalProvider', function ($modalProvider) {
            // ui bootstrap backdrop bug with angular bootstrap 0.13 and angular 1.4.x
            $modalProvider.options.animation = false;
        }]);
}());

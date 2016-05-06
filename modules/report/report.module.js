(function () {

    'use strict';

    var app = angular.module('report', [
        'ui.router', 'common', 'security'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('report', {
                    url: '/report',
                    template: '<tb-report width="1004" height="853" report-name="PuertoRico-TD3&#47;InterfaceFileDashboard" report-tabs="no" report-toolbar="yes" report-show-viz-home="no" report-filter="Interface File Source=To,He"></tb-report>'
                });
      }]);

    app.controller('MainController', ['$scope',
      function ($scope) {}

    ]);
}());

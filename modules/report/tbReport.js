(function (module) {

    'use strict';
    var tbReport = function ($compile, $state, CONFIG) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                width: '@',
                height: '@',
                reportName: '@',
                reportTabs: '@',
                reportToolbar: '@',
                reportShowVizHome: '@',
                reportFilter: '@'
            },
            templateUrl: 'modules/report/report.html',
            controller: ['$scope', function ($scope) {
                $.getScript(CONFIG.reportUrl + '/javascripts/api/viz_v1.js');
                var host = CONFIG.reportUrl.replace('https://', '');
                $scope.hostUrl = '%2F%2F' + host + '%2F';
                $scope.siteRoot = CONFIG.reportRoot;
            }]
        };
    };

    module.directive('tbReport', ['$compile', '$state', 'CONFIG', tbReport]);

}(angular.module('report')));
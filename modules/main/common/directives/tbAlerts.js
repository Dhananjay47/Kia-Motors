(function (module) {

    var alerts = function (alerting) {
        return {
            restrict: 'AE',
            templateUrl: 'modules/main/common/templates/alerts.html',
            scope: true,
            controller: ['$scope', function ($scope) {
                $scope.removeAlert = function (alert) {
                    alerting.removeAlert(alert);
                };
            }],
            link: function (scope) {
                scope.currentAlerts = alerting.currentAlerts;
            }
        };
    };

    module.directive('alerts', ['alerting', alerts]);

}(angular.module('message')));

(function (module) {

    var activityStatements = function (statementDetailing) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/activity/statements.html',
            scope: {
                statements: '=data'
            },
            controller: ['$scope', function ($scope) {
                $scope.state = statementDetailing;
                //$scope.activities = [];
                statementDetailing.clear();
            }],
            link: function (scope) {
                scope.toggleCheckbox = function (statement) {
                    statement.isChecked = !statement.isChecked;
                    statementDetailing.toggleDetails(statement.Transactions,
                        statement.Payments, statement.Adjustments);
                };
            }
        };
    };

    module.directive('activityStatements', ['statementDetailing', activityStatements]);

    var activityDetails = function (statementDetailing, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/activity/statementDetails.html',
            controller: ['$scope', function ($scope) {
                $scope.endsWith = function (str, suffix) {
                    return str.indexOf(suffix, str.length - suffix.length) !== -1;
                };
                $scope.isDate = function (fieldName) {
                    return $scope.endsWith(fieldName, 'Date') ||
                        $scope.endsWith(fieldName, 'Timestamp');
                };
                $scope.format = function (fieldName, value) {
                    if (fieldName === 'Toll') {
                        return $filter('currency')(value);
                    } else {
                        return value;
                    }
                };
            }],
            scope: {},
            link: function (scope) {
                scope.details = statementDetailing.currentDetails;
            }
        };
    };

    module.directive('activityDetails', ['statementDetailing', '$filter', activityDetails]);

}(angular.module('activity')));

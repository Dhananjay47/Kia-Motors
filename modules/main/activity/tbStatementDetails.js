(function (module) {

    var statementDetails = function (statementDetailing) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/activity/statementDetails.html',
            scope: true,
            controller: ['$scope', function ($scope) {
                //$scope.transactions = statementDetailing.currentTransactions;
            }],
            link: function (scope) {
                scope.details = statementDetailing.currentDetails;
            }
        };
    };

    module.directive('statementDetails', ['statementDetailing', statementDetails]);

}(angular.module('activity')));

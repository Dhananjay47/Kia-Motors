(function (module) {
    'use strict';

    var ActivityController = function ActivityController(statements, $scope, workflow) {
        var vm = this;

        vm.title = 'Activities';
        $scope.statements = statements;

        $scope.beginWorkflow = function (caseType) {
            var account = $scope.$parent.vm.account;
            workflow.begin(account.ID, account.ClientID, caseType);
        };
    };

    module.controller('ActivityController', ['statements',
                                             '$scope', 'workflow', ActivityController]);

}(angular.module('activity')));

(function (module) {

    'use strict';
    var workflow = function (caseResource, alerting, $modal, promptInputs, $state, selectVehicle) {

        var step;

        var resume = function (workflowRequest) {
            return caseResource.resume(workflowRequest).$promise;
        };

        var begin = function (accountId, clientId, caseType) {
            step = 0;

            // set accountId clientId for vehicle or other cases where resolve needs accountId dependencies
            selectVehicle.setParameters(accountId, clientId);

            // begin workflow
            var caseBinding = {
                AccountID: accountId,
                ClientID: clientId,
                CaseType: caseType
            };

            caseResource.begin(caseBinding).$promise
                .then(function (data) {
                    promptInputs(data).then(work);
                }).catch(alerting.errorHandler('Could not create workflow'));
        };

        var work = function (workflowRequest) {

            step++;
            var promise;

            if (step === 1) {
                promise = resume(workflowRequest);
            } else {
                promise = promptInputs(workflowRequest).then(resume);
            }

            return promise.then(
                function (data) {
                    if (step < 10) {
                        if (data.Type === 'Completed' || data.Type === 'Failed') {
                            return promptInputs(data).then(function () {
                                $state.reload();
                            });
                        } else {
                            return work(data);
                        }
                    } else {
                        workflowRequest.Type = 'Failed';
                        return promptInputs(workflowRequest);
                    }
                },
                function (e) {
                    alerting.errorHandler('Could not resume workflow');
                    // call api to fail this workflow
                    // data.ReturnStatus = 'Failed';
                    // data.ReturnValue = '';
                    // return resume(data).then(function (failedMsg) {promptInputs(failedMsg)});
                });
        };

        return {
            begin: begin
        };
    };

    module.factory('workflow', ['caseResource', 'alerting', '$modal',
                    'promptInputs', '$state', 'selectVehicle', workflow]);

}(angular.module('activity')));

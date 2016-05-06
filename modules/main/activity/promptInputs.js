(function (module) {

    'use strict';
    var promptInputs = function ($modal) {
        var vm = this;

        return function (workflowRequest) {

            var options = {
                size: 'lg',
                backdrop: 'static',
                keyboard: false
            };

            switch (workflowRequest.Type) {
            case 'Completed':
                options.templateUrl = 'modules/main/common/templates/cases/completed.html';
                break;
            case 'Failed':
            case 'Unknown':
                options.templateUrl = 'modules/main/common/templates/cases/failed.html';
                break;
            case 'Cancelled':
                options.templateUrl = 'modules/main/common/templates/cases/cancelled.html';
                break;
            case 'InputCurrency':
                options.templateUrl = 'modules/main/common/templates/cases/adjustment.html';
                break;
            case 'InputStringSingle':
                options.templateUrl = 'modules/main/common/templates/cases/inputText.html';
                break;
            case 'InputStringMultiple':
                options.templateUrl = 'modules/main/common/templates/cases/notes.html';
                break;
            case 'VehicleWithoutTransponder':
                options.templateUrl = 'modules/main/common/templates/cases/selectVehicle.html';
                break;
            }

            if (workflowRequest.Type === 'VehicleWithoutTransponder') {
                options.controller = ['vehicles', '$scope', 'accountId',
                    function (vehicles, $scope, accountId) {
                        this.vehicles = vehicles;
                        this.Message = workflowRequest.Message;
                        this.accountId = accountId;
                        $scope.submit = function (returnValue) {
                            workflowRequest.ReturnValue = returnValue;
                            workflowRequest.ReturnStatus = 'Completed';
                            this.$close(workflowRequest);
                        };
                        $scope.cancel = function (returnValue) {
                            workflowRequest.ReturnValue = returnValue;
                            workflowRequest.ReturnStatus = 'Cancelled';
                            this.$close(workflowRequest);
                        };
                    }];
                options.controllerAs = 'vm';
                options.resolve = {
                    vehicles: ['selectVehicle', function (selectVehicle) {
                        return selectVehicle.showVehicles();
                    }],
                    accountId: ['selectVehicle', function (selectVehicle) {
                        return selectVehicle.getAccountId();
                    }]
                };
            } else {
                options.controller = ['$scope', function ($scope) {
                    this.Message = workflowRequest.Message;
                    $scope.submit = function (returnValue) {
                        workflowRequest.ReturnValue = returnValue;
                        workflowRequest.ReturnStatus = 'Completed';
                        this.$close(workflowRequest);
                    };
                    $scope.cancel = function (returnValue) {
                        workflowRequest.ReturnValue = returnValue;
                        workflowRequest.ReturnStatus = 'Cancelled';
                        this.$close(workflowRequest);
                    };
                }];
                options.controllerAs = 'vm';
            }

            return $modal.open(options).result;
        };
    };

    module.factory('promptInputs', ['$modal', promptInputs]);

}(angular.module('activity')));

(function (module) {
    'use strict';

    var transactionClassMismatches = function ($translate, $state, TransactionResource, VehicleMismatchResource, alerting) {
        return {
            priority: 2,
            templateUrl: 'modules/imageViewer/transactions/tbTransactionClassMismatches.html',
            replace: true,
            restrict: 'E',
            scope: {
                details: '='
            },
            controller: ['$scope', function ($scope) {

                $scope.newVehicleClass = undefined;
                $scope.showSave        = false;
                $scope.vehicleClasses  = $scope.$parent.vehicleClasses;

                $scope.updateVehicleClass = function () {

                    var mismatchLog = {
                        OriginalValue: $scope.details.RoadSideVehicleClassID,
                        ChangedValue: $scope.newVehicleClass
                    }
                    var params = {
                        RoadSideID: $scope.details.RoadSideID,
                        RoadSideVehicleID: $scope.details.RoadSideVehicleClassID,
                        SourceTableTypeID: 3, // RoadSide
                        SourceFieldTypeID: 1, // VehicleClass
                        MismatchLogs: []
                    }
                    params.MismatchLogs.push(mismatchLog);
                    VehicleMismatchResource.manualReviewLogInsert(params).$promise.then(function (data) {
                        $scope.showSave = false;
                        alerting.addSuccess("Vehicle class changed was saved successfully!");
                    }, function (err) {
                        alerting.errorHandler("Could not change vehicle class");
                    });
                };

            }],
            link: function (scope, element, attribute) {
            }
        };
    };

    module.directive('tbTransactionClassMismatches',
        ['$translate', '$state', 'TransactionResource', 'VehicleMismatchResource', 'alerting', transactionClassMismatches]);

}(angular.module('transactions')));

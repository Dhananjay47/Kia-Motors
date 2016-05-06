(function () {
    'use strict';

    angular
        .module('transactions')
        .factory('selectTransaction', ['$modal', 'currentUser', selectTransaction]);

    function selectTransaction($modal, currentUser) {

        var showDetails = function (transaction, vehicleClasses, searchOptionName) {
            var options = {
                templateUrl: 'modules/imageViewer/transactions/transactionModal.html',
                size: 'xl',
                controller: ['$scope', function ($scope) {
                    $scope.transaction = transaction;
                    $scope.vehicleClasses = vehicleClasses;

                    if (transaction.StatusDescription !== 'Image Retrieval Pending') {
                        $scope.images = transaction.TransactionImageFiles;
                    }

                    var permission = {
                        Resource: 'vehiclemismatch',
                        Action: 'edit'
                    };
                    var searchClassMismatch = searchOptionName === 'OpenClassMismatches';
                    $scope.canEditVehicleClass = searchClassMismatch && currentUser.hasPermission(permission);
                }]
            };

            return $modal.open(options).result;
        };

        return {
            showDetails: showDetails
        };
    }
})();

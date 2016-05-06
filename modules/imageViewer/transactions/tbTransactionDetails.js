(function () {
    angular
        .module('transactions')
        .directive('tbTransactionDetails', tbTransactionDetails);

    function tbTransactionDetails() {
        return {
            restrict: 'E',
            templateUrl: 'modules/imageViewer/transactions/tbTransactionDetails.html',
            scope: {
                details: '=',
                vehicleClasses: '=',
                canEditVehicleClass: '='
            }
        };
    }
})();

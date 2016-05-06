(function () {
    'use strict';

    angular
        .module('transactions')
        .controller('TransactionController', ['$scope', 'TransactionResource', TransactionController]);

    function TransactionController($scope, TransactionResource) {
        // _______________________________________________________
        // Properties

        $scope.currentPage = 0;
        $scope.queryParams = {
            BeginTransactionDateTime: null,
            EndTransactionDateTime: null,
            LicencePlateNumber: null,
            TagNumber: null,
            AuthorityTransactionNumber: null,
            AuthorityID: null,
            RoadID: null,
            PlazaID: null,
            LaneID: null,
            RoadSideStatusTypeID: null,
            PagingInfo: {
                PageNumber: $scope.currentPage,
                PageSize: 20,
                NoOfRecords: 0,
                SortingFields: [{
                    'SortDirection': 0,
                    'SortField': 'AuthorityTransactionNumber'
                }]
            }
        };

        $scope.transactions = [];
        //$scope.transactionsList = [];

        // _______________________________________________________
        // Functions

        $scope.getMismatch = function () {
            $scope.queryParams.BeginTransactionDateTime = null;
            $scope.queryParams.EndTransactionDateTime = null;

            TransactionResource.getVehicleClassMismatches($scope.queryParams).$promise.then(function (data) {
                $scope.transactions = data;
                pushResultList(data.Transactions);
            });
        };

        $scope.query = function () {
            TransactionResource.query($scope.queryParams).$promise.then(function (data) {
                $scope.transactions = data;
                pushResultList(data.Transactions);
            });
        };

        function pushResultList(transactions) {
            if (!!transactions && transactions.length > 0) {
                angular.forEach(transactions, function (item) {
                    $scope.transactionsList.push(item);
                });
            }
        }
    }
})();

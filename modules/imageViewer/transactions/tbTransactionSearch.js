(function(module) {
    'use strict';

    var transactionsSearch = function($translate, $state, TransactionResource, utilities) {
        return {
            priority: 2,
            templateUrl: 'modules/imageViewer/transactions/tbTransactionSearch.html',
            replace: true,
            restrict: 'E',
            scope: {
                transactions: '=transactions',
                queryParams: '=',
                queryTransactions: '&query'
            },
            controller: ['$scope', function($scope) {

                // _______________________________________________________
                // Properties

                $scope.fromDate = new Date();
                //$scope.fromDate.setDate($scope.fromDate.getDate() - 365);
                $scope.fromDate = utilities.substractFromDate($scope.fromDate, 'minutes', 1);
                $scope.toDate = new Date();
                $scope.transactionQueryString = null;
                $scope.currentPage = 1;

                //
                $scope.transactionsSearchOptions = [{
                    name: 'TransactionNumber',
                    criteria: 'exclusive',
                    type: 'transaction'
                }, {
                    name: 'Transponder',
                    criteria: 'inclusive',
                    type: 'transaction'
                }, {
                    name: 'Plate',
                    criteria: 'inclusive',
                    type: 'transaction'
                }, {
                    name: 'Road/Plaza/Lane',
                    criteria: 'inclusive',
                    type: 'transaction'
                }, {
                    name: 'OpenClassMismatches',
                    criteria: 'exclusive',
                    type: 'transaction'
                }];

                $scope.searchOption = $scope.transactionsSearchOptions[0];

                // _______________________________________________________
                // Functions

                //TODO: call webAPI whenever the authority list resource is ready
                $scope.authorities = [{
                    ID: 1,
                    Name: 'Sanef'
                }, {
                    ID: 2,
                    Name: 'ORB'
                }];
                //end TODO

                $scope.resetValues = function() {
                    $scope.authority = null;
                    $scope.road = null;
                    $scope.lane = null;
                    $scope.transactionQueryString = null;
                    $scope.$parent.transactionsList = [];
                    $scope.$parent.currentPage = 0;
                    $scope.fromDate = new Date();
                    //$scope.fromDate.setDate($scope.fromDate.getDate() - 365);
                    $scope.fromDate = utilities.substractFromDate($scope.fromDate, 'minutes', 1);
                    $scope.toDate = new Date();
                    $scope.$parent.searchOptionName = $scope.searchOption.name;

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
                            PageNumber: 0,
                            PageSize: 20,
                            NoOfRecords: 0,
                            SortingFields: [{ "SortDirection": 0, "SortField": "AuthorityTransactionNumber" }]
                        }
                    }
                }

                $scope.formIsNotValid = function() {
                    if (
                        ($scope.searchOption.criteria === 'inclusive' && $scope.searchOption.name !== 'Road/Plaza/Lane' && (!$scope.transactionQueryString || !$scope.fromDate || !$scope.toDate)) || (!$scope.transactionQueryString && $scope.searchOption.criteria === 'exclusive') || ($scope.searchOption.name === 'Road/Plaza/Lane' && (!$scope.authorityID || !$scope.roadID))
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }

                $scope.queryRoads = function(authorityID) {
                    var params = {
                        authorityID: authorityID
                    };
                    TransactionResource.queryRoadPlazaLaneByAuthority(params).$promise.then(function (data) {
                        $scope.roads = data[0].Roads;
                    });
                }
                $scope.queryPlazas = function() {
                    var params = {
                        roadID: $scope.roadID
                    };
                    TransactionResource.queryRoadPlazaLaneByRoad(params).$promise.then(function (data) {
                        $scope.plazas = data[0].Plazas;
                    });
                }
                $scope.queryLanes = function() {
                    var params = {
                        plazaID: $scope.plazaID
                    };
                    TransactionResource.queryRoadPlazaLaneByPlaza(params).$promise.then(function(data) {
                        $scope.lanes = data[0].Lanes;
                    });
                }

                $scope.checkMismatch = function() {
                    if ($scope.searchOption.name === 'OpenClassMismatches') {
                        $scope.search();
                    }
                }

                $scope.search = function() {
                    $scope.transactions = [];
                    var queryParams = $scope.queryParams;
                    queryParams.BeginTransactionDateTime = !$scope.fromDate ? null : $scope.fromDate;
                    queryParams.EndTransactionDateTime   = !$scope.toDate ? null : $scope.toDate;
                    $scope.currentPage = 0;
                    var selectedOption = $scope.searchOption;
                    $scope.$parent.searchOptionName = $scope.searchOption.name;
                    queryParams.RoadSideStatusTypeID = undefined;
                    switch (selectedOption.name) {
                        case 'TransactionNumber':
                            queryParams.AuthorityTransactionNumber = $scope.transactionQueryString;
                            break;
                        case 'Transponder':
                            queryParams.TagNumber = $scope.transactionQueryString;
                            break;
                        case 'Plate':
                            queryParams.LicencePlateNumber = $scope.transactionQueryString;
                            break;
                        case 'AccountNumber':
                            queryParams.AccountNumber = $scope.transactionQueryString;
                            break;
                        case 'Road/Plaza/Lane':
                            queryParams.AuthorityID = $scope.authorityID,
                            queryParams.RoadID = $scope.roadID;
                            queryParams.PlazaID = $scope.plazaID;
                            queryParams.LaneID = $scope.laneID;
                            break;
                        case 'OpenClassMismatches':
                            $scope.$parent.getMismatch();
                            break;
                    }
                    if (selectedOption.name !== 'OpenClassMismatches') {
                        $scope.queryTransactions();
                    }
                };

                $scope.openFrom = function() {
                    $scope.calendarOpened1 = true;
                };
                $scope.openTo = function() {
                    $scope.calendarOpened2 = true;
                };
            }],
            link: function(scope, element, attribute) {}
        };
    };

    module.directive('tbTransactionSearch', ['$translate', '$state', 'TransactionResource', 'utilities', transactionsSearch]);

}(angular.module('transactions')));

(function () {
    angular
        .module('transactions')
        .directive('tbTransactionList', tbTransactionList);

    function tbTransactionList () {
        return {
            restrict: 'E',
            templateUrl: 'modules/imageViewer/transactions/tbTransactionList.html',
            scope: {
                transactions: '=',
                transactionsList: '=',
                queryParams:  '=',
                queryTransactions: '&query',
                queryClassMismatches: '&queryClassMismatches'
            },
            controller: ['$scope', 'selectTransaction', function ($scope, selectTransaction) {

                $scope.result = $scope.transactions;
                $scope.sort = {
                    active: 'AuthorityTransactionNumber',
                    descending: false
                }
                $scope.showDetails = function (transaction) {
                    selectTransaction.showDetails(transaction, $scope.transactions.Vehicle, $scope.$parent.searchOptionName);
                };
                $scope.changeSorting = function(column) {
                    var sort = $scope.sort;
                    if (sort.active === column) {
                        sort.descending = !sort.descending;
                    } else {
                        sort.active = column;
                        sort.descending = false;
                    };
                    $scope.queryParams.PagingInfo.SortingFields = [];
                    var direction = sort.descending ? 1 : 0;
                    var order = { "SortDirection": direction, "SortField": sort.active }
                    $scope.queryParams.PagingInfo.SortingFields.push(order);
                    if ($scope.$parent.searchOptionName === 'OpenClassMismatches') {
                        $scope.queryClassMismatches();
                    } else {
                        $scope.queryTransactions();
                    }
                };
                $scope.getIcon = function(column) {
                    var sort = $scope.sort;
                    if (sort.active === column) {

                        return sort.descending
                            ? 'glyphicon-chevron-down'
                            : 'glyphicon-chevron-up';
                    }
                    return 'blyphicon-minus';
                };
            }],
            link: function (scope, elm, attr) {
                var panel = document.getElementById('transactionsContainer');

                angular.element(panel).bind('scroll', function () {
                    if (panel.scrollTop) {
                        scope.queryParams.PagingInfo.PageNumber += 1;

                        if (scope.$parent.searchOptionName === 'OpenClassMismatches') {
                            scope.queryClassMismatches();
                        } else {
                            scope.queryTransactions();
                        }
                    }
                });
            }
        };
    }
})();

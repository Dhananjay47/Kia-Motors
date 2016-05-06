(function () {
    angular
        .module('transactions')
        .factory('TransactionResource', ['$resource', 'CONFIG', TransactionResource]);

    function TransactionResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl, {}, {
            query: {
                method: 'POST',
                url: CONFIG.apiTransactionUIUrl + '/GetPagings'
            },
            queryRoadPlazaLaneByAuthority: {
                method: 'Get',
                isArray: true,
                url: CONFIG.apiTransactionUIUrl + '/GetRoadPlazaLanesByAuthorityId/:authorityID'
            },
            queryRoadPlazaLaneByRoad: {
                method: 'Get',
                isArray: true,
                url: CONFIG.apiTransactionUIUrl + '/GetRoadPlazaLanesByRoadId/:roadID'
            },
            queryRoadPlazaLaneByPlaza: {
                method: 'Get',
                isArray: true,
                url: CONFIG.apiTransactionUIUrl + '/GetRoadPlazaLanesByPlazaId/:plazaID'
            },
            getVehicleClassMismatches: {
                method: 'POST',
                url: CONFIG.apiTransactionUIUrl + '/GetTransactionsPagingsForPendingReview'
            }
        });
    }
})();

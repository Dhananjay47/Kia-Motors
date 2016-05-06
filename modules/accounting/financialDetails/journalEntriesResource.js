(function () {
    angular
    .module("accounting")
    .factory("journalEntriesResource", ["$resource", "CONFIG", journalEntriesResource]);

    function journalEntriesResource($resource, CONFIG) {

        return $resource(CONFIG.apiUrl + '/api/accounting', {}, {
            queryJournalReasons: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/accounting/GetJournalReasons'
            },
            queryJournalEntries: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/accounting/GetJournalEntries/'
            },
            getGLAccounts: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/accounting/GetGLAccounts'
            },
            getGLAccountsByGroupID: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/accounting/GetGLAccountsByGroupID'
            },
            insertJournalEntry: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/accounting/InsertJournalEntry'
            }

        });
    }

}());

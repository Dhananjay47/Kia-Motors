
(function (module) {
    'use strict';

    var journalEntriesController = function ($scope, $modal, $translate, currentUser, journalEntriesResource, clientResource,
        uiGridConstants, alerting, utilities) {
        var vm = this;

        // _______________________________________________________
        // Criteria Properties

        vm.reasonID           = undefined;
        vm.clientID           = undefined;
        vm.calendarFromOpened = false;
        vm.fromDate           = undefined;
        vm.toDate             = new Date();
        vm.currentUser        = currentUser.profile;
        vm.gridOptions        = {};
        vm.gridItems          = [];
        vm.accountsLevel      = [];
        vm.accountsLevel.push([]);
        vm.gridItems          = [];

        // _______________________________________________________
        // Grid

        vm.gridOptions.columnDefs = [
          { name: 'AsOfDate', displayName: 'Date', width: '10%', enableCellEdit: false, cellFilter: 'date:\'MM-dd-yyyy\'' },
          { name: 'JournalID', displayName: 'Journal ID', width: '9%', enableCellEdit: false },
          { name: 'JournalAccountCode', displayName: 'Acct Code', width: '10%', enableCellEdit: false },
          { name: 'JournalAccountCodeName', displayName: 'Acct Name', width: '15%', enableCellEdit: false },
          { name: 'EnteredBy', displayName: 'Entered By', width: '10%', enableCellEdit: false },
          { name: 'JournalDetailNote', displayName: 'Note', width: '20%' },
          { name: 'DebitAmount', displayName: 'Debit', width: '13%', cellFilter: 'currency', cellClass: 'uigrid-align-right' },
          { name: 'CreditAmount', displayName: 'Credit', width: '13%', cellFilter: 'currency', cellClass: 'uigrid-align-right' },
        ];


        // _______________________________________________________
        // Methods

        vm.resetCriteria          = function () {
            vm.reasonID           = null;
            vm.clientID           = null;
            vm.calendarFromOpened = false;
            vm.fromDate           = undefined;
            vm.toDate             = new Date();;
            vm.gridOptions.data   = [];
        }

        vm.openFrom = function () {
            vm.calendarOpened1 = true;
        };
        vm.openTo = function () {
            vm.calendarOpened2 = true;
        };

        vm.executeQuery = function () {

            vm.parFromDate = !vm.fromDate ? '' : vm.fromDate;
            vm.parToDate = !vm.toDate ? '' : utilities.dateTimeSetHourToMidnight(vm.toDate);
            this.param = { fromDate: vm.parFromDate, toDate: vm.parToDate, reasonID: vm.reasonID, clientID: vm.clientID }
            journalEntriesResource.queryJournalEntries(this.param).$promise.then(function (data) {
                vm.gridOptions.data = data;

            });
        }

        clientResource.query().$promise.then(function (data) {
            vm.clients = [];
            var client = { ID: null, Name: 'All Clients' };
            vm.clients.push(client);
            angular.forEach(data, function (item) {
                client = { ID: item.ID, Name: item.Name };
                vm.clients.push(client);
            });
        });

        journalEntriesResource.queryJournalReasons().$promise.then(function (data) {
            vm.reasons = [];
            var reason = { ID: null, Name: "All Reasons" };
            vm.reasons.push(reason);
            angular.forEach(data, function (item) {
                reason = {};
                reason.ID = item.ID;
                reason.Name = item.Name;
                vm.reasons.push(reason);
            });
        });

        vm.openJournalItemEdit = function () {
            vm.modalEdit = $modal.open({
                templateUrl: 'modules/accounting/financialDetails/journalItemEdit.html',
                scope: $scope,
                controller: 'JournalItemEditController as vm',
                backdrop: 'static',
                size: 'lg'
            });
        }
        // end: Methods

        // _______________________________________________________
        // Initialization

        vm.resetCriteria();
    }

    module.controller("JournalEntriesController",
        ['$scope', '$modal', '$translate', 'currentUser', 'journalEntriesResource',
         'clientResource', 'uiGridConstants', 'alerting', 'utilities', journalEntriesController]);

}(angular.module('accounting')));

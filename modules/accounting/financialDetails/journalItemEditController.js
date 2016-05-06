
(function (module) {
    'use strict';

    var journalItemEditController = function ($scope, $modal, $translate, currentUser, journalEntriesResource, clientResource, uiGridConstants, alerting) {
        var vmEdit = this;

        // _______________________________________________________
        // Properties
        vmEdit.reasonID;
        vmEdit.clientID;
        vmEdit.note;
        vmEdit.asOfDate       = new Date();
        vmEdit.totalDebits    = 0;
        vmEdit.totalCredits   = 0;
        vmEdit.calendarOpened = false;
        vmEdit.maxDate        = new Date();
        vmEdit.minDate        = new Date();
        vmEdit.minDate.setMonth(vmEdit.minDate.getMonth() - 1);
        vmEdit.maxDate.setDate(vmEdit.maxDate.getDate() + 7);
        vmEdit.currentUser    = currentUser.profile;
        vmEdit.gridOptions    = {};
        vmEdit.gridItems      = [];
        vmEdit.message        = undefined;
        vmEdit.newAccountID;
        vmEdit.newAccountCode;
        vmEdit.newAccountName;
        vmEdit.newDescription;
        vmEdit.newDebit;
        vmEdit.newCredit;

        vmEdit.accountsLevel = [];
        vmEdit.accountsLevel.push([]);
        vmEdit.accountsLevel.push([]);
        vmEdit.accountsLevel.push([]);
        vmEdit.accountsLevel.push([]);

        vmEdit.accountSelected = [];
        vmEdit.accountSelected.push([]);
        vmEdit.accountSelected.push([]);
        vmEdit.accountSelected.push([]);
        vmEdit.accountSelected.push([]);

        // _______________________________________________________
        // Grid

        vmEdit.gridOptions.columnDefs = [
          { name: 'ID', enableCellEdit: false, visible: false },
          { name: 'Search', displayName: '', sortable: false, width: '1%', cellTemplate: '<div class="btn primary" ng-click="grid.appScope.getRowAccount(this)"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></div>' },
          { name: 'AccountCode', displayName: 'Account', width: '13%' },
          { name: 'AccountName', displayName: 'Name', width: '20%', enableCellEdit: false },
          { name: 'Description', displayName: 'Description', width: '30%' },
          { name: 'Debit', displayName: 'Debit', width: '15%', cellFilter: 'currency', cellClass: 'uigrid-align-right', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true, footerCellTemplate: '<div class="uigrid-footer-cell-currency">{{col.getAggregationValue() | currency}}</div>' },
          { name: 'Credit', displayName: 'Credit', width: '15%', cellFilter: 'currency', cellClass: 'uigrid-align-right', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true, footerCellTemplate: '<div class="uigrid-footer-cell-currency">{{col.getAggregationValue() | currency}}</div>' },
          { name: 'remove', displayName: '', sortable: false, width: '5%', cellTemplate: '<div class="btn primary" ng-click="grid.appScope.deleteItem(this)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>' }
        ];
        vmEdit.gridOptions.data = vmEdit.gridItems;
        vmEdit.gridOptions.onRegisterApi = function (gridApi) {
            gridApi.edit.on.beginCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                if (colDef.name === 'Debit') {
                    rowEntity.Credit = 0;
                } else {
                    rowEntity.Debit = 0;
                }
                $scope.$apply();
            });
            gridApi.edit.on.afterCellEdit($scope, function () {
                vmEdit.getTotals();
                $scope.$apply();
            });
        };
        vmEdit.gridOptions.showColumnFooter = true;


        // Methods

        vmEdit.saveJournal = function () {
            vmEdit.message = '';
            var journal = {
                ClientID: vmEdit.clientID,
                ReasonID: vmEdit.reasonID,
                AsOfDate: vmEdit.asOfDate,
                Note: vmEdit.note,
                JournalDetailRows: [],
                UserID: currentUser
            }
            angular.forEach(vmEdit.gridItems, function (item) {
                var entry = {
                    JournalID: 0,
                    Amount: item.Debit ? item.Debit : item.Credit,
                    JournalTransactionTypeCode: item.Debit ? 7001 : 7000,
                    JournalAccountCode: item.AccountID,
                    Note: item.Description,
                    UserID: currentUser.ID
                }
                journal.JournalDetailRows.push(entry);
            });
            journalEntriesResource.insertJournalEntry(journal).$promise.then(function () {
                $scope.$parent.vm.modalEdit.dismiss();
                alerting.addSuccess('The journal was saved successfully');
            }, function (err) {
                vmEdit.message = 'The journal could not be saved';
                alerting.errorHandler('The journal could not be saved');
            });
        };

        vmEdit.openTimePicker = function ($event) {
            vmEdit.timeOpened = true;
        };

        vmEdit.isQuickItemValid = function () {
            if (vmEdit.newAccountID > 0
                && vmEdit.newDescription
                && (Number(vmEdit.newDebit) > 0 || Number(vmEdit.newCredit) > 0)) {
                return true;
            } else {
                return false;
            }
        }


        vmEdit.getTotals = function () {
            vmEdit.totalDebits = 0, vmEdit.totalCredits = 0;
            angular.forEach(vmEdit.gridItems, function (item) {
                if  (item.Debit) vmEdit.totalDebits = vmEdit.totalDebits + Number(item.Debit);
                if  (item.Credit) vmEdit.totalCredits = vmEdit.totalCredits + Number(item.Credit);
            });
            vmEdit.journalOK = false;
            if (vmEdit.totalDebits === vmEdit.totalCredits
                && vmEdit.totalDebits > 0
                && vmEdit.reasonID > 0

                ) {
                vmEdit.journalOK = true;
            }
        };

        vmEdit.isFormValid = function () {
            vmEdit.getTotals();
            if (vmEdit.totalDebits === vmEdit.totalCredits
                && vmEdit.totalDebits > 0
                && vmEdit.reasonID > 0
                && vmEdit.asOfDate
                && vmEdit.note) {
                return true;
            } else {
                return false;
            }
        }

        $scope.deleteItem = function (gridObject) {
            var arrayItem = 0;
            angular.forEach(vmEdit.gridItems, function (item) {
                if (item.ID === gridObject.$parent.$parent.row.entity.ID) {
                    vmEdit.gridItems.splice(arrayItem, 1);
                }
                arrayItem = arrayItem + 1;
            });
            vmEdit.getTotals();
        }

        vmEdit.resetQuickInsert = function () {
            vmEdit.newAccountID = undefined;
            vmEdit.newAccountCode = '';
            vmEdit.newAccountName = '';
            vmEdit.newDescription = '';
            vmEdit.newDebit = undefined;
            vmEdit.newCredit = undefined;
        }

        vmEdit.addItem = function () {
            var item = {
                ID: vmEdit.gridItems.length,
                AccountID: vmEdit.newAccountID,
                AccountCode: vmEdit.newAccountCode,
                AccountName: vmEdit.newAccountName,
                Description: vmEdit.newDescription + vmEdit.gridItems.length.toString(),
                Debit: vmEdit.newDebit,
                Credit: vmEdit.newCredit
            }
            vmEdit.gridItems.push(item);
            vmEdit.getTotals();
            vmEdit.resetQuickInsert();
        }

        vmEdit.open = function ($event) {
            vmEdit.calendarOpened = true;
        };

        vmEdit.fillGLAccounts = function() {
            journalEntriesResource.getGLAccounts().$promise.then(function(data) {
                angular.forEach(data, function(item) {
                    var account = {};
                    account.ID = item.ID;
                    account.Code = item.Code;
                    account.Name = item.Name;
                    account.CascadeGroupID = item.CascadeGroupID;
                    vmEdit.accountsLevel[0].push(account);
                });
            });
        }


        vmEdit.fillAccountList = function (newVal, i) {
            for (var j = i + 1; j < 3; j++) {
                vmEdit.accountsLevel[j + 1] = [];
                vmEdit.accountSelected[j] = [];
            }
            //vmEdit.accountsLevel[i + 1] = [];
            vmEdit.selectedAccount = {};
            vmEdit.getGroupID(newVal, vmEdit.accountsLevel[i]);
            vmEdit.accountSelected[i].cascadeID = vmEdit.groupID;
            if (vmEdit.groupID) {
                this.param = { "CodeGroupID": vmEdit.groupID.toString(), "clientID": (vmEdit.clientID ? vmEdit.clientID : "") };
                journalEntriesResource.getGLAccountsByGroupID(this.param).$promise.then(function (data) {
                    angular.forEach(data, function (item) {
                        var account = {};
                        account.ID = item.ID;
                        account.Code = item.Code;
                        account.Name = item.Name;
                        account.CascadeGroupID = item.CascadeGroupID;
                        vmEdit.accountsLevel[i + 1].push(account);
                    });
                });
            }
        }

        vmEdit.getGroupID = function (newVal, list) {
            vmEdit.enableOK = true;
            vmEdit.groupID = undefined;
            vmEdit.selectedAccount = {};
            angular.forEach(list, function (code) {
                if (code.ID === newVal) {
                    vmEdit.groupID = code.CascadeGroupID;
                    vmEdit.selectedAccount.ID = code.ID;
                    vmEdit.selectedAccount.Code = code.Code;
                    if (!vmEdit.selectedAccount.Code) vmEdit.selectedAccount.Code = code.ID.toString();
                    vmEdit.selectedAccount.Name = code.Name;
                    if (vmEdit.groupID) vmEdit.enableOK = false;
                };
            });
        }

        clientResource.query().$promise.then(function (data) {
            vmEdit.clients = [];
            var client = { ID: null, Name: 'No Client' };
            vmEdit.clients.push(client);
            angular.forEach(data, function (item) {
                client = { ID: item.ID, Name: item.Name };
                vmEdit.clients.push(client);
            });
        });

        journalEntriesResource.queryJournalReasons().$promise.then(function (data) {
            vmEdit.reasons = [];
            var reason = { ID: null, Name: "Select Reason" };
            vmEdit.reasons.push(reason);
            angular.forEach(data, function (item) {
                reason = {};
                reason.ID = item.ID;
                reason.Name = item.Name;
                vmEdit.reasons.push(reason);
            });
        });

        vmEdit.getNewAccount = function () {
            $scope.openJournalItemAccount();
        };

        $scope.getRowAccount = function (gridObject) {
            $scope.openJournalItemAccount(gridObject.$parent.row.entity);
        };

        $scope.openJournalItemAccount = function (rowEntity) {
            for (var i = 0; i < 4; i++) {
                vmEdit.accountsLevel[i + 1] = [];
                vmEdit.accountSelected[i] = [];
            }
            vmEdit.selectedAccount = {};
            var modalInstance = $modal.open({
                templateUrl: 'modules/accounting/financialDetails/journalItemAccount.html',
                scope: $scope,
                backdrop: 'static'
            });
            modalInstance.result.then(function () {
                if (rowEntity) {
                    rowEntity.ID = vmEdit.selectedAccount.ID;
                    rowEntity.AccountCode = vmEdit.selectedAccount.Code;
                    rowEntity.AccountName = vmEdit.selectedAccount.Name;
                } else {
                    vmEdit.newAccountID = vmEdit.selectedAccount.ID;
                    vmEdit.newAccountCode = vmEdit.selectedAccount.Code;
                    vmEdit.newAccountName = vmEdit.selectedAccount.Name;
                }
            }, function () {
                vmEdit.newAccountID = undefined;
                vmEdit.newAccountCode = undefined;
                vmEdit.newAccountName = undefined;
            });
            console.log(vmEdit.accountSelected[0]);
        }

        // Watchers
        $scope.$watch("vm.accountSelected[0].ID", function (newVal, oldVal) {
            if (newVal) {
                vmEdit.fillAccountList(newVal, 0);
            }

        }, true);
        $scope.$watch("vm.accountSelected[1].ID", function (newVal, oldVal) {
            if (newVal) {
                vmEdit.fillAccountList(newVal, 1);
            }
        }, true);
        $scope.$watch("vm.accountSelected[2].ID", function (newVal, oldVal) {
            if (newVal) {
                vmEdit.fillAccountList(newVal, 2);
            }
        }, true);
        // end: Watchers


        // Initialization
        vmEdit.resetQuickInsert();

        vmEdit.fillGLAccounts();
    }

    module.controller("JournalItemEditController", ["$scope", "$modal", "$translate", "currentUser",
        'journalEntriesResource', 'clientResource', 'uiGridConstants', 'alerting', journalItemEditController]);

    module.directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])

}(angular.module('accounting')));


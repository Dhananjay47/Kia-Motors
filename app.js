(function() {

    'use strict';

    var app = angular.module('tollbooth', [
        'ui.router', 'ui.bootstrap', 'common', 'security', 'message',
        'translate', 'ui', 'forms', 'ngSanitize', 'ngRoute',
        'account', 'activity', 'notes', 'payment', 'user', 'vehicle', 'accounting', 'pos', 'register', 'imageViewer', 'report', 'timepickerPop'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$modalProvider', 'CONFIG',
        function($stateProvider, $urlRouterProvider, $modalProvider, CONFIG) {
            $urlRouterProvider.otherwise('/accountMenu');

            $stateProvider
                .state('agentHome', {
                    url: '/accountMenu',
                    template: '<br>'
                })
                .state('accountSearch', {
                    url: '/searchAccountBy/:queryMethod/:queryString/',
                    templateUrl: 'modules/main/account/accountList.html',
                    controller: 'AccountListController as vm',
                    resolve: {
                        AccountResource: 'AccountResource',
                        accounts: function(AccountResource, $stateParams) {
                            return AccountResource.query({
                                queryMethod: $stateParams.queryMethod,
                                queryString: $stateParams.queryString
                            }).$promise;
                        }
                    }
                })
                .state('vehicleSearch', {
                    url: '/searchVehicleBy/:queryMethod/:queryString/',
                    templateUrl: 'modules/main/vehicle/vehicleList.html',
                    controller: 'VehicleListController as vm',
                    resolve: {
                        VehicleResource: 'VehicleResource',
                        vehicles: function(VehicleResource, $stateParams) {
                            var queryMethod = $stateParams.queryMethod;
                            var params = {
                                queryMethod: queryMethod,
                                queryString: $stateParams.queryString
                            };

                            if (queryMethod === 'AlternateTransponder') {
                                return VehicleResource.queryExactList(params).$promise;
                            } else {
                                return VehicleResource.query(params).$promise;
                            }
                        }
                    }
                })
                .state('accountDetails', {
                    //abstract: true,
                    url: '/account/:accountId',
                    sticky: true,
                    templateUrl: 'modules/main/account/accountDetails.html',
                    controller: 'AccountDetailsController as vm',
                    resolve: {
                        AccountResource: 'AccountResource',
                        account: function(AccountResource, $stateParams) {
                            return AccountResource.get({
                                accountId: $stateParams.accountId
                            }).$promise;
                        },
                        aliasResource: 'aliasResource',
                        aliases: function(aliasResource, $stateParams) {
                            return aliasResource.query({
                                id: $stateParams.accountId
                            }).$promise;
                        },
                        currentBalance: function(AccountResource, $stateParams, $q) {
                            // return $q.all({info: info.$promise, currentBalance: currentBalance.$promise});
                            //return AccountResource.getCurrentBalance({ accountId: $stateParams.accountId }).$promise;
                            return AccountResource.getCurrentBalance({
                                    accountId: $stateParams.accountId
                                }).$promise
                                .then(function(data) {
                                    return data;
                                }, function(err) {
                                    return {
                                        balance: 0
                                    };
                                });
                        }
                    }
                })
                .state('activity', {
                    url: '/activity',
                    cache: false,
                    templateUrl: 'modules/main/activity/activity.html',
                    parent: 'accountDetails',
                    controller: 'ActivityController as vm',
                    resolve: {
                        statementResource: 'statementResource',
                        workflow: 'workflow',
                        statements: function(statementResource, account) {
                            return statementResource.query({
                                queryMethod: 'AccountId',
                                queryString: account.ID
                            }).$promise.then(function(data) {
                                return data;
                            }, function(err) {
                                return undefined;
                            });
                        }
                    }
                })
                .state('accountDetails.account', {
                    url: '/account',
                    views: {
                        'accountTab': {
                            templateUrl: 'modules/main/account/account.html'
                        }
                    }
                })
                .state('users', {
                    url: '/users',
                    parent: 'accountDetails',
                    controller: 'UserController as vm',
                    templateUrl: 'modules/main/user/user.html'
                })
                .state('vehicles', {
                    url: '/vehicles',
                    parent: 'accountDetails',
                    templateUrl: 'modules/main/vehicle/vehicle.html',
                    controller: 'VehicleListController as vm',
                    resolve: {
                        VehicleResource: 'VehicleResource',
                        vehicles: function(VehicleResource, account) {
                            return VehicleResource.query({
                                queryMethod: 'AccountId',
                                queryString: account.ID
                            }).$promise;
                        }
                    }
                })
                .state('vehicleDetails', {
                    url: '/vehicles/:id',
                    parent: 'accountDetails',
                    templateUrl: 'modules/main/vehicle/vehicleDetails.html',
                    controller: 'VehicleDetailsController as vm',
                    resolve: {
                        VehicleResource: 'VehicleResource',
                        vehicle: function(VehicleResource, $stateParams) {
                            var vehicleId = $stateParams.id;
                            return VehicleResource.get({
                                id: vehicleId
                            }).$promise;
                        }
                    }
                })
                .state('editVehicle', {
                    url: '/edit',
                    parent: 'vehicleDetails',
                    templateUrl: 'modules/main/vehicle/vehicleEdit.html'
                })
                .state('accounting', {
                    url: '/accounting',
                    parent: 'accountDetails',
                    templateUrl: 'modules/accounting/journalEntry.html',
                    controller: 'journalEntryController as vmJE',
                    resolve: {
                        journalEntryResource: 'journalEntryResource'
                    }
                })
                .state('notes', {
                    url: '/notes',
                    parent: 'accountDetails',
                    templateUrl: 'modules/main/notes/notes.html',
                    controller: 'NoteController as vmNote',
                    resolve: {
                        accountId: function(account) {
                            return account.ID;
                        },
                        notes: function(NoteResource, accountId) {
                            return NoteResource.query({
                                accountId: accountId
                            }).$promise;
                        }
                    }
                })
                .state('payment', {
                    url: '/payment',
                    parent: 'accountDetails',
                    controller: ['PaymentResource', '$scope', function(PaymentResource, $scope) {
                        $scope.paymentType = 'ach';
                    }],
                    templateUrl: 'modules/main/payment/payment.html',
                    resolve: {
                        PaymentResource: 'PaymentResource'
                    }
                })
                .state('pendingPayments', {
                    url: '/pendingPayments',
                    parent: 'accountDetails',
                    controller: ['pendingPayments', '$scope', function(pendingPayments, $scope) {
                        $scope.pendingPayments = pendingPayments;
                    }],
                    templateUrl: 'modules/payment/pendingPayments.html',
                    resolve: {
                        PaymentResource: 'PaymentResource',
                        accountId: function(account) {
                            return account.ID;
                        },
                        pendingPayments: function(PaymentResource, accountId) {
                            return PaymentResource.queryPendingPayments({
                                accountId: accountId
                            }).$promise.then(function(data) {
                                return data;
                            }, function(err) {
                                return [];
                            });
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/main/common/templates/login.html'
                });
        }
    ]);

    app.controller('MainController', ['$scope', 'idle',
        function($scope, idle) {
            idle.check($scope);
        }
    ]);
})();

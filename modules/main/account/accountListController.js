(function (module) {
    'use strict';

    var AccountListController = function AccountListController(accounts) {
        var vm = this;

        vm.message = 'Account!';
        vm.accounts = accounts;
    };

    module.controller('AccountListController', ['accounts', AccountListController]);

}(angular.module('account')));

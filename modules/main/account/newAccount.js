(function (module) {
    'use strict';

    var newAccount = function ($modal, optionValues, AccountResource, clientResource,
        alerting, $state, $location) {

        var showForm = function (account) {
            var showFormCtrl = function (optionValues, AccountResource, alerting, $state) {
                this.account = account;
                this.accountTypes = optionValues.getOptions('Account_Types');
                this.clients = clientResource.query();
            };

            var options = {
                templateUrl: 'modules/main/account/newAccount.html',
                controller: ['optionValues', 'AccountResource', 'alerting', '$state', showFormCtrl],
                controllerAs: 'vm'
            };

            return $modal.open(options).result;
        };

        var submit = function (account) {

            var newAccount = new AccountResource(account);

            newAccount.$save()
                .then(function (data) {
                    alerting.addSuccess('Account created!');
                    //$state.go('accountDetails.activity', { accountId: data.ID }, { reload: true });
                    $location.path('account/' + data.ID + '/activity');
                })
                .catch(alerting.errorHandler('Could not create account'));
        };

        return {
            showForm: showForm,
            submit: submit
        };
    };

    module.factory('newAccount', ['$modal', 'optionValues', 'AccountResource',
                                  'clientResource', 'alerting', '$state', '$location', newAccount]);
}(angular.module('account')));

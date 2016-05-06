(function (module) {
    'use strict';

    var RegisterController = function ($translate, $scope, $location, UserResource, alerting) {
        var vm = this;

        vm.register = function () {
            UserResource.register(vm).$promise.then(
                function (data) {
                    $location.path('/success/register');
                },
                function (err) {
                    if (err.data.ModelState['']) {
                        var i;
                        for (i = 0; i < err.data.ModelState[''].length; i++) {
                            console.log(err.data.ModelState[''][i]);
                            alerting.addDanger(err.data.ModelState[''][i]);
                        }
                    }
                });
        };
    };
    module.controller('RegisterController', ['$translate', '$scope', '$location',
                                             'UserResource', 'alerting', RegisterController]);

}(angular.module('register')));

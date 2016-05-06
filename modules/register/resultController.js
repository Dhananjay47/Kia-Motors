(function (module) {
    'use strict';

    var ResultController = function ($route) {
        var vm = this;

        var method = $route.current.params.method;

        switch (method) {
        case 'register':
            vm.successMsg = 'Please check your email inbox for confirmation email';
            vm.failMsg = 'An error occured while registering the new user';
            break;
        case 'confirmEmail':
            vm.successMsg = 'Your email is now confirmed. You can now login';
            vm.failMsg = 'An error occured while confirming user\'s email address';
            break;
        }
    };

    module.controller('ResultController', ['$route', ResultController]);

}(angular.module('register')));

(function (module) {

    var UserController = function UserController() {
        var vm = this;

        vm.message = 'Members of this Account';
    };

    module.controller('UserController', UserController);

}(angular.module('user')));

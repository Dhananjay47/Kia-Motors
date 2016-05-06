(function () {

    'use strict';

    var app = angular.module('register', []);

    app.config(['$routeProvider', '$translateProvider', 'CONFIG',
        function ($routeProvider, $translateProvider, CONFIG) {
            $routeProvider
                .when('/register', {
                    templateUrl: 'modules/main/common/templates/users/register/info.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                })
                .when('/success/:method', {
                    templateUrl: 'modules/main/common/templates/users/register/success.html',
                    controller: 'ResultController',
                    controllerAs: 'vm'
                })
                .when('/fail/:method', {
                    templateUrl: 'modules/main/common/templates/users/register/fail.html',
                    controller: 'ResultController',
                    controllerAs: 'vm'
                })
                .when('/confirmEmail/:userId/:code/', {
                    template: '<br>',
                    controller: function ($route, UserResource, $location) {
                        console.log($location.hash());
                        var userId = $route.current.params.userId;
                        var code = $route.current.params.code;
                        UserResource.confirmEmail({
                            userId: userId,
                            code: code
                        }).$promise.then(function (data) {
                            $location.path('/success/confirmEmail');
                        }, function (err) {
                            $location.path('/fail/confirmEmail');
                        });
                    }
                })
                .otherwise({
                    redirectTo: '/register'
                });
        }]);
}());

(function (module) {

    var tbAddress = function (optionValues) {
        return {
            restrict: 'E',
            templateUrl: 'modules/main/common/templates/address.html',
            scope: {
                address: '=data'
            },
            controller: ['$scope', function ($scope) {
                $scope.states = optionValues.getOptions('States');
            }]
        };
    };

    module.directive('tbAddress', ['optionValues', tbAddress]);

}(angular.module('forms')));

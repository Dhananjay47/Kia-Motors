'use strict';

angular.module('tollbooth')
    .controller('TestController', ['$scope', function($scope) {
        $scope.message = 'Success!';
        $scope.messageFn = function() {
            $scope.newMsg = "Testing is a success!"
        }
    }]);

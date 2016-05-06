(function (module) {
    module.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', '$injector',
            function ($delegate, $injector) {
                return function (exception, cause) {
                    $delegate(exception, cause);

                    var alerting = $injector.get('alerting');
                    alerting.addDanger(exception.message);
                };
            }
        ]);
    }]);
}(angular.module('message')));

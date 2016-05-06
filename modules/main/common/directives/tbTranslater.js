(function (module) {

    var translater = function ($translate) {
        return {
            priority: 1,
            templateUrl: 'modules/main/common/templates/translater.html',
            replace: true,
            restrict: 'E',
            link: function (scope) {
                scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                };
            }
        };
    };

    module.directive('translater', ['$translate', translater]);

}(angular.module('translate')));

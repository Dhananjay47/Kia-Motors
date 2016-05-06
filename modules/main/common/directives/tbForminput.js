(function (module) {

    var setupDom = function (element) {
        var input = element.querySelector('input, textarea, select');
        var type = input.getAttribute('type');
        var name = input.getAttribute('name');
        if (type !== 'checkbox' && type !== 'radio') {
            input.classList.add('form-control');
        }

        var label = element.querySelector('label');
        if (label) {
            label.classList.add('control-label');
        }
        element.classList.add('form-group');
        return name;
    };

    var addMessages = function (form, element, name, $compile, scope) {
        var messages = '<div class="help-block"><div ng-messages="' +
            form.$name + '.' + name + '.$error" ng-show="' +
            form.$name + '.' + name + '.$touched && ' +
            form.$name + '.' + name + '.$invalid">' +
            '<div ng-messages-include="modules/main/common/templates/messages.html"></div></div></div>';
        element.append($compile(messages)(scope));
    };

    var watcherFor = function (form, name) {
        return function () {
            if (name && form[name]) {
                return form[name].$invalid && form[name].$touched;
            }
        };
    };

    var updaterFor = function (element) {
        return function (hasError) {
            if (hasError) {
                element.addClass('has-error');
            } else {
                element.removeClass('has-error');
            }
        };
    };

    var forminput = function ($compile) {
        return {
            restrict: 'A',
            require: '?^form',
            link: function (scope, element, attributes, form) {
                var name = setupDom(element[0]);
                addMessages(form, element, name, $compile, scope);
                scope.$watch(watcherFor(form, name), updaterFor(element));
            }
        };
    };

    module.directive('forminput', ['$compile', forminput]);

}(angular.module('forms')));

(function (module) {
    var optionValues = function () {

        var allOptions = [];

        var addOptions = function (option) {
            allOptions.push(option);
        };

        var clearOptions = function () {
            allOptions.length = 0;
        };

        var getLocalOptions = function (options, groupName) {
            for (var i = options.length - 1; i >= 0; i--) {
                if (options[i].Name === groupName && options[i].Options) {
                    return options[i].Options;
                }
            }
        };

        var getOptions = function (groupName) {
            return getLocalOptions(allOptions, groupName);
        };

        return {
            addOptions: addOptions,
            allOptions: allOptions,
            clearOptions: clearOptions,
            getOptions: getOptions,
            getLocalOptions: getLocalOptions
        };
    };

    module.factory('optionValues', optionValues);

} (angular.module('common')));

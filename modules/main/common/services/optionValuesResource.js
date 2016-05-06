(function (module) {
    var optionValuesResource = function ($http, optionValues, alerting, CONFIG) {

        var loadOptions = function () {

            $http.get(CONFIG.apiUrl + '/api/tbapi/GetOptionsValues')
                .then(function(optionResponse) {
                    var optionDictionary = optionResponse.data;

                    optionValues.clearOptions();

                    for (var i = optionDictionary.length - 1; i >= 0; i--) {
                        var option = {
                            Name: optionDictionary[i].Name,
                            Options: optionDictionary[i].Options
                        };
                        optionValues.addOptions(option);
                    }
                })
                .catch(alerting.errorHandler('Could not get options'));
        };

        return {
            loadOptions: loadOptions
        };
    };

    module.factory('optionValuesResource',
                   ['$http', 'optionValues', 'alerting', 'CONFIG', optionValuesResource]);

} (angular.module('common')));

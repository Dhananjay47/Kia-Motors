(function () {
    angular
        .module('account')
        .factory('aliasResource', ['$resource', 'CONFIG', aliasResource]);

    function aliasResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/account/GetAliases/:id');
    }

}());

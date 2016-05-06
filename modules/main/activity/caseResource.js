(function () {
    angular
        .module('activity')
        .factory('caseResource', ['$resource', 'CONFIG', caseResource]);

    function caseResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/case/', {}, {
            begin: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/case/BeginWorkflow'
            },
            resume: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/case/ResumeWorkflow'
            }
        });
    }
}());

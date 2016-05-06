(function () {
    angular
        .module('notes')
        .factory('NoteResource', ['$resource', 'CONFIG', NoteResource]);

    function NoteResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/note/:id', {}, {
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/note/GetNotesList/:accountId'
            },
            update: {
                method: 'PUT'
            },
            save: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/note/:accountId'
            }
        });
    }
}());

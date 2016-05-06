(function () {
    angular
        .module('notes')
        .controller('NoteController', ['$scope', '$state', 'notes', 'accountId', NoteController]);

    function NoteController($scope, $state, notes, accountId) {
        var vmNote = this;

        vmNote.accountId = accountId;

        // new notes for view
        vmNote.newNotes = {
            ID: 0,
            CreateDate: null,
            Text: '',
            Type: 'General',
            AccountID: accountId
        };

        vmNote.notes = notes;
    }
}());

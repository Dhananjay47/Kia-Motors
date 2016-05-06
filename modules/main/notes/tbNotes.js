(function (module) {

    var tbNotes = function (NoteResource, $state, alerting) {
        var editUrl = 'modules/main/notes/noteEdit.html';
        var readUrl = 'modules/main/notes/tbNotes.html';

        return {
            template: '<div ng-include="contentUrl"></div>',
            restrict: 'E',
            replace: true,
            scope: {
                notes: '=',
                accountid: '='
            },
            controller: ['$scope', 'NoteResource', function ($scope, NoteResource) {
                $scope.placeholder = 'Comments';
                $scope.isnew = false;
                $scope.contentUrl = readUrl;

                $scope.notes.accountID = $scope.accountid;
                $scope.original = angular.copy($scope.notes);
                $scope.add = function () {
                    var newNote = new NoteResource($scope.notes);

                    newNote.$save().then(function () {
                            alerting.addSuccess('CreateNotes');
                            $state.go('notes', {}, {
                                reload: true
                            });
                        })
                        .catch(alerting.errorHandler('Could not create notes'));
                };
                $scope.edit = function () {
                    $scope.notes.$update({
                            id: $scope.notes.ID
                        })
                        .then(function () {
                            alerting.addSuccess('UpdatedNotes');
                            $state.go('notes', {}, {
                                reload: true
                            });
                        })
                        .catch(alerting.errorHandler('Could not update notes'));
                };
            }],
            link: function (scope, element, attrs) {
                if ('isnew' in attrs) {
                    scope.isnew = true;
                    scope.contentUrl = editUrl;
                    scope.placeholder = 'EnterNewCommentsHere';
                }
                scope.clickEdit = function () {
                    scope.contentUrl = editUrl;
                };
                scope.clickAdd = function () {
                    scope.contentUrl = editUrl;
                };
                scope.cancel = function () {
                    angular.copy(scope.original, scope.notes);
                    scope.contentUrl = readUrl;
                };
                scope.submit = function () {
                    if (!!scope.notes.ID) {
                        scope.edit();
                    } else {
                        scope.add();
                    }
                };
            }
        };
    };

    module.directive('tbNotes', ['NoteResource', '$state', 'alerting', tbNotes]);

}(angular.module('notes')));

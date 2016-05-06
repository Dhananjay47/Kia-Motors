(function (module) {

    var tbTransactionImages = function (CONFIG) {
        return {
            restrict: 'E',
            templateUrl: 'modules/imageViewer/transactions/tbTransactionImages.html',
            scope: {
                images: '='
            },
            controller: ['$scope', function ($scope) {
                $scope.images.forEach(function (image) {
                    image.FilePath = CONFIG.imageViewerPath + image.FileName;
                });

                $scope.mainImageUrl = $scope.images[0].FilePath;

                $scope.setImage = function (image) {
                    $scope.mainImageUrl = image.FilePath;
                };
            }]
        };
    };

    module.directive('tbTransactionImages', ['CONFIG', tbTransactionImages]);

}(angular.module('transactions')));

(function () {
    'use strict';

    angular
        .module('common', ['ngResource', 'ui.bootstrap'])
        .constant('CONFIG', {

            // Local
            apiTransactionUIUrl: 'http://localhost:50250/TransactionUi',
            authorizationApiUrl: 'http://localhost:62560',
            apiVehicleMismatchUrl: 'http://localhost:65216/ClassMismatch',
            apiAccountUrl:'http://localhost:8080/accounturl',

            // QA
            //authorizationApiUrl: 'https://gila-tollqa/qa3/AuthorizationAPI',
            //apiTransactionUIUrl: 'https://gila-tollQA/QA3/TransactionUIAPI/TransactionUI',
            //apiVehicleMismatchUrl: 'https://gila-tollqa/QA3/VehicleMismatchAPI/ClassMismatch/',

            imageViewerPath: 'https://gila-tollqa/qa3/ui/imageViewer/TransactionImages/',

            reportUrl: 'https://gila-reporting.com',
            reportRoot: '//Tolling'
        });
}());

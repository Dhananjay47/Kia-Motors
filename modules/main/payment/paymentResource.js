(function () {
    angular
        .module('common')
        .factory('PaymentResource', ['$resource', 'CONFIG', PaymentResource]);

    function PaymentResource($resource, CONFIG) {
        return $resource(CONFIG.apiUrl + '/api/payment/:id', {}, {
            get: {
                method: 'GET'
            },
            getPaymentMethods: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/payment/getPaymentMethods/:accountId'
            },
            getRecentPayments: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/payment/ListRecentPayments'
            },
            queryPendingPayments: {
                method: 'GET',
                isArray: true,
                url: CONFIG.apiUrl + '/api/payment/GetPendingPayments/:accountId'
            },
            postPayment: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/payment/Post'
            },
            update: {
                method: 'PUT'
            },
            save: {
                method: 'POST',
                url: CONFIG.apiUrl + '/api/payment/PostExceptionPayment'
            }
        });
    }
}());

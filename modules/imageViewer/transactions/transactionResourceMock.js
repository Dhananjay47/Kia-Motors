(function () {
    'use strict';

    angular
        .module('transactionResourceMock', ['ngMockE2E', 'common'])
        .run(['$httpBackend', 'CONFIG', TransactionResourceMock]);

    function TransactionResourceMock($httpBackend, CONFIG) {
        var transactions = [
            {
                'RoadSideID': 32,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888281',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'SSU278',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            },
            {
                'RoadSideID': 33,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888284',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'UZ3881',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            },
            {
                'RoadSideID': 34,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888283',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'SSU278',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            }, {
                'RoadSideID': 35,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888282',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'UZ3881',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            }, {
                'RoadSideID': 37,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888289',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'UZ3881',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            }, {
                'RoadSideID': 40,
                'VehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Bayamon',
                'RoadName': 'PR-05',
                'AuthorityTransactionNumber': '2888289',
                'TransactionDateTime': '2014-12-09T03:48:18',
                'TagNumber': '2731720',
                'LicencePlateNumber': 'SSU278',
                'LaneSequenceNumber': 1,
                'LaneName': 'BAY LN 1',
                'TransactionImageFiles': []
            }
        ];

        var vehicleClasses = [
            {
                ID: 15,
                Name: '3 Axle vehicle'
            },
            {
                ID: 17,
                Name: '2 Axle vehicle'
            },
            {
                ID: 18,
                Name: '4 Axle vehicle'
            },
            {
                ID: 21,
                Name: '5 Axle vehicle'
            }
        ];

        var putVehicleResponse = {};

        var transactionUrl = '/api/transactions/search';
        // $httpBackend.whenGET(CONFIG.apiUrl + transactionUrl).respond(transactions);
        $httpBackend.whenGET('classmismatches').respond(transactions);

        var queryVehicleClassesUrl = '/api/transactions/GetVehicleClasses';
        $httpBackend.whenGET(CONFIG.apiUrl + queryVehicleClassesUrl).respond(vehicleClasses);

        var putVehicleUrl = '/api/transactions/PutVehicle';
        $httpBackend.whenPUT(CONFIG.apiUrl + putVehicleUrl).respond(function () {
            return [200, {
                ID: '12345'
            }];
        });

        var transactionsResult = {
            'Transactions': [{
                'RoadSideStatusTypeID': 16,
                'RoadSideID': 2,
                'RoadSideVehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Hatillo',
                'RoadName': 'PR-22',
                'AuthorityTransactionNumber': '1727371',
                'TransactionDateTime': '2014-12-09T03:21:38',
                'TagNumber': null,
                'LicencePlateNumber': null,
                'LaneSequenceNumber': 2,
                'LaneName': 'HAT LN 2',
                'TagVehicleClassID': null,
                'PlateVehicleClassID': null,
                'StatusDescription': 'Image Retrieval Pending',
                'AuthorityID': 1,
                'RoadID': 2,
                'PlazaID': 2,
                'LaneID': 5,
                'TransactionImageFiles': [{
                    'ImageFileID': 4,
                    'FileName': 'file2.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 2,
                    'UpsertTimestamp': '2015-09-27T21:13:25.6572697',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 5,
                    'FileName': 'file3.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 2,
                    'UpsertTimestamp': '2015-09-27T21:13:25.6572697',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 189,
                    'FileName': '20141209032138000100010002_234a33fb-54c0-4b8f-87c9-bb8979ac28af_976MVR------_000_PR_000_07_3.jpg',
                    'FilePath': '\\\\GILA-TOLLQA\\ImageDestination\\0001\\' +
                        '2014_12_09\\03\\0001_0002',
                    'ImageStatusTypeID': 3,
                    'RoadSideID': 2,
                    'UpsertTimestamp': '2015-09-27T21:13:26.1633203',
                    'UpsertUserID': -1
                }]
            }, {
                'RoadSideStatusTypeID': 16,
                'RoadSideID': 23099,
                'RoadSideVehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Buchanan',
                'RoadName': 'PR-22',
                'AuthorityTransactionNumber': '1727390',
                'TransactionDateTime': '2013-12-11T04:25:39',
                'TagNumber': null,
                'LicencePlateNumber': null,
                'LaneSequenceNumber': 3,
                'LaneName': 'ILR lane',
                'TagVehicleClassID': null,
                'PlateVehicleClassID': null,
                'StatusDescription': 'Pending Image Review',
                'AuthorityID': 1,
                'RoadID': 2,
                'PlazaID': 155,
                'LaneID': 1,
                'TransactionImageFiles': [{
                    'ImageFileID': 57746,
                    'FileName': 'file1.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23099,
                    'UpsertTimestamp': '2015-10-01T22:39:04.8827323',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 57747,
                    'FileName': 'file2.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23099,
                    'UpsertTimestamp': '2015-10-01T22:39:04.9447349',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 57748,
                    'FileName': 'file3.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23099,
                    'UpsertTimestamp': '2015-10-01T22:39:04.946726',
                    'UpsertUserID': -1
                }]
            }, {
                'RoadSideStatusTypeID': 16,
                'RoadSideID': 23149,
                'RoadSideVehicleClassID': 1,
                'VehicleClassDescription': 'Vehicle with 2 (two) axles and motorcycles',
                'TollAmountValue': null,
                'PlazaName': 'Buchanan',
                'RoadName': 'PR-22',
                'AuthorityTransactionNumber': '9927503',
                'TransactionDateTime': '2014-12-09T03:21:38',
                'TagNumber': null,
                'LicencePlateNumber': null,
                'LaneSequenceNumber': 10,
                'LaneName': 'ILR lane',
                'TagVehicleClassID': null,
                'PlateVehicleClassID': null,
                'StatusDescription': 'Pending Image Review',
                'AuthorityID': 1,
                'RoadID': 2,
                'PlazaID': 155,
                'LaneID': 1,
                'TransactionImageFiles': [{
                    'ImageFileID': 57943,
                    'FileName': 'file1.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23149,
                    'UpsertTimestamp': '2015-10-14T19:56:41.6040198',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 57944,
                    'FileName': 'file2.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23149,
                    'UpsertTimestamp': '2015-10-14T19:56:41.6050198',
                    'UpsertUserID': -1
                }, {
                    'ImageFileID': 57945,
                    'FileName': 'file3.jpg',
                    'FilePath': '\\2014\\12\\09\\03',
                    'ImageStatusTypeID': 1,
                    'RoadSideID': 23149,
                    'UpsertTimestamp': '2015-10-14T19:56:41.6050198',
                    'UpsertUserID': -1
                }]
            }],
            'Paging': null,
            'Vehicle': [{
                'VehicleClassID': 1,
                'Description': 'Vehicle with 2 (two) axles and motorcycles',
                'ClassNumber': '1',
                'UpsertTimestamp': '2015-09-08T18:55:06.107',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 2,
                'Description': 'Vehicle with 2 (two) axles and rear double wheels',
                'ClassNumber': '2',
                'UpsertTimestamp': '2015-09-11T16:10:50.083',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 3,
                'Description': 'Vehicle with 3 (three) axles',
                'ClassNumber': '3',
                'UpsertTimestamp': '2015-09-11T16:10:50.083',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 4,
                'Description': 'Vehicle with 4 (four) axles',
                'ClassNumber': '4',
                'UpsertTimestamp': '2015-09-11T16:10:50.087',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 5,
                'Description': 'Vehicle with 5 (five) axles',
                'ClassNumber': '5',
                'UpsertTimestamp': '2015-09-11T16:10:50.087',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 6,
                'Description': 'Vehicle with 6 (six) axles',
                'ClassNumber': '6',
                'UpsertTimestamp': '2015-09-11T16:10:50.087',
                'UpsertUserID': -1
            }, {
                'VehicleClassID': 7,
                'Description': 'Vehicle with 7 (seven) or more axles',
                'ClassNumber': '7',
                'UpsertTimestamp': '2015-09-11T16:10:50.087',
                'UpsertUserID': -1
            }]
        };

        var pendingReview = CONFIG.apiTransactionUIUrl + '/GetTransactionsPagingsForPendingReview';
        $httpBackend.whenPOST(pendingReview).respond(function (method, url) {
            return [200, angular.fromJson(transactionsResult)];
        });

        // dont mock everything else, specify pass through to avoid error.
        $httpBackend.whenGET(/^\w+.*/).passThrough();

        $httpBackend.whenGET(/(module|build|i18n)\/.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();

    }

})();

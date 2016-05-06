(function () {
    'use strict';

angular
        .module('accountResourceMock', ['ngMockE2E', 'common'])
        .run(['$httpBackend', 'CONFIG', AccountResourceMock]);

 function AccountResourceMock($httpBackend, CONFIG) {

var accountsList=[
{
'Name': 'EB07221', 
'Type': 'System', 
'Number':10003523,
'GUID':'907C42ED-190B-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07221@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},

{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
 {
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
{
'Name': 'EB07222', 
'Type': 'System', 
'Number':10003524,
'GUID':'907C42ED-191A-416A-B70B-AEBB51E0C753',
'Contacts':null,
'Email':'EB07222@hotmail.com',
'Phone':4159008739,
'Billing Address':null, 
'Shipping Address':null, 
'Replenishment':null,
'Threshold':'$5.00',
'Amount':'$10.00'
},
];var putAccountResponse = {};

        var accountUrl = '/api/account/search';
         $httpBackend.whenGET(CONFIG.apiUrl + accountUrl).respond(account);
        $httpBackend.whenGET('account').respond(account);

        var putAccontUrl = '/api/accounts/putAccountResponse';
        $httpBackend.whenPUT(CONFIG.apiUrl + putAccountUrl).respond(function () {
            return [200, {
                ID: '12345'
            }]);
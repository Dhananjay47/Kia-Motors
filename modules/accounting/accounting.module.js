(function () {

    'use strict';

    var app = angular.module('accounting', ['ui.grid', 'ui.grid.edit' ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$modalProvider', 'CONFIG',
      function ($stateProvider, $urlRouterProvider, $modalProvider) {
          $urlRouterProvider.otherwise("/financialDetails");

          $stateProvider

              .state("financialDetails", {
                  url: "/financialDetails",
                  templateUrl: "modules/accounting/financialDetails/financialDetails.html",
              })
              .state("financialDetails.journalDetails", {
                  url: '/financialDetails.journalDetails',
                  templateUrl: "modules/accounting/financialDetails/journalDetails.html",
                  controller: 'JournalEntriesController as vm',
              })
              .state("financialDetails.journalSummary", {
                  url: '/financialDetails.journalSummary',
                  templateUrl: "modules/accounting/financialDetails/journalSummary.html",
                  controller: 'JournalEntriesController as vm'
              })
              .state("financialDetails.journalEntries", {
                  url: '/financialDetails.journalEntries',
                  templateUrl: "modules/accounting/financialDetails/journalEntries.html",
                  controller: 'JournalEntriesController as vm'
              })
              // .state("login", {
              //     url: "/login",
              //     templateUrl: "modules/main/common/templates/login.html"
              // });
      }]);

    app.controller('MainController', ['$scope', 'idle',
      function ($scope, idle) {
          idle.check($scope);
      }

    ]);
}());

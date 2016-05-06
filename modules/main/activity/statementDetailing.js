(function (module) {

    'use strict';

    var statementDetailing = function () {

        var currentDetails = [];

        var toggleDetails = function (transactions, payments, adjustments) {

            // selected statement (vs. deselected statement)
            var isNew = currentDetails.length === 0;
            var details = {};
            var i = 0,
                j = 0;

            // transactions
            for (i = 0; i < transactions.length && !isNew; i++) {
                for (j = 0; j < currentDetails.length; j++) {
                    if (currentDetails[j].StatementID === transactions[i].StatementID) {
                        currentDetails.splice(j, 1);
                        break;
                    }
                    if (j === currentDetails.length - 1) {
                        isNew = true;
                    }
                }
            }

            for (i = 0; i < transactions.length && isNew; i++) {
                details = {
                    StatementID: transactions[i].StatementID,
                    Type: 'Transaction',
                    DetailsDateTime: transactions[i].PostDate,
                    Details: transactions[i].Plaza,
                    TransactionDate: transactions[i].TransactionTimestamp,
                    Amount: transactions[i].Toll,
                    //Etc1: transactions[i].ClientTransactionNumber,
                    MoreInfo: {
                        ClientTransactionNumber: transactions[i].ClientTransactionNumber,
                        EstimateVehicleSpeed: transactions[i].EstimateVehicleSpeed,
                        Lane: transactions[i].Lane,
                        LicencePlateJurisdiction: transactions[i].LicencePlateJurisdiction,
                        LicencePlateNumber: transactions[i].LicencePlateNumber,
                        Plaza: transactions[i].Plaza,
                        PostDate: transactions[i].PostDate,
                        Toll: transactions[i].Toll,
                        TransactionTimestamp: transactions[i].TransactionTimestamp,
                        TransponderNumber: transactions[i].TransponderNumber
                    }
                };
                currentDetails.push(details);
            }

            // payments
            for (i = 0; i < payments.length && !isNew; i++) {
                for (j = 0; j < currentDetails.length; j++) {
                    if (currentDetails[j].StatementID === payments[i].StatementID) {
                        currentDetails.splice(j, 1);
                        break;
                    }
                    if (j === currentDetails.length - 1) {
                        isNew = true;
                    }
                }
            }

            for (i = 0; i < payments.length && isNew; i++) {

                var last4 = payments[i].PaymentMethod.PaymentMethod.CardNumberLast4;
                if (!payments[i].PaymentMethod.PaymentMethod.CardNumberLast4) {
                    var accountNumber = payments[i].PaymentMethod.PaymentMethod.AccountNumber;
                    if (accountNumber) {
                        last4 = accountNumber.substr(accountNumber.length - 4);
                    }
                }

                details = {
                    StatementID: payments[i].StatementID,
                    Type: 'Payment',
                    DetailsDateTime: payments[i].PostDate,
                    Details: payments[i].PaymentMethod.PaymentMethod.PaymentTypeID,
                    //TODO: uncomment if payments will display creation date also
                    //TransactionDate: payments[i].CreateDate,
                    Amount: payments[i].Amount,
                    MoreInfo: {
                        TenderDate: payments[i].TenderDate,
                        ReleaseDate: payments[i].ReleaseDate,
                        PostDate: payments[i].PostDate,
                        PaymentType: payments[i].PaymentMethod.PaymentMethod.PaymentTypeID,
                        Last4: last4,
                        Exp: payments[i].PaymentMethod.PaymentMethod.CardExpirationDate,
                        CardType: payments[i].PaymentMethod.PaymentMethod.CardType,
                        AuthID: payments[i].AuthID,
                        Note: payments[i].Note
                    }
                };
                currentDetails.push(details);
            }

            // adjustments
            for (i = 0; i < adjustments.length && !isNew; i++) {
                for (j = 0; j < currentDetails.length; j++) {
                    if (currentDetails[j].StatementID === adjustments[i].StatementID) {
                        currentDetails.splice(j, 1);
                        break;
                    }
                    if (j === currentDetails.length - 1) {
                        isNew = true;
                    }
                }
            }
            for (i = 0; i < adjustments.length && isNew; i++) {
                details = {
                    StatementID: adjustments[i].StatementID,
                    Type: adjustments[i].Description,
                    //Type: 'Adjustment',
                    DetailsDateTime: adjustments[i].CreateDate,
                    Details: adjustments[i].Status,
                    Amount: adjustments[i].Amount,
                    MoreInfo: {
                        PostDate: adjustments[i].PostDate,
                        Reason: adjustments[i].Reason
                    }
                };
                currentDetails.push(details);
            }
        };

        var clear = function () {
            currentDetails.length = 0;
        };

        return {
            toggleDetails: toggleDetails,
            currentDetails: currentDetails,
            clear: clear
        };
    };

    module.factory('statementDetailing', statementDetailing);

}(angular.module('activity')));

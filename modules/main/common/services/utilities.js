
(function (module) {

    var utilities = function () {

        var concatenateTimeToDateTime = function(date, time) {
            if (typeof (date) === 'object') {
                if (typeof (date) === 'object') {
                    var m = '0' + date.getMonth();
                    var d = '0' + date.getDay();
                    var y = date.getFullYear();

                    var ho = time.substring(0, 2);
                    var mi = time.substring(3, 5);
                    var ampm = time.substring(6, 8);
                    if (ampm === 'PM') {
                        ho = Number(ho) + 12 + '';
                    }
                    var dt = m + '-' + d + '-' + y + ' ' + ho + ":" + mi + ":00 " + ampm;
                    dt = dt.split(/\-|\s/);
                    var dat = new Date(dt.slice(0, 3).reverse().join('/') + ' ' + dt[3]);
                    return dat;
                } else {
                    return '';
                }
            }
            return '';
        };

        var substractFromDate = function(date, range, amount) {
            range = range.toLowerCase();
            if (range === 'years') {
                return new Date(date.setUTCFullYear(date.getFullYear() - amount));
            }
            if (range === 'months') {
                return new Date(date.setMonth(date.getMonth() - amount));
            }
            if (range === 'days') {
                return new Date(date.setDate(date.getDate() - amount));
            }
            if (range === 'hours') {
                return new Date(date.setHours(date.getHours() - amount));
            }
            if (range === 'minutes') {
                return new Date(date.setMinutes(date.getMinutes() - amount));
            } else {
                return null;
            }
        };

        var dateTimeSetHourToCero = function (date) {
            if (date) {
                date = concatenateTimeToDateTime(date, '00:00');
            };
            return date;
        };

        var dateTimeSetHourToMidnight = function (date) {
            if (date) {
                date = concatenateTimeToDateTime(date, '23:59');
            };
            return date;
        };

        return {
            dateTimeSetHourToMidnight: dateTimeSetHourToMidnight,
            dateTimeSetHourToCero:     dateTimeSetHourToCero,
            concatenateTimeToDateTime: concatenateTimeToDateTime,
            substractFromDate: substractFromDate
        };
    };

    module.factory('utilities', [ utilities]);

}(angular.module('common')));

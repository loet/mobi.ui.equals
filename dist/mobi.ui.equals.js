/* mobi.ui.equals - v0.0.3 - 2014-12-16 */

angular.module('mobi.ui.equals', [
    'mobi.ui.equals.services',
    'mobi.ui.lodashadapter'
])

;


angular.module('mobi.ui.equals.services', [])

    .factory('EqualsService', function (_) {

        function isEqual(a, b, workOnCopies) {
            if (workOnCopies) {
                a = angular.copy(a);
                b = angular.copy(b);
            }
            removeNotRelevant(a);
            removeNotRelevant(b);
            return _.isEqual(a, b);
        }

        function removeNotRelevant(o) {
            _.forOwn(o, function (value, key) {
                //recursive iteration over properties
                if (_.isObject(value)) {
                    removeNotRelevant(value);
                }
                //iterate over arrays
                if (_.isArray(value)) {
                    _.forEach(value, function (val) {
                        removeNotRelevant(val);
                    });
                }

                //remove not relevant information:
                if (value === null || value === undefined || value === '') {
                    delete o[key];
                }
                if (key.indexOf('$') === 0) {
                    delete o[key];
                }
                if (key.indexOf('_mobiTmp$') === 0) {
                    delete o[key];
                }
            });
            return o;
        }

        return {
            isEqual: isEqual,
            removeNotRelevant: removeNotRelevant
        };
    })
;


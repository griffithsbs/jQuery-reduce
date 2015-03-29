(function () {

    jQuery.reduce = function (collection, op /* Function(previousValue, currentValue, index, array) */, initialValue) {
        var startingIndex,
            result,
            indexForObjectIteration = 0,
            isResultInitialisedForObjectIteration = initialValue !== undefined,
            toStringResult;

        if (typeof collection.reduce === 'function') {
            if (initialValue !== undefined) {
                return collection.reduce(op, initialValue);
            }
            return collection.reduce(op);
        }

        toStringResult = Object.prototype.toString.call(collection);

        if (toStringResult === '[object Object]') {
            if (initialValue !== undefined) {
                result = initialValue;
            }

            for (var p in collection) {
                if (collection.hasOwnProperty(p)) {
                    if (!isResultInitialisedForObjectIteration) {
                        result = collection[p];
                        isResultInitialisedForObjectIteration = true;
                    }
                    else {
                        result = op(result, collection[p], indexForObjectIteration, collection);
                    }
                    indexForObjectIteration++;
                }
            }
        }
        else {

            if (toStringResult !== '[object Array]') {
                throw new TypeError('reduce: collection must be an Object or an Array');
            }

            startingIndex = 1;
            result = collection[0];

            if (collection.length === 0) {
                return initialValue;
            }
            if (initialValue !== undefined) {
                startingIndex = 0;
                result = initialValue;
            }

            for (var i = startingIndex; i < collection.length; i++) {
                result = op(result, collection[i], i, collection);
            }

        }

        return result;
    };

    jQuery.fn.reduce = function (op, initialValue) {
        if (this.length === 0) {
            return initialValue;
        }
        return jQuery.reduce(jQuery.makeArray(this), op, initialValue);
    };

}());
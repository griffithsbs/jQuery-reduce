-- jQuery Reduce

Provides an implementation of the ES5 Array.reduce method which can operate on both arrays and regular objects
and is supported by older, non-ES5-supporting browsers (e.g. IE8-), 
plus a jQuery plugin for performing an array reduction upon a jQuery object.

-- Example usage

var sum = $.reduce([1, 2, 3, 4, 5], function(prev, current) {
	return prev + current;
}); // 15

var sumOfInputs = $('input').reduce(function(prev, current) {
	return prev + parseInt($(current).val());
}, 0); // 15
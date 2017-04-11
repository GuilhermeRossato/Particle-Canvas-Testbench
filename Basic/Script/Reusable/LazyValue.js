/*
* This class makes a value get closer to another, but slowly.
* The amount of movement is equal to the inverse of the distance.
*
* Think of it as a debouncer for variables that change too quickly.
*
* @author Guilherme Rossato
*
*/

function LazyValue(start, laziness = 0.1) {
	(laziness < 0 || laziness > 1) && console.warn("Laziness should be between 0 and 1");
	this.laziness = laziness;
	this.target = start;
	this.value = start;
}

LazyValue.prototype = {
	constructor: LazyValue,
	update: function(value) {
		return (this.value = b(this.value, value, this.laziness));
	}
}
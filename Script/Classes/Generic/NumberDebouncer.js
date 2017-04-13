/*!
*
* This class makes a value get closer to another at a rate inversely proportional to the distance of both numbers.
*
* @name NumberDebouncer
* @author Guilherme Rossato
*
*/

function NumberDebouncer(start, laziness = 0.1) {
	(laziness < 0 || laziness > 1) && console.warn("Laziness should be between 0 and 1");
	this.laziness = laziness;
	this.target = start;
	this.value = start;
}

NumberDebouncer.prototype = {
	constructor: NumberDebouncer,
	updateTarget: function(value) {
		this.target = value;
	},
	update: function() {
		return (this.value = (this.value + (this.target - this.value) * this.laziness));
	}
}
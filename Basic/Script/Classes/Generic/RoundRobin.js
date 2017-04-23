function RoundRobin(maxSize) {
	this.length = 0;
	this.start = 0;
	this.array = new Array(maxSize);
}

RoundRobin.prototype = {
	constructor: RoundRobin,
	push: function(data) {
		if (this.length < this.array.length) {
			this.array[this.length] = data;
			this.length ++;
		} else {
			this.array[this.start] = data;
			this.start = (this.start+1)%this.array.length;
		}
	},
	toArray: function() {
		let arr = [];
		if (this.length < this.array.length) {
			for (let i = 0 ; i < this.length; i++)
				arr.push(this.array[i]);
		} else {
			for (let i = 0 ; i < this.array.length; i++) {
				let j = ( this.start + i ) % this.array.length;
				arr.push(this.array[j]);
			}
		}
		return arr;
	}
}
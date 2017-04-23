function Block(config) {
	this.dead = false;
	this.size = {width: config.width, height: config.height};

	this.position = {};
	if (config.hasOwnProperty("left"))
		this.position.left = config.left;
	else
		debugger;
		//	else if (config.hasOwnProperty("centerX"))		position.left = config.centerX - config.width/2;	else if (config.hasOwnProperty("right"))		position.left = config.right - config.width;	else		debugger;

	if (config.hasOwnProperty("top"))
		this.position.top = config.top;
	else
		debugger;
		//	else if (config.hasOwnProperty("centerY"))		position.top = config.centerY - config.height/2;	else if (config.hasOwnProperty("bottom"))		position.top = config.bottom - config.height;	else		debugger;
}

Block.prototype = {
	constructor: Block,
	draw: function(ctx) {
		ctx.fillStyle = "#222";
		ctx.fillRect(this.position.left|0+0.5, this.position.top|0+0.5, this.size.width|0, this.size.height|0);
	},
	dispose: function() {
		this.dead = true;
	},
	isPointInside: function(x, y) {
		return (x > this.position.left && x < this.position.left + this.size.width && y > this.position.top && y < this.position.top + this.size.height);
	}
}
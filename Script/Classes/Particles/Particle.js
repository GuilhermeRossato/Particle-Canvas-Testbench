function Particle(config) {
	this.updateCount = 0;
	this.dead = false;
	this.angleDeviation = 0;
	this.maxAngleDeviation = Math.PI/8;
	this.position = {x: config.x||0, y: config.y||0};
	this.size = config.size || 5;
	this.angle = config.angle || 0;
	this.angleStart = this.angle;
	this.speed = config.speed || 2.5;
	this.updateVelocity();
	this.position.add = function(vec, mult = 1) {
		this.x += vec.x*mult;
		this.y += vec.y*mult;
	}
	this.angleAcceleration = 0;
	this.pastPosition = new RoundRobin(10);
}

Particle.prototype = {
	constructor: Particle,
	updateVelocity: function() {
		let c = Math.cos(this.angle);
		let s = Math.sin(this.angle);
		this.velocity = {x: c*this.speed, y: s*this.speed};
	},
	addPastPosition: function() {
		this.pastPosition.push([this.position.x, this.position.y, this.angle+Math.PI/2])
	},
	getLastPositions: function() {
		return this.pastPosition.toArray();
	},
	update: function() {
		this.updateCount ++;
		if (this.updateCount >= 3) {
			this.updateCount = 0;
			this.addPastPosition();
		}
		this.angleDeviation = Math.min(this.maxAngleDeviation, Math.max(-this.maxAngleDeviation, this.angleDeviation+interpolation.add(0,-0.1).add(1,0.1).at(Math.random())));
		this.angle = this.angleStart + this.angleDeviation;
		this.updateVelocity();
		this.position.add(this.velocity, 0.5);
	},
	isWithin: function(left, top, right, bottom) {
		return (this.position.x > left && this.position.x < right && this.position.y > top && this.position.y < bottom);
	},
	dispose: function() {
		this.dead = true;
	},
	mark: function(ctx, x, y, size = 5, angle = 0) {
		ctx.save();
		ctx.translate((x|0)+0.5, (y|0)+0.5);
		ctx.rotate(angle);
		ctx.beginPath();
		ctx.moveTo(-size,0);
		ctx.lineTo(size,0);
		ctx.moveTo(0,-size);
		ctx.lineTo(0,size);
		ctx.stroke();
		ctx.restore();
	},
	draw: function(ctx) {
		ctx.strokeStyle = "#FF0000";
		ctx.fillStyle = "rgba(90,0,0,0.5)";
		let past = this.getLastPositions();
		//ctx.beginPath();
		past.push([this.position.x, this.position.y, this.angle]);
		past = past.map(data => [data[0], data[1], Math.cos(data[2]), Math.sin(data[2])]);
		let i = 0;
		let vec, distance;
		ctx.beginPath();
		for (i = 0 ; i < past.length; i++) {
			distance = interpolation.add(-1, 0).add(past.length, this.size).at(i);
			vec = past[i];
			let px = vec[0] + (vec[2]) * distance;
			let py = vec[1] + (vec[3]) * distance;
			if (i === 0)
				ctx.moveTo(px, py)
			else
				ctx.lineTo(px, py);
			//this.mark(ctx, px, py, distance, vec[2]);
		}
		for (i = i-1; i >= 0; i--) {
			distance = interpolation.add(-1, 0).add(past.length, this.size).at(i);
			vec = past[i];
			let px = vec[0] - (vec[2]) * distance;
			let py = vec[1] - (vec[3]) * distance;
			ctx.lineTo(px, py);
			//this.mark(ctx, px, py, distance, vec[2]);
		}
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#711";
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
		ctx.fill();
		//this.mark(ctx, this.position.x, this.position.y, this.size/10, this.angle);
		//ctx.fillRect((this.position.x-this.size/2|0)+0.5, this.position.y-this.size/2|0+0.5, this.size|0, this.size|0);
	}
}
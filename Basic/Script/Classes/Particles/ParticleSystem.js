function ParticleSystem() {
	this.particles = [];
	this.count = 0;
	this.forEach = (func) => this.particles.forEach(func);
}

ParticleSystem.prototype = {
	constructor: ParticleSystem,
	addParticle: function(config) {
		this.particles.push(new Particle(config));
		this.count++;
	},
	update: function() {
		let hasDead = false;
		this.particles.forEach(particle => {
			if (particle.dead) {
				hasDead = true;
			} else {
				particle.update();
			}
		});
		if (hasDead) {
			this.particles = this.particles.filter(particle => !particle.dead);
			this.count = this.particles.length;
		}
	},
	draw: function(ctx) {
		this.particles.forEach(particle => particle.draw(ctx));
	}
}
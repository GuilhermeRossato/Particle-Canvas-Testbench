function ParticleSystem() {
	this.particles = [];
	this.forEach = (func) => this.particles.forEach(func);
}

ParticleSystem.prototype = {
	constructor: ParticleSystem,
	reset: function() {
		this.particles = [];
	},
	addParticle: function(config) {
		this.particles.push(new Particle(config));
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
		}
	},
	draw: function(ctx) {
		this.particles.forEach(particle => particle.draw(ctx));
	}
}
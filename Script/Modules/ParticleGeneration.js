const ParticleGeneration = {
	spawnPoint: {x: 0, y: 0, set: function(x,y) {this.x = x; this.y = y;}},
	maxParticles: 500,
	getX: function() {
		return this.spawnPoint.x;
	},
	getY: function() {
		return this.spawnPoint.y;
	},
	getSize: function() {
		return interpolation.add(0, 2).add(1, 5).at(Math.random());
	},
	getAngle: function() {
		return interpolation.add(0, 0).add(1, Math.PI * 2).at(Math.random());
	},
	getSpeed: function() {
		return interpolation.add(0, 0.15*2).add(0.6, 0.75*2).add(1, 1*2).at(Math.random());
		//return interpolation.scaleY(2).add(0, 0.2).add(0.6, 0.75).add(1, 1).at(Math.random());
	},
	setParticlePosition: function(config) {
		config.x = this.spawnPoint.x;
		config.y = this.spawnPoint.y;
	},
	generate: function(application, particleSystem) {
		let particleList = particleSystem.particles;
		if (particleList.length < this.maxParticles) {
			let toAdd = Math.min(3,Math.ceil(this.maxParticles - particleList.length / 5));
			for (let i = 0 ; i < toAdd; i++) {
				let particleConfig = {
					x: this.getX(),
					y: this.getY(),
					size: this.getSize(),
					angle: this.getAngle(),
					speed: this.getSpeed()
				};
				particleSystem.addParticle(particleConfig);
			}
		}
	}
}
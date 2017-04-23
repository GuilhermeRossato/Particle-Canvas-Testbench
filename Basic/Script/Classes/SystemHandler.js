function SystemHandler(...systems) {
	this.reset();
	systems.forEach(system => this.addSystem(system));
	this.systems.forEach(system => (system.init && system.init(this)));
}

SystemHandler.prototype = {
	constructor: SystemHandler,
	reset: function() {
		if (this.systems)
			this.systems.forEach(system => (system.dispose && system.dispose()));
		this.systems = [];
	},
	addSystem: function(system) {
		this.systems.push(system);
		this.systems.forEach(system => (system.init && system.init(this)));
	},
	update: function() {
		this.systems.forEach(system => (system.update && system.update()));
	},
	draw: function(ctx) {
		this.systems.forEach(system => (system.draw && system.draw(ctx)));
	},
	dispose: function() {
		this.reset();
	}
}
let targetFPS = 60;

window.addEventListener("load", function() {
	document.body.setAttribute("style", "width:100%; height:100vh; overflow:hidden; margin:0; padding:0;");
	canvas.attachSystem(particles);
	canvas.attachSystem(blocks);
	canvas.startMainLoop();
	interactor.initButtons({
		value: `Set Target FPS = ${targetFPS===60?24:(targetFPS===24?30:(targetFPS===30?45:60))}`,
		onclick: function() {
			targetFPS = parseInt(this.value.substr(this.value.length-2,2));
			this.value = `Set Target FPS = ${targetFPS===60?24:(targetFPS===24?30:(targetFPS===30?45:60))}`;
		}
	});
});


let LazyMaxParticle = new LazyValue(500, 0.01);

let canvas = new CanvasHandler();
let particles = new ParticleSystem(canvas);
let blocks = new BlockSystem(canvas);
let logger = new Logger(120);
let interactor = new Interactor(150);

let particleSpawnPoint, lastFps = 120;

function updateLogger(fps, misses) {
	lastFps = fps;
	logger.setText(
	`FPS: ${fps}`,
	`Misses: ${misses}`,
	`Particles: ${particles.count}`,
	`ParticleMax: ${LazyMaxParticle.value|0}`);
}

function setup() {
	particleSpawnPoint = {
		x: 0.5 * canvas.width,
		y: 0.5 * canvas.height
	};
	blocks.maxBlocks = 50;
	blocks.generateWorld(0, 0, canvas.width, canvas.height, particleSpawnPoint);

	blocks.forEach(block=>{
		if (block.isPointInside(particleSpawnPoint.x, particleSpawnPoint.y)) {
			block.dispose();
		}
	}
	);
}

function update() {
	let particleMax = LazyMaxParticle.update(interpolation.add(5,particles.count-50).add(targetFPS, particles.count).add(targetFPS*1.2,particles.count+30).at(lastFps))|0;
	if (particles.count < particleMax) {
		let toAdd = Math.min(5,Math.ceil(particleMax - particles.count / 1000));
		//console.log(particleMax - particles.count);
		for (let i = 0 ; i < toAdd; i++) {
			let particleConfig = {
				x: particleSpawnPoint.x,
				y: particleSpawnPoint.y,
				size: interpolation.add(0, 2).add(1, 5).at(Math.random()),
				angle: interpolation.add(0, 0).add(1, Math.PI * 2).at(Math.random()),
				speed: interpolation.add(0, 0.1).add(0.9, 1.99).add(1, 2).at(Math.random())
			};
			particles.addParticle(particleConfig);
		}
	}
	particles.update();
	particles.forEach(particle=>{
		if (!particle.isWithin(-10, -10, canvas.width + 10, canvas.height + 10))
			particle.dispose();
		else {
			blocks.forEach(block=>{
				if (block.isPointInside(particle.position.x, particle.position.y)) {
					particle.dispose();
				}
			}
			);
		}
	}
	)
}
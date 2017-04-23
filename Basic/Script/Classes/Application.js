/*
* Application class for:
*		Basic Particle Canvas Testbench
*
* @author: Guilherme Rossato
*/

let systems;
let targetFPS = 30;
let lastFPS = 60;

function getMaxParticles(currentFPS, particleCount) {
	return Math.max(0,Math.ceil(interpolation.add(targetFPS-10, particleCount-50).add(targetFPS, particleCount+5).add(targetFPS+10, particleCount+50).at(currentFPS)));
}

function Application() {
	FullScreenBody.init();
	CanvasHandler.init();

	this.blocks = new BlockSystem();
	this.particles = new ParticleSystem();
	this.systems = new SystemHandler(this.blocks, this.particles);
	systems = this.systems;
	this.logger = new Logger(125);
	ButtonGenerator.generate(this);

	this.particleDebouncer = new NumberDebouncer(500, 0.01);

	StepUpdatePattern.init({
		setup: ()=>this.setup(),
		update: ()=>this.update(),
		draw: ()=>this.draw(),
		fpsUpdate: (fps)=>this.fpsUpdate(fps),
		logMode: true,
		timeStamp: 16
	});

	window.addEventListener("resize", ()=>this.onResize(), false);
}

Application.prototype = {
	constructor: Application,
	onResize: function() {
		let sizeButton = this.interactor.buttons[1];
		if (sizeButton.value === "Balance") {
			let width = window.innerWidth-8;
			let height = window.innerHeight-8;
			CanvasHandler.width = CanvasHandler.domElement.width = width * 3;
			CanvasHandler.height = CanvasHandler.domElement.height = height * 3;
			CanvasHandler.domElement.setAttribute("style", `width: ${width}px; height: ${height}px;border:1px solid #000; display:block;`);
		}
	},
	setup: function() {
		this.particles.reset();
		ParticleGeneration.spawnPoint.set(0.5*CanvasHandler.width, 0.5*CanvasHandler.height);
		WorldGeneration.generate(this, this.blocks.blocks, CanvasHandler, ParticleGeneration.spawnPoint);
		this.blocks.addBlock({left:ParticleGeneration.spawnPoint.x-50,top:ParticleGeneration.spawnPoint.y-50,width:100,height:100});
		this.removeBlocksIntersecting(ParticleGeneration.spawnPoint);
	},
	removeBlocksIntersecting(vec) {
		this.blocks.forEach(block=>{
			if (block.isPointInside(vec.x, vec.y)) {
				block.dispose();
			}
		});
	},
	killUnwantedParticles: function() {
		this.particles.forEach(particle => {
			if (!particle.isWithin(0, 0, CanvasHandler.width, CanvasHandler.height)) {
				particle.dispose();
			} else if (this.blocks.blocks.some(block => block.isPointInside(particle.position.x, particle.position.y))) {
				particle.dispose();
			}
		});
	},
	update: function() {
		ParticleGeneration.maxParticles = this.particleDebouncer.value;
		ParticleGeneration.generate(this, this.particles);
		this.logger.setText(`Last FPS: ${lastFPS|0}`,`Target FPS: ${targetFPS|0}`, `Live Particles: ${this.particles.particles.length}`, `Max Particles: ${ParticleGeneration.maxParticles|0}`);

		this.particleDebouncer.update();
		this.systems.update();
		this.killUnwantedParticles();
	},
	draw: function() {
		let ctx = CanvasHandler.ctx;
		ctx.fillStyle = "rgba(255,255,255,0.2)";
		ctx.fillRect(-1,-1,CanvasHandler.width+2, CanvasHandler.height+2);
		this.systems.draw(ctx);
	},
	fpsUpdate: function(fps) {
		lastFPS = fps;
		this.particleDebouncer.updateTarget(getMaxParticles(fps, this.particles.particles.length));
	}
}
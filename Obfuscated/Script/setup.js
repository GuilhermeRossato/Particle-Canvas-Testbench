/*
* Setup for:
*		Obfuscated Particle Canvas Testbench
*
* @author: Guilherme Rossato
*/

let lts, lo; // LastTimeStamp & leftOver
let ltss = 0, fpsCount = 0; // lastTimeStampSecond & fpsCount
let lastFPS = 60;
let particleDebouncer, logger;
let ctx;

let particles = [];
let blocks = [];

function update() {
	let tts = performance.now();
	let delta = tts - lts + lo;
	lts = tts;
	if (delta < 160) {
		while (delta > 16) {
			delta-=16;
			for (let i = 0; i < particles.length; i++) {
				let self = particles[i];
				if (self.dead)
					continue;
				self.updateCount ++;
				if (self.updateCount >= 3) {
					self.updateCount = 0;
					self.pastPosition.push([self.position.x, self.position.y, self.angle+Math.PI/2])
				}
				self.angleDeviation = Math.min(self.maxAngleDeviation, Math.max(-self.maxAngleDeviation, self.angleDeviation+interpolation.add(0,-0.1).add(1,0.1).at(Math.random())));
				self.angle = self.angleStart + self.angleDeviation;
				let c = Math.cos(self.angle);
				let s = Math.sin(self.angle);
				self.velocity = {x: c*self.speed, y: s*self.speed};
				self.position.x += self.velocity.x*0.5;
				self.position.y += self.velocity.y*0.5;
			}
			ParticleGeneration.maxParticles = particleDebouncer.value;
			ParticleGeneration.generate(particles);
			particleDebouncer.update();
		}
		lo = delta;
	} else {
		lo = 0;
	}
	fpsCount++;
	if (lts - ltss > 1000) {
		ltss += 1000;
		if (lts - ltss > 1000)
			ltss = lts;
		lastFPS = fpsCount;
		particleDebouncer.updateTarget(getMaxParticles(lastFPS, particles.length));
		fpsCount = 0;
	}
	/* Clearing Canvas */
	ctx.fillStyle = "rgba(255,255,255,0.2)";
	ctx.fillRect(-1,-1,CanvasHandler.width+2, CanvasHandler.height+2);

	/* Drawing Particles */
	ctx.strokeStyle = "#00FF00";
	killUnwantedParticles();
	let newParticleList = [];
	for (let index = 0; index < particles.length; index++) {
		let self = particles[index];
		if (!self.dead) {
			newParticleList.push(self);
		}
		ctx.fillStyle = "rgba(90,0,0,0.5)";
		let past = self.pastPosition.toArray();
		past.push([self.position.x, self.position.y, self.angle]);
		past = past.map(data => [data[0], data[1], Math.cos(data[2]), Math.sin(data[2])]);
		let i = 0;
		let vec, distance;
		ctx.beginPath();
		for (i = 0 ; i < past.length; i++) {
			distance = interpolation.add(-1, 0).add(past.length, self.size).at(i);
			vec = past[i];
			let px = vec[0] + (vec[2]) * distance;
			let py = vec[1] + (vec[3]) * distance;
			if (i === 0)
				ctx.moveTo(px, py)
			else
				ctx.lineTo(px, py);
		}
		for (i = i-1; i >= 0; i--) {
			distance = interpolation.add(-1, 0).add(past.length, self.size).at(i);
			vec = past[i];
			let px = vec[0] - (vec[2]) * distance;
			let py = vec[1] - (vec[3]) * distance;
			ctx.lineTo(px, py);
		}
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "#711";
		ctx.beginPath();
		ctx.arc(self.position.x, self.position.y, self.size, 0, Math.PI*2);
		ctx.fill();
	}
	particles = newParticleList;
	/* Drawing Blocks */
	ctx.fillStyle = "#222";
	let hasDead = false;
	for (let i = 0 ; i < blocks.length; i++) {
		let self = blocks[i];
		if (self.dead) {
			hasDead = true;
		}
		ctx.fillRect(self.position.left|0+0.5, self.position.top|0+0.5, self.size.width|0, self.size.height|0);
	}
	if (hasDead) {
		blocks = blocks.filter(block => !block.dead);
	}
	logger.setText(`Last FPS: ${lastFPS|0}`,`Target FPS: ${targetFPS|0}`, `Live Particles: ${particles.length}`, `Max Particles: ${ParticleGeneration.maxParticles|0}`);
	requestAnimationFrame(update);
}

function updateCanvasSize() {
	particles = [];
	blocks = [];
	onResize();
	ParticleGeneration.spawnPoint.set(0.5*CanvasHandler.width, 0.5*CanvasHandler.height);
	WorldGeneration.generate(blocks, CanvasHandler, ParticleGeneration.spawnPoint);
	removeBlocksIntersecting(ParticleGeneration.spawnPoint);
}

function setup() {
	FullScreenBody.init();
	CanvasHandler.init();
	ctx = CanvasHandler.ctx;
	window.addEventListener("resize", onResize, false);
	particleDebouncer = new NumberDebouncer(500, 0.01);
	ButtonGenerator.generate(window);
	logger = new Logger(135);
	particles = [];
	blocks = [];
	ParticleGeneration.spawnPoint.set(0.5*CanvasHandler.width, 0.5*CanvasHandler.height);
	WorldGeneration.generate(blocks, CanvasHandler, ParticleGeneration.spawnPoint);
	removeBlocksIntersecting(ParticleGeneration.spawnPoint);
	update();
}

let targetFPS = 30;

function getMaxParticles(currentFPS, particleCount) {
	return Math.max(0,Math.ceil(interpolation.add(targetFPS-10, particleCount-50).add(targetFPS, particleCount+5).add(targetFPS+10, particleCount+50).at(currentFPS)));
}

function removeBlocksIntersecting(x, y) {
	blocks.forEach(block=>(x > block.position.left && x < block.position.left + block.size.width && y > block.position.top && y < block.position.top + block.size.height)&&(block.dead = true))
}

function killUnwantedParticles() {
	particles.forEach(particle => {
		let left, top, right, bottom;
		left = 0;
		top = 0;
		right = CanvasHandler.width;
		bottom = CanvasHandler.height;
		if (!(particle.position.x > left && particle.position.x < right && particle.position.y > top && particle.position.y < bottom))
			particle.dead = true;
		let x = particle.position.x;
		let y = particle.position.y;
		if (blocks.some(block => (x > block.position.left && x < block.position.left + block.size.width && y > block.position.top && y < block.position.top + block.size.height)))
			particle.dead = true;
	});
}

function onResize() {
	let sizeButton = interactor.buttons[1];
	if (sizeButton.value === "Balance") {
		let width = window.innerWidth-8;
		let height = window.innerHeight-8;
		CanvasHandler.width = CanvasHandler.domElement.width = width * 3;
		CanvasHandler.height = CanvasHandler.domElement.height = height * 3;
		CanvasHandler.domElement.setAttribute("style", `width: ${width}px; height: ${height}px;border:1px solid #000; display:block;`);
	}
	ParticleGeneration.spawnPoint.set(0.5*CanvasHandler.width, 0.5*CanvasHandler.height);
}

window.addEventListener("load", setup);
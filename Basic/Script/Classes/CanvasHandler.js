function CanvasHandler(width = 500, height = 309) {
	this.wrapper = document.createElement("div");
	this.wrapper.setAttribute("style", "display: flex;align-items: center;justify-content: center; height:100%; padding:0; margin:0;");
	this.domElement = document.createElement("canvas");
	this.width = this.domElement.width = width;
	this.height = this.domElement.height = height;
	this.domElement.setAttribute("style", `width: ${width}px; height: ${height}px;border:1px solid #000; display:block;`);
	this.wrapper.appendChild(this.domElement);
	document.body.appendChild(this.wrapper);
	this.systems = [];
	this.ctx = this.domElement.getContext("2d");
	this.fpsCount = 0;
	this.missCount = 0;
}

CanvasHandler.prototype = {
	constructor: CanvasHandler,
	attachSystem:function(system) {
		this.systems.push(system);
	},
	startMainLoop: function() {
		(typeof setup === "function") && setup();
		this.tick();
	},
	clear: function() {
		this.ctx.clearRect(-1,-1,this.width+2, this.height+2);
		//this.ctx.fillStyle = "rgba(255,255,255,0.2)";
		//this.ctx.fillRect(-1,-1,this.width+2, this.height+2);
	},
	draw: function() {
		this.systems.forEach(system => system.draw(this.ctx));
	},
	tick: function() {
		this.clear();
		let timeStamp = performance.now();
		let difference = timeStamp - this.lastTimeStamp + this.leftOver;
		this.lastTimeStamp = timeStamp;
		if (difference < 160 && typeof update === "function") {
			while (difference > 16) {
				difference -= 16;
				update();
			}
			this.leftOver = difference;
		} else {
			this.missCount += Math.ceil((difference-16)/16);
			update();
			this.leftOver = 0;
		}
		if (!(timeStamp - this.lastSecondTimestamp < 1000)) {
			this.lastSecondTimestamp = timeStamp;
			updateLogger(this.fpsCount, this.missCount);
			this.fpsCount = 0;
			this.missCount = 0;
		} else {
			this.secondTimestamp = 0;
		}
		this.fpsCount++;
		this.draw();
		requestAnimationFrame(()=>this.tick());
	}
}
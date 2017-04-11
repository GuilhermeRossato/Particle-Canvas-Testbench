function BlockSystem() {
	this.blocks = [];
	this.forEach = (func) => this.blocks.forEach(func);
	this.maxBlocks = 120;
}

BlockSystem.prototype = {
	constructor:BlockSystem,
	generateWorld: function(left, top, right, bottom, safe) {
		let tries = 0;
		let minConnection = 10
		while (this.blocks.length < this.maxBlocks && tries < 100000) {
			tries++;
			let rootBlock = {};
			rootBlock.width = 5+Math.random()*20|0;
			rootBlock.height = 5+Math.random()*20|0;
			rootBlock.left = interpolation.add(0, left).add(1, right-rootBlock.width).at(Math.random())|0;
			rootBlock.top = interpolation.add(0, left).add(1, right-rootBlock.width).at(Math.random())|0;
			this.addBlock(rootBlock);
			while (Math.random() < 0.3 && this.blocks.length < this.maxBlocks && tries < 100000) {
				tries++;
				let side = ["left", "top", "right", "bottom"][interpolation.add(0,0).add(1,4).at(Math.random())|0];
				let newBlock = {};
				newBlock.width = 5+Math.random()*20|0;
				newBlock.height = 5+Math.random()*20|0;
				if (side === "left") {
					newBlock.left = rootBlock.left - newBlock.width;
					newBlock.top = interpolation.add(0, rootBlock.top-newBlock.height+minConnection).add(1, rootBlock.top+rootBlock.height-minConnection).at(Math.random())|0;
				} else if (side == "top") {
					newBlock.top = rootBlock.top - newBlock.height;
					newBlock.left = interpolation.add(0, rootBlock.left-newBlock.width+minConnection).add(1, rootBlock.left+rootBlock.width-minConnection).at(Math.random())|0;
				} else if (side == "right") {
					newBlock.left = rootBlock.left+rootBlock.width;
					newBlock.top = interpolation.add(0, rootBlock.top-newBlock.height+minConnection).add(1, rootBlock.top+rootBlock.height-minConnection).at(Math.random())|0;
				} else if (side == "bottom") {
					newBlock.top = rootBlock.top+rootBlock.height;
					newBlock.left = interpolation.add(0, rootBlock.left-newBlock.width+minConnection).add(1, rootBlock.left+rootBlock.width-minConnection).at(Math.random())|0;
				} else
					debugger;
				if (!(safe.x > newBlock.left && safe.x < newBlock.left + newBlock.width && safe.y > newBlock.top && safe.y < newBlock.top + newBlock.height)) {
					this.addBlock(newBlock);
					rootBlock = newBlock;
				}
			}
		};
		if (tries >= 100000)
			debugger;
	},
	addBlock: function(config) {
		this.blocks.push(new Block(config));
	},
	draw: function(ctx) {
		let hasDead = false;
		this.blocks.forEach(block => {
			if (block.dead)
				hasDead = true;
			else
				block.draw(ctx)
		});
		if (hasDead) {
			this.blocks = this.blocks.filter(block => !block.dead);
		}
	}
}
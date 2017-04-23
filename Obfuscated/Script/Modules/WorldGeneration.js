var WorldGeneration = {
	getX: function(left, top, right, bottom, width, height) {
		let chance = Math.random();
		if (chance < 0.4) {
			chance = interpolation.add(0,0).add(0.5,0.1).add(1,0.45).at(Math.random());
		} else if (chance < 0.8) {
			chance = interpolation.add(0,0.6).add(0.5,0.9).add(1,1).at(Math.random());
		} else {
			chance = Math.random();
		}
		return interpolation.add(0, left).add(1, right-width).at(chance)|0;
	},
	getY: function(left, top, right, bottom, width, height) {
		let chance = Math.random();
		if (chance < 0.45) {
			chance = interpolation.add(0,0).add(0.5,0.1).add(1,0.45).at(Math.random());
		} else if (chance < 0.9) {
			chance = interpolation.add(0,0.55).add(0.5,0.9).add(1,1).at(Math.random());
		} else {
			chance = Math.random();
		}
		return interpolation.add(0, top).add(1, bottom-height).at(chance)|0;
	},
	addBlock: function(list, config) {
		list.push({
			size: {
				width: config.width,
				height: config.height
			},
			position: {
				left: config.left,
				top: config.top
			}
		})
	},
	generate: function(blockList, canvas, safe) {
		let left, top, right, bottom, minSize, maxSize, maxblockList, smallestConnection;
		maxblockList = 90;
		smallestConnection = 10;
		minSize = interpolation.add(500, 5).add(1000,15).at(canvas.width);
		maxSize = interpolation.add(500, 20).add(1000,90).at(canvas.width);
		left = 0;
		top = 0;
		right = canvas.width;
		bottom = canvas.height;
		let tries = 0;
		blockList.length = 0;
		while (blockList.length < maxblockList && tries < 10000) {
			tries++;
			let rootBlock = {};
			rootBlock.width = b(minSize, maxSize, Math.random())|0;
			rootBlock.height = b(minSize, maxSize, Math.random())|0;
			rootBlock.left = this.getX(left, top, right, bottom, rootBlock.width, rootBlock.height);
			rootBlock.top = this.getY(left, top, right, bottom, rootBlock.width, rootBlock.height);
			this.addBlock(blockList, rootBlock);
			while (Math.random() < 0.35 && blockList.length < maxblockList && tries < 10000) {
				tries++;
				let side = ["left", "top", "right", "bottom"][interpolation.add(0,0).add(1,4).at(Math.random())|0];
				let newBlock = {};
				newBlock.width = 5+Math.random()*20|0;
				newBlock.height = 5+Math.random()*20|0;
				if (side === "left") {
					newBlock.left = rootBlock.left - newBlock.width;
					newBlock.top = interpolation.add(0, rootBlock.top-newBlock.height+smallestConnection).add(1, rootBlock.top+rootBlock.height-smallestConnection).at(Math.random())|0;
				} else if (side == "top") {
					newBlock.top = rootBlock.top - newBlock.height;
					newBlock.left = interpolation.add(0, rootBlock.left-newBlock.width+smallestConnection).add(1, rootBlock.left+rootBlock.width-smallestConnection).at(Math.random())|0;
				} else if (side == "right") {
					newBlock.left = rootBlock.left+rootBlock.width;
					newBlock.top = interpolation.add(0, rootBlock.top-newBlock.height+smallestConnection).add(1, rootBlock.top+rootBlock.height-smallestConnection).at(Math.random())|0;
				} else if (side == "bottom") {
					newBlock.top = rootBlock.top+rootBlock.height;
					newBlock.left = interpolation.add(0, rootBlock.left-newBlock.width+smallestConnection).add(1, rootBlock.left+rootBlock.width-smallestConnection).at(Math.random())|0;
				} else
					debugger;
				if (!(safe.x > newBlock.left && safe.x < newBlock.left + newBlock.width && safe.y > newBlock.top && safe.y < newBlock.top + newBlock.height)) {
					this.addBlock(blockList, newBlock);
					rootBlock = newBlock;
				}
			}
		};
		if (tries >= 10000)
			debugger;
	}
}
function Interactor(width = 125) {
	this.width = width;
	this.domElement = document.createElement("div");
	this.domElement.setAttribute("style", `width:${width}px;background-color:#DDD;text-align:center;position:absolute;top:0;right:0`);
	document.body.appendChild(this.domElement);
	document.body.style.backgroundColor = "white";
	this.buttons = [];
}

Interactor.prototype = {
	constructor: Interactor,
	addButton: function() {
		let btn = document.createElement("input");
		btn.type = "button";
		btn.setAttribute("style", "width:95%;margin:3px;");
		this.domElement.appendChild(btn);
		this.buttons.push(btn);
	},
	initButtons: function(...configs) {
		while (configs.length > this.buttons.length) {
			this.addButton();
		}
		this.buttons.forEach((button, i) => {
			if (i < configs.length) {
				this.forEachPropertyInObject(configs[i], (property, value) => {
					if (property === "init" && typeof value === "function") {
						value.call(button);
					} else {
						button[property] = value;
					}
				});
			}
		});
	},
	forEachPropertyInObject: function(object, f) {
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				f(property, object[property]);
			}
		}
	}
}
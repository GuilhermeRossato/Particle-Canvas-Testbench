const CanvasHandler = (function() {
	let domElement = document.createElement("canvas");
	let wrapper = document.createElement("div");
	wrapper.appendChild(domElement);

	function loadDefaultConfigurations(config) {
		(config.width === undefined)		&& (config.width = 650);
		(config.height === undefined)		&& (config.height = 406);
		(config.alignment === undefined)	&& (config.alignment = "center"); // Unimplemented
		(config.element === undefined)		&& (config.element = document.body);
	}

	function resize(width = 650, height = 406) {
		domElement.setAttribute("style", `width: ${width}px; height: ${height}px;border:1px solid #000; display:block;`);
		this.width = domElement.width = width;
		this.height = domElement.height = height;
	}

	function decodeAlignment(alignment) {
		if (alignment === "center")
			wrapper.setAttribute("style", "display: flex; align-items: center; justify-content: center; height:100%; padding:0; margin:0;");
		else if (alignment === "left")
			wrapper.setAttribute("style", "display: flex; align-items: left; justify-content: left; height:100%; padding:0; margin:0;");
		else if (alignment === "right")
			wrapper.setAttribute("style", "display: flex; align-items: right; justify-content: right; height:100%; padding:0; margin:0;");
	}

	wrapper.appendChild(domElement);

	return {
		domElement: domElement,
		ctx: domElement.getContext("2d"),
		resize: resize,
		changeAlignment: function(alignment) {
			decodeAlignment(alignment);
		},
		init: function(config = {}) {
			loadDefaultConfigurations.call(this, config);
			resize.call(this, config.width, config.height);
			decodeAlignment.call(this, config.alignment);
			config.element.appendChild(wrapper);
			this.init = undefined;
		},
		dispose: function() {
			if (wrapper && domElement && domElement.parentNode === wrapper)
				wrapper.removeChild(domElement);
			if (wrapper && wrapper.parentNode)
				wrapper.parentNode.removeChild(wrapper);
			wrapper = undefined;
			domElement = undefined;
		}
	}
})();

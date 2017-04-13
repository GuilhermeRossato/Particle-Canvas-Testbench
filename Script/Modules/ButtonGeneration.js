const ButtonGenerator = {
	generate: function(application) {
		application.interactor = new Interactor(150);
		if (typeof targetFPS !== "number") {
			console.error("Global Variable targetFPS not found!");
			return;
		}
		application.interactor.initButtons({
			value: "Undefined",
			init: function() {
				let cookieValue = getCookie("pct_fpsTarget");
				if (typeof cookieValue === "string" && cookieValue.length > 1 && (!(isNaN(parseInt(cookieValue))))) {
					targetFPS = parseInt(cookieValue);
				}
				this.value = `Set Target FPS = ${targetFPS===60?24:(targetFPS===24?30:(targetFPS===30?45:60))}`;
			},
			onclick: function() {
				targetFPS = parseInt(this.value.substr(this.value.length-2,2));
				setCookie("pct_fpsTarget", targetFPS.toString(), 7);
				this.value = `Set Target FPS = ${targetFPS===60?24:(targetFPS===24?30:(targetFPS===30?45:60))}`;
			}
		}, {
			value: "Undefined",
			init: function() {
				let cookieValue = getCookie("pct_csize");
				if (cookieValue === "1") {
					this.value = "Balance";
					CanvasHandler.resize(window.innerWidth-8, window.innerHeight-8);
					application.setup();
				} else if (cookieValue === "2") {
					this.value = "Maximize GPU";
					CanvasHandler.resize(200, 200);
					application.setup();
				} else {
					this.value = "Minimize GPU";
				}
			},
			onclick: function() {
				if (this.value === "Maximize GPU") {
					this.value = "Balance";
					CanvasHandler.resize(window.innerWidth-8, window.innerHeight-8);
					setCookie("pct_csize", "1", 7);
				} else if (this.value === "Balance") {
					this.value = "Minimize GPU";
					CanvasHandler.resize();
					setCookie("pct_csize", "0", 7);
				} else if (this.value === "Minimize GPU") {
					this.value = "Maximize GPU";
					CanvasHandler.resize(200, 200);
					setCookie("pct_csize", "2", 7);
				}
				application.setup();
			}
		}, {
			value: "Reset",
			onclick: () => application.setup()
		});
	}
}
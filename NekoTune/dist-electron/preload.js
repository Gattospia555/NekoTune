//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region electron/preload.cjs
var require_preload = /* @__PURE__ */ __commonJSMin((() => {
	var { contextBridge, ipcRenderer } = __require("electron");
	contextBridge.exposeInMainWorld("electronAPI", {
		windowMinimize: () => ipcRenderer.send("window-min"),
		windowMaximize: () => ipcRenderer.send("window-max"),
		windowClose: () => ipcRenderer.send("window-close"),
		onMediaPlayPause: (callback) => ipcRenderer.on("media-play-pause", callback),
		onMediaNextTrack: (callback) => ipcRenderer.on("media-next-track", callback),
		onMediaPrevTrack: (callback) => ipcRenderer.on("media-prev-track", callback)
	});
}));
//#endregion
export default require_preload();

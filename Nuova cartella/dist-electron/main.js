import { createRequire as e } from "node:module";
import t from "node:path";
import { fileURLToPath as n } from "node:url";
import r from "discord-rpc";
//#region electron/main.js
var { app: i, BrowserWindow: a, ipcMain: o, globalShortcut: s } = e(import.meta.url)("electron"), c = "1490735964799369409", l, u = !1;
function d() {
	let e = () => {
		l = new r.Client({ transport: "ipc" }), l.on("ready", () => {
			u = !0, console.log("Discord RPC connesso con successo!"), f("Sfoglia la libreria", "Nekotune Desktop");
		}), l.on("disconnected", () => {
			u = !1, console.log("Discord RPC disconnesso, riprovo tra 15 secondi..."), setTimeout(e, 15e3);
		}), l.login({ clientId: c }).catch((t) => {
			u = !1, console.log("Discord RPC non connesso (forse Discord è chiuso). Riprovo in background..."), setTimeout(e, 15e3);
		});
	};
	e();
}
function f(e, t, n = !1, r = 0, i = 0, a = null) {
	if (!l || !u) return;
	let o = {
		type: 2,
		details: e?.substring(0, 128),
		state: t?.substring(0, 128),
		largeImageKey: a && a.startsWith("http") ? a.substring(0, 256) : "nekotune_logo",
		largeImageText: "Nekotune",
		instance: !1
	};
	if (n && i > 0) {
		let e = Date.now();
		o.startTimestamp = /* @__PURE__ */ new Date(e - r * 1e3), o.endTimestamp = new Date(e + (i - r) * 1e3);
	}
	l.setActivity(o).catch((e) => console.log("Errore setActivity Discord:", e.message));
}
var p = n(import.meta.url), m = t.dirname(p);
process.env.DIST = t.join(m, "../dist"), process.env.VITE_PUBLIC = i.isPackaged ? process.env.DIST : t.join(process.env.DIST, "../public");
var h;
function g() {
	h = new a({
		width: 1200,
		height: 800,
		minWidth: 900,
		minHeight: 600,
		frame: !1,
		icon: t.join(m, "../icon.ico"),
		webPreferences: {
			preload: t.join(m, "preload.cjs"),
			webSecurity: !1
		}
	}), h.webContents.on("did-finish-load", () => {
		h?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	}), process.env.VITE_DEV_SERVER_URL ? h.loadURL(process.env.VITE_DEV_SERVER_URL) : h.loadFile(t.join(process.env.DIST, "index.html"));
}
i.on("window-all-closed", () => {
	process.platform !== "darwin" && (i.quit(), h = null);
}), i.whenReady().then(() => {
	g(), d(), s.register("MediaPlayPause", () => {
		h.webContents.send("media-play-pause");
	}), s.register("MediaNextTrack", () => {
		h.webContents.send("media-next-track");
	}), s.register("MediaPreviousTrack", () => {
		h.webContents.send("media-prev-track");
	}), o.on("window-min", () => h.minimize()), o.on("window-max", () => {
		h.isMaximized() ? h.restore() : h.maximize();
	}), o.on("window-close", () => h.close()), o.on("update-discord", (e, { details: t, state: n, playing: r, currentTime: i, totalDuration: a, imageUrl: o }) => {
		f(t, n, r, i, a, o);
	}), o.on("toggle-pip", (e, t) => {
		h && (t ? (h.setMinimumSize(250, 250), h.setAlwaysOnTop(!0, "screen-saver", 1), h.setSize(320, 320)) : (h.setAlwaysOnTop(!1), h.setMinimumSize(900, 600), h.setSize(1200, 800)));
	}), o.handle("search-youtube", async (e, t, n = 10) => {
		try {
			let { default: e } = await import("ytmusic-api"), r = new e();
			return await r.initialize(), (await r.searchSongs(t)).slice(0, n).map((e) => ({
				id: e.videoId,
				title: e.name,
				artist: e.artist ? e.artist.name : e.artists ? e.artists.map((e) => e.name).join(", ") : "Sconosciuto",
				duration: e.duration,
				cover: e.thumbnails && e.thumbnails.length > 0 ? e.thumbnails[e.thumbnails.length - 1].url : ""
			}));
		} catch (e) {
			return console.error("YTMusic Search Error:", e), [];
		}
	}), o.handle("get-stream-url", async (e, t) => {
		try {
			let e = await import("youtube-dl-exec"), n = await (e.default || e)(`https://www.youtube.com/watch?v=${t}`, {
				getUrl: !0,
				format: "bestaudio"
			});
			return (typeof n == "string" ? n : String(n)).trim().split("\n").pop().trim();
		} catch (e) {
			return console.error("Youtube-dl Error:", e), null;
		}
	}), o.handle("parse-spotify-url", async (e, t) => {
		try {
			let e = await import("spotify-url-info"), n = await (e.default || e)(fetch).getDetails(t);
			if (!n) return [];
			if (n.type === "track" || !n.tracks && n.preview) return [{
				title: n.title || n.preview?.title || "Unknown",
				artist: n.artist || n.preview?.artist || "Unknown",
				album: n.preview?.title || "Spotify",
				duration: Math.floor((n.duration || n.duration_ms || 0) / 1e3),
				cover: n.preview?.image || n.coverArt?.sources?.[0]?.url || ""
			}];
			if (!n.tracks || n.tracks.length === 0) return [];
			let r = n.preview?.image || n.coverArt?.sources?.[0]?.url || "";
			return n.tracks.slice(0, 50).map((e) => ({
				title: e.name || e.title || "Unknown",
				artist: e.artist || (e.artists ? e.artists.map((e) => e.name).join(", ") : "Sconosciuto"),
				album: e.album?.name || n.preview?.title || "Spotify Import",
				duration: Math.floor((e.duration || e.duration_ms || 0) / 1e3),
				cover: e.coverArt?.sources?.[0]?.url || e.album?.images?.[0]?.url || r
			}));
		} catch (e) {
			return console.error("Spotify import error:", e), [];
		}
	});
	let e = "c8fc37223834481f9c7fd3637b821ba2", t = "https://gwpkfsnwrzzluxlekgms.supabase.co/auth/v1/callback";
	function n(e) {
		let t = "";
		for (let n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~".charAt(Math.floor(Math.random() * 66));
		return t;
	}
	async function r(e) {
		return (await import("node:crypto")).createHash("sha256").update(e).digest().toString("base64url");
	}
	o.handle("spotify-auth", async () => {
		let i = n(128), o = await r(i);
		return new Promise((n, r) => {
			let s = `https://accounts.spotify.com/authorize?client_id=${e}&response_type=code&redirect_uri=https%3A%2F%2Fgwpkfsnwrzzluxlekgms.supabase.co%2Fauth%2Fv1%2Fcallback&scope=playlist-read-private%20playlist-read-collaborative%20user-library-read&code_challenge_method=S256&code_challenge=${o}&show_dialog=true`, c = new a({
				width: 500,
				height: 750,
				show: !0,
				parent: h,
				modal: !0,
				webPreferences: {
					nodeIntegration: !1,
					contextIsolation: !0
				}
			}), l = !1;
			c.loadURL(s), c.webContents.on("will-redirect", (e, t) => {
				u(e, t);
			}), c.webContents.on("will-navigate", (e, t) => {
				u(e, t);
			});
			async function u(a, o) {
				if (!o.startsWith(t) || l) return;
				a.preventDefault(), l = !0;
				let s = new URL(o), u = s.searchParams.get("code"), d = s.searchParams.get("error");
				if (d) {
					r(/* @__PURE__ */ Error(`Spotify auth error: ${d}`)), c.close();
					return;
				}
				if (!u) {
					r(/* @__PURE__ */ Error("No authorization code received")), c.close();
					return;
				}
				try {
					let a = await (await fetch("https://accounts.spotify.com/api/token", {
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: new URLSearchParams({
							client_id: e,
							grant_type: "authorization_code",
							code: u,
							redirect_uri: t,
							code_verifier: i
						})
					})).json();
					a.access_token ? n(a.access_token) : r(Error(a.error_description || "Token exchange failed"));
				} catch (e) {
					r(/* @__PURE__ */ Error("Token exchange failed: " + e.message));
				}
				c.close();
			}
			c.on("closed", () => {
				l || r(/* @__PURE__ */ Error("Auth window was closed"));
			});
		});
	}), o.handle("spotify-get-playlists", async (e, t) => {
		try {
			let e = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", { headers: { Authorization: `Bearer ${t}` } });
			if (!e.ok) throw Error(`Spotify API error: ${e.status}`);
			return ((await e.json()).items || []).map((e) => ({
				id: e.id,
				name: e.name,
				description: e.description || "",
				trackCount: e.tracks?.total || 0,
				cover: e.images?.[0]?.url || "",
				owner: e.owner?.display_name || "Unknown",
				isPublic: e.public
			}));
		} catch (e) {
			return console.error("Spotify get playlists error:", e), [];
		}
	}), o.handle("spotify-get-playlist-tracks", async (e, t, n) => {
		try {
			let e = [], r = `https://api.spotify.com/v1/playlists/${n}/tracks?limit=100`;
			for (; r;) {
				let n = await fetch(r, { headers: { Authorization: `Bearer ${t}` } });
				if (!n.ok) throw Error(`Spotify API error: ${n.status}`);
				let i = await n.json(), a = (i.items || []).filter((e) => e.track && e.track.type === "track").map((e) => ({
					title: e.track.name,
					artist: e.track.artists?.map((e) => e.name).join(", ") || "Sconosciuto",
					album: e.track.album?.name || "Unknown",
					duration: Math.floor((e.track.duration_ms || 0) / 1e3),
					cover: e.track.album?.images?.[0]?.url || ""
				}));
				e = e.concat(a), r = i.next;
			}
			return e;
		} catch (e) {
			return console.error("Spotify get playlist tracks error:", e), [];
		}
	}), o.handle("spotify-get-liked-songs", async (e, t) => {
		try {
			let e = [], n = "https://api.spotify.com/v1/me/tracks?limit=50";
			for (; n;) {
				let r = await fetch(n, { headers: { Authorization: `Bearer ${t}` } });
				if (!r.ok) throw Error(`Spotify API error: ${r.status}`);
				let i = await r.json(), a = (i.items || []).filter((e) => e.track).map((e) => ({
					title: e.track.name,
					artist: e.track.artists?.map((e) => e.name).join(", ") || "Sconosciuto",
					album: e.track.album?.name || "Unknown",
					duration: Math.floor((e.track.duration_ms || 0) / 1e3),
					cover: e.track.album?.images?.[0]?.url || ""
				}));
				e = e.concat(a), n = i.next;
			}
			return e;
		} catch (e) {
			return console.error("Spotify get liked songs error:", e), [];
		}
	});
});
//#endregion

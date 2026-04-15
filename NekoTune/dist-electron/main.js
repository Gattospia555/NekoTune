import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import DiscordRPC from "discord-rpc";
//#region electron/main.js
var { app, BrowserWindow, ipcMain, globalShortcut } = createRequire(import.meta.url)("electron");
var clientId = "1490735964799369409";
var rpc;
var rpcConnected = false;
function initDiscordRPC() {
	const tryConnect = () => {
		rpc = new DiscordRPC.Client({ transport: "ipc" });
		rpc.on("ready", () => {
			rpcConnected = true;
			console.log("Discord RPC connesso con successo!");
			setDiscordActivity("Sfoglia la libreria", "Nekotune Desktop");
		});
		rpc.on("disconnected", () => {
			rpcConnected = false;
			console.log("Discord RPC disconnesso, riprovo tra 15 secondi...");
			setTimeout(tryConnect, 15e3);
		});
		rpc.login({ clientId }).catch((e) => {
			rpcConnected = false;
			console.log("Discord RPC non connesso (forse Discord è chiuso). Riprovo in background...");
			setTimeout(tryConnect, 15e3);
		});
	};
	tryConnect();
}
function setDiscordActivity(details, state, playing = false, currentTimeSeconds = 0, totalDurationSeconds = 0, imageUrl = null) {
	if (!rpc || !rpcConnected) return;
	const activity = {
		type: 2,
		details: details?.substring(0, 128),
		state: state?.substring(0, 128),
		largeImageKey: imageUrl && imageUrl.startsWith("http") ? imageUrl.substring(0, 256) : "nekotune_logo",
		largeImageText: "Nekotune",
		instance: false
	};
	if (playing && totalDurationSeconds > 0) {
		const now = Date.now();
		activity.startTimestamp = /* @__PURE__ */ new Date(now - currentTimeSeconds * 1e3);
		activity.endTimestamp = new Date(now + (totalDurationSeconds - currentTimeSeconds) * 1e3);
	}
	rpc.setActivity(activity).catch((e) => console.log("Errore setActivity Discord:", e.message));
}
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
var win;
function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 900,
		minHeight: 600,
		frame: false,
		icon: path.join(__dirname, "../icon.ico"),
		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
			webSecurity: false
		}
	});
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	});
	if (process.env.VITE_DEV_SERVER_URL) win.loadURL(process.env.VITE_DEV_SERVER_URL);
	else win.loadFile(path.join(process.env.DIST, "index.html"));
}
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});
app.whenReady().then(() => {
	createWindow();
	initDiscordRPC();
	globalShortcut.register("MediaPlayPause", () => {
		win.webContents.send("media-play-pause");
	});
	globalShortcut.register("MediaNextTrack", () => {
		win.webContents.send("media-next-track");
	});
	globalShortcut.register("MediaPreviousTrack", () => {
		win.webContents.send("media-prev-track");
	});
	ipcMain.on("window-min", () => win.minimize());
	ipcMain.on("window-max", () => {
		if (win.isMaximized()) win.restore();
		else win.maximize();
	});
	ipcMain.on("window-close", () => win.close());
	ipcMain.on("update-discord", (event, { details, state, playing, currentTime, totalDuration, imageUrl }) => {
		setDiscordActivity(details, state, playing, currentTime, totalDuration, imageUrl);
	});
	ipcMain.on("toggle-pip", (event, enable) => {
		if (!win) return;
		if (enable) {
			win.setMinimumSize(250, 250);
			win.setAlwaysOnTop(true, "screen-saver", 1);
			win.setSize(320, 320);
		} else {
			win.setAlwaysOnTop(false);
			win.setMinimumSize(900, 600);
			win.setSize(1200, 800);
		}
	});
	ipcMain.handle("search-youtube", async (event, query, limit = 10) => {
		try {
			const { default: YTMusic } = await import("ytmusic-api");
			const ytmusic = new YTMusic();
			await ytmusic.initialize();
			return (await ytmusic.searchSongs(query)).slice(0, limit).map((v) => ({
				id: v.videoId,
				title: v.name,
				artist: v.artist ? v.artist.name : v.artists ? v.artists.map((a) => a.name).join(", ") : "Sconosciuto",
				artistId: v.artist?.artistId || v.artists?.[0]?.artistId || null,
				duration: v.duration,
				cover: v.thumbnails && v.thumbnails.length > 0 ? v.thumbnails[v.thumbnails.length - 1].url : ""
			}));
		} catch (e) {
			console.error("YTMusic Search Error:", e);
			return [];
		}
	});
	ipcMain.handle("get-artist-details", async (event, artistId) => {
		try {
			const { default: YTMusic } = await import("ytmusic-api");
			const ytmusic = new YTMusic();
			await ytmusic.initialize();
			return await ytmusic.getArtist(artistId);
		} catch (e) {
			console.error("YTMusic Get Artist Error:", e);
			return null;
		}
	});
	ipcMain.handle("search-artists", async (event, query, limit = 5) => {
		try {
			const { default: YTMusic } = await import("ytmusic-api");
			const ytmusic = new YTMusic();
			await ytmusic.initialize();
			return (await ytmusic.searchArtists(query)).slice(0, limit);
		} catch (e) {
			console.error("YTMusic Search Artists Error:", e);
			return [];
		}
	});
	ipcMain.handle("get-stream-url", async (event, videoId, quality = "bestaudio") => {
		try {
			const ytdlModule = await import("youtube-dl-exec");
			const url = await (ytdlModule.default || ytdlModule)(`https://www.youtube.com/watch?v=${videoId}`, {
				getUrl: true,
				format: quality
			});
			return (typeof url === "string" ? url : String(url)).trim().split("\n").pop().trim();
		} catch (e) {
			console.error("Youtube-dl Error:", e);
			return null;
		}
	});
	ipcMain.handle("parse-spotify-url", async (event, url) => {
		try {
			const spotifyModule = await import("spotify-url-info");
			const data = await (spotifyModule.default || spotifyModule)(fetch).getDetails(url);
			if (!data) return [];
			if (data.type === "track" || !data.tracks && data.preview) return [{
				title: data.title || data.preview?.title || "Unknown",
				artist: data.artist || data.preview?.artist || "Unknown",
				album: data.preview?.title || "Spotify",
				duration: Math.floor((data.duration || data.duration_ms || 0) / 1e3),
				cover: data.preview?.image || data.coverArt?.sources?.[0]?.url || ""
			}];
			if (!data.tracks || data.tracks.length === 0) return [];
			const albumCover = data.preview?.image || data.coverArt?.sources?.[0]?.url || "";
			return data.tracks.slice(0, 50).map((t) => ({
				title: t.name || t.title || "Unknown",
				artist: t.artist || (t.artists ? t.artists.map((a) => a.name).join(", ") : "Sconosciuto"),
				album: t.album?.name || data.preview?.title || "Spotify Import",
				duration: Math.floor((t.duration || t.duration_ms || 0) / 1e3),
				cover: t.coverArt?.sources?.[0]?.url || t.album?.images?.[0]?.url || albumCover
			}));
		} catch (e) {
			console.error("Spotify import error:", e);
			return [];
		}
	});
	const SPOTIFY_CLIENT_ID = "c8fc37223834481f9c7fd3637b821ba2";
	const SPOTIFY_REDIRECT_URI = "https://gwpkfsnwrzzluxlekgms.supabase.co/auth/v1/callback";
	const SPOTIFY_SCOPES = "playlist-read-private playlist-read-collaborative user-library-read";
	function generateRandomString(length) {
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
		let text = "";
		for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * 66));
		return text;
	}
	async function generateCodeChallenge(verifier) {
		return (await import("node:crypto")).createHash("sha256").update(verifier).digest().toString("base64url");
	}
	ipcMain.handle("spotify-auth", async () => {
		const codeVerifier = generateRandomString(128);
		const codeChallenge = await generateCodeChallenge(codeVerifier);
		return new Promise((resolve, reject) => {
			const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}&code_challenge_method=S256&code_challenge=${codeChallenge}&show_dialog=true`;
			const authWin = new BrowserWindow({
				width: 500,
				height: 750,
				show: true,
				parent: win,
				modal: true,
				webPreferences: {
					nodeIntegration: false,
					contextIsolation: true
				}
			});
			let resolved = false;
			authWin.loadURL(authUrl);
			authWin.webContents.on("will-redirect", (event, url) => {
				handleCallback(event, url);
			});
			authWin.webContents.on("will-navigate", (event, url) => {
				handleCallback(event, url);
			});
			async function handleCallback(event, url) {
				if (!url.startsWith(SPOTIFY_REDIRECT_URI) || resolved) return;
				event.preventDefault();
				resolved = true;
				const urlObj = new URL(url);
				const code = urlObj.searchParams.get("code");
				const error = urlObj.searchParams.get("error");
				if (error) {
					reject(/* @__PURE__ */ new Error(`Spotify auth error: ${error}`));
					authWin.close();
					return;
				}
				if (!code) {
					reject(/* @__PURE__ */ new Error("No authorization code received"));
					authWin.close();
					return;
				}
				try {
					const tokenData = await (await fetch("https://accounts.spotify.com/api/token", {
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: new URLSearchParams({
							client_id: SPOTIFY_CLIENT_ID,
							grant_type: "authorization_code",
							code,
							redirect_uri: SPOTIFY_REDIRECT_URI,
							code_verifier: codeVerifier
						})
					})).json();
					if (tokenData.access_token) resolve(tokenData.access_token);
					else reject(new Error(tokenData.error_description || "Token exchange failed"));
				} catch (e) {
					reject(/* @__PURE__ */ new Error("Token exchange failed: " + e.message));
				}
				authWin.close();
			}
			authWin.on("closed", () => {
				if (!resolved) reject(/* @__PURE__ */ new Error("Auth window was closed"));
			});
		});
	});
	ipcMain.handle("spotify-get-playlists", async (event, token) => {
		try {
			const res = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", { headers: { "Authorization": `Bearer ${token}` } });
			if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
			return ((await res.json()).items || []).map((p) => ({
				id: p.id,
				name: p.name,
				description: p.description || "",
				trackCount: p.tracks?.total || 0,
				cover: p.images?.[0]?.url || "",
				owner: p.owner?.display_name || "Unknown",
				isPublic: p.public
			}));
		} catch (e) {
			console.error("Spotify get playlists error:", e);
			return [];
		}
	});
	ipcMain.handle("spotify-get-playlist-tracks", async (event, token, playlistId) => {
		try {
			let allTracks = [];
			let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;
			while (url) {
				const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
				if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
				const data = await res.json();
				const tracks = (data.items || []).filter((item) => item.track && item.track.type === "track").map((item) => ({
					title: item.track.name,
					artist: item.track.artists?.map((a) => a.name).join(", ") || "Sconosciuto",
					album: item.track.album?.name || "Unknown",
					duration: Math.floor((item.track.duration_ms || 0) / 1e3),
					cover: item.track.album?.images?.[0]?.url || ""
				}));
				allTracks = allTracks.concat(tracks);
				url = data.next;
			}
			return allTracks;
		} catch (e) {
			console.error("Spotify get playlist tracks error:", e);
			return [];
		}
	});
	ipcMain.handle("spotify-get-liked-songs", async (event, token) => {
		try {
			let allTracks = [];
			let url = "https://api.spotify.com/v1/me/tracks?limit=50";
			while (url) {
				const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
				if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
				const data = await res.json();
				const tracks = (data.items || []).filter((item) => item.track).map((item) => ({
					title: item.track.name,
					artist: item.track.artists?.map((a) => a.name).join(", ") || "Sconosciuto",
					album: item.track.album?.name || "Unknown",
					duration: Math.floor((item.track.duration_ms || 0) / 1e3),
					cover: item.track.album?.images?.[0]?.url || ""
				}));
				allTracks = allTracks.concat(tracks);
				url = data.next;
			}
			return allTracks;
		} catch (e) {
			console.error("Spotify get liked songs error:", e);
			return [];
		}
	});
});
//#endregion

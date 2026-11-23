// Demo environment for NekoTune screenshots/videos: invented music, invented
// friends, no network. Loaded before the app (playwright init script).
(() => {
  const ART = window.__ART;
  const SB = "https://gwpkfsnwrzzluxlekgms.supabase.co";
  const CAT = [
    ["Nuvole basse", "Kite Club", 204], ["Fusa a 80 bpm", "Neko & Friends", 178], ["Mare di sera", "Onde Lente", 221],
    ["Gomitolo blu", "Luna", 185], ["Lunedì piano", "Ottobre", 242], ["Archi di luce", "Studio Gatto", 217],
    ["Pixel e coda", "Bit & Coda", 169], ["Davanzale", "Mici Uniti", 192], ["Notte lilla", "Kite Club", 235],
    ["Caffè alle sette", "Ottobre", 161], ["Vento nuovo", "Onde Lente", 198], ["Polvere di stelle", "Luna", 250],
    ["Bosco quieto", "Studio Gatto", 209], ["Corallo", "Mici Uniti", 183], ["Ritorno a casa", "Neko & Friends", 226],
    ["Fine settimana", "Bit & Coda", 177], ["Pisolino sul davanzale", "Neko & Friends", 192], ["Giardino d'inverno", "Ottobre", 213],
  ];
  const vid = (i) => "nkdemo" + String(i).padStart(5, "0");
  const TRACKS = CAT.map(([title, artist, duration], i) => ({
    id: "yt_" + vid(i), title, artist, album: "YouTube", duration, color: "#9c7bd6",
    cover: ART.covers[i], isYoutube: true, videoId: vid(i), src: "",
  }));
  window.__DEMO = { TRACKS };
  const byVid = Object.fromEntries(TRACKS.map((t) => [t.videoId, t]));

  // ---------- local data ----------
  const now = Date.now();
  const iso = (msAgo) => new Date(Date.now() - msAgo).toISOString();
  if (!localStorage.getItem("__demo_seeded")) {
    const ls = (k, v) => localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
    ls("__demo_seeded", "1");
    ls("nekotune_lang", "it");
    ls("sw_imported_tracks", TRACKS);
    ls("sw_favorites", [0, 3, 7, 11, 16, 2, 14].map((i) => TRACKS[i]));
    ls("sw_history", [16, 0, 3, 8, 2, 11, 5, 9, 13, 6].map((i) => TRACKS[i]));
    ls("sw_recent", [16, 0, 3, 8].map((i) => TRACKS[i]));
    ls("sw_playlists", [
      { id: "pl_studio", name: "Per studiare", description: "Musica tranquilla, niente parole", tracks: [4, 5, 12, 9, 17, 2].map((i) => TRACKS[i].id), color: "#9c7bd6" },
      { id: "pl_sera", name: "La sera con Luna", description: "La nostra playlist condivisa", tracks: [3, 11, 8, 0, 13].map((i) => TRACKS[i].id), color: "#ffb37e" },
      { id: "pl_live", name: "In live", description: "Per gli stream del venerdì", tracks: [6, 15, 1, 14, 10].map((i) => TRACKS[i].id), color: "#7fc7a6" },
      { id: "pl_mattina", name: "Buongiorno", description: "", tracks: [9, 10, 7, 1].map((i) => TRACKS[i].id), color: "#f28aa0" },
    ]);
    ls("sw_settings_auto_sync", "false");
    ls("sw_settings_discord_rpc", "false");
    ls("sw_listening_stats", {
      totalMinutes: 1843, totalTracks: 612,
      topTracks: {}, topArtists: { "Kite Club": 140, "Luna": 118, "Ottobre": 96, "Onde Lente": 71, "Neko & Friends": 64 },
    });
    // a signed-in demo account (never sent anywhere: the network is faked below)
    const user = { id: "6f1c2a10-0000-4000-8000-000000000001", aud: "authenticated", role: "authenticated", email: "mia@example.com", user_metadata: { full_name: "Mia" }, app_metadata: { provider: "email" }, identities: [], created_at: iso(86400000 * 90) };
    ls("sb-gwpkfsnwrzzluxlekgms-auth-token", {
      access_token: "demo.demo.demo", refresh_token: "demo", token_type: "bearer",
      expires_in: 3600 * 24 * 365, expires_at: Math.floor(now / 1000) + 3600 * 24 * 365, user,
    });
  }

  // ---------- fake backend ----------
  const ME = "6f1c2a10-0000-4000-8000-000000000001";
  const AV = ART.avatars;
  const playing = (i) => ({ title: TRACKS[i].title, artist: TRACKS[i].artist, cover: null, videoId: null, duration: TRACKS[i].duration, started_at: iso(60000) });
  const db = {
    users_profiles: [
      { id: ME, username: "Mia", avatar_url: AV[0], status: "online", custom_status: "Lo-fi e tè caldo", bio: "Ascolto tutto, soprattutto la sera.", currently_playing: null, last_seen: "NOW", is_private: false, total_minutes: 1843, total_tracks: 612, share_activity: true, created_at: iso(86400000 * 90) },
      { id: "6f1c2a10-0000-4000-8000-000000000002", username: "Luna", avatar_url: AV[1], status: "online", currently_playing: playing(11), last_seen: "NOW" },
      { id: "6f1c2a10-0000-4000-8000-000000000003", username: "Kiro", avatar_url: AV[2], status: "online", currently_playing: playing(2), last_seen: "NOW" },
      { id: "6f1c2a10-0000-4000-8000-000000000004", username: "Sole", avatar_url: AV[3], status: "idle", currently_playing: null, last_seen: "NOW", custom_status: "In pausa pranzo" },
      { id: "6f1c2a10-0000-4000-8000-000000000005", username: "Teo", avatar_url: AV[5], status: "dnd", currently_playing: playing(6), last_seen: "NOW" },
      { id: "6f1c2a10-0000-4000-8000-000000000006", username: "Pixel", avatar_url: AV[4], status: "online", currently_playing: null, last_seen: iso(3 * 3600000) },
    ],
    friendships: ["6f1c2a10-0000-4000-8000-000000000002", "6f1c2a10-0000-4000-8000-000000000003", "6f1c2a10-0000-4000-8000-000000000004", "6f1c2a10-0000-4000-8000-000000000005", "6f1c2a10-0000-4000-8000-000000000006"].map((id, i) => ({ id: "f" + i, requester_id: i % 2 ? id : ME, addressee_id: i % 2 ? ME : id, status: "accepted", created_at: iso(86400000 * (20 + i)) })),
    direct_messages: [],
    notifications: [
      { id: "n1", user_id: ME, type: "friend_accepted", title: "Kiro ha accettato la tua richiesta", message: "Ora siete amici.", read: false, created_at: iso(3600000 * 3), data: {} },
      { id: "n2", user_id: ME, type: "new_release", title: "Nuova uscita di Kite Club", message: "Notte lilla è appena uscito.", read: true, created_at: iso(86400000), data: {} },
    ],
    user_playlists: [], user_favorites: [], shared_playlists: [], shared_playlist_members: [], listening_history: [], discord_links: [], avatars: [],
  };
  let n = 0;
  const dm = (from, to, minsAgo, content, extra = {}) =>
    db.direct_messages.push({ id: "m" + ++n, sender_id: from, receiver_id: to, content, type: "text", metadata: {}, read: true, reactions: {}, created_at: iso(minsAgo * 60000), ...extra });
  const L = "6f1c2a10-0000-4000-8000-000000000002";
  dm(L, ME, 64, "ehi, sei ancora sveglia?");
  dm(ME, L, 62, "sì, sto finendo una cosa con la musica in sottofondo");
  dm(L, ME, 61, "allora ascolta questa", { type: "track_share", metadata: { title: TRACKS[0].title, artist: TRACKS[0].artist, videoId: TRACKS[0].videoId, cover: TRACKS[0].cover } });
  dm(ME, L, 58, "in loop da stamattina", { reactions: { "❤️": [L] } });
  dm(L, ME, 57, "ahah lo sapevo");
  dm(L, ME, 12, "", { type: "session_invite", metadata: { sessionCode: "NEKO42" } });
  dm(L, ME, 11, "ascoltiamo insieme? metto su la playlist della sera", { read: false });
  dm("6f1c2a10-0000-4000-8000-000000000003", ME, 180, "domani live alle 21, porto la playlist nuova", { read: false });
  dm(ME, "6f1c2a10-0000-4000-8000-000000000003", 300, "ci sono!");
  dm("6f1c2a10-0000-4000-8000-000000000004", ME, 1500, "grazie per il brano di ieri");
  dm(ME, "6f1c2a10-0000-4000-8000-000000000005", 2900, "com'è andato il concerto?");

  const nowify = (r) => (r && r.last_seen === "NOW" ? { ...r, last_seen: new Date().toISOString() } : r);
  const val = (v) => (v === "null" ? null : v === "true" ? true : v === "false" ? false : decodeURIComponent(v));
  function test(row, col, op, v) {
    const x = row[col];
    switch (op) {
      case "eq": return String(x) === String(val(v));
      case "neq": return String(x) !== String(val(v));
      case "lt": return x < val(v);
      case "gt": return x > val(v);
      case "lte": return x <= val(v);
      case "gte": return x >= val(v);
      case "is": return v === "null" ? x == null : x === val(v);
      case "in": return v.replace(/^\(|\)$/g, "").split(",").map((s) => s.replace(/^"|"$/g, "")).includes(String(x));
      case "ilike": return String(x ?? "").toLowerCase().includes(val(v).replace(/%/g, "").toLowerCase());
      default: return true;
    }
  }
  function splitTop(s) {
    const out = []; let depth = 0, cur = "";
    for (const ch of s) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
    }
    if (cur) out.push(cur);
    return out;
  }
  function orMatch(row, expr) {
    return splitTop(expr.replace(/^\(|\)$/g, "")).some((term) => {
      if (term.startsWith("and(")) return splitTop(term.slice(4, -1)).every((t) => { const [c, o, ...r] = t.split("."); return test(row, c, o, r.join(".")); });
      const [c, o, ...r] = term.split(".");
      return test(row, c, o, r.join("."));
    });
  }
  function rest(method, url, headers, body) {
    const u = new URL(url);
    const table = u.pathname.replace("/rest/v1/", "");
    if (table.startsWith("rpc/")) return { status: 200, json: table.endsWith("dm_toggle_reaction") ? {} : null };
    const rows = db[table] || (db[table] = []);
    if (method === "POST") {
      const add = (Array.isArray(body) ? body : [body]).map((r) => ({ created_at: new Date().toISOString(), id: r.id || "x" + Math.random().toString(36).slice(2), ...r }));
      rows.push(...add);
      return { status: 201, json: wantsOne(headers) ? add[0] : add };
    }
    let list = rows.filter((r) => {
      for (const [k, v] of u.searchParams) {
        if (["select", "order", "limit", "offset", "on_conflict", "columns"].includes(k)) continue;
        if (k === "or") { if (!orMatch(r, v)) return false; continue; }
        const [op, ...rest] = v.split(".");
        if (!test(r, k, op, rest.join("."))) return false;
      }
      return true;
    });
    if (method === "PATCH") { list.forEach((r) => Object.assign(r, body)); return { status: 200, json: wantsOne(headers) ? list[0] || null : list }; }
    if (method === "DELETE") return { status: 200, json: [] };
    const order = u.searchParams.get("order");
    if (order) {
      const [col, dir] = order.split(".");
      list = [...list].sort((a, b) => (a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0) * (dir === "desc" ? -1 : 1));
    }
    const lim = u.searchParams.get("limit");
    if (lim) list = list.slice(0, +lim);
    list = list.map(nowify);
    if (wantsOne(headers)) {
      if (!list.length) return { status: 406, json: { code: "PGRST116", message: "no rows" } };
      return { status: 200, json: list[0] };
    }
    return { status: 200, json: list };
  }
  const wantsOne = (h) => String(h.get("accept") || "").includes("vnd.pgrst.object");

  const LRC = [
    "Le nuvole si abbassano sul tetto", "e il gatto dorme sopra il mio quaderno", "metto un disco, giro piano il volume",
    "la città si spegne una luce alla volta", "e resta solo questa melodia", "che mi porta a casa", "♪",
    "Domani è un giorno nuovo", "ma stanotte restiamo qui", "con le cuffie e il tè che si raffredda",
  ];
  const lrc = () => LRC.map((l, i) => `[00:${String(4 + i * 7).padStart(2, "0")}.00] ${l}`).join("\n");

  const realFetch = window.fetch.bind(window);
  const reply = (status, json) => new Response(json === undefined ? "" : JSON.stringify(json), { status, headers: { "content-type": "application/json" } });
  window.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;
    const method = (init.method || (typeof input !== "string" && input.method) || "GET").toUpperCase();
    const headers = new Headers(init.headers || (typeof input !== "string" ? input.headers : undefined));
    if (url.startsWith(SB)) {
      if (url.includes("/auth/v1/user")) return reply(200, JSON.parse(localStorage.getItem("sb-gwpkfsnwrzzluxlekgms-auth-token")).user);
      if (url.includes("/auth/v1/")) return reply(200, {});
      if (url.includes("/rest/v1/")) {
        let body = init.body;
        try { body = body ? JSON.parse(body) : null; } catch {}
        const r = rest(method, url, headers, body);
        return reply(r.status, r.json);
      }
      return reply(404, {});
    }
    if (url.includes("lrclib.net")) {
      const synced = lrc();
      const one = { id: 1, trackName: "", artistName: "", duration: 200, syncedLyrics: synced, plainLyrics: LRC.join("\n") };
      return reply(200, url.includes("/search") ? [one] : one);
    }
    if (/^https?:\/\//.test(url) && !url.startsWith(location.origin)) return reply(404, {});
    return realFetch(input, init);
  };
  // realtime: a socket that never connects
  const RealWS = window.WebSocket;
  window.WebSocket = function (url, p) {
    if (String(url).includes("supabase")) {
      const fake = { readyState: 0, send() {}, close() {}, addEventListener() {}, removeEventListener() {} };
      return fake;
    }
    return new RealWS(url, p);
  };

  // ---------- Electron bridge ----------
  const noop = () => {};
  const search = (q, limit = 10) => {
    const s = String(q || "").toLowerCase();
    let hits = TRACKS.filter((t) => (t.title + " " + t.artist).toLowerCase().includes(s));
    if (!hits.length) hits = TRACKS.slice(0, limit);
    return hits.slice(0, limit).map((t) => ({ id: t.videoId, title: t.title, artist: t.artist, artistId: "a_" + t.artist, duration: t.duration, cover: t.cover }));
  };
  window.electronAPI = new Proxy(
    {
      searchYoutube: async (q, l) => search(q, l),
      getStreamUrl: async () => location.origin + "/demo-audio.wav",
      invoke: async (ch) => (ch === "search-artists" ? [] : ch === "search-albums" ? [] : null),
      getAppInfo: async () => ({ version: "1.1.0", electron: "41", platform: "win32" }),
      getDiscordStatus: async () => ({ connected: false }),
      isMiniPlayer: false, isMiniPlayerSync: () => false, isForcedMiniPlayer: () => false,
      copyText: async () => true,
      getLastStreamError: async () => null,
      localApiInfo: async () => ({ enabled: false, port: 0 }),
    },
    { get: (o, k) => (k in o ? o[k] : (...a) => (String(k).startsWith("on") ? noop : Promise.resolve(null))) }
  );
})();

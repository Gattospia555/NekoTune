// Nekotune — Listening Stats & Wrapped
import { DEMO_TRACKS, formatTime } from './data.js';

class StatsManager {
  constructor(app, player) {
    this.app = app;
    this.player = player;
    this.STORAGE_KEY = 'sw_listening_stats';
    this.stats = this.loadStats();
    this.currentSessionStart = null;
    this.trackingTrack = null;

    this.initTracking();
  }

  // ===== DATA MODEL =====
  getDefaultStats() {
    return {
      totalMinutes: 0,
      totalTracks: 0,
      trackPlays: {},    // { trackId: { count, totalMs, title, artist, cover } }
      artistPlays: {},   // { artistName: { count, totalMs } }
      dailyHistory: {},  // { 'YYYY-MM-DD': { minutes, tracks } }
      currentStreak: 0,
      longestStreak: 0,
      lastPlayDate: null,
      firstPlayDate: null,
    };
  }

  loadStats() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...this.getDefaultStats(), ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load stats:', e);
    }
    return this.getDefaultStats();
  }

  saveStats() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.stats));
    } catch (e) {
      console.warn('Failed to save stats:', e);
    }
  }

  // ===== TRACKING ENGINE =====
  initTracking() {
    // Track when a song plays for more than 30 seconds
    this.player.audio.addEventListener('timeupdate', () => {
      if (!this.player.currentTrack || !this.player.isPlaying) return;

      const track = this.player.currentTrack;

      // Start tracking a new track
      if (this.trackingTrack !== track.id) {
        this.trackingTrack = track.id;
        this.currentSessionStart = Date.now();
      }
    });

    // Record stats when track changes or pauses
    this.player.audio.addEventListener('pause', () => {
      this.recordCurrentSession();
    });

    this.player.audio.addEventListener('ended', () => {
      this.recordCurrentSession();
    });

    // Also check streak on startup
    this.updateStreak();
  }

  recordCurrentSession() {
    if (!this.trackingTrack || !this.currentSessionStart) return;

    const track = this.player.currentTrack;
    if (!track) return;

    const durationMs = Date.now() - this.currentSessionStart;
    const durationMin = durationMs / 60000;

    // Only count if played for at least 30 seconds
    if (durationMs < 30000) return;

    // Total stats
    this.stats.totalMinutes += durationMin;
    this.stats.totalTracks += 1;

    // Per-track stats
    if (!this.stats.trackPlays[track.id]) {
      this.stats.trackPlays[track.id] = {
        count: 0, totalMs: 0,
        title: track.title, artist: track.artist
      };
    }
    this.stats.trackPlays[track.id].count += 1;
    this.stats.trackPlays[track.id].totalMs += durationMs;

    // Per-artist stats
    const artist = track.artist || 'Sconosciuto';
    if (!this.stats.artistPlays[artist]) {
      this.stats.artistPlays[artist] = { count: 0, totalMs: 0 };
    }
    this.stats.artistPlays[artist].count += 1;
    this.stats.artistPlays[artist].totalMs += durationMs;

    // Daily history
    const today = new Date().toISOString().split('T')[0];
    if (!this.stats.dailyHistory[today]) {
      this.stats.dailyHistory[today] = { minutes: 0, tracks: 0 };
    }
    this.stats.dailyHistory[today].minutes += durationMin;
    this.stats.dailyHistory[today].tracks += 1;

    // Update first play date
    if (!this.stats.firstPlayDate) {
      this.stats.firstPlayDate = today;
    }
    this.stats.lastPlayDate = today;

    // Update streak
    this.updateStreak();

    // Reset session
    this.currentSessionStart = Date.now();
    this.saveStats();
  }

  updateStreak() {
    const today = new Date();
    let streak = 0;
    const checkDate = new Date(today);

    // Check consecutive days backwards from today
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (this.stats.dailyHistory[dateStr] && this.stats.dailyHistory[dateStr].tracks > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    this.stats.currentStreak = streak;
    if (streak > this.stats.longestStreak) {
      this.stats.longestStreak = streak;
    }
  }

  // ===== COMPUTED STATS =====
  getTopTracks(limit = 10) {
    return Object.entries(this.stats.trackPlays)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getTopArtists(limit = 5) {
    return Object.entries(this.stats.artistPlays)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getWeeklyMinutes() {
    const result = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
      result.push({
        day: dayNames[d.getDay()],
        date: dateStr,
        minutes: this.stats.dailyHistory[dateStr]?.minutes || 0
      });
    }
    return result;
  }

  getListeningHours() {
    return Math.round(this.stats.totalMinutes / 60 * 10) / 10;
  }

  // ===== UI RENDERING =====
  renderWrapped() {
    const section = document.getElementById('section-wrapped');
    if (!section) return;

    const topTracks = this.getTopTracks(10);
    const topArtists = this.getTopArtists(5);
    const weeklyData = this.getWeeklyMinutes();
    const maxWeeklyMin = Math.max(...weeklyData.map(d => d.minutes), 1);
    const hours = this.getListeningHours();

    const artistColors = ['#6c5ce7', '#00b894', '#e17055', '#fdcb6e', '#74b9ff'];

    section.innerHTML = `
      <div class="wrapped-hero">
        <div class="wrapped-hero-bg"></div>
        <div class="wrapped-hero-content">
          <span class="material-icons-round wrapped-hero-icon">insights</span>
          <h2>Il Tuo Nekotune Wrapped</h2>
          <p>Le tue statistiche d'ascolto in tempo reale</p>
        </div>
      </div>

      <div class="wrapped-stats-grid">
        <div class="wrapped-stat-card">
          <span class="material-icons-round wrapped-stat-icon" style="color:#6c5ce7">headphones</span>
          <div class="wrapped-stat-value">${hours}</div>
          <div class="wrapped-stat-label">Ore Ascoltate</div>
        </div>
        <div class="wrapped-stat-card">
          <span class="material-icons-round wrapped-stat-icon" style="color:#00b894">music_note</span>
          <div class="wrapped-stat-value">${this.stats.totalTracks}</div>
          <div class="wrapped-stat-label">Brani Riprodotti</div>
        </div>
        <div class="wrapped-stat-card">
          <span class="material-icons-round wrapped-stat-icon" style="color:#e17055">local_fire_department</span>
          <div class="wrapped-stat-value">${this.stats.currentStreak}</div>
          <div class="wrapped-stat-label">Streak Attuale (gg)</div>
        </div>
        <div class="wrapped-stat-card">
          <span class="material-icons-round wrapped-stat-icon" style="color:#fdcb6e">emoji_events</span>
          <div class="wrapped-stat-value">${this.stats.longestStreak}</div>
          <div class="wrapped-stat-label">Record Streak (gg)</div>
        </div>
      </div>

      <div class="wrapped-section">
        <h3 class="wrapped-section-title">
          <span class="material-icons-round">bar_chart</span>
          Questa Settimana
        </h3>
        <div class="wrapped-weekly-chart">
          ${weeklyData.map(d => `
            <div class="weekly-bar-col">
              <div class="weekly-bar-value">${Math.round(d.minutes)}m</div>
              <div class="weekly-bar" style="height: ${Math.max((d.minutes / maxWeeklyMin) * 120, 4)}px"></div>
              <div class="weekly-bar-label">${d.day}</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${topTracks.length > 0 ? `
        <div class="wrapped-section">
          <h3 class="wrapped-section-title">
            <span class="material-icons-round">star</span>
            Top 10 Brani
          </h3>
          <div class="wrapped-top-list">
            ${topTracks.map((t, i) => {
              const maxPlays = topTracks[0].count;
              const pct = (t.count / maxPlays) * 100;
              return `
                <div class="wrapped-top-item">
                  <span class="wrapped-top-rank">${i + 1}</span>
                  <div class="wrapped-top-info">
                    <div class="wrapped-top-name">${t.title}</div>
                    <div class="wrapped-top-sub">${t.artist}</div>
                  </div>
                  <div class="wrapped-top-bar-container">
                    <div class="wrapped-top-bar" style="width:${pct}%"></div>
                  </div>
                  <span class="wrapped-top-count">${t.count}×</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${topArtists.length > 0 ? `
        <div class="wrapped-section">
          <h3 class="wrapped-section-title">
            <span class="material-icons-round">person</span>
            Top Artisti
          </h3>
          <div class="wrapped-artists-grid">
            ${topArtists.map((a, i) => `
              <div class="wrapped-artist-card">
                <div class="wrapped-artist-avatar" style="background:${artistColors[i % artistColors.length]}">
                  ${a.name.charAt(0).toUpperCase()}
                </div>
                <div class="wrapped-artist-name">${a.name}</div>
                <div class="wrapped-artist-plays">${a.count} ascolti</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    // Animate stat values on view
    setTimeout(() => {
      section.querySelectorAll('.wrapped-stat-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('revealed'), i * 100);
      });
      section.querySelectorAll('.weekly-bar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 80);
      });
      section.querySelectorAll('.wrapped-top-bar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 60);
      });
    }, 100);
  }

  // Called when navigating to the Wrapped section
  onSectionVisible() {
    this.renderWrapped();
  }
}

export default StatsManager;

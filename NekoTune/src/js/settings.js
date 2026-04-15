export class SettingsManager {
  static PLAYER_CURSOR_KEY = "sw_settings_player_cursor_style";
  static PLAYER_CURSOR_CLASSES = [
    "player-cursor-paw",
    "player-cursor-dot",
    "player-cursor-bar",
  ];
  static VOLUME_CURSOR_KEY = "sw_settings_volume_cursor_style";
  static VOLUME_CURSOR_CLASSES = [
    "volume-cursor-paw",
    "volume-cursor-dot",
    "volume-cursor-bar",
  ];

  static init() {
    this.qualitySelect = document.getElementById("settings-audio-quality");
    this.playerCursorSelect = document.getElementById(
      "settings-player-cursor-style",
    );
    this.volumeCursorSelect = document.getElementById(
      "settings-volume-cursor-style",
    );
    this.btnReset = document.getElementById("btn-settings-reset");

    this.qualitySelect.value =
      localStorage.getItem("sw_settings_quality") || "bestaudio";
    const cursorStyle = this.getPlayerCursorStyle();
    this.applyPlayerCursorStyle(cursorStyle);
    const volumeCursorStyle = this.getVolumeCursorStyle();
    this.applyVolumeCursorStyle(volumeCursorStyle);

    if (this.playerCursorSelect) {
      this.playerCursorSelect.value = cursorStyle;
      this.playerCursorSelect.addEventListener("change", (e) => {
        const selectedStyle = e.target.value;
        localStorage.setItem(this.PLAYER_CURSOR_KEY, selectedStyle);
        this.applyPlayerCursorStyle(selectedStyle);
      });
    }

    if (this.volumeCursorSelect) {
      this.volumeCursorSelect.value = volumeCursorStyle;
      this.volumeCursorSelect.addEventListener("change", (e) => {
        const selectedStyle = e.target.value;
        localStorage.setItem(this.VOLUME_CURSOR_KEY, selectedStyle);
        this.applyVolumeCursorStyle(selectedStyle);
      });
    }

    this.qualitySelect.addEventListener("change", (e) => {
      localStorage.setItem("sw_settings_quality", e.target.value);
    });

    this.btnReset.addEventListener("click", () => {
      if (
        confirm(
          "Sei sicuro di voler eliminare tutte le impostazioni, lo storico e i preferiti?",
        )
      ) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  static getAudioQuality() {
    return localStorage.getItem("sw_settings_quality") || "bestaudio";
  }

  static getPlayerCursorStyle() {
    const value = localStorage.getItem(this.PLAYER_CURSOR_KEY) || "paw";
    return ["paw", "dot", "bar"].includes(value) ? value : "paw";
  }

  static applyPlayerCursorStyle(style) {
    const normalizedStyle = ["paw", "dot", "bar"].includes(style)
      ? style
      : "paw";
    document.body.classList.remove(...this.PLAYER_CURSOR_CLASSES);
    document.body.classList.add(`player-cursor-${normalizedStyle}`);
  }

  static getVolumeCursorStyle() {
    const value = localStorage.getItem(this.VOLUME_CURSOR_KEY) || "paw";
    return ["paw", "dot", "bar"].includes(value) ? value : "paw";
  }

  static applyVolumeCursorStyle(style) {
    const normalizedStyle = ["paw", "dot", "bar"].includes(style)
      ? style
      : "paw";
    document.body.classList.remove(...this.VOLUME_CURSOR_CLASSES);
    document.body.classList.add(`volume-cursor-${normalizedStyle}`);
  }
}

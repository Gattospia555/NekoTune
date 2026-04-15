export class SettingsManager {
  static init() {
    this.qualitySelect = document.getElementById('settings-audio-quality');
    this.btnReset = document.getElementById('btn-settings-reset');

    this.qualitySelect.value = localStorage.getItem('sw_settings_quality') || 'bestaudio';

    this.qualitySelect.addEventListener('change', (e) => {
      localStorage.setItem('sw_settings_quality', e.target.value);
    });

    this.btnReset.addEventListener('click', () => {
      if (confirm("Sei sicuro di voler eliminare tutte le impostazioni, lo storico e i preferiti?")) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  static getAudioQuality() {
    return localStorage.getItem('sw_settings_quality') || 'bestaudio';
  }
}

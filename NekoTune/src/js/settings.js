export class SettingsManager {
  static init() {
    this.btnReset = document.getElementById('btn-settings-reset');

    const dropdown = document.getElementById('settings-audio-dropdown');
    const selected = document.getElementById('settings-audio-selected');
    const options = document.querySelectorAll('#settings-audio-options .dropdown-option');

    const currentQuality = localStorage.getItem('sw_settings_quality') || 'bestaudio';
    
    if (dropdown && selected && options) {
      // Find and set initial text
      const initialOption = Array.from(options).find(opt => opt.getAttribute('data-value') === currentQuality);
      if (initialOption) {
        selected.textContent = initialOption.textContent;
      }

      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });

      options.forEach(option => {
        option.addEventListener('click', (e) => {
          const value = e.target.getAttribute('data-value');
          selected.textContent = e.target.textContent;
          localStorage.setItem('sw_settings_quality', value);
          dropdown.classList.remove('active');
        });
      });
    }

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

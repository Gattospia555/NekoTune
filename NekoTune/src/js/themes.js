// Nekotune — Theme Manager
import { THEME_PRESETS } from './data.js';

class ThemeManager {
  constructor(app) {
    this.app = app;
    this.currentTheme = localStorage.getItem('sw_theme') || 'nekotune-cream';
    this.customThemes = JSON.parse(localStorage.getItem('sw_custom_themes') || '[]');

    this.applyTheme(this.currentTheme);
    this.initEvents();
  }

  initEvents() {
    document.getElementById('btn-save-theme').addEventListener('click', () => {
      this.saveCustomTheme();
    });

    document.getElementById('btn-export-theme').addEventListener('click', () => {
      this.exportTheme();
    });

    document.getElementById('btn-import-theme').addEventListener('click', () => {
      this.importTheme();
    });

    // Live preview on color change
    const colorInputs = [
      'theme-bg-primary', 'theme-bg-secondary',
      'theme-accent', 'theme-accent-secondary',
      'theme-text-primary', 'theme-text-secondary'
    ];

    colorInputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          this.previewCustomTheme();
        });
      }
    });
  }

  applyTheme(themeId) {
    // Check presets first
    let theme = THEME_PRESETS.find(t => t.id === themeId);

    // Check custom themes
    if (!theme) {
      theme = this.customThemes.find(t => t.id === themeId);
    }

    if (!theme) {
      theme = THEME_PRESETS[0]; // fallback to dark
    }

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Update gradient variables
    root.style.setProperty('--accent-gradient',
      `linear-gradient(135deg, ${theme.colors['--accent']}, ${theme.colors['--accent-secondary']})`);
    root.style.setProperty('--accent-glow',
      theme.colors['--accent-glow'] || `${theme.colors['--accent']}4d`);
    root.style.setProperty('--bg-hover', 'rgba(255, 255, 255, 0.05)');
    root.style.setProperty('--bg-active', 'rgba(255, 255, 255, 0.08)');

    // Light theme adjustments
    if (theme.id === 'nekotune-cream' || themeId === 'light') {
      root.style.setProperty('--bg-hover', 'rgba(0, 0, 0, 0.04)');
      root.style.setProperty('--bg-active', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--border', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--border-hover', 'rgba(0, 0, 0, 0.15)');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.85)');
    } else {
      root.style.setProperty('--border', 'rgba(255, 255, 255, 0.06)');
      root.style.setProperty('--border-hover', 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--glass-bg', 'rgba(18, 18, 26, 0.8)');
    }

    this.currentTheme = themeId;
    localStorage.setItem('sw_theme', themeId);
  }

  renderThemes() {
    const presetsGrid = document.getElementById('theme-presets-grid');
    const customGrid = document.getElementById('custom-themes-grid');

    // Render presets
    presetsGrid.innerHTML = '';
    THEME_PRESETS.forEach(theme => {
      presetsGrid.appendChild(this.createThemeCard(theme, false));
    });

    // Render custom themes
    customGrid.innerHTML = '';
    if (this.customThemes.length === 0) {
      customGrid.innerHTML = '<p style="color: var(--text-tertiary); padding: 12px;">Nessun tema personalizzato</p>';
    } else {
      this.customThemes.forEach(theme => {
        customGrid.appendChild(this.createThemeCard(theme, true));
      });
    }
  }

  createThemeCard(theme, isCustom) {
    const card = document.createElement('div');
    card.className = `theme-preset-card${this.currentTheme === theme.id ? ' active' : ''}`;

    const colors = theme.colors;
    card.innerHTML = `
      <div class="theme-preview">
        <div class="theme-preview-swatch" style="background: ${colors['--bg-primary']}"></div>
        <div class="theme-preview-swatch" style="background: ${colors['--bg-secondary']}"></div>
        <div class="theme-preview-swatch" style="background: ${colors['--accent']}"></div>
        <div class="theme-preview-swatch" style="background: ${colors['--accent-secondary']}"></div>
        <div class="theme-preview-swatch" style="background: ${colors['--text-primary']}"></div>
      </div>
      <div class="theme-preset-name">${theme.name}</div>
      ${this.currentTheme === theme.id ? '<span class="material-icons-round active-badge">check_circle</span>' : ''}
      ${isCustom ? '<button class="btn-icon btn-delete-theme" style="position:absolute;top:8px;right:8px"><span class="material-icons-round" style="font-size:16px">delete</span></button>' : ''}
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete-theme')) {
        this.deleteCustomTheme(theme.id);
        return;
      }
      this.applyTheme(theme.id);
      this.renderThemes();
      this.app.showToast(`Tema "${theme.name}" applicato`);
    });

    return card;
  }

  previewCustomTheme() {
    const root = document.documentElement;
    const vals = this.getCustomValues();

    root.style.setProperty('--bg-primary', vals.bgPrimary);
    root.style.setProperty('--bg-secondary', vals.bgSecondary);
    root.style.setProperty('--bg-tertiary', this.lighten(vals.bgSecondary, 10));
    root.style.setProperty('--bg-elevated', this.lighten(vals.bgSecondary, 20));
    root.style.setProperty('--accent', vals.accent);
    root.style.setProperty('--accent-hover', this.lighten(vals.accent, 10));
    root.style.setProperty('--accent-secondary', vals.accentSecondary);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${vals.accent}, ${vals.accentSecondary})`);
    root.style.setProperty('--accent-glow', `${vals.accent}4d`);
    root.style.setProperty('--text-primary', vals.textPrimary);
    root.style.setProperty('--text-secondary', vals.textSecondary);
    root.style.setProperty('--text-tertiary', this.darken(vals.textSecondary, 20));
  }

  getCustomValues() {
    return {
      bgPrimary: document.getElementById('theme-bg-primary').value,
      bgSecondary: document.getElementById('theme-bg-secondary').value,
      accent: document.getElementById('theme-accent').value,
      accentSecondary: document.getElementById('theme-accent-secondary').value,
      textPrimary: document.getElementById('theme-text-primary').value,
      textSecondary: document.getElementById('theme-text-secondary').value
    };
  }

  saveCustomTheme() {
    const name = document.getElementById('theme-custom-name').value.trim();
    if (!name) {
      this.app.showToast('Inserisci un nome per il tema');
      return;
    }

    const vals = this.getCustomValues();
    const theme = {
      id: 'custom_' + Date.now(),
      name: name,
      colors: {
        '--bg-primary': vals.bgPrimary,
        '--bg-secondary': vals.bgSecondary,
        '--bg-tertiary': this.lighten(vals.bgSecondary, 10),
        '--bg-elevated': this.lighten(vals.bgSecondary, 20),
        '--accent': vals.accent,
        '--accent-hover': this.lighten(vals.accent, 10),
        '--accent-secondary': vals.accentSecondary,
        '--accent-glow': `${vals.accent}4d`,
        '--text-primary': vals.textPrimary,
        '--text-secondary': vals.textSecondary,
        '--text-tertiary': this.darken(vals.textSecondary, 20)
      }
    };

    this.customThemes.push(theme);
    localStorage.setItem('sw_custom_themes', JSON.stringify(this.customThemes));
    this.applyTheme(theme.id);
    this.renderThemes();
    this.app.showToast(`Tema "${name}" salvato!`);
    document.getElementById('theme-custom-name').value = '';
  }

  deleteCustomTheme(themeId) {
    this.customThemes = this.customThemes.filter(t => t.id !== themeId);
    localStorage.setItem('sw_custom_themes', JSON.stringify(this.customThemes));

    if (this.currentTheme === themeId) {
      this.applyTheme('dark');
    }

    this.renderThemes();
    this.app.showToast('Tema eliminato');
  }

  exportTheme() {
    const vals = this.getCustomValues();
    const name = document.getElementById('theme-custom-name').value.trim() || 'custom_theme';
    const themeData = {
      name: name,
      colors: {
        bgPrimary: vals.bgPrimary,
        bgSecondary: vals.bgSecondary,
        accent: vals.accent,
        accentSecondary: vals.accentSecondary,
        textPrimary: vals.textPrimary,
        textSecondary: vals.textSecondary
      }
    };

    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nekotune-theme-${name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.app.showToast('Tema esportato!');
  }

  importTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.name && data.colors) {
            document.getElementById('theme-custom-name').value = data.name;
            document.getElementById('theme-bg-primary').value = data.colors.bgPrimary || '#0a0a0f';
            document.getElementById('theme-bg-secondary').value = data.colors.bgSecondary || '#12121a';
            document.getElementById('theme-accent').value = data.colors.accent || '#6c5ce7';
            document.getElementById('theme-accent-secondary').value = data.colors.accentSecondary || '#a29bfe';
            document.getElementById('theme-text-primary').value = data.colors.textPrimary || '#ffffff';
            document.getElementById('theme-text-secondary').value = data.colors.textSecondary || '#8b8b9e';

            this.previewCustomTheme();
            this.app.showToast('Tema importato! Clicca "Salva" per salvarlo.');
          }
        } catch (err) {
          this.app.showToast('File JSON non valido');
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  lighten(hex, amount) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, r + amount);
    g = Math.min(255, g + amount);
    b = Math.min(255, b + amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  darken(hex, amount) {
    return this.lighten(hex, -amount);
  }
}

export default ThemeManager;

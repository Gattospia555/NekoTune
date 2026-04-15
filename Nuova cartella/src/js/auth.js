import './supabaseClient.js';

export class AuthManager {
  constructor() {
    this.user = null;
    this.db = document.supabase;
    this.init();
  }

  async init() {
    this.injectAuthUI();
    this.bindEvents();

    // Check existing session
    try {
      const { data: { session }, error } = await this.db.auth.getSession();
      if (session) {
        await this.handleLoginSuccess(session.user);
      }
    } catch (e) {
      console.error('Supabase session check error', e);
    }

    // Listen for auth changes
    this.db.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await this.handleLoginSuccess(session.user);
      } else if (event === 'SIGNED_OUT') {
        this.handleLogout();
      }
    });
  }

  showModal() {
    const m = document.getElementById('auth-modal-wrapper');
    if (m) {
      m.style.display = 'flex';
    }
  }

  hideModal() {
    const m = document.getElementById('auth-modal-wrapper');
    if (m) {
      m.style.display = 'none';
    }
  }

  injectAuthUI() {
    // Remove any old auth-modal that uses the broken modal-overlay class
    const oldModal = document.getElementById('auth-modal');
    if (oldModal) oldModal.remove();

    // Only inject if not already present
    if (document.getElementById('auth-modal-wrapper')) return;

    // Create a completely standalone modal with ZERO CSS class dependencies
    const wrapper = document.createElement('div');
    wrapper.id = 'auth-modal-wrapper';
    wrapper.style.cssText = `
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      opacity: 1;
      pointer-events: auto;
    `;

    wrapper.innerHTML = `
      <div style="
        background: var(--bg-secondary, #1e1e2e);
        padding: 32px;
        border-radius: 16px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        border: 1px solid var(--border, rgba(255,255,255,0.1));
        position: relative;
        text-align: center;
      ">
        <div style="margin-bottom: 30px; position: relative;">
          <h2 style="font-size: 1.5rem; margin: 0 auto; color: var(--text-primary, #fff);">Accedi a Nekotune</h2>
          <button id="btn-close-auth-new" style="
            position: absolute; right: 0; top: -4px;
            background: transparent; border: none;
            color: var(--text-secondary, #aaa);
            cursor: pointer; font-size: 24px; line-height: 1;
            padding: 4px;
          ">✕</button>
        </div>
        
        <div style="text-align: left; margin-bottom: 15px;">
          <label style="display:block; margin-bottom: 5px; font-size: 0.85rem; color: var(--text-secondary, #aaa);">Email</label>
          <input type="email" id="auth-email" placeholder="nome@esempio.com" style="
            width: 100%; padding: 10px 14px; border-radius: 8px;
            border: 1px solid var(--border, rgba(255,255,255,0.15));
            background: var(--bg-tertiary, #2a2a3e);
            color: var(--text-primary, #fff); font-size: 0.95rem;
            outline: none; box-sizing: border-box;
          " />
        </div>
        <div style="text-align: left; margin-bottom: 25px;">
          <label style="display:block; margin-bottom: 5px; font-size: 0.85rem; color: var(--text-secondary, #aaa);">Password</label>
          <input type="password" id="auth-password" placeholder="••••••••" style="
            width: 100%; padding: 10px 14px; border-radius: 8px;
            border: 1px solid var(--border, rgba(255,255,255,0.15));
            background: var(--bg-tertiary, #2a2a3e);
            color: var(--text-primary, #fff); font-size: 0.95rem;
            outline: none; box-sizing: border-box;
          " />
        </div>

        <div style="display: flex; gap: 10px;">
          <button id="btn-auth-register" style="
            flex: 1; padding: 10px 16px; border-radius: 8px;
            border: 1px solid var(--border, rgba(255,255,255,0.15));
            background: transparent;
            color: var(--text-primary, #fff);
            cursor: pointer; font-size: 0.95rem; font-weight: 500;
          ">Registrati</button>
          <button id="btn-auth-login" style="
            flex: 1; padding: 10px 16px; border-radius: 8px;
            border: none;
            background: var(--accent, #ff6b35);
            color: #fff;
            cursor: pointer; font-size: 0.95rem; font-weight: 600;
          ">Accedi</button>
        </div>
        
        <p id="auth-error-msg" style="color: #ff4d4d; margin-top: 15px; font-size: 0.85rem; min-height: 20px;"></p>
      </div>
    `;

    document.body.appendChild(wrapper);

    // Close button
    document.getElementById('btn-close-auth-new').addEventListener('click', () => {
      this.hideModal();
    });

    // Close on backdrop click
    wrapper.addEventListener('click', (e) => {
      if (e.target === wrapper) {
        this.hideModal();
      }
    });
  }

  showError(msg) {
    const errorEl = document.getElementById('auth-error-msg');
    if (errorEl) errorEl.textContent = msg;
  }

  bindEvents() {
    const avatarBtn = document.getElementById('user-avatar');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    const btnDropdownLogin = document.getElementById('btn-dropdown-login');
    const btnDropdownLogout = document.getElementById('btn-dropdown-logout');

    // Close dropdown when clicking outside
    if (avatarBtn && profileDropdown) {
      document.addEventListener('click', (e) => {
        if (!avatarBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
          profileDropdown.style.display = 'none';
        }
      });
    }

    // "Accedi" button in dropdown opens modal
    if (btnDropdownLogin) {
      btnDropdownLogin.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (profileDropdown) {
          profileDropdown.style.display = 'none';
        }
        
        this.showModal();
      });
    }

    if (btnDropdownLogout) {
      btnDropdownLogout.addEventListener('click', async () => {
         profileDropdown.style.display = 'none';
         const confirmLogout = confirm("Vuoi disconnetterti?");
         if (confirmLogout) {
           await this.db.auth.signOut();
         }
      });
    }

    // Login button
    const btnLogin = document.getElementById('btn-auth-login');
    if (btnLogin) {
      btnLogin.addEventListener('click', async () => {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        if (!email || !password) return this.showError('Inserisci email e password.');
        this.showError('Accesso in corso...');
        const { error } = await this.db.auth.signInWithPassword({ email, password });
        if (error) this.showError(error.message);
        else {
          this.showError('');
          this.hideModal();
        }
      });
    }

    // Register button
    const btnRegister = document.getElementById('btn-auth-register');
    if (btnRegister) {
      btnRegister.addEventListener('click', async () => {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        if (!email || !password) return this.showError('Inserisci email e password.');
        this.showError('Registrazione in corso...');
        const { data, error } = await this.db.auth.signUp({ email, password });
        if (error) this.showError(error.message);
        else {
          if (data.user && data.user.identities && data.user.identities.length === 0) {
            this.showError("L'indirizzo email è già registrato.");
          } else {
            this.showError("Registrazione avvenuta! Sei dentro.");
            setTimeout(() => { this.hideModal(); }, 1500);
          }
        }
      });
    }
  }

  async handleLoginSuccess(user) {
    this.user = user;
    
    // Check if profile exists
    const { data: profile } = await this.db.from('users_profiles').select('*').eq('id', user.id).single();
    
    if (!profile) {
      let username = user.email.split('@')[0];
      await this.db.from('users_profiles').insert({
        id: user.id,
        username: username,
      });
    }

    this.updateTopbarUI(user);
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user } }));
  }

  handleLogout() {
    this.user = null;
    this.updateTopbarUI(null);
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: null } }));
  }

  updateTopbarUI(user) {
    const btnDropdownLogin = document.getElementById('btn-dropdown-login');
    const btnDropdownLogout = document.getElementById('btn-dropdown-logout');
    const btnDropdownProfile = document.getElementById('btn-dropdown-profile');
    const dropdownUserInfo = document.getElementById('dropdown-user-info');
    const dropdownUsername = document.getElementById('dropdown-username');

    if (user) {
       if (btnDropdownLogin) btnDropdownLogin.style.display = 'none';
       if (btnDropdownLogout) btnDropdownLogout.style.display = 'flex';
       if (btnDropdownProfile) btnDropdownProfile.style.display = 'flex';
       
       if (dropdownUserInfo && dropdownUsername) {
         dropdownUserInfo.style.display = 'block';
         dropdownUsername.textContent = user.user_metadata?.full_name || user.email.split('@')[0];
       }
    } else {
       if (btnDropdownLogin) btnDropdownLogin.style.display = 'flex';
       if (btnDropdownLogout) btnDropdownLogout.style.display = 'none';
       if (btnDropdownProfile) btnDropdownProfile.style.display = 'none';
       
       if (dropdownUserInfo) {
         dropdownUserInfo.style.display = 'none';
       }
    }
  }
}

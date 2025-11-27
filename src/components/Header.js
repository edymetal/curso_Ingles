import { store } from '../state/store.js';

export function Header() {
    const element = document.createElement('header');
    element.className = 'top-bar';
    element.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background-color: var(--color-background);
    border-bottom: 2px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
  `;

    const update = (state) => {
        element.innerHTML = `
      <div style="display: flex; gap: var(--spacing-md);">
        <!-- Flag / Language (Static for now) -->
        <div style="font-weight: bold; color: var(--color-text-light);">🇺🇸 EN</div>
      </div>
      
      <div style="display: flex; gap: var(--spacing-md);">
        <!-- Streak -->
        <div style="display: flex; align-items: center; color: var(--color-warning-dark); font-weight: bold;">
          <span style="margin-right: 4px;">🔥</span> ${state.streak}
        </div>
        
        <!-- Hearts -->
        <div style="display: flex; align-items: center; color: var(--color-danger); font-weight: bold;">
          <span style="margin-right: 4px;">❤️</span> ${state.hearts}
        </div>

        <!-- XP -->
        <div style="display: flex; align-items: center; color: var(--color-warning); font-weight: bold;">
          <span style="margin-right: 4px;">⚡</span> ${state.xp}
        </div>
      </div>
    `;
    };

    // Initial render
    update(store.getState());

    // Subscribe to changes
    store.subscribe(update);

    return element;
}

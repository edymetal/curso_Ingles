import { unitsData } from '../data/units.js';
import { store } from '../state/store.js';

export function Path() {
  const container = document.createElement('div');
  container.className = 'path-container';
  container.style.cssText = `
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl) var(--spacing-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
  `;

  unitsData.forEach(unit => {
    // Unit Header
    const unitHeader = document.createElement('div');
    unitHeader.style.cssText = `
      width: 100%;
      background-color: ${unit.color};
      color: white;
      padding: var(--spacing-md);
      border-radius: var(--radius-lg);
      margin-bottom: var(--spacing-lg);
      text-align: center;
    `;
    unitHeader.innerHTML = `
      <h2 style="margin-bottom: var(--spacing-xs);">${unit.title}</h2>
      <p style="opacity: 0.9;">${unit.description}</p>
    `;
    container.appendChild(unitHeader);

    // Levels
    unit.levels.forEach((level, index) => {
      const levelNode = document.createElement('div');
      const isCompleted = store.getState().completedLevels.includes(level.id);
      const isCurrent = !isCompleted && (index === 0 || store.getState().completedLevels.includes(unit.levels[index - 1].id));
      const isLocked = !isCompleted && !isCurrent;

      // Sine wave positioning logic (simplified)
      const offset = Math.sin(index) * 60;

      levelNode.className = 'level-node';
      levelNode.style.cssText = `
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: ${isCompleted ? 'var(--color-warning)' : (isCurrent ? unit.color : 'var(--color-border)')};
        border-bottom: 4px solid ${isCompleted ? 'var(--color-warning-dark)' : (isCurrent ? 'var(--color-primary-dark)' : '#ccc')};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: ${isLocked ? 'default' : 'pointer'};
        transform: translateX(${offset}px);
        transition: transform 0.2s;
        z-index: 2;
      `;

      if (isCurrent) {
        // Add a "crown" or highlight for current level
        levelNode.style.boxShadow = '0 0 0 8px rgba(88, 204, 2, 0.2)';
      }

      levelNode.innerHTML = `
        <span style="font-size: 32px;">
          ${level.type === 'chest' ? '🎁' : (level.type === 'story' ? '📖' : (level.type === 'trophy' ? '🏆' : '★'))}
        </span>
      `;

      levelNode.onclick = () => {
        if (!isLocked) {
          console.log(`Clicked level ${level.id}`);
          // TODO: Trigger navigation to exercise
          // For now, just log it.
          // We will implement a global event or callback for navigation.
          const viewType = level.type === 'story' ? 'story' : 'exercise';
          window.dispatchEvent(new CustomEvent('navigate', { detail: { view: viewType, levelId: level.id } }));
        }
      };

      container.appendChild(levelNode);
    });
  });

  return container;
}

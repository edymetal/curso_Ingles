import { Header } from './components/Header.js';
import { Path } from './components/Path.js';
import { Exercise } from './components/Exercise.js';
import { Story } from './components/Story.js';

export function App() {
    const appContainer = document.createElement('div');
    appContainer.className = 'app-container';
    appContainer.style.cssText = `
    max-width: 480px;
    margin: 0 auto;
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  `;

    // State
    let currentView = 'path'; // 'path', 'exercise', 'story'
    let currentLevelId = null;

    // Render Function
    const render = () => {
        appContainer.innerHTML = '';

        if (currentView === 'path') {
            appContainer.appendChild(Header());
            appContainer.appendChild(Path());
        } else if (currentView === 'exercise') {
            // Header for exercise (can be different, but using same for now or just back button inside component)
            // For now, Exercise component handles its own header/layout or we wrap it.
            // Let's just render Exercise, it has its own internal structure.
            appContainer.appendChild(Exercise(currentLevelId));
        } else if (currentView === 'story') {
            appContainer.appendChild(Story(currentLevelId));
        }
    };

    // Event Listeners for Navigation
    window.addEventListener('navigate', (e) => {
        const { view, levelId } = e.detail;
        currentView = view;
        currentLevelId = levelId || null;
        render();
    });

    // Initial Render
    render();

    return appContainer;
}

import { Header } from './src/components/Header.js';
import { Path } from './src/components/Path.js';
import { Exercise } from './src/components/Exercise.js';
import { Story } from './src/components/Story.js';
import { store } from './src/state/store.js';

const app = document.querySelector('#app');

// View Container
const viewContainer = document.createElement('div');
viewContainer.style.cssText = `
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

// Initialize App
function init() {
    app.innerHTML = '';

    // Add Header
    app.appendChild(Header());

    // Add View Container
    app.appendChild(viewContainer);

    // Render Initial View (Path)
    renderPath();
}

function renderPath() {
    viewContainer.innerHTML = '';
    viewContainer.appendChild(Path());
}

function renderExercise(levelId) {
    viewContainer.innerHTML = '';
    viewContainer.appendChild(Exercise(levelId));
}

function renderStory(storyId) {
    viewContainer.innerHTML = '';
    viewContainer.appendChild(Story(storyId));
}

// Navigation Event Listener
window.addEventListener('navigate', (e) => {
    const { view, levelId } = e.detail;
    if (view === 'exercise') {
        renderExercise(levelId);
    } else if (view === 'story') {
        renderStory(levelId);
    } else if (view === 'path') {
        renderPath();
    }
});

init();

import { storiesData } from '../data/stories.js';
import { store } from '../state/store.js';

export function Story(storyId) {
    const story = storiesData[storyId];
    let currentIndex = 0;

    const container = document.createElement('div');
    container.className = 'story-container';
    container.style.cssText = `
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-md);
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    overflow-y: auto;
  `;

    if (!story) {
        container.innerHTML = `<p>Story not found.</p><button class="btn btn-secondary" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }))">Voltar</button>`;
        return container;
    }

    const header = document.createElement('div');
    header.innerHTML = `<h2 style="text-align: center; margin-bottom: 20px;">${story.title}</h2>`;
    container.appendChild(header);

    const contentArea = document.createElement('div');
    contentArea.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-bottom: 100px;
  `;
    container.appendChild(contentArea);

    const footer = document.createElement('div');
    footer.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: white;
    border-top: 2px solid #e5e5e5;
    display: flex;
    justify-content: center;
  `;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'Continuar';
    nextBtn.style.width = '100%';
    nextBtn.style.maxWidth = '400px';
    footer.appendChild(nextBtn);
    container.appendChild(footer);

    const renderLine = () => {
        if (currentIndex >= story.lines.length) {
            // Story Complete
            store.completeLevel(storyId);
            store.addXp(20);
            window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }));
            return;
        }

        const line = story.lines[currentIndex];

        if (line.type === 'dialogue') {
            const bubble = document.createElement('div');
            const charColor = story.characters[line.character]?.color || '#ccc';
            bubble.style.cssText = `
        padding: 15px;
        border-radius: 15px;
        background-color: ${charColor}20; /* 20% opacity */
        border: 2px solid ${charColor};
        align-self: ${line.character === 'Vikram' ? 'flex-start' : 'flex-end'};
        max-width: 80%;
        animation: fadeIn 0.5s;
      `;
            bubble.innerHTML = `
        <strong style="color: ${charColor};">${line.character}</strong><br>
        ${line.text}
      `;
            contentArea.appendChild(bubble);

            // Auto scroll
            bubble.scrollIntoView({ behavior: 'smooth' });

            currentIndex++;
        } else if (line.type === 'question') {
            // Pause for question
            nextBtn.style.display = 'none';

            const questionBox = document.createElement('div');
            questionBox.style.cssText = `
        background: #f7f7f7;
        padding: 20px;
        border-radius: 15px;
        margin-top: 20px;
        animation: fadeIn 0.5s;
      `;

            const prompt = document.createElement('h3');
            prompt.textContent = line.prompt;
            questionBox.appendChild(prompt);

            line.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.textContent = opt;
                btn.className = 'btn btn-outline';
                btn.style.cssText = `
          display: block;
          width: 100%;
          margin-top: 10px;
          text-align: left;
        `;
                btn.onclick = () => {
                    if (opt === line.correctAnswer) {
                        btn.className = 'btn btn-primary';
                        setTimeout(() => {
                            questionBox.remove();
                            nextBtn.style.display = 'block';
                            currentIndex++;
                            renderLine(); // Continue immediately after correct answer
                        }, 1000);
                    } else {
                        btn.className = 'btn btn-danger';
                        store.loseHeart();
                    }
                };
                questionBox.appendChild(btn);
            });

            contentArea.appendChild(questionBox);
            questionBox.scrollIntoView({ behavior: 'smooth' });
            return; // Stop here until answered
        }
    };

    nextBtn.onclick = renderLine;

    // Start
    renderLine();

    return container;
}

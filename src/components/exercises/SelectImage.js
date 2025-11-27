export function SelectImage(question, onSelect) {
  console.log('Initializing SelectImage for:', question.id);
  const container = document.createElement('div');
  container.style.width = '100%';

  const prompt = document.createElement('h2');
  prompt.textContent = question.prompt;
  prompt.className = 'exercise-prompt';
  container.appendChild(prompt);

  const grid = document.createElement('div');
  grid.className = 'option-grid';

  let selectedCard = null;

  question.options.forEach(option => {
    const card = document.createElement('div');
    card.className = 'option-card';

    card.innerHTML = `
          <img src="${option.image}" alt="${option.text}" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px;">
          <span style="font-weight: bold; color: var(--color-text-light); font-size: 18px;">${option.text}</span>
        `;

    card.onclick = () => {
      console.log('Card clicked:', option.text);

      // Remove from previous
      if (selectedCard) {
        selectedCard.classList.remove('selected');
        selectedCard.style.borderColor = '';
        selectedCard.style.backgroundColor = '';
      }

      // Set new
      selectedCard = card;
      card.classList.add('selected');

      // Force style just in case CSS fails
      card.style.borderColor = '#1cb0f6';
      card.style.backgroundColor = 'rgba(28, 176, 246, 0.2)';

      onSelect(option);
    };

    grid.appendChild(card);
  });

  container.appendChild(grid);
  return container;
}

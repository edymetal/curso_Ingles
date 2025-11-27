import mascotImg from '../../assets/mascot.png';

export function Translate(question, onCheck) {
  const container = document.createElement('div');
  container.style.width = '100%';

  const prompt = document.createElement('h2');
  prompt.textContent = question.prompt;
  prompt.className = 'exercise-prompt';
  container.appendChild(prompt);

  // Audio Button (if listening)
  if (question.mode === 'listening') {
    const audioBtn = document.createElement('button');
    audioBtn.className = 'btn btn-secondary';
    audioBtn.innerHTML = '🔊';
    audioBtn.style.cssText = `
      width: 80px;
      height: 80px;
      border-radius: 20px;
      font-size: 32px;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
    `;
    audioBtn.onclick = () => {
      // Play audio (mock)
      const utterance = new SpeechSynthesisUtterance(question.textToRead);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    };
    container.appendChild(audioBtn);
  } else {
    // Text to translate
    const textDisplay = document.createElement('div');
    textDisplay.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
             <img src="${mascotImg}" style="width: 60px; height: 60px; object-fit: contain;">
             <div style="background: white; border: 2px solid #e5e5e5; padding: 15px 25px; border-radius: 20px; font-size: 19px; color: var(--color-text); position: relative;">
               ${question.textToRead}
               <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid #e5e5e5;"></div>
               <div style="position: absolute; left: -7px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid white;"></div>
             </div>
          </div>
    `;
    container.appendChild(textDisplay);
  }

  // Input Area
  const input = document.createElement('textarea');
  input.placeholder = 'Escreva em Inglês...';
  input.className = 'translate-input';

  input.oninput = () => {
    onCheck(input.value);
  };

  container.appendChild(input);

  return container;
}

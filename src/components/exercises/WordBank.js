import mascotImg from '../../assets/mascot.png';

export function WordBank(question, onCheck) {
    const container = document.createElement('div');
    container.style.width = '100%';

    const prompt = document.createElement('h2');
    prompt.textContent = question.prompt;
    prompt.className = 'exercise-prompt';
    container.appendChild(prompt);

    if (question.originalText) {
        const original = document.createElement('div');
        original.innerHTML = `
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
             <img src="${mascotImg}" style="width: 60px; height: 60px; object-fit: contain;">
             <div style="background: white; border: 2px solid #e5e5e5; padding: 15px 25px; border-radius: 20px; font-size: 19px; color: var(--color-text); position: relative;">
               ${question.originalText}
               <div style="position: absolute; left: -10px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid #e5e5e5;"></div>
               <div style="position: absolute; left: -7px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid white;"></div>
             </div>
          </div>
        `;
        container.appendChild(original);
    }

    // Answer Area
    const answerArea = document.createElement('div');
    answerArea.className = 'word-slot-area';
    container.appendChild(answerArea);

    // Word Bank
    const bankArea = document.createElement('div');
    bankArea.className = 'word-bank-area';
    container.appendChild(bankArea);

    let currentAnswer = [];

    const updateState = () => {
        // Re-render answer area
        answerArea.innerHTML = '';
        currentAnswer.forEach((word, index) => {
            const btn = createWordButton(word, () => {
                // Remove from answer, return to bank
                currentAnswer.splice(index, 1);
                updateState();
            });
            answerArea.appendChild(btn);
        });

        // Re-render bank area
        bankArea.innerHTML = '';

        // Map usage
        const usedIndices = [];
        currentAnswer.forEach(ansWord => {
            const bankIndex = question.words.findIndex((w, i) => w === ansWord && !usedIndices.includes(i));
            if (bankIndex !== -1) usedIndices.push(bankIndex);
        });

        question.words.forEach((word, index) => {
            const isUsed = usedIndices.includes(index);
            const btn = createWordButton(word, () => {
                if (!isUsed) {
                    currentAnswer.push(word);
                    updateState();
                }
            });

            if (isUsed) {
                btn.classList.add('ghost');
            }

            bankArea.appendChild(btn);
        });

        // Notify parent of current answer
        onCheck(currentAnswer);
    };

    function createWordButton(text, onClick) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = 'word-chip';
        btn.onclick = onClick;
        return btn;
    }

    updateState();

    return container;
}

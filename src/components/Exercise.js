import { exercisesData } from '../data/exercises.js';
import { store } from '../state/store.js';
import { SelectImage } from './exercises/SelectImage.js';
import { MatchPairs } from './exercises/MatchPairs.js';
import { WordBank } from './exercises/WordBank.js';
import { Translate } from './exercises/Translate.js';

export function Exercise(levelId) {
    const questions = exercisesData[levelId] || [];
    let currentIndex = 0;
    let isChecking = false;

    const container = document.createElement('div');
    container.className = 'exercise-container';

    if (questions.length === 0) {
        container.innerHTML = `
      <div class="question-area" style="text-align: center;">
        <p style="font-size: 18px; color: var(--color-text-light); margin-bottom: 20px;">Nenhum exercício encontrado.</p>
        <button class="btn btn-secondary" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }))">Voltar</button>
      </div>
    `;
        return container;
    }

    // Header with Close Button and Progress Bar
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        color: var(--color-text-light);
        cursor: pointer;
        padding: 5px;
    `;
    closeBtn.onclick = () => {
        if (confirm('Tem certeza que deseja sair? O progresso deste exercício será perdido.')) {
            window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }));
        }
    };

    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar-container';
    progressContainer.style.flex = '1';
    progressContainer.style.marginBottom = '0'; // Override default margin

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar-fill';

    progressContainer.appendChild(progressBar);
    header.appendChild(closeBtn);
    header.appendChild(progressContainer);
    container.appendChild(header);

    // Question Area
    const questionArea = document.createElement('div');
    questionArea.className = 'question-area';
    container.appendChild(questionArea);

    // Question Counter
    const counterDisplay = document.createElement('div');
    counterDisplay.style.cssText = `
        text-align: center;
        color: var(--color-text-light);
        margin-bottom: 10px;
        font-weight: bold;
    `;
    container.insertBefore(counterDisplay, questionArea);

    // Footer (Check Button)
    const footer = document.createElement('div');
    footer.className = 'exercise-footer';

    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn btn-outline';
    skipBtn.textContent = 'Pular';
    skipBtn.onclick = () => handleNext();

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = 'Verificar';
    checkBtn.disabled = true;

    footer.appendChild(skipBtn);
    footer.appendChild(checkBtn);
    container.appendChild(footer);

    // Current Question State
    let currentSelection = null;

    const renderQuestion = () => {
        questionArea.innerHTML = '';
        const question = questions[currentIndex];
        progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
        counterDisplay.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;

        checkBtn.disabled = true;
        checkBtn.style.display = 'inline-flex';
        currentSelection = null;

        let component;
        if (question.type === 'select-image') {
            component = SelectImage(question, (selection) => {
                currentSelection = selection;
                checkBtn.disabled = false;
            });
        } else if (question.type === 'match-pairs') {
            checkBtn.style.display = 'none';
            component = MatchPairs(question, (isComplete) => {
                if (isComplete) {
                    currentSelection = true;
                    handleCheck();
                }
            });
        } else if (question.type === 'word-bank') {
            component = WordBank(question, (answer) => {
                currentSelection = answer;
                checkBtn.disabled = answer.length === 0;
            });
        } else if (question.type === 'translate') {
            component = Translate(question, (answer) => {
                currentSelection = answer;
                checkBtn.disabled = answer.trim().length === 0;
            });
        } else if (question.type === 'chest-reward') {
            checkBtn.style.display = 'none';
            component = document.createElement('div');
            component.style.textAlign = 'center';
            component.innerHTML = `
                <div style="font-size: 80px; margin: 20px 0; animation: bounce 1s infinite;">🎁</div>
                <h2 style="color: var(--color-warning); margin-bottom: 20px;">Recompensa!</h2>
                <p style="font-size: 24px; color: var(--color-text); margin-bottom: 40px;">${question.reward}</p>
                <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }))">Receber</button>
            `;
            // Auto-complete level logic could go here, but for now just let them click back.
            // Actually, we should mark it as complete when they click receive.
            const receiveBtn = component.querySelector('button');
            receiveBtn.onclick = () => {
                store.completeLevel(levelId);
                store.addXp(50); // Bonus XP
                window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }));
            };
        } else {
            component = document.createElement('div');
            component.textContent = `Tipo de questão desconhecido: ${question.type}`;
        }

        questionArea.appendChild(component);
    };

    const handleCheck = () => {
        if (isChecking) return;
        const question = questions[currentIndex];

        // Validate Answer
        let isCorrect = false;
        if (question.type === 'select-image') {
            isCorrect = currentSelection && currentSelection.isCorrect;
        } else if (question.type === 'match-pairs') {
            isCorrect = true;
        } else if (question.type === 'word-bank') {
            const answerString = currentSelection.join(' ');
            const correctString = question.correctOrder.join(' ');
            isCorrect = answerString === correctString;
        } else if (question.type === 'translate') {
            isCorrect = currentSelection.trim().toLowerCase() === question.correctAnswer.toLowerCase();
        }

        // Feedback Logic
        if (isCorrect) {
            store.addXp(10);

            const feedback = document.createElement('div');
            feedback.className = 'feedback-modal success';
            feedback.innerHTML = `
        <div class="feedback-content">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="background: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 30px;">🎉</div>
            <div style="font-size: 24px;">Excelente!</div>
          </div>
          <button class="btn btn-primary" id="next-btn">Continuar</button>
        </div>
      `;
            container.appendChild(feedback);

            footer.style.display = 'none';

            document.getElementById('next-btn').onclick = () => {
                container.removeChild(feedback);
                footer.style.display = 'flex';
                handleNext();
            };

        } else {
            store.loseHeart();

            const feedback = document.createElement('div');
            feedback.className = 'feedback-modal error';
            feedback.innerHTML = `
        <div class="feedback-content">
          <div style="display: flex; align-items: center; gap: 15px;">
             <div style="background: white; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 30px;">❌</div>
             <div style="display: flex; flex-direction: column;">
                <span style="font-size: 19px;">Solução correta:</span>
                <span style="font-size: 16px; font-weight: normal;">${question.correctAnswer || '...'}</span>
             </div>
          </div>
          <button class="btn btn-danger" id="next-btn-err">Continuar</button>
        </div>
      `;
            container.appendChild(feedback);

            footer.style.display = 'none';

            document.getElementById('next-btn-err').onclick = () => {
                container.removeChild(feedback);
                footer.style.display = 'flex';
                handleNext();
            };
        }
    };

    const handleNext = () => {
        currentIndex++;
        if (currentIndex >= questions.length) {
            store.completeLevel(levelId);
            questionArea.innerHTML = `
        <div style="text-align: center; animation: popIn 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);">
          <div style="font-size: 80px; margin-bottom: 20px;">🏆</div>
          <h2 style="color: var(--color-warning); font-size: 32px; margin-bottom: 10px;">Nível Concluído!</h2>
          <p style="font-size: 20px; color: var(--color-text-light); margin-bottom: 40px;">Você ganhou +${questions.length * 10} XP</p>
          <button class="btn btn-primary" style="width: 100%; max-width: 300px;" onclick="window.dispatchEvent(new CustomEvent('navigate', { detail: { view: 'path' } }))">Continuar</button>
        </div>
      `;
            footer.style.display = 'none';
            progressBar.style.width = '100%';
        } else {
            currentSelection = null;
            checkBtn.disabled = true;
            checkBtn.style.display = 'inline-flex';
            renderQuestion();
        }
    };

    checkBtn.onclick = handleCheck;

    renderQuestion();

    return container;
}

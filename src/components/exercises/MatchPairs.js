export function MatchPairs(question, onComplete) {
    const container = document.createElement('div');
    container.style.width = '100%';

    const prompt = document.createElement('h2');
    prompt.textContent = question.prompt;
    prompt.className = 'exercise-prompt';
    container.appendChild(prompt);

    const columnsContainer = document.createElement('div');
    columnsContainer.style.cssText = `
        display: flex;
        gap: 20px;
        justify-content: space-between;
        width: 100%;
    `;

    const leftColumn = document.createElement('div');
    leftColumn.style.cssText = 'display: flex; flex-direction: column; gap: 10px; flex: 1;';

    const rightColumn = document.createElement('div');
    rightColumn.style.cssText = 'display: flex; flex-direction: column; gap: 10px; flex: 1;';

    // Prepare items
    let leftItems = question.pairs.map((pair, index) => ({
        id: `left-${index}`,
        text: pair.to, // Portuguese
        type: 'left',
        pairId: index
    }));

    let rightItems = question.pairs.map((pair, index) => ({
        id: `right-${index}`,
        text: pair.from, // English
        type: 'right',
        pairId: index
    }));

    // Fisher-Yates Shuffle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffle independently and ensure they don't perfectly align
    // (unless there's only 1 pair, which shouldn't happen)
    if (question.pairs.length > 1) {
        let attempts = 0;
        do {
            shuffleArray(leftItems);
            shuffleArray(rightItems);
            attempts++;
        } while (
            leftItems.every((item, index) => item.pairId === rightItems[index].pairId) &&
            attempts < 10
        );
    } else {
        shuffleArray(leftItems);
        shuffleArray(rightItems);
    }

    let selectedLeft = null;
    let selectedRight = null;
    let matchedCount = 0;
    const totalPairs = question.pairs.length;

    const handleSelection = (btn, item) => {
        if (btn.disabled) return;

        // If clicking same item, deselect
        if ((item.type === 'left' && selectedLeft === btn) || (item.type === 'right' && selectedRight === btn)) {
            btn.className = 'btn btn-outline';
            btn.style.width = '100%';
            if (item.type === 'left') selectedLeft = null;
            else selectedRight = null;
            return;
        }

        // Select new item
        btn.className = 'btn btn-secondary'; // Blue highlight
        btn.style.width = '100%';

        if (item.type === 'left') {
            if (selectedLeft) {
                selectedLeft.className = 'btn btn-outline'; // Deselect previous left
                selectedLeft.style.width = '100%';
            }
            selectedLeft = btn;
        } else {
            if (selectedRight) {
                selectedRight.className = 'btn btn-outline'; // Deselect previous right
                selectedRight.style.width = '100%';
            }
            selectedRight = btn;
        }

        // Check match if both sides selected
        if (selectedLeft && selectedRight) {
            const leftId = parseInt(selectedLeft.dataset.pairId);
            const rightId = parseInt(selectedRight.dataset.pairId);

            if (leftId === rightId) {
                // Match!
                selectedLeft.className = 'btn btn-primary';
                selectedRight.className = 'btn btn-primary';
                selectedLeft.disabled = true;
                selectedRight.disabled = true;
                selectedLeft = null;
                selectedRight = null;
                matchedCount++;

                if (matchedCount === totalPairs) {
                    onComplete(true);
                }
            } else {
                // Mismatch
                selectedLeft.className = 'btn btn-danger';
                selectedRight.className = 'btn btn-danger';

                const tempLeft = selectedLeft;
                const tempRight = selectedRight;
                selectedLeft = null;
                selectedRight = null;

                setTimeout(() => {
                    tempLeft.className = 'btn btn-outline';
                    tempLeft.style.width = '100%';
                    tempRight.className = 'btn btn-outline';
                    tempRight.style.width = '100%';
                }, 1000);
            }
        }
    };

    const createButton = (item) => {
        const btn = document.createElement('button');
        btn.textContent = item.text;
        btn.className = 'btn btn-outline';
        btn.style.width = '100%';
        btn.style.minHeight = '60px';
        btn.dataset.pairId = item.pairId;

        btn.onclick = () => handleSelection(btn, item);
        return btn;
    };

    leftItems.forEach(item => leftColumn.appendChild(createButton(item)));
    rightItems.forEach(item => rightColumn.appendChild(createButton(item)));

    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);
    container.appendChild(columnsContainer);

    return container;
}

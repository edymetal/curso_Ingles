const initialState = {
    hearts: 5,
    maxHearts: 5,
    xp: 0,
    streak: 1,
    currentUnitIndex: 0,
    completedLevels: [], // Array of level IDs
    currentLevelId: null, // The level currently being played
};

class Store {
    constructor() {
        // Load from local storage or use initial state
        const saved = localStorage.getItem('english-course-state');
        this.state = saved ? JSON.parse(saved) : { ...initialState };
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
        this.save();
    }

    save() {
        localStorage.setItem('english-course-state', JSON.stringify(this.state));
    }

    // Actions
    loseHeart() {
        if (this.state.hearts > 0) {
            this.state.hearts--;
            this.notify();
        }
    }

    gainHeart() {
        if (this.state.hearts < this.state.maxHearts) {
            this.state.hearts++;
            this.notify();
        }
    }

    addXp(amount) {
        this.state.xp += amount;
        this.notify();
    }

    completeLevel(levelId) {
        if (!this.state.completedLevels.includes(levelId)) {
            this.state.completedLevels.push(levelId);
            this.notify();
        }
    }

    resetProgress() {
        this.state = { ...initialState };
        this.notify();
    }
}

export const store = new Store();

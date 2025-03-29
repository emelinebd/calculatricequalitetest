export class CalculatorRepository {
    constructor() {
        this.history = [];
    }
    
    addToHistory(a, operator, b, result) {
        this.history.push({ a, operator, b, result });
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
}

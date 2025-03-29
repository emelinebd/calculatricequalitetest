import { CalculatorRepository } from "./calculator.repository.js";

export class CalculatorService {
    constructor(repository = new CalculatorRepository()) {
        this.repository = repository;
    }

    add(a, b) {
        const result = a + b;
        this.repository.addToHistory(a, "+", b, result);
        return result;
    }

    subtract(a, b) {
        const result = a - b;
        this.repository.addToHistory(a, "-", b, result);
        return result;
    }

    multiply(a, b) {
        const result = a * b;
        this.repository.addToHistory(a, "*", b, result);
        return result;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        const result = a / b;
        this.repository.addToHistory(a, "/", b, result);
        return result;
    }

    getHistory() {
        return this.repository.getHistory();
    }

    clearHistory() {
        this.repository.clearHistory();
    }
}

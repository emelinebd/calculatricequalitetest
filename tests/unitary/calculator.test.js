import { describe, it, expect, beforeEach, vi } from "vitest";
import { CalculatorService } from "../../src/calculator.service.js";
import { CalculatorRepository } from "../../src/calculator.repository.js";

vi.mock("../../src/calculator.repository.js", () => {
    return {
      CalculatorRepository: vi.fn().mockImplementation(() => {
        return {
          history: [],
          addToHistory: vi.fn(function(a, operator, b, result) {
            this.history.push({ a, operator, b, result });
          }),
          getHistory: vi.fn(function() {
            return this.history;
          }),
          clearHistory: vi.fn(function() {
            this.history = [];
          }),
        };
      }),
    };
});

describe("CalculatorService", () => {
    let calculator;

    beforeEach(() => {
        calculator = new CalculatorService();
    });

    it("should correctly add 1 + 1", () => {
        const result = calculator.add(1, 1);
        expect(result).toBe(2);
    });

    it("should correctly subtract 5 - 3", () => {
        const result = calculator.subtract(5, 3);
        expect(result).toBe(2);
    });

    it("should correctly subtract 3 - 5", () => {
        const result = calculator.subtract(3, 5);
        expect(result).toBe(-2);
    });

    it("should correctly subtract 5 - 0", () => {
        const result = calculator.subtract(5, 0);
        expect(result).toBe(5);
    });

    it("should correctly multiply 2 * 3", () => {
        const result = calculator.multiply(2, 3);
        expect(result).toBe(6);
    });

    it("should correctly multiply 5 * 0", () => {
        const result = calculator.multiply(5, 0);
        expect(result).toBe(0);
    });

    it("should correctly multiply -2 * 3", () => {
        const result = calculator.multiply(-2, 3);
        expect(result).toBe(-6);
    });

    it("should correctly multiply -2 * -3", () => {
        const result = calculator.multiply(-2, -3);
        expect(result).toBe(6);
    });

    it("should correctly divide 6 / 2", () => {
        const result = calculator.divide(6, 2);
        expect(result).toBe(3);
    });

    it("should throw an error when dividing by 0", () => {
        expect(() => calculator.divide(10, 0)).toThrowError("Cannot divide by zero");
    });

    it("should correctly divide -6 / 2", () => {
        const result = calculator.divide(-6, 2);
        expect(result).toBe(-3);
    });

    it("should correctly divide -6 / -2", () => {
        const result = calculator.divide(-6, -2);
        expect(result).toBe(3);
    });

});

describe("CalculatorService with history", () => {
    let calculatorService;
    let repositoryMock;

    beforeEach(() => {
        repositoryMock = new CalculatorRepository();
        calculatorService = new CalculatorService(repositoryMock);
    });

    it("should correctly add 1 + 1", () => {
        const result = calculatorService.add(1, 1);
        expect(result).toBe(2);
    });

    it("should correctly subtract 5 - 3", () => {
        const result = calculatorService.subtract(5, 3);
        expect(result).toBe(2);
    });

    it("should correctly multiply 2 * 3", () => {
        const result = calculatorService.multiply(2, 3);
        expect(result).toBe(6);
    });

    it("should correctly divide 6 / 2", () => {
        const result = calculatorService.divide(6, 2);
        expect(result).toBe(3);
    });

    it("should add result to history when performing an addition", () => {
        calculatorService.add(1, 2);
        const history = calculatorService.getHistory();
        expect(history).toHaveLength(1);
        expect(history[0]).toEqual({ a: 1, operator: "+", b: 2, result: 3 });
    });

    it("should get the correct history", () => {
        calculatorService.add(1, 2);
        calculatorService.subtract(5, 3);
        const history = calculatorService.getHistory();
        expect(history).toHaveLength(2);
        expect(history[0]).toEqual({ a: 1, operator: "+", b: 2, result: 3 });
        expect(history[1]).toEqual({ a: 5, operator: "-", b: 3, result: 2 });
    });

    it("should clear the history correctly", () => {
        calculatorService.add(1, 2);
        calculatorService.subtract(5, 3);
        calculatorService.clearHistory();
        const history = calculatorService.getHistory();
        expect(history).toHaveLength(0);
    });
});
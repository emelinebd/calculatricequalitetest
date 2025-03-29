import { describe, it, expect, beforeEach } from "vitest";
import { CalculatorService } from "../../src/calculator.service.js";

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

});
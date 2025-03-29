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

});
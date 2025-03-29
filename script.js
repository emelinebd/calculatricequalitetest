document.addEventListener("DOMContentLoaded", () => {
    let display = document.getElementById("display");
    let historyList = document.getElementById("history-list");
    let history = [];

    function appendNumber(num) {
        display.value += num;
    }

    function clearDisplay() {
        display.value = "";
    }

    function updateHistory(a, operator, b, result) {
        history.push({ a, operator, b, result });
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.a} ${entry.operator} ${entry.b} = ${entry.result}`;
            historyList.appendChild(li);
        });
    }

    function calculateResult() {
        try {
            const calculation = display.value;
            const result = eval(calculation);
            display.value = result;
            const operatorMatch = calculation.match(/[+\-*/]/);
            if (operatorMatch) {
                const operator = operatorMatch[0];
                const operands = calculation.split(operator);
                const a = parseFloat(operands[0]);
                const b = parseFloat(operands[1]);
                updateHistory(a, operator, b, result);
            }
        } catch (e) {
            console.error("Erreur dans le calcul : ", e);
            display.value = "Erreur";
        }
    }

    function clearHistory() {
        history = [];
        renderHistory();
    }

    window.appendNumber = appendNumber;
    window.clearDisplay = clearDisplay;
    window.calculateResult = calculateResult;
    window.clearHistory = clearHistory;
});

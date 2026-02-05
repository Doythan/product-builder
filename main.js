class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.numbers = [];
    }

    connectedCallback() {
        this.render();
    }

    setNumbers(numbers) {
        this.numbers = numbers;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .numbers {
                    display: flex;
                    gap: 10px;
                }
                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                }
            </style>
            <div class="numbers">
                ${this.numbers.map(number => `<div class="number" style="background-color: ${this.getColor(number)}">${number}</div>`).join('')}
            </div>
        `;
    }

    getColor(number) {
        if (number <= 10) return '#fbc400';
        if (number <= 20) return '#69c8f2';
        if (number <= 30) return '#ff7272';
        if (number <= 40) return '#aaa';
        return '#b0d840';
    }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateButton = document.getElementById('generate');
const lottoNumbersElement = document.querySelector('lotto-numbers');
const historyList = document.getElementById('history-list');

const history = [];

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function updateHistory(numbers) {
    history.unshift(numbers);
    if (history.length > 5) {
        history.pop();
    }

    historyList.innerHTML = '';
    history.forEach(nums => {
        const li = document.createElement('li');
        li.textContent = nums.join(', ');
        historyList.appendChild(li);
    });
}

generateButton.addEventListener('click', () => {
    const newNumbers = generateNumbers();
    lottoNumbersElement.setNumbers(newNumbers);
    updateHistory(newNumbers);
});

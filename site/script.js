let words = [];

const placeholders = Array.from(document.querySelectorAll('.letter'));
const wordList = document.getElementById('wordList');

placeholders.forEach((input, index) => {
    input.addEventListener('input', (event) => handleInput(event, index));
    input.addEventListener('keydown', (event) => handleKeys(event, index));
});

fetch('https://gist.githubusercontent.com/adufftpc/e0334c3c5706cf2d6db6ac2b5de48636/raw/e881e649dbf7320213ab1def67c6b529c9709945/gistfile1.txt')
    .then(response => response.text())
    .then(data => {
        words = data.split(/\r?\n/);
        updateWordList();
    })
    .catch(error => console.error('Error fetching words:', error));

window.addEventListener('resize', updateWordList);

function handleInput(event, index) {
    const input = event.target;
    if (input.value.length === 1 && index < placeholders.length - 1) {
        placeholders[index + 1].focus();
    }
    updateWordList();
}

function handleKeys(event, index) {
    if (event.key === 'Backspace') {
        if (placeholders[index].value === '' && index > 0) {
            placeholders[index - 1].focus();
        }
    } else if (event.key === 'ArrowLeft' && index > 0) {
        placeholders[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < placeholders.length - 1) {
        placeholders[index + 1].focus();
    }
}

function updateWordList() {
    if (placeholders.every(input => input.value === '')) {
        wordList.innerHTML = '';
        return;
    }

    const regex = buildRegex();
    const filteredWords = words.filter(word => regex.test(word));
    displayWords(filteredWords);
}

function buildRegex() {
    let regexString = "^";
    placeholders.forEach(input => {
        regexString += input.value ? input.value : ".";
    });
    regexString += "$";
    return new RegExp(regexString, 'i');
}

function displayWords(words) {
    wordList.innerHTML = '';

    const columns = calculateColumns(words.length);
    wordList.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        wordList.appendChild(li);
    });
}

function calculateColumns(wordCount) {
    const maxColumns = 6;
    const minColumns = 1;
    const maxWordsPerColumn = 10;

    let columns = Math.ceil(wordCount / maxWordsPerColumn);
    columns = Math.min(Math.max(columns, minColumns), maxColumns);

    return columns;
}

// Initialize the list on load
updateWordList();
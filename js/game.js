const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
let loop;

const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
];

// FUNÇÃO PARA CRIAR ELEMENTOS HTML DE FORMA FÁCIL
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disabled-card');

    if (disableCards.length == 20) {
        clearInterval(loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card'); 

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        // 'target.parentNode' = É O ELEMENTO 'card' ('target' É A FACE DA CARTA)
        return;
    }

    if (firstCard == '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    // DUPLICA O ARRAY DE PERSONAGENS PARA CRIAR OS PARES
    const duplicateCharacters = [ ...characters, ...characters ];

    // EMBARALHA O ARRAY DUPLICADO DE FORMA ALEATÓRIA
    const shuffeledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    // PARA CADA PERSONAGEM NO ARRAY EMBARALHADO, CRIA UMA CARTA E A ADD AO GRID
    shuffeledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card)
    })
}

const startTimer = () => {
    let totalSeconds = 0;

    loop = setInterval(() => {
        totalSeconds++; // INCREMENTA O TEMPO

        // CONVERTE O TOTAL DE SEGUNDOS PARA O FORMATO M:S
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // FORMATA OS SEGUNDOS PARA QUE SEMPRE TENHAM 2 DÍGITOS
        const formattedSeconds = String(seconds).padStart(2, '0');

        timer.innerHTML = `${minutes}:${formattedSeconds}`;
    }, 1000);
}

// FUNÇÃO PRINCIPAL QUANDO A PÁGINA TERMINA DE CARREGAR
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}
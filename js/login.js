const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    // A DESESTRUTURAÇÃO '{ target }' PEGA O ELEMENTO QUE DISPAROU O EVENTO ('input')

    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    } 

    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault(); // IMPEDE COMPORTAMENTO PADRÃO DO FORMULÁRIO (RECARREGAR A PÁGINA)

    localStorage.setItem('player', input.value);
    window.location = './pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
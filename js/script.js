const form = document.querySelector('#cadastroJogo');
const gameButton = document.querySelector('.game');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    alert('Seu Jogo foi cadastrado com sucesso!');

    form.reset();
});

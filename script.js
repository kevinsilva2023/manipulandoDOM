// manipulando cores, estilos e botoes //

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const bannerImg = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button')
const musicaInput = document.querySelector("#alternar-musica");
// criando um objeto Audio
const musica = new Audio('/assets/songs/luna-rise-part-one.mp3');

// para que se a musica acabar, voltar do começo
musica.loop = true; 
// change é usado para manipular input boolean (true or false)
musicaInput.addEventListener('change', () => {
    // paused é uma propriedade do objeto audio
    if(musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});
// elemento.addEventListener(evento, callback);
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500,
    alterarContext('foco');
    // manipulando classes
    focoBt.classList.add('active')
});
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContext('descanso-curto');
    curtoBt.classList.add('active')
});
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContext('descanso-longo');
    longoBt.classList.add('active')
});
// com isso está ficando mt repetitvo, então vamos melhorar esse codigo


function alterarContext(context) { 
    mostrarTimer();
    // criando um array para quando um botao estiver selecionado, os outros perderam a classe
    botoes.forEach(function (context) {
        context.classList.remove('active')
    });

    html.setAttribute('data-contexto', context);
    bannerImg.setAttribute('src', `/assets/img/${context}.png`);
    switch (context) {
        case "foco": 
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto": 
            titulo.innerHTML = `
            Que tal dar um respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo": 
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
            break;
        default:
            break;
    }
};

// manipulando os songs e contadores
let tempoDecorridoEmSegundos = 1500; // que seria 25 minutos em segundos
let intervalId = null;
const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('/assets/songs/play.wav');
const audioPause = new Audio('/assets/songs/pause.mp3');
const audioTimeFinaly = new Audio('/assets/songs/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const buttonPause = document.querySelector('.app__card-primary-button-wrapper img')

// faz a contagem
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTimeFinaly.play() // quando finalizar a contagem vai tocar
        zerar(); // zerando o itervalId
        return
    }
    tempoDecorridoEmSegundos -= 1

    // executando o mostrador do timer
    mostrarTimer();
}


startPauseBt.addEventListener('click', iniciarOuPausar);

// inicia ou pausa
function iniciarOuPausar() {
    if(intervalId) {
        audioPause.play();
        zerar()
        return //
    } 
    audioPlay.play();
    intervalId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    buttonPause.setAttribute('src', 'assets/img/pause.png')
}
// zerando valor do contador
function zerar() {
    clearInterval(intervalId);
    iniciarOuPausarBt.textContent = 'Começar';
    buttonPause.setAttribute('src', 'assets/img/play_arrow.png')
    intervalId = null
}

// incluindo o timer na tela
const tempoNaTela = document.querySelector('#timer');

function mostrarTimer() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); // * 1000 por ser miliseconds

    // formatando tempo com as propriedades do objeto Date
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTimer();
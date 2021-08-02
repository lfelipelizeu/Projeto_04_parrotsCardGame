const gifs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

let qtd_cartas;

while ( qtd_cartas === undefined ) {
     const qtd = Number(prompt("Com quantas cartas você quer jogar?"));

    if ( qtd>=4 && qtd<=14 && qtd%2===0 ) {
         qtd_cartas = qtd;
    }
    else {
        alert("Insira um número par entre 4 e 14!");
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let tempo = 0;
let id_interval;

function contarTempo() {
    const timer = document.querySelector(".tempo");
    
    id_interval = setInterval( function () {
        tempo++;
        timer.innerHTML = tempo;
    }, 1000 );
}

function montarJogo() {
    const baralho = [];

    for ( let i = 0; i < qtd_cartas/2; i++ ) {
        baralho.push(gifs[i]);
        baralho.push(gifs[i]);
    }

    baralho.sort(comparador);

    const jogo = document.querySelector(".conteudo");
    jogo.innerHTML = "";
    for ( let i = 0; i < qtd_cartas; i++ ) {
        jogo.innerHTML += `<div class="carta" onclick="escolherCarta(this);">
                                <div class="verso face">
                                    <img src="assets/imagens/front.png" />
                                </div>
                                <div class="frente face">
                                    <img src="assets/gifs/${baralho[i]}.gif" />
                                </div>
                            </div>`;
    }

    contarTempo();
}

montarJogo();

function girarCarta(carta) {
    carta.classList.add("girar");
}

function desgirarCarta(carta) {
    carta.classList.remove("girar");
}

let acertos = 0;
let cartas_viradas = 0;
let jogadas = 0;
let carta1;
let carta2;

function verificarAcerto(primeiro,segundo) {
    if ( primeiro.innerHTML === segundo.innerHTML ) {
        acertos++;
    }
    else {
        setTimeout(desgirarCarta, 1000, primeiro);
        setTimeout(desgirarCarta, 1000, segundo);
    }

    cartas_viradas = 0;
    carta1 = undefined;
    carta2 = undefined;

    if ( acertos === qtd_cartas/2 ){
        clearInterval(id_interval);
        setTimeout(alert, 150, `Você ganhou em ${tempo} segundos e ${jogadas} jogadas!`);
    }
}

function escolherCarta(carta) {
    if ( carta.classList.contains("girar") === false ) {
        girarCarta(carta);
        jogadas++;
        cartas_viradas++;

        if ( cartas_viradas === 2 ) {
            carta2 = carta;
            verificarAcerto(carta1,carta2);
        }
        else {
            carta1 = carta;
        }
    }
}
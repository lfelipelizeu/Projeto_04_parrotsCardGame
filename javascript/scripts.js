const baralho = Array.from(document.querySelectorAll(".carta"));

function converterBaralho() {
    let i;
    for (i = 0; i < baralho.length; i++) {
        baralho[i] = baralho[i].outerHTML;
    }
}

converterBaralho();

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

function montarJogo() {
    const cartas_exibidas = [];

    let i;
    for ( i = 0; i < qtd_cartas; i++ ) {
        cartas_exibidas.push(baralho[i]);
    }

    cartas_exibidas.sort(comparador);

    const jogo = document.querySelector(".conteudo");
    jogo.innerHTML = "";
    for ( i = 0; i < qtd_cartas; i++ ) {
        jogo.innerHTML += cartas_exibidas[i];
    }
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
}

function escolherCarta(carta) {
    if ( carta.classList.contains("girar") === false ) {
        girarCarta(carta);
        cartas_viradas++;

        if ( cartas_viradas === 2 ) {
        carta2 = carta;
        verificarAcerto(carta1,carta2);
        }
        else {
        carta1 = carta;
        }

        jogadas++;
    }
}
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
    const verso = carta.querySelector(".verso");
    const frente = carta.querySelector(".frente");
    verso.classList.add("girar");
    frente.classList.add("girar");
}
const gifs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

let qtd_cartas;
let acertos = 0;
let cartas_viradas = 0;
let jogadas = 0;
let tempo = 0;
let id_interval;

function perguntarQtdCartas (){
    while ( qtd_cartas === undefined ) {
        const qtd = Number(prompt("Com quantas cartas você quer jogar?"));
   
       if ( qtd>=4 && qtd<=14 && qtd%2===0 ) {
            qtd_cartas = qtd;
            montarJogo();
       }
       else {
           alert("Insira um número par entre 4 e 14!");
       }
   }
}

perguntarQtdCartas();

function comparador() { 
	return Math.random() - 0.5; 
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
        jogo.innerHTML += `<div class="carta">
                                <div class="verso face" onclick="escolherCarta(this)";>
                                    <img src="assets/imagens/front.png" />
                                </div>
                                <div class="frente face">
                                    <img src="assets/gifs/${baralho[i]}.gif" />
                                </div>
                            </div>`;
    }

    contarTempo();
}

function contarTempo() {
    const timer = document.querySelector(".tempo");
    
    id_interval = setInterval( function () {
        tempo++;
        timer.innerHTML = tempo;
    }, 1000 );
}

function girarCarta(carta) {
    carta.classList.toggle("girar");
}

let carta1;
let carta2;

function jogarNovamente() {
    if ( confirm("Deseja jogar novamente?") ) {
        qtd_cartas = undefined;
        acertos = 0;
        jogadas = 0;
        tempo = 0;
        perguntarQtdCartas();
    }
}

function verificarAcerto(primeiro,segundo) {
    if ( primeiro.innerHTML === segundo.innerHTML ) {
        acertos++;
    }
    else {
        setTimeout(girarCarta, 1000, primeiro);
        setTimeout(girarCarta, 1000, segundo);
    }

    cartas_viradas = 0;
    carta1 = undefined;
    carta2 = undefined;

    if ( acertos === qtd_cartas/2 ){
        clearInterval(id_interval);
        setTimeout(alert, 150, `Você ganhou em ${tempo} segundos e ${jogadas} jogadas!`);
        setTimeout(jogarNovamente, 300);
    }
}

function escolherCarta(verso) {
    /*if ( carta.classList.contains("girar") === false ) {
        girarCarta(carta);
        jogadas++;
        cartas_viradas++;*/

        const carta = verso.parentNode;
        jogadas++;
        cartas_viradas++;

        girarCarta(carta);

        if ( cartas_viradas === 2 ) {
            carta2 = carta;
            verificarAcerto(carta1,carta2);
        }
        else {
            carta1 = carta;
        }
    //}
}
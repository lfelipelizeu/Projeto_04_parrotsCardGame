let qtd_cartas;

while ( qtd_cartas === undefined ) {
     const qtd = Number(prompt("Com quantas cartas você quer jogar?"));

    if ( qtd>=4 && qtd<=14 && qtd%2===0 ) {
         qtd_cartas = qtd;
         alert(qtd_cartas);
    }
}

function girarCarta(carta) {
    const verso = carta.querySelector(".verso");
    const frente = carta.querySelector(".frente");
    verso.classList.add("girar");
    frente.classList.add("girar");
}
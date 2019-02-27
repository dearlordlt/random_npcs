/*
  Given that wining roll by two is equal to 1 damage roll
*/

let simulations = 1000;
let player1damage = 0; //11ref, 10str
let player2damage = 0; //10ref, 11str

const makeRoll = () => {
    return Math.round(Math.random() * 6 + 1) + Math.round(Math.random() * 6 + 1) + Math.round(Math.random() * 6 + 1);
}

while (simulations > 0) {
    let player1roll = makeRoll() + 1;
    let player2roll = makeRoll();

    if(player1roll - player2roll > 0) {
        player1damage += Math.floor((player1roll - player2roll)/2)
    }

    if(player2roll - player1roll > 0) {
        player2damage += Math.floor((player2roll - player1roll)/2) + 1;
    }

    simulations --;
}

console.log(`Player1 damage rolls: ${player1damage} - Player2 damage rolls ${player2damage}`);
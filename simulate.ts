import { Game } from "./Game/game";
import { Player } from "./Player/player";


function createFourPlayers(): Player[] {
    const names = ["Ben", "Jack", "Cathy", "Rose"]
    const credit = [100,200,300,400]
    let players: Player[] = []
    for (let index = 0; index < 4; index++) {
        players.push(new Player(names[index], credit[index]))
    }
    return players
}

let game = new Game(createFourPlayers())
game.start()
let winner = game.findWinner()
if (winner instanceof Array) {
    let [player, strategy] = winner
    console.log(player.name)
    for (const c of player.cards) {
        console.log("Card : ",c.value)
    }
    console.log(strategy)
}
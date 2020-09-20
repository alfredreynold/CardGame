"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./Game/game");
var player_1 = require("./Player/player");
function createFourPlayers() {
    var names = ["Ben", "Jack", "Cathy", "Rose"];
    var credit = [100, 200, 300, 400];
    var players = [];
    for (var index = 0; index < 4; index++) {
        players.push(new player_1.Player(names[index], credit[index]));
    }
    return players;
}
var game = new game_1.Game(createFourPlayers());
game.start();
var winner = game.findWinner();
if (winner instanceof Array) {
    var player = winner[0], strategy = winner[1];
    console.log(player.name);
    for (var _i = 0, _a = player.cards; _i < _a.length; _i++) {
        var c = _a[_i];
        console.log("Card : ", c.value);
    }
    console.log(strategy);
}

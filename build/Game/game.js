"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var deck_1 = require("../Deck/deck");
var rules_1 = require("./rules");
var Game = /** @class */ (function () {
    function Game(players) {
        this.players = players;
        this.deck = new deck_1.Deck();
        if (this.deck.cards.length / players.length < 3) {
            throw new Error("Player over load");
        }
        this.rules = new rules_1.Rules(players.length, 3, this.createConditions());
    }
    Game.prototype.createConditions = function () {
        var trail = new rules_1.RepeatedCardsCondition(3);
        var seqOf3 = new rules_1.SequenceCondition(3);
        var pairs = new rules_1.RepeatedCardsCondition(2);
        var topCard = new rules_1.TopCardCondition();
        return [trail, seqOf3, pairs, topCard];
    };
    Game.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    Game.prototype.start = function () {
        this.deck.shuffle();
        for (var i = 0; i < this.rules.maximumCardsPerPlayer; i++) {
            this.dealCardsTo(this.players);
        }
    };
    Game.prototype.dealCardsTo = function (players) {
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            player.addCard(this.deck.cards[this.deck.topIndex]);
            this.deck.topIndex--;
        }
    };
    Game.prototype.findWinnerByTopCard = function (condition) {
        var topCards = this.players.map(function (player, index, players) {
            return player.cards[player.cards.length - 1];
        });
        var _a = condition.compareTopCardsOfPlayers(topCards), winnerIndex = _a[0], maxValue = _a[1];
        if (winnerIndex == -1) { // Tie
            var tiePlayers = this.players.filter(function (player, index, players) {
                return player.cards[player.cards.length - 1].value === maxValue;
            });
            this.dealCardsTo(tiePlayers);
            return this.findWinnerByTopCard(condition);
        }
        return [this.players[winnerIndex], "Won by Top card"];
    };
    Game.prototype.findWinner = function () {
        for (var index = 0; index < this.rules.winCondition.length; index++) {
            var condition = this.rules.winCondition[index];
            if (index == this.rules.winCondition.length - 1) { // Last condition 
                return this.findWinnerByTopCard(condition);
            }
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                if (condition.match(player.cards)) {
                    if (index == 0) {
                        return [player, "Won by Trail"];
                    }
                    else if (index == 1) {
                        return [player, "Won by Sequence"];
                    }
                    else if (index == 2) {
                        return [player, "Won by Pairs"];
                    }
                }
            }
        }
    };
    return Game;
}());
exports.Game = Game;

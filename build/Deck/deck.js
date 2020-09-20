"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var card_1 = require("./Card/card");
var suit_1 = require("./Card/suit");
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = this.createDeck();
        this.topIndex = this.cards.length - 1;
    }
    Deck.prototype.createDeck = function () {
        var cards = [];
        for (var i = 0; i < suit_1.Suit.__LENGTH; i++) {
            var suit = suit_1.suitOf(i);
            for (var index = 0; index < 13; index++) {
                if (index == 0) {
                    cards.push(new card_1.Card(index + 1, suit, 'A'));
                }
                else if (index == 10) {
                    cards.push(new card_1.Card(index + 1, suit, 'J'));
                }
                else if (index == 11) {
                    cards.push(new card_1.Card(index + 1, suit, 'Q'));
                }
                else if (index == 12) {
                    cards.push(new card_1.Card(index + 1, suit, 'K'));
                }
                cards.push(new card_1.Card(index + 1, suit, "" + (index + 1)));
            }
        }
        return cards;
    };
    Deck.prototype.shuffle = function () {
        var i = this.cards.length, j, temp;
        if (i == 0)
            return;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    };
    return Deck;
}());
exports.Deck = Deck;

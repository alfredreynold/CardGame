"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(val, suit, character) {
        this.value = val;
        this.suit = suit;
        this.character = character;
        this.type = suit.valueOf();
    }
    return Card;
}());
exports.Card = Card;

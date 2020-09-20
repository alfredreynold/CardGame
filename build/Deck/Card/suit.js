"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suitOf = exports.Suit = void 0;
var Suit;
(function (Suit) {
    Suit[Suit["spades"] = 0] = "spades";
    Suit[Suit["hearts"] = 1] = "hearts";
    Suit[Suit["clubs"] = 2] = "clubs";
    Suit[Suit["diamonds"] = 3] = "diamonds";
    Suit[Suit["__LENGTH"] = 4] = "__LENGTH";
})(Suit = exports.Suit || (exports.Suit = {}));
function suitOf(num) {
    var suit = Suit[num];
    return Suit[suit];
}
exports.suitOf = suitOf;

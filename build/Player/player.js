"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var uuid_1 = require("uuid");
var Player = /** @class */ (function () {
    function Player(name, credit) {
        this.cards = [];
        this.name = name;
        this.credit = credit;
        this.id = uuid_1.v4();
    }
    Player.prototype.addCard = function (card) {
        this.cards.push(card);
    };
    return Player;
}());
exports.Player = Player;

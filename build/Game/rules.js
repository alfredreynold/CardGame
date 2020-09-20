"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopCardCondition = exports.SequenceCondition = exports.RepeatedCardsCondition = exports.Rules = void 0;
var Rules = /** @class */ (function () {
    function Rules(maximumPlayers, maximumCardsPerPlayer, winCondition) {
        this.maximumPlayers = maximumPlayers;
        this.maximumCardsPerPlayer = maximumCardsPerPlayer;
        this.winCondition = winCondition;
    }
    return Rules;
}());
exports.Rules = Rules;
var RepeatedCardsCondition = /** @class */ (function () {
    function RepeatedCardsCondition(maxNumOfRepeatedCards) {
        this.maxNumOfRepeatedCards = maxNumOfRepeatedCards;
    }
    RepeatedCardsCondition.prototype.match = function (cards) {
        if (cards.length == 0)
            return false;
        var _cards = __spreadArrays(cards);
        _cards.sort(function (a, b) { return a.value - b.value; });
        var val = _cards[0].value;
        var maxCount = 0;
        var dups = {};
        for (var _i = 0, _cards_1 = _cards; _i < _cards_1.length; _i++) {
            var c = _cards_1[_i];
            if (!(c.value in dups)) {
                dups[c.value] = 0;
            }
            dups[c.value] += 1;
            if (dups[c.value] > maxCount) {
                maxCount = dups[c.value];
            }
            if (maxCount >= this.maxNumOfRepeatedCards) {
                return true;
            }
        }
        return false;
    };
    return RepeatedCardsCondition;
}());
exports.RepeatedCardsCondition = RepeatedCardsCondition;
var SequenceCondition = /** @class */ (function () {
    function SequenceCondition(maxNumOfSequence) {
        this.maxNumOfSequence = maxNumOfSequence;
    }
    SequenceCondition.prototype.match = function (cards) {
        var _cards = __spreadArrays(cards);
        _cards.sort(function (a, b) { return a.value - b.value; });
        var j = 0;
        for (var i = _cards[0].value; i < _cards[0].value + this.maxNumOfSequence; i++) {
            if (_cards[j].value != i)
                return false;
            j++;
        }
        return true;
    };
    return SequenceCondition;
}());
exports.SequenceCondition = SequenceCondition;
var TopCardCondition = /** @class */ (function () {
    function TopCardCondition() {
    }
    TopCardCondition.prototype.compareTopCardsOfPlayers = function (cards) {
        var maxVal = -1;
        var maxIndex = -1;
        for (var index = 0; index < cards.length; index++) {
            var card = cards[index];
            if (card.value > maxVal) {
                maxVal = card.value;
                maxIndex = index;
            }
            else if (card.value == maxVal) {
                maxIndex = -1;
            }
        }
        return [maxIndex, maxVal];
    };
    TopCardCondition.prototype.match = function (cards) {
        throw new Error("Method not implemented.");
    };
    return TopCardCondition;
}());
exports.TopCardCondition = TopCardCondition;

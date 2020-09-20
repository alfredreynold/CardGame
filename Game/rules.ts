
import { CardInterface } from "../Deck/cardInterface"

export class Rules {
    maximumPlayers: number
    maximumCardsPerPlayer: number
    winCondition: Condition[]
    constructor(maximumPlayers: number, maximumCardsPerPlayer: number, winCondition: Condition[]) {
        this.maximumPlayers = maximumPlayers
        this.maximumCardsPerPlayer = maximumCardsPerPlayer
        this.winCondition = winCondition
    }
}

export interface Condition {
    match(cards: CardInterface[]):boolean
}

export interface SecondCondition extends Condition {
    // returns -1 if it's a tie
    compareTopCardsOfPlayers(cards: CardInterface[]):[number, number]
}

export class RepeatedCardsCondition implements Condition {
    maxNumOfRepeatedCards: number
    constructor(maxNumOfRepeatedCards: number) {
        this.maxNumOfRepeatedCards = maxNumOfRepeatedCards
    }
    match(cards: CardInterface[]): boolean {
        if (cards.length == 0) return false
        const _cards = [...cards]
        _cards.sort((a,b) => a.value - b.value)
        const val = _cards[0].value
        let maxCount = 0
        let dups: {[id:number]:number;} = {}
        for (const c of _cards) {
            if (!(c.value in dups)) {
                dups[c.value] = 0
            }
            dups[c.value] += 1
            if (dups[c.value] > maxCount) {
                maxCount = dups[c.value]
            }
            if (maxCount >= this.maxNumOfRepeatedCards) {
                return true
            }
        }
        return false
    }
}

export class SequenceCondition implements Condition {
    maxNumOfSequence: number
    constructor(maxNumOfSequence: number) {
        this.maxNumOfSequence = maxNumOfSequence
    }
    match(cards: CardInterface[]): boolean {
        let _cards = [...cards]
        _cards.sort((a,b) => a.value - b.value)
        let j = 0;
        for (let i = _cards[0].value; i < _cards[0].value + this.maxNumOfSequence; i++) {
            if (_cards[j].value != i) return false
            j++
        }
        return true
    }
}

export class TopCardCondition implements SecondCondition {
    constructor() {
    }
    compareTopCardsOfPlayers(cards: CardInterface[]): [number, number] {
        let maxVal = -1
        let maxIndex = -1
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index]
            if (card.value > maxVal) {
                maxVal = card.value
                maxIndex = index
            } else if (card.value == maxVal) {
                maxIndex = -1
            }
        }
        return [maxIndex, maxVal]
    }
    match(cards: CardInterface[]): boolean {
        throw new Error("Method not implemented.")
    }
}
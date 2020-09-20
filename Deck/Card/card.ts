import {Suit} from './suit'
import { CardInterface } from "../cardInterface";

export class Card implements CardInterface {
    value: number
    type: number
    suit: Suit
    character: string
    constructor(val: number, suit: Suit, character: string) {
        this.value = val
        this.suit = suit
        this.character = character
        this.type = suit.valueOf()
    }
}
import { Card } from "./Card/card";
import { Suit, suitOf } from "./Card/suit";
import { CardInterface } from "./cardInterface";

export class Deck {
    cards: CardInterface[]
    topIndex: number
    constructor() {
        this.cards = this.createDeck()
        this.topIndex = this.cards.length - 1
    }

    private createDeck(): CardInterface[] {
        let cards = []
        for (let i = 0; i < Suit.__LENGTH; i++) {
            const suit  = suitOf(i)
            for (let index = 0; index < 13; index++) {
                if (index == 0) {
                    cards.push(new Card(index+1, suit, 'A'))
                } else if (index == 10) {
                    cards.push(new Card(index+1, suit, 'J'))
                } else if (index == 11) {
                    cards.push(new Card(index+1, suit, 'Q'))
                } else if (index == 12) {
                    cards.push(new Card(index+1, suit, 'K'))
                }
                cards.push(new Card(index+1, suit, `${index + 1}`))
            }
        }
        
        return cards
    }

    shuffle() {
        let i = this.cards.length, j, temp
        if ( i == 0 ) return
        while ( --i ) {
            j = Math.floor( Math.random() * ( i + 1 ) )
            temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp;
        }
    }
}
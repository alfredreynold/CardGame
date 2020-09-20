import { v4 as uuid4 } from "uuid";
import { CardInterface } from "../Deck/cardInterface";

export class Player {
    name: string
    credit: number
    id: string
    cards: CardInterface[] = []
    constructor(name: string, credit: number) {
        this.name = name
        this.credit = credit
        this.id = uuid4()
    }

    addCard(card: CardInterface) {
        this.cards.push(card)
    }
}
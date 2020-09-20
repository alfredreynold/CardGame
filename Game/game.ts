
import { CardInterface } from "../Deck/cardInterface"
import { Deck } from "../Deck/deck"
import { Player } from "../Player/player"
import { Rules, Condition, RepeatedCardsCondition, SequenceCondition, TopCardCondition, SecondCondition } from "./rules"

export class Game {
    private players: Player[]
    private rules: Rules
    private deck: Deck
    constructor(players: Player[]) {
        this.players = players
        this.deck = new Deck()
        if (this.deck.cards.length / players.length < 3) {
            throw new Error("Player over load")
        }
        this.rules = new Rules(players.length,3,this.createConditions())
    }

    private createConditions(): Condition[] {
        let trail = new RepeatedCardsCondition(3)
        let seqOf3 = new SequenceCondition(3)
        let pairs = new RepeatedCardsCondition(2)
        let topCard = new TopCardCondition()
        return [trail, seqOf3, pairs, topCard]
    }

    addPlayer(player: Player) {
        this.players.push(player)
    }

    start() {
        
        this.deck.shuffle()
        for (let i = 0; i < this.rules.maximumCardsPerPlayer; i++) {
            this.dealCardsTo(this.players)
        }
    }

    dealCardsTo(players: Player[]) {
        for (const player of players) {
            player.addCard(this.deck.cards[this.deck.topIndex])
            this.deck.topIndex--
        }
    }

    private findWinnerByTopCard(condition: Condition):[Player, string] {
        let topCards: CardInterface[] = this.players.map((player,index,players) => {
            return player.cards[player.cards.length - 1]
        })
        let [winnerIndex, maxValue] = (condition as SecondCondition).compareTopCardsOfPlayers(topCards)
        if (winnerIndex == -1) { // Tie
            let tiePlayers = this.players.filter((player,index,players)=>{
                return player.cards[player.cards.length - 1].value === maxValue
            })
            this.dealCardsTo(tiePlayers)
            
            return this.findWinnerByTopCard(condition)
        }
        return [this.players[winnerIndex], "Won by Top card"]
    }

    findWinner():[Player, string]|undefined {
        for (let index = 0; index < this.rules.winCondition.length; index++) {
            const condition = this.rules.winCondition[index];
            if (index == this.rules.winCondition.length - 1) {// Last condition 
                return this.findWinnerByTopCard(condition)
            }
            for (const player of this.players) {
                if (condition.match(player.cards)) {
                    if (index == 0) {
                        return [player, "Won by Trail"]
                    } else if (index == 1) {
                        return [player, "Won by Sequence"]
                    } else if (index == 2) {
                        return [player, "Won by Pairs"]
                    }
                }
            }
        }
    }
}
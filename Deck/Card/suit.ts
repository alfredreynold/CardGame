export enum Suit {
    spades = 0,
    hearts,
    clubs,
    diamonds,
    __LENGTH
}

export function suitOf(num:number): Suit {
    const suit  = Suit[num] as keyof typeof Suit
    return Suit[suit]
}
export interface CardType {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  isError: boolean;
}

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export function generateDeck(): CardType[] {
  const deck = [...EMOJIS, ...EMOJIS].map((emoji) => ({
    id: Math.random().toString(36).substring(2, 9),
    emoji,
    isFlipped: false,
    isMatched: false,
    isError: false,
  }));
  
  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

import { Data, Card } from '../types/types';

export const params = new URLSearchParams({
  page: '1',
  pageSize: '8',
});

export async function searchCards(card: string): Promise<Data[]> {
  let cards: Data[] = [];

  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards/?q=name:${card}*&${params}`,
      {
        method: 'GET',
      }
    );

    const cardsData = await response.json();

    cards = await cardsData.data.map((card: Card) => {
      return {
        id: card.id,
        name: card.name,
        image: card.images.large,
      };
    });
  } catch (error) {
    console.error(error);
  }

  return cards;
}

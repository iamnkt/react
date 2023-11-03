import { params } from '../constants/constants';
import { Data, Card } from '../types/types';

export async function searchCards(name: string): Promise<Data[]> {
  let cards: Data[] = [];

  try {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards/?q=name:${name}*&${params}`,
      {
        method: 'GET',
      }
    );

    const cardsData = await response.json();

    cards = await cardsData.data.map((item: Card) => {
      return {
        id: item.id,
        name: item.name,
        image: item.images.large,
      };
    });
  } catch (error) {
    console.error(error);
  }

  return cards;
}

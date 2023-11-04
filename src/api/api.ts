import { Data, Card } from '../types/types';

export async function searchCards(params: URLSearchParams): Promise<Data[]> {
  let cards: Data[] = [];

  try {
    const apiUrl = new URL('https://api.pokemontcg.io/v2/cards/');
    apiUrl.search = params.toString();
    const response = await fetch(apiUrl.toString());
    console.log(apiUrl.toString());

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

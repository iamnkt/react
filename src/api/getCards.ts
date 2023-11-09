import { Data, Card } from '../types/types';

export async function getCards(
  params: URLSearchParams
): Promise<{ cards: Data[]; totalCount: number }> {
  let cards: Data[] = [];
  let totalCount: number = 0;

  try {
    const apiUrl = new URL('https://api.pokemontcg.io/v2/cards/');
    apiUrl.search = params.toString();

    const response = await fetch(apiUrl.toString());
    const cardsData = await response.json();

    totalCount = cardsData.totalCount;

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

  return { cards, totalCount };
}

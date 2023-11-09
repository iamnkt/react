import { Data, Card, CardDetail } from '../types/types';

export async function searchCards(
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

export async function getCardById(id: string): Promise<CardDetail | null> {
  let card = null;

  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const cardData = await response.json();
    console.log(cardData);
    card = {};
    Object.defineProperties(card, {
      image: {
        value: cardData.data.images.small,
      },
      name: {
        value: cardData.data.name,
      },
      hp: {
        value: cardData.data.hp,
      },
      level: {
        value: cardData.data.level,
      },
      types: {
        value: cardData.data.types,
      },
      rarity: {
        value: cardData.data.rarity,
      },
    });
    console.log(card);
  } catch (error) {
    console.error(error);
  }

  return card as CardDetail;
}

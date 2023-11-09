import { CardDetail } from '../types/types';

export async function getCardById(id: string): Promise<CardDetail> {
  let card = null;

  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const cardData = await response.json();
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
  } catch (error) {
    console.error(error);
  }

  return card as CardDetail;
}

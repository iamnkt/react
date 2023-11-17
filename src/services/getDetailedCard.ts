import { CardDetail } from '../types/types';

export async function getCardById(id: string): Promise<CardDetail> {
  let card = null;

  try {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const data = await response.json();
    card = {};
    Object.defineProperties(card, {
      image: {
        value: data.data.images.small,
      },
      name: {
        value: data.data.name,
      },
      hp: {
        value: data.data.hp,
      },
      level: {
        value: data.data.level,
      },
      types: {
        value: data.data.types,
      },
      rarity: {
        value: data.data.rarity,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return card as CardDetail;
}

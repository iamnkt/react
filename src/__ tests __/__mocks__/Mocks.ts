export const CharmanderMockCard = {
  id: 'xy10-10',
  name: 'Charmander',
  images: {
    large: 'https://images.pokemontcg.io/xy10/10_hires.png',
  },
};

export const CharizardMockCard = {
  id: 'bw15-12',
  name: 'Charizard',
  images: {
    large: 'https://images.pokemontcg.io/bw15/12_hires.png',
  },
};

export const CharizardDetailedMockCard = {
  image: 'https://images.pokemontcg.io/bw15/12_hires.png"',
  name: 'Charizard',
  hp: '150',
  level: '12',
  types: ['fire'],
  rarity: 'rare',
};

export const CardsDataMock = {
  count: 10,
  data: [
    CharmanderMockCard,
    CharizardMockCard,
    CharizardMockCard,
    CharizardMockCard,
    CharizardMockCard,
    CharizardMockCard,
    CharizardMockCard,
    CharmanderMockCard,
    CharmanderMockCard,
    CharmanderMockCard,
  ],
  page: 1,
  pageSize: 8,
  totalCount: 10,
};

export const CardsEmptyDataMock = {
  count: 0,
  data: [],
  page: 1,
  pageSize: 8,
  totalCount: 0,
};

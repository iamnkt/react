import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.pokemontcg.io/v2/cards/bw15-12', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          name: 'Charizard',
          hp: '150',
          level: '12',
          types: ['fire'],
          rarity: 'rare',
        },
      }),
      ctx.delay(30)
    );
  }),
];

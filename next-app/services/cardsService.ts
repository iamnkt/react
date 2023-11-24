import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CardsData, DetailedCardData } from '../types/types';
import { HYDRATE } from 'next-redux-wrapper';
import { cardsSlice } from './reducers/cardsSlice';

export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/cards' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getCards: build.query<
      CardsData,
      { name: string; page: number; limit: number }
    >({
      query: (arg) => {
        const { name, page, limit } = arg;
        return {
          url: '/',
          params: {
            q: `name:${name}*`,
            page,
            pageSize: limit,
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { setCards } = cardsSlice.actions;
        try {
          const cardsData = await queryFulfilled;
          dispatch(setCards(cardsData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getDetailedCard: build.query<DetailedCardData, { id: string }>({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetDetailedCardQuery,
  util: { getRunningQueriesThunk },
} = cardsAPI;

export const { getCards, getDetailedCard } = cardsAPI.endpoints;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { cardFlagValueSlice } from '../store/reducers/cardFlagValueSlice';
import { cardsFlagValueSlice } from '../store/reducers/cardsFlagValueSlice';
import { CardsData, DetailedCardData } from '../types/types';

const { setIsLoading } = cardsFlagValueSlice.actions;
const { setIsFetching } = cardFlagValueSlice.actions;

export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/cards' }),
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
        dispatch(setIsLoading(true));
        try {
          await queryFulfilled;
          dispatch(setIsLoading(false));
        } catch (err) {
          dispatch(setIsLoading(false));
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setIsFetching(true));
        try {
          await queryFulfilled;
          dispatch(setIsFetching(false));
        } catch (err) {
          dispatch(setIsFetching(false));
        }
      },
    }),
  }),
});

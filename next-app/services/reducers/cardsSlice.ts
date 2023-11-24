import { CardsData } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardsState {
  cardsData: CardsData;
}

const initialState: CardsState = {
  cardsData: {
    count: 0,
    data: [],
    page: 1,
    pageSize: 8,
    totalCount: 0,
  },
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardsData>) {
      state.cardsData = action.payload;
    },
  },
});

export default cardsSlice.reducer;

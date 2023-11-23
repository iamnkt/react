import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailedCard, DetailedCardData } from '../../types/types';

const initialState: DetailedCard = {
  id: '',
  name: '',
  hp: '',
  level: '',
  types: [],
  rarity: '',
};

export const cardValueSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<DetailedCardData>) {
      state.id = action.payload.data.id;
      state.name = action.payload.data.name;
      state.hp = action.payload.data.hp;
      state.level = action.payload.data.level || '';
      state.types = action.payload.data.types;
      state.rarity = action.payload.data.rarity;
    },
  },
});

export const { setCard } = cardValueSlice.actions;

export default cardValueSlice.reducer;

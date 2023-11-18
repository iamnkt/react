import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailedCard, DetailedCardData } from '../../types/types';

interface CardValueState {
  card: DetailedCard;
}

const initialState: CardValueState = {
  card: {
    name: '',
    hp: '',
    level: '',
    types: [],
    rarity: '',
  },
};

export const cardValueSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<DetailedCardData>) {
      state.card.name = action.payload.data.name;
      state.card.hp = action.payload.data.hp;
      state.card.level = action.payload.data.level || '';
      state.card.types = action.payload.data.types;
      state.card.rarity = action.payload.data.rarity;
    },
  },
});

export default cardValueSlice.reducer;

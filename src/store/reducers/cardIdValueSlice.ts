import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardIdValueState {
  id: string;
}

const initialState: cardIdValueState = {
  id: '',
};

export const cardIdValueSlice = createSlice({
  name: 'cardId',
  initialState,
  reducers: {
    setCardId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setCardId } = cardIdValueSlice.actions;

export default cardIdValueSlice.reducer;

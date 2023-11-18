import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardFlagValueState {
  isFetching: boolean;
}

const initialState: cardFlagValueState = {
  isFetching: false,
};

export const cardFlagValueSlice = createSlice({
  name: 'cardsFlag',
  initialState,
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
});

export default cardFlagValueSlice.reducer;

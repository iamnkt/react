import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardsFlagValueState {
  isLoading: boolean;
}

const initialState: cardsFlagValueState = {
  isLoading: false,
};

export const cardsFlagValueSlice = createSlice({
  name: 'cardsFlag',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default cardsFlagValueSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CARDS_NUMBER } from '../../constants/constants';

interface LimitValueState {
  limit: number;
}

const initialState: LimitValueState = {
  limit: DEFAULT_CARDS_NUMBER,
};

export const limitValueSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export default limitValueSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LimitValueState {
  limit: number;
}

const initialState: LimitValueState = {
  limit: Number(localStorage.getItem('limit')) || 8,
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

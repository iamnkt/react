import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PAGE } from '../../constants/constants';

interface PageValueState {
  page: number;
}

const initialState: PageValueState = {
  page: DEFAULT_PAGE,
};

export const pageValueSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export default pageValueSlice.reducer;

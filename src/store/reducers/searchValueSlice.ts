import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchValueState {
  query: string;
}

const initialState: SearchValueState = {
  query: localStorage.getItem('query') || '',
};

export const searchValueSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export default searchValueSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: ['UK', 'France', 'Spain', 'Germany'],
  reducers: {},
});

export default countriesSlice.reducer;

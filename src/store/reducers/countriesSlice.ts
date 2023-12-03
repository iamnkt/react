import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: ['UK', 'France', 'Spain', 'Germany', 'Serbia', 'Portugal'],
  reducers: {},
});

export default countriesSlice.reducer;

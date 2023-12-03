import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceData } from '../../types/types';

export interface Forms {
  data: SliceData[];
}

const initialState: Forms = {
  data: [],
};

export const formsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setForm(state, action: PayloadAction<SliceData>) {
      state.data.unshift(action.payload);
    },
  },
});

export default formsSlice.reducer;

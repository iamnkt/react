import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  data: {
    image: string;
    name: string;
    age: string;
    email: string;
    gender: string;
    password: string;
    password2: string;
    country: string;
  };
}

const initialState: Data = {
  data: {
    image: '',
    name: '',
    age: '',
    email: '',
    gender: '',
    password: '',
    password2: '',
    country: '',
  },
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<string>) {
      state.data.image = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    setAge(state, action: PayloadAction<string>) {
      state.data.age = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.data.email = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.data.gender = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.data.password = action.payload;
    },
    setPassword2(state, action: PayloadAction<string>) {
      state.data.password2 = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.data.country = action.payload;
    },
  },
});

export default dataSlice.reducer;

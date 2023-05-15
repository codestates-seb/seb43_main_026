import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrl: null,
    file: null,
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { setImageUrl, setFile } = imageSlice.actions;
export default imageSlice.reducer;

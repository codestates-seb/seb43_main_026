import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrl: null,
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setImageUrl, setFile } = imageSlice.actions;
export default imageSlice.reducer;

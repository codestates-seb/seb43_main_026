import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slice/imageSlice';
import calendarSlice from './slice/calendarSlice';

export const store = configureStore({
  reducer: {
    image: imageReducer,
    calendar: calendarSlice,
  },
});

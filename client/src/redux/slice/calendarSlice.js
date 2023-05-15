import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    date: format(new Date(), 'yyyy-MM-dd'),
    place: '',
    startTime: '',
    endTime: '',
    durationTime: 0,
    memo: '',
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setDurationTime: (state, action) => {
      state.durationTime = action.payload;
    },
    setMemo: (state, action) => {
      state.memo = action.payload;
    },
  },
});

export const {
  setDate,
  setPlace,
  setStartTime,
  setEndTime,
  setDurationTime,
  setMemo,
} = calendarSlice.actions;

export default calendarSlice.reducer;

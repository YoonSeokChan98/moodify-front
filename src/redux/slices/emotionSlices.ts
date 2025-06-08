import { EmotionType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: EmotionType = {
  emotions: {
    angry: 0,
    disgusted: 0,
    fearful: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprised: 0,
  },
};

export const userSlice = createSlice({
  name: 'emotions',
  initialState,
  reducers: {
    updateEmotion: (
      state,
      action: PayloadAction<{
        angry?: number | undefined;
        disgusted?: number | undefined;
        fearful?: number | undefined;
        happy?: number | undefined;
        neutral?: number | undefined;
        sad?: number | undefined;
        surprised?: number | undefined;
      }>
    ) => {
      state.emotions = action.payload;
    },
    removeEmotions: (state) => {
      state.emotions = null;
    },
  },
});

export const { updateEmotion, removeEmotions } = userSlice.actions;
export default userSlice.reducer;

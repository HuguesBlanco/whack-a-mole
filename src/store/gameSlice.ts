import { createSlice } from '@reduxjs/toolkit';

type GameState = {
  status: 'INITIAL' | 'IN_PROGRESS' | 'ENDED';
  score: number;
  timeLeftInSeconds: number;
};

const initialState: GameState = {
  status: 'INITIAL',
  score: 0,
  timeLeftInSeconds: 120,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.status = 'IN_PROGRESS';
      state.score = initialState.score;
      state.timeLeftInSeconds = initialState.timeLeftInSeconds;
    },
    decrementTimer(state) {
      state.timeLeftInSeconds -= 1;

      if (state.timeLeftInSeconds === 0) {
        state.status = 'ENDED';
      }
    },
    incrementScore(state) {
      state.score += 1;
    },
  },
});

export const { startGame, decrementTimer, incrementScore } = gameSlice.actions;

export default gameSlice.reducer;

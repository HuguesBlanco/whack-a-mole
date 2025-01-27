import { describe, expect, it } from 'vitest';
import gameReducer, {
  decrementTimer,
  GameState,
  incrementScore,
  startGame,
} from './gameSlice';

describe('gameSlice reducer', () => {
  const initialState: GameState = {
    status: 'INITIAL',
    score: 0,
    timeLeftInSeconds: 120,
  };

  describe('startGame', () => {
    it('should set status to IN_PROGRESS and reset score and timer', () => {
      const initialGameState: GameState = {
        status: 'ENDED',
        score: 10,
        timeLeftInSeconds: 0,
      };

      const actualState = gameReducer(initialGameState, startGame());

      const expectedState = {
        status: 'IN_PROGRESS',
        score: 0,
        timeLeftInSeconds: 120,
      };

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('decrementTimer', () => {
    it('should decrement the timer by 1 second when timeLeftInSeconds is greater than 0', () => {
      const initialGameState = {
        ...initialState,
        timeLeftInSeconds: 100,
      };

      const actualState = gameReducer(initialGameState, decrementTimer());

      const expectedState = {
        ...initialState,
        timeLeftInSeconds: 99,
      };

      expect(actualState).toEqual(expectedState);
    });

    it('should set status to ENDED when timeLeftInSeconds reaches 0', () => {
      const initialGameState = {
        ...initialState,
        timeLeftInSeconds: 1,
      };

      const actualState = gameReducer(initialGameState, decrementTimer());

      const expectedState = {
        ...initialState,
        status: 'ENDED',
        timeLeftInSeconds: 0,
      };

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('incrementScore', () => {
    it('should increment the score by 1', () => {
      const initialGameState = {
        ...initialState,
        score: 10,
      };

      const actualState = gameReducer(initialGameState, incrementScore());

      const expectedState = {
        ...initialState,
        score: 11,
      };

      expect(actualState).toEqual(expectedState);
    });
  });
});

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decrementTimer } from '../store/gameSlice';
import { AppDispatch } from '../store/store';

/** Start the game and decrement the time left every second */
export function useGameTimer(): void {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [dispatch]);
}

import { useDispatch } from 'react-redux';
import { startGame } from '../store/gameSlice';
import { AppDispatch } from '../store/store';

function HomeScreen(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleStart = (): void => {
    dispatch(startGame());
  };

  return (
    <div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}

export default HomeScreen;

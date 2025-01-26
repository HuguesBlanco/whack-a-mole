import { useDispatch } from 'react-redux';
import { startGame } from '../store/gameSlice';
import { AppDispatch } from '../store/store';
import HomeTemplate from '../ui/templates/HomeTemplate';

/**
 * The initial screen of the game, with a start button, displayed before starting the game.
 */
function HomeScreen(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const startMatch = (): void => {
    dispatch(startGame());
  };

  return <HomeTemplate onClickStart={startMatch} />;
}

export default HomeScreen;

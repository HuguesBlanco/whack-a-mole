import { useDispatch } from 'react-redux';
import { startGame } from '../store/gameSlice';
import { AppDispatch } from '../store/store';
import { COLOR_YELLOW } from '../styles/colors';
import Button from '../ui/Button';
import PlayingField from '../ui/PlayingField';
import Title from '../ui/Title';

/**
 * The initial screen of the game, displayed before starting the game.
 */
function HomeScreen(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleStart = (): void => {
    dispatch(startGame());
  };

  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: COLOR_YELLOW,
          opacity: 0.8,
        }}
      >
        <div
          style={{
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh',
          }}
        >
          <Title>Whock a mole</Title>
          <Button onClick={handleStart} size="BIG">
            Start Game
          </Button>
        </div>
      </div>
    </PlayingField>
  );
}

export default HomeScreen;

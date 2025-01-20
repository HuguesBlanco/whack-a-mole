import { useState } from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../styles/colors';
import { CurrentScore, Score } from '../types';
import { isCurrentScore } from '../utils';
import Button from './Button';
import TextInput from './TextInput';

type LeaderBoardRowProps = {
  scoreData: Score | CurrentScore;
  onClickSave: () => void;
};

/**
 * Displays a row of the leaderboard table.
 */
function LeaderBoardRow({
  scoreData,
  onClickSave,
}: LeaderBoardRowProps): React.JSX.Element {
  const [playerName, setPlayerName] = useState(scoreData.playerName);

  const isActiveScore = isCurrentScore(scoreData);

  return (
    <tr key={scoreData.id}>
      <td
        style={{
          padding: '1rem',
          border: `2px solid ${isActiveScore ? COLOR_GREEN : COLOR_WHITE}`,
        }}
      >
        {isActiveScore ? (
          <TextInput value={playerName} setValue={setPlayerName} />
        ) : (
          playerName
        )}
      </td>
      <td
        style={{
          padding: '1rem',
          border: `2px solid ${isActiveScore ? COLOR_GREEN : COLOR_WHITE}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {scoreData.scoreValue}
          {isActiveScore && <Button onClick={onClickSave}>Save Score</Button>}
        </div>
      </td>
    </tr>
  );
}

export default LeaderBoardRow;

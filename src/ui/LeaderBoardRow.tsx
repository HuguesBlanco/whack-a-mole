import { ReactElement } from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../styles/colors';
import { CurrentScore, Score } from '../types';
import { isCurrentScore } from '../utils/scoreUtils';
import Button from './Button';

type LeaderBoardRowProps = {
  scoreData: Score | CurrentScore;
  scoreRanking: number;
  textInputComponent: ReactElement;
  onClickSave: () => void;
};

/**
 * Displays a row of the leaderboard table.
 */
function LeaderBoardRow({
  scoreData,
  scoreRanking,
  textInputComponent,
  onClickSave,
}: LeaderBoardRowProps): React.JSX.Element {
  const isActiveScore = isCurrentScore(scoreData);

  return (
    <tr key={scoreData.id}>
      <td
        style={{
          padding: '1rem',
          border: `2px solid ${isActiveScore ? COLOR_GREEN : COLOR_WHITE}`,
        }}
      >
        {scoreRanking}
      </td>
      <td
        style={{
          padding: '1rem',
          border: `2px solid ${isActiveScore ? COLOR_GREEN : COLOR_WHITE}`,
        }}
      >
        {isActiveScore ? textInputComponent : scoreData.playerName}
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

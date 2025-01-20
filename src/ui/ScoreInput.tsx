import React from 'react';
import { COLOR_GREEN } from '../styles/colors';
import { Score } from '../types';

type ScoreInputProps = {
  currentScore: Score;
  scoreRanking: number;
  playerName: string;
  setPlayerName: (newName: string) => void;
};

function ScoreInput({
  currentScore,
  scoreRanking,
  playerName,
  setPlayerName,
}: ScoreInputProps): React.JSX.Element {
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPlayerName(event.target.value);
  };

  return (
    <table
      style={{
        width: '100%',
        fontFamily: 'sans-serif',
        fontSize: '2rem',
        color: COLOR_GREEN,
        borderSpacing: '1rem',
      }}
    >
      <tbody>
        <tr key={currentScore.id}>
          <td
            className="ranking"
            style={{
              width: '25%',
              padding: '1rem',
              border: `2px solid ${COLOR_GREEN}`,
            }}
          >
            {scoreRanking}
          </td>
          <td
            className="name"
            style={{
              width: '50%',
              padding: '1rem',
              border: `2px solid ${COLOR_GREEN}`,
            }}
          >
            <input
              style={{ fontSize: '2rem' }}
              type="text"
              value={playerName}
              onChange={handleNameChange}
            />
          </td>
          <td
            className="score"
            style={{
              width: '25%',
              padding: '1rem',
              border: `2px solid ${COLOR_GREEN}`,
            }}
          >
            {currentScore.scoreValue}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ScoreInput;

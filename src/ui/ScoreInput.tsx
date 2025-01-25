import React from 'react';
import { COLOR_GREEN } from '../styles/colors';
import { Score } from '../types/scoreTypes';

type ScoreInputProps = {
  /** The score of the game that just ended. */
  currentScore: Score;

  /** The ranking of the current score among all scores. */
  scoreRanking: number;

  /** The name of the player who played the game. */
  playerName: string;

  /** Callback to update the player's name. */
  setPlayerName: (newName: string) => void;

  /** Indicates whether the score has already been saved. */
  isScoreSaved: boolean;
};

/**
 * A component displaying the current score and allowing to enter your name.
 */
function ScoreInput({
  currentScore,
  scoreRanking,
  playerName,
  setPlayerName,
  isScoreSaved,
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
              height: '2rem',
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
              height: '2rem',
              padding: '1rem',
              border: `2px solid ${COLOR_GREEN}`,
            }}
          >
            {isScoreSaved ? (
              currentScore.playerName
            ) : (
              <input
                style={{
                  fontSize: '2rem',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                type="text"
                value={playerName}
                onChange={handleNameChange}
              />
            )}
          </td>
          <td
            className="score"
            style={{
              width: '25%',
              height: '2rem',
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

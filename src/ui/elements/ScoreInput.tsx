import React from 'react';
import { COLOR_GREEN } from '../../styles/colors';
import { Score } from '../../types/scoreTypes';

type ScoreInputProps = {
  /** The score of the game that just ended. */
  currentScore: Score;

  /** The ranking of the current score among all scores. */
  scoreRanking: number;

  /** Callback to update the player's name. */
  setPlayerName: (newName: string) => void;

  /** Indicates whether the score has already been saved. */
  isScoreSaved: boolean;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * A component displaying the current score and allowing to enter your name.
 */
function ScoreInput({
  currentScore,
  scoreRanking,
  setPlayerName,
  isScoreSaved,
  isPortrait = false,
}: ScoreInputProps): React.JSX.Element {
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPlayerName(event.target.value);
  };

  const fontSize = isPortrait ? '3vw' : '3vh';
  const cellPadding = isPortrait ? '2vw' : '2vh';
  const borderColor = `2px solid ${COLOR_GREEN}`;

  return (
    <table
      style={{
        width: '100%',
        height: '100%',
        fontFamily: 'sans-serif',
        fontSize: fontSize,
        color: COLOR_GREEN,
        borderSpacing: isPortrait ? '1vw 2vw' : '1vh 2vh',
      }}
    >
      <tbody>
        <tr key={currentScore.id}>
          <td
            className="ranking"
            style={{
              width: '25%',
              border: borderColor,
              padding: cellPadding,
            }}
          >
            {scoreRanking}
          </td>
          <td
            className="name"
            style={{
              width: '50%',
              border: borderColor,
              padding: cellPadding,
            }}
          >
            {isScoreSaved ? (
              currentScore.playerName
            ) : (
              <input
                style={{
                  fontSize: fontSize,
                  width: '100%',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                }}
                type="text"
                value={currentScore.playerName}
                onChange={handleNameChange}
              />
            )}
          </td>
          <td
            className="score"
            style={{
              width: '25%',
              border: borderColor,
              padding: cellPadding,
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

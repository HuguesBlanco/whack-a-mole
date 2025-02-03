import React from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../../styles/colors';
import { Score } from '../../types/scoreTypes';
import { getOrdinalSuffix } from '../../utils/scoreUtils';

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

  return (
    <div>
      {/* Title - start */}
      <div
        style={{
          fontFamily: 'DynaPuff, serif',
          fontSize: isPortrait ? '6vw' : '5vh',
          color: COLOR_WHITE,
          textAlign: 'center',
          marginBottom: '3vh',
        }}
      >
        Your Score
      </div>
      {/* Title - end */}

      {/* Score line - start */}
      <div
        style={{
          fontFamily: 'sans-serif',
          color: COLOR_WHITE,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Rank - start */}
        <div
          style={{
            fontSize: isPortrait ? '8vw' : '8vh',
            flex: 1,
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            {scoreRanking}
          </span>
          <sup
            style={{
              fontFamily: 'DynaPuff, serif',
              fontSize: isPortrait ? '2vw' : '2vh',
            }}
          >
            {getOrdinalSuffix(scoreRanking)}
          </sup>
        </div>
        {/* Rank - end */}

        {/* Name - start */}
        <div
          style={{
            flex: 2,
            height: isPortrait ? '6vw' : '6vh',
            fontSize: isPortrait ? '3vw' : '3vh',
            borderRadius: '3vh',
            marginBottom: isPortrait ? '1vw' : '1.4vh',
          }}
        >
          {isScoreSaved ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                fontFamily: 'sans-serif',
                color: COLOR_WHITE,
                borderBottom: `2px solid ${COLOR_WHITE}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {currentScore.playerName}
            </div>
          ) : (
            <input
              placeholder="Enter your name"
              style={{
                width: '100%',
                height: '100%',
                fontSize: isPortrait ? '3vw' : '3vh',
                color: COLOR_GREEN,
                backgroundColor: COLOR_WHITE,
                border: 'none',
                borderRadius: '3vh',
                textAlign: 'center',
              }}
              type="text"
              value={currentScore.playerName}
              onChange={handleNameChange}
              autoFocus
            />
          )}
        </div>
        {/* Name - end */}

        {/* Points - start */}
        <div
          style={{
            fontSize: isPortrait ? '8vw' : '8vh',
            flex: 1,
          }}
        >
          {currentScore.scoreValue}
          <span
            style={{
              fontFamily: 'DynaPuff, serif',
              fontSize: isPortrait ? '2vw' : '2vh',
            }}
          >
            pts
          </span>
        </div>
        {/* Points - end */}
      </div>
      {/* Score line - end*/}
    </div>
  );
}

export default ScoreInput;

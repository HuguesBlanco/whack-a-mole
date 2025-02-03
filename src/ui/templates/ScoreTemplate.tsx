import React from 'react';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../styles/colors';

import { Score, Scores } from '../../types/scoreTypes';
import { hexToRgba } from '../../utils/colorsUtils';
import Button from '../elements/Button';
import LeaderBoard from '../elements/LeaderBoard';
import PlayingField from '../elements/PlayingField';
import ScoreInput from '../elements/ScoreInput';

type ScoreTemplateProps = {
  /** List of scores to display on the leaderboard. */
  displayedScores: Scores;

  /** The current player's score. */
  currentScore: Score;

  /** The rank of the current score among all scores. */
  currentScoreRanking: number;

  /** Updates the current player's name. */
  setPlayerName: (playerName: string) => void;

  /** Indicates whether the current score has already been saved. */
  isCurrentScoreSaved: boolean;

  /** Callback executed when clicking on save button. */
  onClickSaveCurrentScore: () => void;

  /** Callback triggered when clicking on "play again" button. */
  onClickPlayAgain: () => void;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * Displays the layout for the score screen, with the leaderboard, the player input for the current score, and action buttons.
 */
function ScoreTemplate({
  displayedScores,
  currentScore,
  currentScoreRanking,
  setPlayerName,
  isCurrentScoreSaved,
  onClickSaveCurrentScore,
  onClickPlayAgain,
  isPortrait = false,
}: ScoreTemplateProps): React.JSX.Element {
  return (
    <PlayingField>
      <div
        style={{
          height: '85vh',
          width: isPortrait ? '80vw' : '60vw',
          padding: isPortrait ? '10vh 10vw 5vh 10vw' : '10vh 20vw 5vh 20vw',
          backgroundColor: hexToRgba(COLOR_PURPLE, 0.8),
        }}
      >
        {/* Upper part - start */}
        <div
          style={{
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Current score - start */}
          <div style={{ marginBottom: '5vh' }}>
            <ScoreInput
              currentScore={currentScore}
              scoreRanking={currentScoreRanking}
              setPlayerName={setPlayerName}
              isScoreSaved={isCurrentScoreSaved}
              isPortrait={isPortrait}
            />
          </div>
          {/* Current score - end */}

          {/* Buttons - start */}
          <div
            style={{
              display: 'flex',
              flexDirection: isPortrait ? 'column' : 'row',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isCurrentScoreSaved ? (
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: isPortrait ? '3vw' : '2vh',
                    color: COLOR_YELLOW,
                    padding: '1vh 2vw',
                  }}
                >
                  Score saved
                </span>
              ) : (
                <Button
                  onClick={onClickSaveCurrentScore}
                  backgroundColor={COLOR_GREEN}
                  isPortrait={isPortrait}
                >
                  Save score
                </Button>
              )}
            </div>

            <div
              style={{
                width: '8vh',
                height: '3vh',
                fontFamily: 'DynaPuff, serif',
                fontSize: isPortrait ? '3vw' : '2vh',
                color: COLOR_WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: isPortrait ? '2vh auto' : 0,
              }}
            >
              {!isCurrentScoreSaved && 'OR'}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={onClickPlayAgain}
                backgroundColor={COLOR_YELLOW}
                isPortrait={isPortrait}
              >
                Play again
              </Button>
            </div>
          </div>
          {/* Buttons - end */}
        </div>
        {/* Upper part - end */}

        {/* Lower part - start */}
        <div
          style={{
            height: '55vh',
            width: isPortrait ? '80vw' : '40vw',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <LeaderBoard
            scoresData={displayedScores}
            isCurrentScoreSaved={isCurrentScoreSaved}
          />
        </div>
        {/* Lower part - end */}
      </div>
    </PlayingField>
  );
}

export default ScoreTemplate;
